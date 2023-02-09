const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
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
  // https://github.com/firebase/firebase-tools/issues/5421
  distDir: ".next",
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
