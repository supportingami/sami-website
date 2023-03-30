# Development Scripts

Various development scripts exist to facilitate various development tasks

Commands are located `scripts\src\commands`, and namespaced depending on type of task, and will often contain various subcommands

A list of all top-level commands can be seen via

```sh
yarn scripts
```

![](images/dev-scripts-cli-1.png)

Subcommands can then be interrogated in the same way, e.g.

```sh
yarn scripts strapi
```

![](images/dev-scripts-cli-2.png)

## Command List

<!-- Generated via yarn scripts docs cli -->
<!-- begin generated content -->

| name | description |
| ---- | ----------- |
| dev | Local development scripts |
| dev start | Start local development server |
| docs | Documentation generator tools |
| docs cli | Generate CLI docs |
| strapi | Strapi management scripts |
| strapi bootstrap | Bootstrap strapi for development |
| strapi config:export | Export strapi config |
| strapi export | Export strapi data |
| strapi import | Import strapi data |
| strapi types:generate | Generate types |
| wp | Wordpress management scripts |
| wp assets:extract | Extract WP assets to flat folder structure |

<!-- end generated content -->

## Troubleshooting

```
strapi boostrap
error: The port 1337 is already used by another application
```

Some strapi scripts like `data:export` create their own strapi instance and so can only be executed whilst the default server is not running (e.g. following `yarn start`)

```
strapi types:generate

✖ Failed to load schema
```

Other scripts require the main strapi instance to be running, i.e. via `yarn start`
