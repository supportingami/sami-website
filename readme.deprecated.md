TODO - Legacy docs to be migrated

## Packages

### 1. [**Frontend**](https://github.com/ghoshnirmalya/nextjs-strapi-boilerplate/tree/master/frontend): Next.js application

This application is the primary user-facing application. Once it’s up and running (see Development section), it’s available on http://localhost:3000/.

<!-- ### 4. **Create and copy the Google client credentials**

Create a new [Google OAuth Client](https://console.developers.google.com/apis/credentials/oauthclient) and copy the credentials (Client ID and Client Secret) in your .env file. -->

### 5. **Start the frontend application**

From the frontend directory, we can run the following command to start our Next.js frontend application:

```sh
yarn dev
```

The above command will start the frontend application on [http://localhost:3000/](http://localhost:3000).

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
