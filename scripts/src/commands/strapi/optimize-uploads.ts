import chalk from "chalk";
import { execSync } from "child_process";
import { Command } from "commander";
import { existsSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "fs-extra";
import path, { resolve } from "path";
import { PATHS } from "../../paths";

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
  private dbJsonPath = resolve(PATHS.dataDir, "db-json", "files.json");
  private sqliteDbs = [
    resolve(PATHS.dataDir, "db", "sami-dev.db"),
    resolve(PATHS.dataDir, "db", "sami-production.db"),
  ];

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
    const renamedMap: Map<string, string> = new Map();

    for (const item of filesToProcess) {
      const sizeMbBefore = (item.size / (1024 * 1024)).toFixed(2);
      const newFilename = item.filename.slice(0, -item.ext.length) + item.lowerExt;
      const finalPath = path.join(this.uploadsDir, newFilename);

      console.log(
        chalk.white(`• ${item.filename} `) +
          chalk.gray(`(${item.width}x${item.height}, ${sizeMbBefore} MB)`) +
          (item.needsRename ? chalk.magenta(` -> rename to ${item.lowerExt}`) : "") +
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

        const tempOutPath = path.join(this.uploadsDir, `__temp_${newFilename}`);
        const result = await pipeline.toFile(tempOutPath);

        // Only keep optimized file if smaller or if resize/rename was required
        if (result.size < item.size || item.needsResize || item.needsRename) {
          // Remove original (handling case sensitivity on case-insensitive filesystems)
          if (existsSync(item.fullPath)) {
            unlinkSync(item.fullPath);
          }
          writeFileSync(finalPath, readFileSync(tempOutPath));
          unlinkSync(tempOutPath);

          const saved = item.size - result.size;
          if (saved > 0) totalSavedBytes += saved;

          const sizeMbAfter = (result.size / (1024 * 1024)).toFixed(2);
          console.log(
            chalk.green(
              `  ✓ Saved: ${sizeMbBefore} MB -> ${sizeMbAfter} MB (${result.width}x${result.height})`,
            ),
          );

          if (item.filename !== newFilename) {
            renamedMap.set(item.filename, newFilename);
          }
        } else {
          unlinkSync(tempOutPath);
          console.log(chalk.gray(`  (No size benefit from recompression; skipped)`));
        }
      } catch (err) {
        console.log(chalk.red(`  ✗ Error optimizing ${item.filename}: ${err}`));
      }
    }

    if (!this.options.dryRun && renamedMap.size > 0) {
      console.log(chalk.cyan(`\nUpdating database records for ${renamedMap.size} renamed files...`));
      this.updateDbReferences(renamedMap);
    }

    const totalSavedMb = (totalSavedBytes / (1024 * 1024)).toFixed(2);
    console.log(chalk.green(`\nDone! Total disk space saved: ${totalSavedMb} MB\n`));
  }

  /**
   * Update file extension references in data/db-json/files.json and SQLite databases
   */
  private updateDbReferences(renamedMap: Map<string, string>) {
    // 1. Update data/db-json/files.json
    if (existsSync(this.dbJsonPath)) {
      try {
        let jsonStr = readFileSync(this.dbJsonPath, "utf-8");
        for (const [oldName, newName] of renamedMap.entries()) {
          // Replace references to old upload filename
          jsonStr = jsonStr.split(oldName).join(newName);
        }
        // Also ensure any leftover uppercase extensions in ext fields are normalized
        const parsed = JSON.parse(jsonStr);
        for (const item of parsed) {
          if (item.ext && typeof item.ext === "string") {
            item.ext = item.ext.toLowerCase();
          }
        }
        writeFileSync(this.dbJsonPath, JSON.stringify(parsed, null, 2) + "\n");
        console.log(chalk.green(`✓ Updated ${this.dbJsonPath}`));
      } catch (err) {
        console.log(chalk.red(`Error updating db-json/files.json: ${err}`));
      }
    }

    // 2. Update SQLite DBs if present
    for (const dbPath of this.sqliteDbs) {
      if (!existsSync(dbPath)) continue;
      try {
        for (const [oldName, newName] of renamedMap.entries()) {
          const oldUrl = `/uploads/${oldName}`;
          const newUrl = `/uploads/${newName}`;
          const sql = `
            UPDATE files SET url = REPLACE(url, '${oldUrl}', '${newUrl}'), name = REPLACE(name, '${oldName}', '${newName}'), ext = LOWER(ext), formats = REPLACE(formats, '${oldName}', '${newName}') WHERE url LIKE '%${oldName}%' OR name LIKE '%${oldName}%' OR formats LIKE '%${oldName}%';
          `;
          execSync(`sqlite3 "${dbPath}" "${sql.replace(/\n/g, " ")}"`);
        }
        console.log(chalk.green(`✓ Updated SQLite database: ${dbPath}`));
      } catch (err) {
        console.log(chalk.yellow(`Could not update SQLite DB ${dbPath}: ${err}`));
      }
    }
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
