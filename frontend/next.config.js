const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// TODO - could also add NEXT_PUBLIC_API_DOMAIN
const domains = ["localhost", "storage.googleapis.com", "backend"];
const { NEXT_PUBLIC_API_URL } = process.env;

// Include external source if included within public api (e.g. google cloud run)
if (NEXT_PUBLIC_API_URL && NEXT_PUBLIC_API_URL.startsWith("https")) {
  domains.push(new URL(NEXT_PUBLIC_API_URL).host);
}

module.exports = withBundleAnalyzer({
  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  // NOTE - when running standalone process environment variables not included. Custom postbuild script
  // will replace any stringified process variables with container at runtime
  // https://github.com/vercel/next.js/issues/12269
  // https://github.com/vercel/next.js/issues/27865
  // https://raphaelpralat.medium.com/system-environment-variables-in-next-js-with-docker-1f0754e04cde
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: {
    scrollRestoration: true,
  },

  output: "export",

  images: {
    loader: "default",
    domains,
    unoptimized: true,
  },

  // Use for non-static deployments

  // output: "standalone",

  // images: {
  //   loader: "default",
  //   domains,
  // },

  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/home",
  //       permanent: true,
  //     },
  //   ];
  // },
});
