import chalk from "chalk";
import { Command } from "commander";
import { existsSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "fs-extra";
import path, { resolve } from "path";
import { PATHS } from "../../paths";

// Dynamic require required: scripts workspace has no direct sharp dependency,
// so resolve it from sibling workspaces at runtime
// eslint-disable-next-line @typescript-eslint/no-require-imports
const sharp = require(
  require.resolve("sharp", {
    paths: [PATHS.backendDir, PATHS.frontendDir, PATHS.rootDir],
  }),
);

interface IOptimizeUploadsOptions {
  dryRun?: boolean;
  maxDimension: number;
  maxSizeMb: number;
}

export class UploadsOptimizer {
  private uploadsDir = resolve(PATHS.dataDir, "public", "uploads");

  constructor(private options: IOptimizeUploadsOptions) {}

  public async run() {
    if (!existsSync(this.uploadsDir)) {
      console.log(chalk.red(`Uploads directory not found: ${this.uploadsDir}`));
      return;
    }

    console.log(chalk.cyan(`\nScanning uploads in ${this.uploadsDir}...`));
    const entries = readdirSync(this.uploadsDir);
    const filesToProcess: {
      filename: string;
      fullPath: string;
      ext: string;
      lowerExt: string;
      size: number;
      width?: number;
      height?: number;
      format?: string;
      needsResize: boolean;
      needsCompress: boolean;
      needsRename: boolean;
    }[] = [];

    for (const filename of entries) {
      const fullPath = path.join(this.uploadsDir, filename);
      const stat = statSync(fullPath);
      if (!stat.isFile()) continue;

      const ext = path.extname(filename);
      const lowerExt = ext.toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(lowerExt)) continue;

      const needsRename = ext !== lowerExt;
      const sizeMb = stat.size / (1024 * 1024);
      const needsCompress = sizeMb > this.options.maxSizeMb;

      let width = 0;
      let height = 0;
      let format = "";
      try {
        const meta = await sharp(fullPath).metadata();
        width = meta.width || 0;
        height = meta.height || 0;
        format = meta.format || "";
      } catch {
        continue;
      }

      const needsResize = width > this.options.maxDimension || height > this.options.maxDimension;

      if (needsRename || needsResize || needsCompress) {
        filesToProcess.push({
          filename,
          fullPath,
          ext,
          lowerExt,
          size: stat.size,
          width,
          height,
          format,
          needsResize,
          needsCompress,
          needsRename,
        });
      }
    }

    console.log(chalk.yellow(`Found ${filesToProcess.length} images to optimize.\n`));
    if (filesToProcess.length === 0) {
      console.log(chalk.green("All uploaded assets are already optimized."));
      return;
    }

    let totalSavedBytes = 0;

    for (const item of filesToProcess) {
      const sizeMbBefore = (item.size / (1024 * 1024)).toFixed(2);
      const finalPath = item.fullPath;

      console.log(
        chalk.white(`• ${item.filename} `) +
          chalk.gray(`(${item.width}x${item.height}, ${sizeMbBefore} MB)`) +
          (item.needsResize ? chalk.blue(` -> downscale to max ${this.options.maxDimension}px`) : "") +
          (item.needsCompress ? chalk.yellow(` -> recompress`) : ""),
      );

      if (this.options.dryRun) {
        continue;
      }

      try {
        let pipeline = sharp(item.fullPath).rotate();
        if (item.needsResize) {
          pipeline = pipeline.resize({
            width: this.options.maxDimension,
            height: this.options.maxDimension,
            fit: "inside",
            withoutEnlargement: true,
          });
        }

        if (item.format === "jpeg") {
          pipeline = pipeline.jpeg({ quality: 85, mozjpeg: true });
        } else if (item.format === "png") {
          pipeline = pipeline.png({ quality: 85, compressionLevel: 9 });
        } else if (item.format === "webp") {
          pipeline = pipeline.webp({ quality: 82 });
        }

        const tempOutPath = path.join(this.uploadsDir, `__temp_${item.filename}`);
        const result = await pipeline.toFile(tempOutPath);

        // Only keep optimized file if smaller or if resize was required
        if (result.size < item.size || item.needsResize) {
          if (existsSync(item.fullPath)) {
            unlinkSync(item.fullPath);
          }
          writeFileSync(finalPath, readFileSync(tempOutPath));
          unlinkSync(tempOutPath);

          const saved = item.size - result.size;
          if (saved > 0) totalSavedBytes += saved;

          const sizeMbAfter = (result.size / (1024 * 1024)).toFixed(2);
          console.log(
            chalk.green(`  ✓ Saved: ${sizeMbBefore} MB -> ${sizeMbAfter} MB (${result.width}x${result.height})`),
          );
        } else {
          unlinkSync(tempOutPath);
          console.log(chalk.gray(`  (No size benefit from recompression; skipped)`));
        }
      } catch (err) {
        console.log(chalk.red(`  ✗ Error optimizing ${item.filename}: ${err}`));
      }
    }

    const totalSavedMb = (totalSavedBytes / (1024 * 1024)).toFixed(2);
    console.log(chalk.green(`\nDone! Total disk space saved: ${totalSavedMb} MB\n`));
  }
}

/***************************************************************************************
 * Command Registration
 *************************************************************************************/
const program = new Command("optimize-uploads");
export default program
  .description("Downscale and recompress large images in data/public/uploads")
  .option("--dry-run", "Preview changes without modifying files", false)
  .option("--max-dimension <number>", "Maximum width/height dimension in pixels", "2048")
  .option("--max-size <number>", "Maximum file size in MB before recompressing", "1.5")
  .action(async (options) => {
    const optimizer = new UploadsOptimizer({
      dryRun: options.dryRun,
      maxDimension: parseInt(options.maxDimension, 10),
      maxSizeMb: parseFloat(options.maxSize),
    });
    await optimizer.run();
  });
