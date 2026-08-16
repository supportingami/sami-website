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
  imageDir: "_optimized",
  quality: 60,
  cacheDir: ".next/cache/next-export-optimize-images",
  sharpOptions: {
    webp: { effort: 6 },
  },
};
module.exports = imageOptimisationConfig;
