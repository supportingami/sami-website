# Deployment

## Main Site

The main website is setup to build and export as a static site, so that it can be hosted on any hosting platform without need for additional server infrastructure (e.g. Database, Cloud Functions)

Then there is e a single script that handles the process of generating static content, (optionally) preview locally, and upload to Vercel hosting platform

First you may wish to replicate current production data into local environment

```sh
yarn scripts strapi export --environment docker
yarn scripts strapi import --environment development

```

Then build can be initiated by

```sh
yarn scripts cli build --environment development --no-export
```

## Staging Site

A standalone deployment is made to enable the use of strapi dashboard online, and preview the results in a next server also running online.

The frontend and backend are built as docker images and hosted in Google Cloud Run containers

```sh
yarn scripts docker build
yarn scripts docker push
```

Should then manually update on Google Cloud run to create a new deployment with the latest images

**Backend**

- strapi server containerized and deployed to google cloud run
- sqlite db persisted by writing to file on GCS
- file uploads persisted by writing to folder on GCS
- GCS files bound to server using GCS Fuse, configured within `server.yaml`

  NOTE - GCS volume binding not currently available from cloud run service page. Instead must export service yaml and update accordingly. E.g.

```yaml
volumeMounts:
  - name: db
    mountPath: /app/data/db
  - name: public
    mountPath: /app/data/public
```

```yaml
volumes:
  - name: db
    csi:
      driver: gcsfuse.run.googleapis.com
      volumeAttributes:
        bucketName: sami_website_db
  - name: public
    csi:
      driver: gcsfuse.run.googleapis.com
      volumeAttributes:
        bucketName: sami_website_public
```

```yaml
run.googleapis.com/launch-stage: BETA
```

Deploy via

```sh
gcloud run services replace service.yaml
```

(TODO - pulumi config to automate process)

**Write Conflicts**
SQLite has support for concurrent writes, implementing file-locking and a write-ahead-log to prevent conflicts in cases where multiple users are interacting with the same db file
https://www.reddit.com/r/sqlite/comments/ztzbki/sharing_a_db_file_with_separate_docker_containers/
https://www.sqlite.org/walformat.html

If deploying to Google Cloud Run then it is possible for multiple applications to run concurrently, interacting with the same cloud storage sqlite file, although it is possible for write operations to conflict in which case newest write wins
https://github.com/GoogleCloudPlatform/gcsfuse/blob/master/docs/semantics.md#readwrites

A simple solution would be to limit the number of cloud run instances to max 1.
A more scalable and resilient solution could potentially be implemented via litefs
https://github.com/superfly/litefs
https://fly.io/docs/litefs/getting-started-docker/
https://fly.io/blog/wal-mode-in-litefs/

This should be automatically handled by SQLite and GCSFuse
When writing files SQLite locks the

**Debugging Locally**
In order to replicate the setup used by Google Cloud Run the local user must have a way to bind data folder to GCS bucket.
This is managed using GCSFuse, which is natively available within the GCR environment (configured with service account credentials), or can manually be configured locally

Local support is only available for linux, so if running on Windows it is technically possible to use a docker container to create shared volumes accessible to the backend and local, and replicated to GCS, however this loses some of the file-locking mechanisms that prevents simultaneous writes (and so not fit for production environment).

Instead it is better to include GCSFuse support directly within the container image

**Debugging Deployment**
If container starts up there should be relevant info stored in cloud logging.
If container cannot start then should first confirm everything running locally and that provided environment matches local docker-compose environment. It might be possible to debug via ssh (although not really recommended).
https://www.varstack.com/2022/06/04/Cloud-Run-SSH/

**TODO**

- Consider using https://github.com/strapi-community/strapi-tool-dockerize
- # Consider modifying and pushing to https://github.com/strapi-community/strapi-tool-deployify

# Old Docs (To Review)

## Staging Site

A secondary staging site is setup to run a live strapi server and allow authors to add content and see live changes

Frontend and backend servers are managed using [pm2](https://pm2.keymetrics.io/docs).

```sh
npm i -g pm2
```

The repo should be cloned to the server, and created/recreated as required via

```sh
pm2 delete all; pm2 start pm2.config.js
```

Processes can be monitored via `pm2 logs` or `pm2 monit` commands

### Reverse Proxy

## Backend

The backend stack is deployed as 3 micro-entities to allow for efficient runtime costs and scaling

1. Database
   This is hosted on GCP via elephantsql to allow use of their free tier

2. File storage

3. Strapi Server

## Stack Deployment

**Prerequisites**

[Pulumi](https://www.pulumi.com/docs/get-started/install/)
[Docker](https://www.docker.com/products/docker-desktop/)

```
cd ci
npm i
pulumi up
```

0. Teardown/export old resources (?)
1. Provision GCP Resources
2. Upload frontend

Pulumi

https://www.pulumi.com/docs/guides/organizing-projects-stacks/

```
pulumi console
```

## Frontend

Vercel

## Troubleshooting

```
pulumi up --verbose 9 --logtostderr
```

NOTE - `package-lock.json` must be present

## Alternate options

Render backend with sqlite db
https://github.com/render-examples/strapi-sqlite

Alternatively a single vm could run all components together in a single docker container
