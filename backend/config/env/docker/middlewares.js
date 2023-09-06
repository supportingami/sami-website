// https://github.com/strapi/strapi/issues/11637

module.exports = ({ env }) => {
  const srcs = ["'self'", "https:"];
  const hostDomain = env("STRAPI_HOST");
  if (hostDomain) {
    srcs.push(hostDomain);
  }
  const subDomain = env("STRAPI_SUBDOMAIN");
  if (subDomain) {
    srcs.push(`${subDomain}/${hostDomain}`);
  }
  console.log({ srcs });
  return [
    "strapi::errors",
    {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            "connect-src": srcs,
            "img-src": ["'self'", "data:", "blob:"],
            "media-src": ["'self'", "data:", "blob:"],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    // Custom redirect to redirect / -> /dashboard
    { resolve: "./src/middlewares/dashboard-redirect" },
    "strapi::cors",
    "strapi::poweredBy",
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    "strapi::favicon",
    "strapi::public",
  ];
};
