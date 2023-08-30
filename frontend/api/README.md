## Vercel API Functions

**Why are they here?**
To deploy directly to vercel serverless functions and use with a static export

**Aren't they the same as the nextJs `app/api` folder**
Not quite, next static exports support "Route Handlers" which expose individual methods for GET, POST, etc. wherease Vercel serverless support a single handler for all methods.

So essentially all api methods need to be duplicated (or share code across 2 separate handlers)

**Why not just use pages api and deploy to vercel as a next app?**
Although the pages api supports single handlers, these are not supported with static exports.

Confusingly there are 3 slightly different formats for functions with different overlaps for compatibility
https://vercel.com/docs/functions/serverless-functions/quickstart#create-a-serverless-function

The only way (currently) to allow build of nextJS app with access to strapi is to build locally as "other" framework, which necessitates

**Why mjs instead of ts**
If using typescript vercel will compile locally before deploying.
Despite saying that local tsconfig and package.json used to detect compiler settings, it seems to compile js in esm module format but deploy as commonjs. Using mjs forces no compilation.

If wanting to use ts, will need to manually update vercel output to run functions as esm.
This can be done by updating the `.vercel/output/functions/package.json` to include `type:"module"` or rename all output .js -> .mjs and update `.vc-config.json` mappings

**Do they support formdata body**
Possibly, but even following threads like those below I haven't been able to get them to work
https://github.com/vercel/next.js/discussions/36153
https://vercel.com/guides/how-do-i-get-the-raw-body-of-a-serverless-function

**Can I use 3rd party dependencies with functions**
Not easily, better to manually inline code where possible. Otherwise will likely need to manually compile function builds with the 3rd party dependencies inlined, or include postbuild to populate custom package.json

**How can I bundle them**
Will need additional tooling such as webpack, turbopack, esbuild or tsup
