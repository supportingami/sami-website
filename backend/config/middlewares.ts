import { resolve } from "path";
import { BACKEND_DIR } from "./paths";

const dashboardRedirectPath = resolve(BACKEND_DIR, "src/middlewares/dashboard-redirect.ts");
console.log(dashboardRedirectPath);

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
    "strapi::security",

    // Custom redirect middleware
    {
      name: "global::dashboard-redirect",
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
