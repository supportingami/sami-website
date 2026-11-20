# Staging / Preview Environment

The staging site (`next.samicharity.co.uk`) lets content editors preview Strapi content
on a live server. It is two Cloud Run services built from `docker/` images:

| Service              | Image                  | Process        | Role                            |
| -------------------- | ---------------------- | -------------- | ------------------------------- |
| `sami-website-next`  | `samicharity/frontend` | `next dev`     | Preview frontend (this runbook) |
| `sami-website-admin` | `samicharity/backend`  | `strapi start` | Strapi CMS + API, image uploads |

Build and push images with `yarn scripts docker build` / `yarn scripts docker push`,
then deploy the new image to each Cloud Run service (Console or `gcloud run services update`).

## How images work on staging

- Strapi (admin) is the single writer: uploads are stored in the `sami_website_public`
  GCS bucket, mounted on the backend at `/app/data/public` (`STRAPI_PUBLIC_DIR`,
  see `backend/config/server.ts`).
- The frontend serves **no upload files of its own**. Standalone-mode `rewrites()`
  (see `frontend/next.config.js`) proxies `/uploads/*` to the backend, so newly
  uploaded media resolves immediately with no copy or redeploy step.
- Baked frontend assets (`/images`, `/fonts`, `robots.txt`, `sitemap.xml`) are served
  from the frontend image itself. Do **not** mount anything over the frontend's
  `/app/public`: an overlay mount hides these files (previously caused self-hosted
  fonts to 404 while uploads worked).

## Required Cloud Run configuration

### `sami-website-next` (frontend)

Environment variables:

| Variable                | Value                             | Why                                                                                                                                                   |
| ----------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_CONFIG_MODE`      | `standalone`                      | On-demand image optimisation + `/uploads` proxy (see below)                                                                                           |
| `NODE_ENV`              | `development`                     | The process runs `next dev`; any other value makes `next-export-optimize-images` emit `/_optimized` urls that 404 (the optimiser CLI never runs here) |
| `NEXT_PUBLIC_API_URL`   | `https://admin.samicharity.co.uk` | GraphQL API origin; also the default `/uploads` rewrite target                                                                                        |
| `NEXT_PUBLIC_IMAGE_URL` | _(empty)_                         | Empty keeps image urls relative (`/uploads/...`)                                                                                                      |
| `STRAPI_READONLY_TOKEN` | _(token)_                         | Server-side data fetching                                                                                                                             |
| `BACKEND_URL`           | _(optional)_                      | Server-to-server backend origin for `/uploads` rewrites; falls back to `NEXT_PUBLIC_API_URL`                                                          |

Volumes: none required on the frontend (see above).

### `sami-website-admin` (backend)

No changes needed for image rendering. Keep `NODE_ENV=docker`, `DB_DIR`,
`DATABASE_FILENAME`, and `STRAPI_PUBLIC_DIR` aligned with the GCS mounts
(`/app/data/db`, `/app/data/public`).

> Security: never use the committed `config/docker.env` placeholder secrets
> (`testkey1`, `test_salt`, …) on Cloud Run — `APP_KEYS`, `API_TOKEN_SALT`,
> `ADMIN_JWT_SECRET`, `JWT_SECRET` must be unique per environment.

## Why standalone mode (not export) on staging

- `export` mode pre-builds `_optimized/*` images at build time and the export
  optimiser CLI only runs in the static-site pipeline — never inside the staging
  container — so every image 404s.
- `standalone` mode uses Next.js on-demand optimisation with originals served
  (directly or via the backend proxy). `NODE_ENV` must be `development` on this
  service: `next-export-optimize-images` treats any other value as "production
  build output exists" and emits `/_optimized` urls. `NODE_ENV=docker` is only
  meaningful to Strapi, and nothing in the frontend reads it.
- `frontend/next.config.js` selects the mode via `NEXT_CONFIG_MODE`
  (`export` default, `standalone` when set). The export default keeps production
  (Vercel static export) and CI builds unchanged.

## Local development notes

- `yarn scripts cli start` boots backend + `next dev` and performs a one-shot copy
  of `data/public` → `frontend/public`. In addition, standalone rewrites proxy
  `/uploads/*` to `http://localhost:1337`, so media uploaded mid-session also
  resolves without re-syncing. Set `BACKEND_URL` explicitly only if the backend
  runs elsewhere (e.g. `http://backend:1337` under docker compose).
- New slugs 404 on direct navigation until the dev server recompiles
  (`fallback: false` + cached `getStaticPaths`); following links works immediately
  and direct loads recover on refresh. Production builds enumerate paths at build
  time and are unaffected.
