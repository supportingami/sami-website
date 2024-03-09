import { resolve } from "path";
import { ROOT_DIR } from "./paths";

// NOTE - rebuild required after any config changes
export default ({ env }) => {
  const serverConfig: any = {
    host: env("STRAPI_HOST", "0.0.0.0"),
    port: env.int("STRAPI_PORT", 1337),
    app: {
      keys: env.array("APP_KEYS"),
    },
    dirs: {
      public: env("STRAPI_PUBLIC_DIR", resolve(ROOT_DIR, "data", "public")),
    },
  };
  const url = getServerUrl(env);
  if (url) {
    serverConfig.url = url;
  }
  return serverConfig;
};

/**
 * Get public url configuration
 * https://docs.strapi.io/dev-docs/configurations/server
 * */
function getServerUrl(env) {
  const domain = env("STRAPI_DOMAIN", "localhost");
  const protocol = env("STRAPI_PROTOCOL", "https");

  // Subfolder, e.g. https://sami.local/admin
  const subFolder = env("STRAPI_SUBFOLDER", "");
  if (subFolder) {
    return `${protocol}://${domain}${subFolder}`;
  }

  // Subdomain, e.g. https://admin.sami.local
  const subdomain = env("STRAPI_SUBDOMAIN", "");
  if (subdomain) {
    return `${protocol}://${subdomain}.${domain}`;
  }
}
