"use strict";

/**
 * dynamic-content router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::dynamic-content.dynamic-content");
