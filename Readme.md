## Overview

**🚧 Under Development**  
This will be the repo to support the new SAMI website

## Requirements

1. [Node.js](https://nodejs.org/) v22+
2. [yarn](https://yarnpkg.com/getting-started/install)

## Installation

### 1. Clone the application

```sh
git clone https://github.com/supportingami/sami-website
```

Checkout files stored with git large file system

```sh
git lfs checkout
```

### 2. Install necessary dependencies for the frontend application

```sh
yarn install
```

### 3. Create access token and admin user for the backend

```sh
yarn scripts strapi bootstrap
```

### 4. Import data

```sh
yarn scripts strapi import
```

### 5. Start the backend and frontend

```sh
yarn start
```

This will run both backend and frontend serve scripts

Backend: http://localhost:1337/admin
Frontend: http://localhost:3000

### 6. Authorize data

Any endpoints that are not publically accessible will not be available to the frontend unless a api token is generated and populated.

See instructions in [docs/api-queries.md](docs\api-queries.md)

## Tech Stack

The system is built on top of [NextJS](https://nextjs.org/), with a database backend and content management system powered by [Strapi](https://strapi.io/)

If you are new to either project it is recommended to first familiarise yourself with the introduction and welcome tutorials for both packages

[NextJS Introduction](https://nextjs.org/learn/foundations/about-nextjs)
[Strapi Introduction](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html)

### Libraries

Additional technologies used within the frontend code

1. [Chakra UI](https://chakra-ui.com/)
2. [Emotion](https://emotion.sh/)
3. [GraphQL](https://graphql.org/)
4. [Apollo](https://www.apollographql.com/)
5. [NextAuth](https://next-auth.js.org/)
6. [TypeScript](https://www.typescriptlang.org/)

## Links and Resources

- https://nextjs.org/learn/foundations/about-nextjs
- https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html
- https://github.com/strapi/starters-and-templates/tree/main/packages/starters/next-blog
- https://www.apollographql.com/docs/react/get-started/

Adapted from [nextjs-strapi-boilerplate](https://github.com/ghoshnirmalya/nextjs-strapi-boilerplate)
