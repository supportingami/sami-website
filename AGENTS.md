# AGENTS.md — working notes for AI agents (and humans in a hurry)

## Versioning (docker tags come from here)

- Docker image tags derive from the **root** `package.json` `version` via `BASE_TAG`
  (`scripts/src/commands/docker/build.ts`). Every `docker build` tags
  `:latest` **and** `:$BASE_TAG` (backend/frontend also pushed to GCR under both tags).
- `frontend` / `backend` `package.json` versions are independent workspace versions
  and are **not** used for tagging. Convention for releases: `chore: bump version`
  on the root `package.json` (e.g. `2.0.1` → `2.1.0`).
- **When to bump:** before building images you intend to deploy, so the running
  revision is traceable. Never rely on `:latest` alone to identify a deployment.

## Docker build (`yarn scripts docker build [--only base,backend,frontend,gcs_fuse]`)

- Builds `base` → `backend` → `frontend` (`gcs_fuse` optional). Backend build mounts
  `config/docker.env` as a build secret; the frontend build first runs a full
  `yarn build` in `standalone` config mode as validation, but the runtime image
  runs `next dev` (`docker/frontend.dockerfile` CMD).
- Rebuild whenever frontend/backend code **or** `docker.env` defaults change.
  A rebuild alone changes nothing at runtime — the image must then be pushed
  and the Cloud Run service pointed at the new tag (see Deploy below).

## Docker push (`yarn scripts docker push [--only backend,frontend]`)

- Pushes `:latest` + `:$BASE_TAG` for backend/frontend to
  `europe-west1-docker.pkg.dev/sami-website-365718/sami-website`
  (`useGCR = true` in `scripts/src/commands/docker/push.ts`).
- **Required before any Cloud Run deploy:** Cloud Run pulls from the registry,
  so a locally built tag is invisible to it until pushed. Needs docker login +
  `gcloud` auth for the artifact registry. Nothing in CI does this — it is manual.
- `yarn scripts docker run [--only backend|frontend]` starts the compose stack
  locally (profile-gated, `docker-compose.yml`).

## Deploying to Cloud Run (staging, manual)

- `sami-website-next` (frontend) and `sami-website-admin` (backend/Strapi).
  After pushing, update each service to the new image tag in the console
  (or `gcloud run services update`). No automation exists for this step.
- Full per-service contract — required env vars, mounts, image flow, and the
  `preview-webhook` gap — lives in `docs/staging.md`. Read it before touching
  service config. Short version: frontend needs `NEXT_CONFIG_MODE=standalone`
  - `NODE_ENV=development` (and no public-files volume mount); backend needs no
    changes for image rendering; never put `config/docker.env` placeholder secrets
    on Cloud Run.

## Production (for contrast, also manual-ish)

- The live site is a Vercel static export, deployed by `.github/workflows/preview.yml`
  on push to `main` (or manual `workflow_dispatch`). Strapi publishes do **not**
  auto-trigger it — content-only changes need a manual workflow run.
