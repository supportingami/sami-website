// https://github.com/strapi-community/strapi-provider-upload-google-cloud-storage#setting-up-strapisecurity-middlewares-to-avoid-csp-blocked-url
module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "storage.googleapis.com"],
          "media-src": ["'self'", "data:", "blob:", "storage.googleapis.com"],
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
  "strapi::favicon",
  "strapi::public",
];
