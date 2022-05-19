## Overview

**🚧 Under Development**  
This will be the repo to support the new SAMI website

---

Adapted from [nextjs-strapi-boilerplate](https://github.com/ghoshnirmalya/nextjs-strapi-boilerplate)

This boilerplate is built using the following technologies:

1. [Chakra UI](https://chakra-ui.com/)
2. [Emotion](https://emotion.sh/)
3. [GraphQL](https://graphql.org/)
4. [Apollo](https://www.apollographql.com/)
5. [NextAuth](https://next-auth.js.org/)
6. [TypeScript](https://www.typescriptlang.org/)

It supports GraphQL Query and Mutation out of the box.

## Requirements

1. [Node.js](https://nodejs.org/)
2. [npm](https://www.npmjs.com/)
3. [Docker](https://www.docker.com/)

## Packages

### 1. [**Frontend**](https://github.com/ghoshnirmalya/nextjs-strapi-boilerplate/tree/master/frontend): Next.js application

This application is the primary user-facing application. Once it’s up and running (see Development section), it’s available on http://localhost:3000/.

## Installation

### 1. **Clone the application**

```sh
git clone https://github.com/supportingami/sami-website
```

### 2. **Install necessary dependencies for the frontend application**

```sh
yarn install
```

### 3. **Create a .env file and copy the contents from .env.example (present in frontend directory)**

We might need to run the following command:

```sh
cp frontend/.env.example .env
```

### 4. **Create and copy the Google client credentials**

Create a new [Google OAuth Client](https://console.developers.google.com/apis/credentials/oauthclient) and copy the credentials (Client ID and Client Secret) in your .env file.

### 5. **Start the frontend application**

From the frontend directory, we can run the following command to start our Next.js frontend application:

```sh
yarn dev
```

The above command will start the frontend application on [http://localhost:3000/](http://localhost:3000).

### 7. **Start docker-compose**

```sh
yarn start:backend
```

We need to start Docker and then run the above command which will change the current directory to the backend package’s directory and then start the backend package. If everything goes well, it’ll be up and running on [http://localhost:1337/graphql](http://localhost:1337/graphql).

### 8. **Configure Strapi**

a. Allow permissions for all operations on the Feed content-type for Authenticated users.

![Authenticated user role](https://user-images.githubusercontent.com/6391763/91742056-40711100-ebd3-11ea-8430-2e09016901ad.png)

![Allow permissions for all operations on the Feed content-type for Authenticated users](https://user-images.githubusercontent.com/6391763/91742068-449d2e80-ebd3-11ea-9830-df26a3bbfed6.png)

b. Allow permissions for all operations on the Feed content-type for Authenticated users as well.

![Allow permissions for all operations on the Feed content-type for Authenticated users as well](https://user-images.githubusercontent.com/6391763/91742071-45ce5b80-ebd3-11ea-8345-abdbf52c7e41.png)

c. Enable the Google provider.

![Enable the Google provider](https://user-images.githubusercontent.com/6391763/91742074-46ff8880-ebd3-11ea-82c8-5a08e3ecf3de.png)

![Enable informations for the Google provider](https://user-images.githubusercontent.com/6391763/91742078-47981f00-ebd3-11ea-97e4-9cd8c2a27f05.png)

d. Click on the "Done" button and now we can log into our Next.js application using our Google account.

## Deployment

### Frontend application

Click on the button below to deploy the frontend application on Vercel. You'll need to [sign up for a free Vercel account](https://vercel.com/signup/).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2Fghoshnirmalya%2Fnextjs-strapi-boilerplate%2Ftree%2Fmaster%2Ffrontend&env=NEXT_PUBLIC_API_URL,NEXT_PUBLIC_DATABASE_URL,NEXTAUTH_URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET&project-name=nextjs-strapi-boilerplate&repo-name=nextjs-strapi-boilerplate)

## License

This project code is licensed under the [MIT License](https://opensource.org/licenses/MIT).

The project content is licensed under [CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/)

## Links and Resources

- https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html
- https://github.com/strapi/starters-and-templates/tree/main/packages/starters/next-blog

## WiP - Tech Stack Decisions

### Style system

Template comes with chakra-ui, but may want to consider tailwind

### CMS

We need a content management system as a means of separating data that a developer will interact with and data that an author will interact with. This should allow authors to easily add things like new blog posts, and also enable provide linkages across data such as sami's projects, countries, people etc. This will allow richer experiences such as auto-updated map of upcoming maths camps

Strapi vs Santity vs others...
Likely opt for strapi as most starred and open source. Also interested in Ghost which could be linked with some of the content perhaps
More available at https://jamstack.org/headless-cms/

### DB

Strapi supports sql and mongo, will likely stick to postgres as more widely known/used and stronger external integrations.

This will likely be hosted in a docker container, but could also leverage google cloud sql if that provides easier management/better dev experience

### Additional Integrations

We may want to consider something like shopify/stripe if planning to include shop component
