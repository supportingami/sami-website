// redirect / home to dashboard /admin
module.exports = (_config, { strapi }) => {
  const baseUrl = process.env.STRAPI_SUBFOLDER || "";
  const endpoint = process.env.STRAPI_ADMIN_SUFFIX || "/admin";
  const redirects = [`/`, `/index.html`].map((path) => ({
    method: "GET",
    path,
    handler: (ctx) => ctx.redirect(`${baseUrl}${endpoint}`),
    config: { auth: false },
  }));
  strapi.server.routes(redirects);
};
