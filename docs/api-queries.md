# API Queries

Queries can be made to the database to populate data

## Query Syntax

Database queries are written in graphql syntax and stored in [frontend/queries](https://github.com/supportingami/sami-website/tree/main/frontend/queries).

An example of a query for members might be

```graphql
# Use GraphQL to extract data from the datbase
# This is comparable to SQL
# `SELECT Name, Email from members`
query members {
  # table to query
  members {
    # return from query data
    data {
      # primary key to use
      id
      # what fields to return
      attributes {
        Name
        Email
      }
    }
    # return from query meta
    meta {
      pagination {
        page
        pageSize
        total
        pageCount
      }
    }
  }
}
```

Queries can be compiled for use in typescript code via:

```
yarn generate
```

This will populate query objects and response types to the `frontend/graphql/generated` folder. These can be used to query the server from a frontend page

E.g. Using the _Members_ query defined above to get a list of members, populated with their Name and Email, and merged with their database id

```ts
import { MembersQuery, MembersDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  let members: IMember[] = [];
  const res = await serverQuery<MembersQuery>(MembersDocument);
  if (res) {
    members =
      res.data.members.data.map((m) => ({ ...m.attributes, id: m.id })) || [];
  }
```

When writing queries autocomplete will be available if recommended plugins have been installed (vscode should auto-prompt from list in `.vscode\extensions.json`)

![](images/query-autocomplete.png)

If the database schema is updated by creating new collections or columns in strapi, the auto-complete checking can also be updated via the same command to generate graphql definitions

```
yarn generate
```

## Authentication

Depending on whether request is being made server-side or client-side authentication will differ

### Server-side

**Using API tokens**

API tokens can be generated and used when making requests from the frontend server.
These can manually be generated from the admin panel and populated to the frontend env, or automatically via the script:

```
yarn scripts strapi bootstrap
```

This will generate a new admin readonly token and populate to `frontend/.env.local`

```
STRAPI_READONLY_TOKEN=my_generated_api_token
```

- Optionally assign in [graphql playground](http://localhost:1337/graphql) `HTTP Headers`

```
{
    "Authorization": "Bearer my_generated_api_token
}
```

### Clientside-side

**Using session tokens**

- (TODO)

**Making endpoints public**

- (TODO)

## Graphql Query Syntax

Example to query all members, returning the `Name` attribute

```

query {
    members {
        data {
            id
            attributes {
                Name
            }
        }
        meta {
            pagination {
                page
                pageSize
                total
                pageCount
            }
        }
    }
}

```

NOTE! - Will only return published data

https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/graphql-api.html#unified-response-format
