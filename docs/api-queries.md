# API Queries

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
