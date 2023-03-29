import { Storage, TransferManager, File as StorageFile, Bucket } from "@google-cloud/storage";
import { logError } from "./logging.utils";
import { IContentsEntry, compareFolderContents, generateFolderFlatMap } from "./file.utils";
import { tmpdir } from "os";
import { copyFileSync, emptyDirSync, ensureDirSync } from "fs-extra";
import { basename, dirname, resolve } from "path";

export class GcloudStorage {
  private storage: Storage;
  private transferManager: TransferManager;
  private bucket: Bucket;
  constructor(private bucketname: string) {
    if (!bucketname) {
      logError({ msg1: "No google cloud storage bucket name provided" });
    }
    this.storage = new Storage();
    this.bucket = this.storage.bucket(bucketname);
    this.transferManager = new TransferManager(this.bucket);
  }

  async copyLocalToServer(localDir: string, opts: { dryRun?: boolean } = {}) {
    const serverContents = await this.generateContents();
    const localContents = generateFolderFlatMap(localDir, { includeLocalPath: true });
    console.log(serverContents);
    const ops = compareFolderContents(localContents, serverContents);
    if (opts.dryRun) {
      return ops;
    }
    await this.uploadFiles([...ops.create, ...ops.update]);
    await this.deleteFiles(ops.delete);
  }

  private async deleteFiles(localEntries: IContentsEntry[]) {
    console.log("TODO");
  }

  /**
   * Upload local files to gcloud storage
   * Will rename all files to sit in nested folders by filename to match strapi implementation
   * @param localEntries
   */
  private async uploadFiles(localEntries: IContentsEntry[]) {
    console.log("uploading", localEntries.length, "files...");
    //
    // NOTE - avoids using transferManager bulk upload to allow more fine-grained changes
    for (const entry of localEntries) {
      const serverFolder = basename(entry.relativePath, entry.relativePath.split(".").pop());
      const destination = `${serverFolder}/${entry.relativePath}`;
      await this.bucket.upload(entry.localPath, {
        destination,
        metadata: {
          strapi: entry,
        },
      });
      await this.bucket.file(destination).setMetadata({});
      console.log(entry.relativePath);
    }
  }

  private async downloadFiles(storageFiles: StorageFile[]) {
    await this.transferManager.downloadManyFiles(storageFiles, { concurrencyLimit: 5 });

    // for (const fileName of [firstFileName, secondFileName]) {
    //   console.log(`gs://${bucketName}/${fileName} downloaded to ${fileName}.`);
    // }
  }

  private async listFiles() {
    const [files] = await this.storage.bucket(this.bucketname).getFiles();
    return files;
  }

  /** Generate a flatmap contents of all files on server in format that matches local contents generation */
  private async generateContents() {
    const contents: { [relativePath: string]: IContentsEntry } = {};
    const serverFiles = await this.listFiles();
    for (const serverFile of serverFiles) {
      // Map google storage metadata to format used in local comparison methods
      const { name, md5Hash: md5Checksum, updated: modifiedTime, size } = serverFile.metadata;
      // Google storage adapter stores all files in folders of the same name, e.g. picture1/picture1.png
      // For comparison remove nesting
      const relativePath = name.split("/").pop();
      const size_kb = Math.round(Number(size) / 102.4) / 10;
      contents[relativePath] = { md5Checksum, modifiedTime, relativePath, size_kb };
    }
    return contents;
  }
}
