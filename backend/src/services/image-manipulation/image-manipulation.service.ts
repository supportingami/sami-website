import fs from "fs";
import path from "path";
import sharp from "sharp";

export interface ImageOptimizationConfig {
  maxDimension: number;
  jpegQuality: number;
  pngQuality: number;
  webpQuality: number;
  minSizeThresholdBytes: number;
}

export const DEFAULT_OPTIMIZATION_CONFIG: ImageOptimizationConfig = {
  maxDimension: 2048,
  jpegQuality: 82,
  pngQuality: 85,
  webpQuality: 80,
  minSizeThresholdBytes: 1.5 * 1024 * 1024, // 1.5 MB
};

/**
 * Automatically downscale and compress an uploaded image file if it exceeds maximum
 * dimension limits or size thresholds. Also normalizes file extensions to lowercase.
 */
export async function downscaleAndOptimizeImage(
  file: any,
  config: ImageOptimizationConfig = DEFAULT_OPTIMIZATION_CONFIG,
): Promise<any> {
  // 1. Normalize extension and filename to lowercase
  if (file.ext) {
    file.ext = file.ext.toLowerCase();
  }
  if (file.name) {
    file.name = file.name.replace(/\.[^/.]+$/, (ext: string) => ext.toLowerCase());
  }

  // If file has no filepath or file does not exist, return original
  if (!file.filepath || !fs.existsSync(file.filepath)) {
    return file;
  }

  try {
    const metadata = await sharp(file.filepath).metadata();
    const format = metadata.format;
    const isSupportedFormat = format && ["jpeg", "png", "webp"].includes(format);

    if (!isSupportedFormat) {
      return file;
    }

    const width = metadata.width || 0;
    const height = metadata.height || 0;
    const needsResize = width > config.maxDimension || height > config.maxDimension;
    const isLargeFile = file.sizeInBytes > config.minSizeThresholdBytes;

    if (needsResize || isLargeFile) {
      let pipeline = sharp(file.filepath).rotate(); // auto-orient EXIF

      if (needsResize) {
        pipeline = pipeline.resize({
          width: config.maxDimension,
          height: config.maxDimension,
          fit: "inside",
          withoutEnlargement: true,
        });
      }

      if (format === "jpeg") {
        pipeline = pipeline.jpeg({ quality: config.jpegQuality, mozjpeg: true });
      } else if (format === "png") {
        pipeline = pipeline.png({ quality: config.pngQuality });
      } else if (format === "webp") {
        pipeline = pipeline.webp({ quality: config.webpQuality });
      }

      const targetDir = file.tmpWorkingDirectory || path.dirname(file.filepath);
      const optimizedFilePath = path.join(targetDir, `downscaled-${file.hash}${file.ext}`);
      const outputInfo = await pipeline.toFile(optimizedFilePath);

      // Only replace if the optimized image is actually smaller or was resized
      if (outputInfo.size < file.sizeInBytes || needsResize) {
        file.filepath = optimizedFilePath;
        file.width = outputInfo.width;
        file.height = outputInfo.height;
        file.size = outputInfo.size / 1000;
        file.sizeInBytes = outputInfo.size;
        file.getStream = () => fs.createReadStream(optimizedFilePath);
      }
    }
  } catch (err) {
    console.warn(`[image-manipulation] Downscale failed for ${file.name}:`, err);
  }

  return file;
}

/**
 * Register image downscaling and extension normalization into Strapi upload plugin
 */
export function registerImageManipulation(
  strapi: any,
  config: ImageOptimizationConfig = DEFAULT_OPTIMIZATION_CONFIG,
) {
  const uploadPlugin = strapi.plugin("upload");
  if (!uploadPlugin) return;

  const imageManipulationService = uploadPlugin.service("image-manipulation");
  if (!imageManipulationService) return;

  const originalOptimize = imageManipulationService.optimize.bind(imageManipulationService);

  imageManipulationService.optimize = async (file: any) => {
    const optimizedFile = await downscaleAndOptimizeImage(file, config);
    return originalOptimize(optimizedFile);
  };
}
