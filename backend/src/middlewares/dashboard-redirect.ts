import type { Core } from "@strapi/types";

/**
 * Redirect / to dashboard admin page (e.g. /admin or /dashboard)
 * https://stackoverflow.com/a/71981103/5693245
 */
export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    if (ctx.path === "/") {
      ctx.redirect(strapi.config.get("server.admin.url", "/admin"));
      return;
    }
    await next();
  };
};
