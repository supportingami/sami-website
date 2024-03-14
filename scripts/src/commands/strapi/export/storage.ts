import { resolve } from "path";
import { PATHS } from "../../../paths";
import { ensureDirSync } from "fs-extra";
import { spawnSync } from "child_process";

export class StorageExport {
  public async run(gcsBucketName?: string) {
    if (gcsBucketName) {
      return this.exportGoogleStorage(gcsBucketName);
    }
    // local strapi already writes storage to data dir
  }
  private exportGoogleStorage(bucketName: string) {
    const outputDir = resolve(PATHS.dataDir, "public", "uploads");
    ensureDirSync(outputDir);
    spawnSync(`gcloud storage rsync gs://${bucketName} "${outputDir}"`, {
      shell: true,
      stdio: "inherit",
      cwd: PATHS.rootDir,
    });
    // TODO - consider using gcs sdk (not sure if supports rsync)
    // TODO - delete from local files that don't exist on server
  }
}
