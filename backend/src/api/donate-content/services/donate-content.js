"use strict";

/**
 * donate-content service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::donate-content.donate-content");
