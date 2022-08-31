import { Command } from "commander";
import fs from "fs";
import path from "path";
import { PATHS } from "../../paths";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  inputDir: string;
  outputDir: string;
}
const program = new Command("assets:extract");
export default program
  .description("Extract WP assets to flat folder structure")
  .option("-i --input-dir <string>", "Directory to input wp assets")
  .option("-o --output-dir <string>", "Directory to output assets")
  .action(async (options: Partial<IProgramOptions>) => {
    const optionsWithDefaults: IProgramOptions = {
      inputDir: path.resolve(PATHS.wpInputDir, "uploads"),
      outputDir: path.resolve(PATHS.wpOutputDir, "uploads"),
      ...options,
    };
    new AssetsExtract(optionsWithDefaults).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

/**
 * Process wordpress uploads folders to extract and flatten uploaded files
 * This will remove duplicate resized images (e.g. my_image-320x240.png removed if my_image.png exists)
 * It will also prefix all files with the wordpress folder year and month, and populate to a flat output
 *
 * @example
 * 1. Export the wp_content folder from and wordpress installation and copy the _uploads_ folder to ../input/uploads
 * 2. Run the script via `npx ts-node scripts\src\wp-uploads.ts`
 * 3. View the flat files output in the ../output/uploads folder
 *
 */
class AssetsExtract {
  constructor(public options: IProgramOptions) {}
  public run() {
    this.setupFolders();
    this.removeNonContentDirs();
    this.cleanContentDirs(this.options.inputDir);
  }

  private setupFolders() {
    const { inputDir, outputDir } = this.options;
    if (!fs.existsSync(inputDir)) {
      fs.mkdirSync(inputDir, { recursive: true });
    }
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });
  }

  private removeNonContentDirs() {
    const { inputDir } = this.options;
    const dirsToRemove = [
      "bfi_thumb",
      "cache",
      "hummingbird-assets",
      "uber-grid-cache",
      "Languages_WD",
      "elementor",
      "wpdm-cache",
    ];
    for (const dir of dirsToRemove) {
      const pathname = path.resolve(inputDir, dir);
      if (fs.existsSync(pathname)) {
        fs.rmSync(pathname, { recursive: true });
      }
    }
  }

  private cleanContentDirs(pathname: string) {
    const { outputDir } = this.options;
    const prefix = path
      .relative(this.options.inputDir, pathname)
      .split(path.sep)
      .join("_");
    let contents = fs.readdirSync(pathname, { withFileTypes: true });
    const files = contents.filter((f) => f.isFile());
    const regex = /-[0-9]{2,4}x[0-9]{2,4}( \([0-9]\))*\.(jpg|png|jpeg|gif)/i;

    for (const file of files) {
      // remove wp resized files
      const match = regex.exec(file.name);
      const src = path.resolve(pathname, file.name);
      if (match) {
        const orig = src.replace(match[0], "") + path.extname(file.name);
        if (fs.existsSync(orig)) {
          fs.rmSync(src);
        }
      }
      // remove system files
      if ([".htaccess", "index.html"].includes(file.name)) {
        fs.rmSync(src);
      }
      // copy to flat format
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.resolve(outputDir, `${prefix}-${file.name}`));
      }
    }
    // remove empty folders
    contents = fs.readdirSync(pathname, { withFileTypes: true });
    if (contents.length === 0) {
      console.log("rm", pathname);
      fs.rmdirSync(pathname);
    } else {
      // recursively process any nested folders
      for (const dir of contents.filter((d) => d.isDirectory())) {
        this.cleanContentDirs(path.resolve(pathname, dir.name));
      }
    }
  }
}
