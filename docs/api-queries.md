# API Queries

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
