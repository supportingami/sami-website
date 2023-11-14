module.exports = ({ env }) => {
  // default allow script and images hosted on any https domain as well as
  // http self-hosted domains
  const srcs = ["'self'", "https:"];
  const hostDomain = env("STRAPI_DOMAIN");
  if (hostDomain) {
    srcs.push(hostDomain);
  }
  const subDomain = env("STRAPI_SUBDOMAIN");
  if (subDomain) {
    srcs.push(`${subDomain}.${hostDomain}`);
  }
  return [
    "strapi::errors",
    // Required for https://github.com/Baboo7/strapi-plugin-import-export-entries
    {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            "script-src": ["'self'", "cdn.jsdelivr.net", "blob:", "googleusercontent.com"],
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
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};
