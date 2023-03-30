import { BinaryToTextEncoding, createHash } from "crypto";
import {
  copyFileSync,
  ensureDirSync,
  existsSync,
  readFileSync,
  readdirSync,
  removeSync,
  rmdirSync,
  statSync,
  utimesSync,
} from "fs-extra";
import path from "path";

/**
 * Copy all files from src dir to target, and remove target files that no longer exist in src
 * Ignores unchanged files based on md5 hash and preserves src file stats
 * @param filter_fn optional filter function applied to src folder files
 * */
export function replicateDir(
  src: string,
  target: string,
  options: {
    filterFn?: (entry: IContentsEntry) => boolean;
    dryRun?: boolean;
  } = {}
) {
  ensureDirSync(src);
  ensureDirSync(target);
  const srcFiles = generateFolderFlatMap(src);
  const targetFiles = generateFolderFlatMap(target);

  const { filterFn, dryRun } = options;

  // omit src files via filter
  if (filterFn) {
    Object.entries(srcFiles).forEach(([key, entry]) => {
      if (!filterFn(entry as IContentsEntry)) {
        delete srcFiles[key];
      }
    });
  }

  const ops = compareFolderContents(srcFiles, targetFiles);

  // Return summary only if running as dry run
  if (dryRun) {
    return ops;
  }

  // process operations
  ops.delete.forEach(({ relativePath }) => {
    const targetPath = path.resolve(target, relativePath);
    removeSync(targetPath);
  });
  const copyEntries = [...ops.create, ...ops.update];
  copyEntries.forEach((entry) => {
    const { relativePath, modifiedTime } = entry as IContentsEntry;
    const srcPath = path.resolve(src, relativePath);
    const targetPath = path.resolve(target, relativePath);
    const mtime = new Date(modifiedTime);
    ensureDirSync(path.dirname(targetPath));
    copyFileSync(srcPath, targetPath);
    utimesSync(targetPath, mtime, mtime);
  });
  // remove hanging directories
  cleanupEmptyFolders(target);
  return ops;
}

/** Compare generated flatmaps of two directories to check differences */
export function compareFolderContents(
  srcFiles: { [relativePath: string]: IContentsEntry },
  targetFiles: { [relativePath: string]: IContentsEntry }
) {
  const ops: IReplicateOps = { create: [], update: [], delete: [], ignore: [] };
  // remove target files that no longer exist in src
  Object.entries(targetFiles).forEach(([filepath, entry]) => {
    if (!srcFiles.hasOwnProperty(filepath)) {
      ops.delete.push(entry);
    }
  });
  // copy new and modified files from src
  Object.entries(srcFiles).forEach(([filepath, entry]) => {
    if (targetFiles.hasOwnProperty(filepath)) {
      const srcFile = entry as IContentsEntry;
      const targetFile = targetFiles[filepath] as IContentsEntry;
      if (srcFile.md5Checksum !== targetFile.md5Checksum) {
        ops.update.push(entry);
      } else {
        ops.ignore.push(entry);
      }
    } else {
      ops.create.push(entry);
    }
  });
  return ops;
}

interface IReplicateOps {
  create: IContentsEntry[];
  update: IContentsEntry[];
  delete: IContentsEntry[];
  ignore: IContentsEntry[];
}
/**
 * Create a flat json representing nested folder structure of a given folder path.
 * Includes stats output that records file size and md5 checksum data
 * 
 * @param options.filterFn optional filter function to be applied to relative paths for inclusion
 * @param options.includeLocalPath include full path to file on local disk

 * @returns Example file: i18n/flags/gb.svg
 * ```
 * "i18n/flags/gb.svg": {
    "size": 538,
    "checksum": "d3ddd6025a06a78535b0d432d14905bf"
  },
 * ```
 */
export function generateFolderFlatMap(
  folderPath: string,
  options: {
    filterFn?: (relativePath: string) => boolean;
    includeLocalPath?: boolean;
    md5Encoding?: BinaryToTextEncoding;
  } = {}
) {
  const allFiles = recursiveFindByExtension(folderPath);
  let flatMap: { [relativePath: string]: IContentsEntry } = {};
  for (const filePath of allFiles) {
    const relativePath = path.relative(folderPath, filePath).split(path.sep).join("/");
    const shouldInclude = options.filterFn ? options.filterFn(relativePath) : true;
    if (shouldInclude) {
      // generate size and md5 checksum stats
      const { size, mtime } = statSync(filePath);
      const modifiedTime = mtime.toISOString();
      // write size in kb to 1 dpclear
      const size_kb = Math.round(size / 102.4) / 10;
      const md5Checksum = getFileMD5Checksum(filePath, options.md5Encoding);
      const entry: IContentsEntry = { relativePath, size_kb, md5Checksum, modifiedTime };
      if (options.includeLocalPath) {
        entry.localPath = filePath;
      }
      flatMap[relativePath] = entry as any;
    }
  }
  return flatMap;
}

/**
 * find files by a given extension recursively, returning full paths
 * @param ext - file extension (without '.'), e.g. 'xlsx' or 'json' (leave blank for all files)
 */
function recursiveFindByExtension(base: string, ext?: string, files?: string[], result?: string[]) {
  files = files || readdirSync(base);
  result = result || [];
  for (const file of files) {
    const newbase = path.join(base, file);
    if (statSync(newbase).isDirectory()) {
      const newFiles = readdirSync(newbase);
      result = recursiveFindByExtension(newbase, ext, newFiles, result);
    } else {
      if (ext) {
        if (file.split(".").pop() === ext) {
          result.push(newbase);
        }
      } else {
        result.push(newbase);
      }
    }
  }
  return result;
}

/** Generate md5 checksum for file */
function getFileMD5Checksum(filePath: string, encoding: BinaryToTextEncoding = "hex") {
  const hash = createHash("md5", {});
  const fileBuffer = readFileSync(filePath);
  hash.update(fileBuffer);
  const checksum = hash.digest(encoding);
  return checksum;
}

/**
 * Recursively remove any empty folders
 * https://gist.github.com/arnoson/3237697e8c61dfaf0356f814b1500d7b
 */
function cleanupEmptyFolders(folder: string) {
  if (!existsSync(folder)) return;
  if (!statSync(folder).isDirectory()) return;
  let files = readdirSync(folder);

  if (files.length > 0) {
    files.forEach((file) => cleanupEmptyFolders(path.join(folder, file)));
    // Re-evaluate files; after deleting subfolders we may have an empty parent
    // folder now.
    files = readdirSync(folder);
  }

  if (files.length === 0) {
    rmdirSync(folder);
  }
}

export interface IContentsEntry {
  relativePath: string;
  size_kb: number;
  modifiedTime: string;
  md5Checksum: string;
  localPath?: string;
}
