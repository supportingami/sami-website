// NOTE - rebuild required after any config changes
module.exports = ({ env }) => ({
  host: env("STRAPI_HOST", "0.0.0.0"),
  port: env.int("STRAPI_PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  // url: 'http://localhost:1337/strapi/'
});
