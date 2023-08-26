const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_IMAGE_URL } = process.env;

const standaloneConfig = withBundleAnalyzer({
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
    NEXT_PUBLIC_IMAGE_URL,
  },
  // Config available to frontend components via `getConfig().serverRuntimeConfig`
  serverRuntimeConfig: {
    example: "serverRuntimeConfig",
  },
  experimental: {
    scrollRestoration: true,
  },
  output: "export",
  images: {
    loader: "default",
    unoptimized: true,
  },
});

// TODO - could also add NEXT_PUBLIC_API_DOMAIN
const domains = ["localhost", "storage.googleapis.com", "backend"];
// Include external source if included within public api (e.g. google cloud run)
if (NEXT_PUBLIC_API_URL && NEXT_PUBLIC_API_URL.startsWith("https")) {
  domains.push(new URL(NEXT_PUBLIC_API_URL).host);
}

// Legacy config used when attempting to deploy as microservices
const dockerBuildConfig = withBundleAnalyzer({
  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  experimental: {
    scrollRestoration: true,
  },
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
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});

module.exports = withBundleAnalyzer(standaloneConfig);
