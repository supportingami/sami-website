// NOTE - rebuild required after any config changes

module.exports = ({ env }) => {
  const serverConfig = {
    host: env("STRAPI_HOST", "0.0.0.0"),
    port: env.int("STRAPI_PORT", 1337),
    app: {
      keys: env.array("APP_KEYS"),
    },
  };
  const subdomain = env("STRAPI_SUBDOMAIN");
  if (subdomain) {
    serverConfig.url = subdomain;
  }
  console.log({ serverConfig });
  return serverConfig;
};
