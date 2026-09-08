const fs = require("fs");
const path = require("path");

/**
 * Collect any Strapi admin thumbnails so next-export-optimize-images skips re-optimizing them.
 */
function getThumbnailIgnorePaths() {
  const publicUploadsDir = path.join(__dirname, "public", "uploads");
  try {
    if (fs.existsSync(publicUploadsDir)) {
      return fs
        .readdirSync(publicUploadsDir)
        .filter((file) => file.startsWith("thumbnail_"))
        .map((file) => path.join("uploads", file));
    }
  } catch (_) {}
  return [];
}

/**
 * Configuration settings use to auto-convert and optimize images used
 * @type {import('next-export-optimize-images').Config}
 * */
const imageOptimisationConfig = {
  convertFormat: [
    ["jpg", "webp"],
    ["jpeg", "webp"],
    ["png", "webp"],
  ],
  sourceImageParser: ({ src, defaultParser }) => {
    const parsed = defaultParser(src);
    return {
      ...parsed,
      extension: parsed.extension.toLowerCase(),
    };
  },
  ignorePaths: getThumbnailIgnorePaths(),
  imageDir: "_optimized",
  quality: 60,
  cacheDir: ".next/cache/next-export-optimize-images",
  sharpOptions: {
    webp: { effort: 6 },
  },
};
module.exports = imageOptimisationConfig;

