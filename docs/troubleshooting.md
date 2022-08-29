# Troubleshooting

`TypeError: Cannot read properties of undefined (reading 'singularName')`
This error can appear if you create a database table and then either swap to a branch that doesn't have the schema or attempt to manually delete.

It can be fixed by manually deleting the empty folder left for the table at `backend/src/api`

`Uncaught Error: Response not successful: Received status code 401 at new ApolloError`
This is an error seen at runtime when fetching data from the server. Make sure your strapi account has an access token attached to it by routing to Settings on your admin dashboard and choosing API Token. 