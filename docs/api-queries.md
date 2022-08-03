# API Queries

Queries can be made to the database to populate data

## Query Syntax

Queries are written in graphql syntax. They can be compiled for use in typescript code via:

```
yarn generate
```

When writing queries autocomplete will be available if recommended plugins have been installed (vscode should auto-prompt from list in `.vscode\extensions.json`)

![](images/query-autocomplete.png)

If the database schema is updated by creating new collections or columns in strapi, the auto-complete checking can also be updated via the same command to generate graphql definitions

```
yarn generate
```

You can see existing queries in [./frontend/queries](https://github.com/supportingami/sami-website/tree/main/frontend/queries)

## Authentication

Depending on whether request is being made server-side or client-side authentication will differ

### Server-side

**Using API tokens**

- Generate from admin panel
- Create a file in frontend `frontend/.env.local`
- Populate as environment variable

```
STRAPI_API_TOKEN=my_generated_api_token
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
