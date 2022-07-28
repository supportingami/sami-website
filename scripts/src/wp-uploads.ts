import fs from "fs";
import path from "path";

const inputDir = path.resolve(__dirname, "../input/uploads");
const outputDir = path.resolve(__dirname, "../output/uploads");

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
function wpUploads() {
  setupFolders();
  removeNonContentDirs();
  cleanContentDirs(inputDir);
}

function setupFolders() {
  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
  }
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });
}

function removeNonContentDirs() {
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

function cleanContentDirs(pathname: string) {
  const prefix = path.relative(inputDir, pathname).split(path.sep).join("_");
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
      cleanContentDirs(path.resolve(pathname, dir.name));
    }
  }
}

// Run if called directly
if (require.main === module) {
  wpUploads();
}
