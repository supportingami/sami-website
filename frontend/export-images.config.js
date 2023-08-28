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
  // populate optimized images to custom folder
  imageDir: "_optimized",
};
module.exports = imageOptimisationConfig;
