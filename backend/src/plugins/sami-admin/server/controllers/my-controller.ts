import type { Core } from "@strapi/types";

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    ctx.body = "Plugin Loaded";
    // ctx.body = strapi.plugin("sami-admin").service("myService").getWelcomeMessage();
  },
  // async deploy(ctx) {
  //   ctx.body = await strapi.plugin("sami-admin").service("myService").deploy();
  // },
});
