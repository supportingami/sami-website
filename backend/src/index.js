"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    /**
     * Example - disable graphql for endpoint
     * https://docs.strapi.io/developer-docs/latest/plugins/graphql.html#customization
     **/
    // const extensionService = strapi.plugin("graphql").service("extension");
    // extensionService.shadowCRUD("api::restaurant.restaurant").disable();
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
