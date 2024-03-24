import { resolve } from "path";
import { PATHS } from "../../../paths";
import { ensureDirSync } from "fs-extra";
import { spawnSync } from "child_process";
import chalk from "chalk";

export class StorageExport {
  public async run(gcsBucketName?: string) {
    if (gcsBucketName) {
      return this.exportGoogleStorage(gcsBucketName);
    }
    console.log("Skipped - no gcsBucketName");
    // local strapi already writes storage to data dir
  }
  private exportGoogleStorage(bucketName: string) {
    const outputDir = resolve(PATHS.dataDir, "public");
    const cmd = `gcloud storage rsync gs://${bucketName} "${outputDir}" --recursive`;
    console.log(chalk.gray(cmd));
    ensureDirSync(outputDir);
    spawnSync(cmd, {
      shell: true,
      stdio: "inherit",
      cwd: PATHS.rootDir,
    });
    // TODO - consider using gcs sdk (not sure if supports rsync)
    // TODO - delete from local files that don't exist on server
  }
}
