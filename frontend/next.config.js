const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withExportImages = require("next-export-optimize-images");

const { NEXT_PUBLIC_API_URL } = process.env;

/**
 * Shared config used on both export and standalone builds
 * @type {import('next').NextConfig}
 **/
const commonConfig = {
  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  // Config available to all environments via `process.env`
  env: {
    example: "env",
  },
  // Config available to frontend components via `getConfig().publicRuntimeConfig`
  publicRuntimeConfig: {
    example: "publicRuntimeConfig",
    NEXT_PUBLIC_API_URL,
  },
  // Config available to frontend components via `getConfig().serverRuntimeConfig`
  serverRuntimeConfig: {
    example: "serverRuntimeConfig",
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    // avoid optimising images for larger hd devices (bandwidth intense)
    // and add more smaller width options
    deviceSizes: [375, 480, 640, 750, 828, 1080, 1200, 1920],
  },
};

/***********************************************************************************
 * Static Site Export
 * Configuration used when creating static build (no NextJS server)
 *
 * Some features unsupported (e.g. image optimisation and redirects) *
 * https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#unsupported-features
 ***********************************************************************************/

/**
 * Configuration changes for static-site export
 * Image optimization handled with plugin https://next-export-optimize-images.vercel.app/
 * (config loaded using local export-images.config.js)
 * Redirects managed at server level (e.g. vercel.json)
 * */
const exportConfig = withExportImages({
  ...commonConfig,
  output: "export",
  publicRuntimeConfig: {
    // All images will be loaded from set of local folders
    NEXT_PUBLIC_IMAGE_URL: "",
  },
});

// TODO - could also add NEXT_PUBLIC_API_DOMAIN
const domains = ["localhost", "storage.googleapis.com", "backend"];
// Include external source if included within public api (e.g. google cloud run)
if (NEXT_PUBLIC_API_URL && NEXT_PUBLIC_API_URL.startsWith("https")) {
  domains.push(new URL(NEXT_PUBLIC_API_URL).host);
}

/***********************************************************************************
 * Standalone Build
 * Configuration used when assumed running on a NextJS server
 * (e.g. local development, staging site)
 *
 * Full NextJS functionality supported
 ***********************************************************************************/

const standaloneConfig = withBundleAnalyzer({
  ...commonConfig,
  output: "standalone",
  images: {
    loader: "default",
    domains,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  //  NOTE - when running standalone process environment variables not included. Custom postbuild script
  // will replace any stringified process variables with container at runtime
  // https://github.com/vercel/next.js/issues/12269
  // https://github.com/vercel/next.js/issues/27865
  // https://raphaelpralat.medium.com/system-environment-variables-in-next-js-with-docker-1f0754e04cde
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL,
    // Load all images from the api
    NEXT_PUBLIC_IMAGE_URL: NEXT_PUBLIC_API_URL,
  },
});

/** Use a custom NEXT_CONFIG_MODE environment variable to specify 'export' or 'standalone' */
const config = process.env.NEXT_CONFIG_MODE === "export" ? exportConfig : standaloneConfig;
console.log(`NextJS will run in ${config.output} mode`);

module.exports = withBundleAnalyzer(config);
