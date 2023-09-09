"use strict";

/**
 * dynamic-content service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::dynamic-content.dynamic-content");
