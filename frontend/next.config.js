const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,
  images: {
    loader: "default",
    // TODO - could also add NEXT_PUBLIC_API_DOMAIN
    domains: ["localhost", "storage.googleapis.com", "backend"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  // NOTE - when running standalone process environment variables not included. Custom postbuild script
  // will replace any stringified process variables with container at runtime
  // https://github.com/vercel/next.js/issues/12269
  // https://github.com/vercel/next.js/issues/27865
  // https://raphaelpralat.medium.com/system-environment-variables-in-next-js-with-docker-1f0754e04cde
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: "process.env.NEXT_PUBLIC_API_URL",
  },
  experimental: {
    scrollRestoration: true,
  },
  // Use if deploying to prod environment
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
});
