// redirect home page to /dashboard
module.exports = (_config, { strapi }) => {
  const redirects = ["/", "/index.html"].map((path) => ({
    method: "GET",
    path,
    handler: (ctx) => ctx.redirect("/dashboard"),
    config: { auth: false },
  }));

  strapi.server.routes(redirects);
};
