# Troubleshooting

`TypeError: Cannot read properties of undefined (reading 'singularName')`
This error can appear if you create a database table and then either swap to a branch that doesn't have the schema or attempt to manually delete.

It can be fixed by manually deleting the empty folder left for the table at `backend/src/api`
