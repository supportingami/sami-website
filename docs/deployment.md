# Deployment

## Backend

The backend stack is deployed as 3 micro-entities to allow for efficient runtime costs and scaling

1. Database
   This is hosted on GCP via elephantsql to allow use of their free tier

2. File storage

3. Strapi Server

## Stack Deployment

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
