# Deployment

## Backend

The backend stack is deployed as 3 micro-entities to allow for efficient runtime costs and scaling

1. Database
   This is hosted on GCP via elephantsql to allow use of their free tier

2. File storage
   Hosted on google cloud storage

3. Strapi Server
   Hosted on google cloud run

## Stack Deployment

**Prerequisites**

[Pulumi](https://www.pulumi.com/docs/get-started/install/)
[Docker](https://www.docker.com/products/docker-desktop/)

```
gcloud auth login
gcloud auth configure-docker europe-west2-docker.pkg.dev
```

```
yarn workspace ci deploy
```

0. Teardown/export old resources (?)
1. Provision GCP Resources
2. Upload frontend

Pulumi

https://www.pulumi.com/docs/guides/organizing-projects-stacks/

```
pulumi console
```

```
pulumi config
```

## Frontend

```
npm i -g firebase-tools
```

```
firebase deploy --debug
```

Note - if deploying on windows may need to manually edit code
https://github.com/firebase/firebase-tools/issues/5369

## Troubleshooting

```
pulumi up --verbose 9 --logtostderr
```

NOTE - `package-lock.json` must be present

## Alternate options

Render backend with sqlite db
https://github.com/render-examples/strapi-sqlite

Alternatively a single vm could run all components together in a single docker container
