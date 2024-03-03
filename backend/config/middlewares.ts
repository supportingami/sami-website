export default ({ env }) => {
  // default allow script and images hosted on any https domain as well as
  // http self-hosted domains
  const srcs = ["'self'", "https:", "googleusercontent.com", "storage.googleapis.com", "cdn.jsdelivr.net"];
  const hostDomain = env("STRAPI_DOMAIN");
  if (hostDomain) {
    srcs.push(hostDomain);
  }
  const subDomain = env("STRAPI_SUBDOMAIN");
  if (subDomain) {
    srcs.push(`${subDomain}.${hostDomain}`);
  }
  return [
    "strapi::logger",
    "strapi::errors",

    // Required for https://github.com/Baboo7/strapi-plugin-import-export-entries
    {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            "script-src": ["'self'", "blob:"],
            "connect-src": srcs,
            "img-src": [...srcs, "data:", "blob:"],
            "media-src": [...srcs, "data:", "blob:"],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    "strapi::cors",
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};
