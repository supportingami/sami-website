import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = "Plugin Loaded";
    // ctx.body = strapi.plugin("sami-admin").service("myService").getWelcomeMessage();
  },
  // async deploy(ctx) {
  //   ctx.body = await strapi.plugin("sami-admin").service("myService").deploy();
  // },
});