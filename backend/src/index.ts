import { registerImageManipulation } from "./services/image-manipulation";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register({ strapi }: { strapi: any }) {
    registerImageManipulation(strapi);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  bootstrap(/*{ strapi }*/) {},
};

