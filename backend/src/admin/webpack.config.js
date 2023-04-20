"use strict";

// WARNING: the admin panel now uses webpack 5 to bundle the application.

module.exports = (config, webpack) => {
  // CC 2023-04-19 Fix
  config.resolve.fallback = {
    util: require.resolve("util"),
  };
  return config;
};
