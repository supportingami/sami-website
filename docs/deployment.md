# Deployment

## Main Site

The main website is setup to build and export as a static site, so that it can be hosted on any hosting platform without need for additional server infrastructure (e.g. Database, Cloud Functions)

First, any content from the staging site should be imported locally

```sh
yarn scripts strapi import
```

Then there is e a single script that handles the process of generating static content, (optionally) preview locally, and upload to Vercel hosting platform

```sh
yarn build
```

## Staging Site

A secondary staging site is setup to run a live strapi server and allow authors to add content and see live changes

**TODO** - Link with docs below to explain how to deploy

# Old Docs (To Review)

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
