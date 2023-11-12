import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin("sami-website-deploy").service("myService").getWelcomeMessage();
  },
  async deploy(ctx) {
    ctx.body = await strapi.plugin("sami-website-deploy").service("myService").deploy();
  },
});
