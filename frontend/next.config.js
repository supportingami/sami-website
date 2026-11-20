const path = require("path");

const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_IMAGE_URL } = process.env;

// default fallback image to api url

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

  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ["react-icons", "react-share"],
  },
  images: {
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [96, 128, 256, 384],
    formats: ["image/webp"],
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
const exportConfig = async () => {
  const withExportImages = require("next-export-optimize-images");
  // NOTE - withExportImages v4 is async so must be awaited to resolve
  // (async function config supported since Next.js 12.1)
  return withExportImages({
    ...commonConfig,
    output: "export",
  });
};

// TODO - could also add NEXT_PUBLIC_API_DOMAIN
const domains = ["localhost", "storage.googleapis.com", "backend"];
// Include external source if included within public api (e.g. google cloud run)
if (NEXT_PUBLIC_API_URL && NEXT_PUBLIC_API_URL.startsWith("http")) {
  domains.push(new URL(NEXT_PUBLIC_API_URL).hostname);
}
if (NEXT_PUBLIC_IMAGE_URL && NEXT_PUBLIC_IMAGE_URL.startsWith("http")) {
  domains.push(new URL(NEXT_PUBLIC_IMAGE_URL).hostname);
}

/***********************************************************************************
 * Standalone Build
 * Configuration used when assumed running on a NextJS server
 * (e.g. local development, staging site)
 *
 * Full NextJS functionality supported
 ***********************************************************************************/

const standaloneConfig = async () => {
  // The image component runtime (`next-export-optimize-images/image`, used by
  // ResponsiveImage) requires a resolved copy of export-images.config.js inside
  // node_modules. That copy is written as a side effect of withExportImages()
  // when next.config loads, so invoke it here (discarding the wrapped export
  // config) to keep the runtime working in standalone mode.
  const withExportImages = require("next-export-optimize-images");
  await withExportImages({
    ...commonConfig,
    output: "export",
  });
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });
  return withBundleAnalyzer({
    ...commonConfig,
    output: "standalone",
    images: {
      ...commonConfig.images,
      loader: "default",
      // NOTE - `domains` deprecated in Next.js 16 in favour of `remotePatterns`
      remotePatterns: domains.flatMap((hostname) => [
        { protocol: "http", hostname },
        { protocol: "https", hostname },
      ]),
    },
    async redirects() {
      return [
        {
          source: "/home",
          destination: "/",
          permanent: true,
        },
      ];
    },
    /**
     * Proxy upload requests to the backend instead of serving them from a
     * shared volume. The backend is the single writer (read-write) while the
     * frontend needs no upload files of its own (effectively read-only), so
     * baked frontend assets (fonts, images, robots.txt) can never be shadowed
     * by an overlay mount, and newly uploaded media resolves immediately with
     * no local copy step. Standalone/dev only; static export bakes uploads.
     */
    async rewrites() {
      // Explicit backend origin for server-to-server requests (e.g. docker
      // compose service name), otherwise reuse the public API url
      const backendUrl = (process.env.BACKEND_URL || NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
      if (!backendUrl) return [];
      return [{ source: "/uploads/:path*", destination: `${backendUrl}/uploads/:path*` }];
    },
    //  NOTE - when running standalone process environment variables not included. Custom postbuild script
    // will replace any stringified process variables with container at runtime
    // https://github.com/vercel/next.js/issues/12269
    // https://github.com/vercel/next.js/issues/27865
    // https://raphaelpralat.medium.com/system-environment-variables-in-next-js-with-docker-1f0754e04cde
  });
};

/**
 * Use a custom NEXT_CONFIG_MODE environment variable to specify 'export' or 'standalone'
 * - `export` (default): static-site export, images optimised at build time via
 *   next-export-optimize-images (used for production builds and CI)
 * - `standalone`: run on a NextJS server with on-demand image optimisation
 *   (used for local development and the staging/preview server, where the
 *   export-image optimiser CLI never runs so `/_optimized` urls would 404)
 * Exported as an async function (supported since Next.js 12.1) to ensure the
 * async withExportImages wrapper is fully resolved before use
 **/
module.exports = async () => {
  if (process.env.NEXT_CONFIG_MODE === "standalone") {
    console.log("NextJS will run in standalone mode");
    return await standaloneConfig();
  }
  console.log("NextJS will run in export mode");
  return exportConfig();
};
