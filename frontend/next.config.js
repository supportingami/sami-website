//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require("@nrwl/next/plugins/with-nx");

const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["localhost", "storage.googleapis.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  experimental: {
    scrollRestoration: true,
  },

  // HACK - default is local .next folder, however firebase needs explicitly defined (???)
  // https://github.com/firebase/firebase-tools/issues/5421
  // can self-assign if planning to use firebase's only deploy method instead of custom
  // distDir: "../.next",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  // Support for standalone server hosting
  // https://nextjs.org/docs/advanced-features/output-file-tracing
  // output: "standalone",
  // distDir: "dist",
};

module.exports = withNx(withBundleAnalyzer(nextConfig));
