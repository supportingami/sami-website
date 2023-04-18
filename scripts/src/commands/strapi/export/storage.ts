import { resolve } from "path";
import { logError } from "../../../utils";
import { PATHS } from "../../../paths";
import { replicateDir } from "../../../utils/file.utils";

export class StorageExport {
  public async run(gcsBucketName?: string) {
    if (gcsBucketName) {
      return this.exportGoogleStorage();
    }
    return this.exportLocalStorage();
  }
  private exportGoogleStorage() {
    // TODO
    logError({ msg1: "Google storage export not currently implemented" });
  }

  private exportLocalStorage() {
    const source = resolve(PATHS.backendDir, "public", "uploads");
    const target = resolve(PATHS.dataDir, "uploads");
    replicateDir(source, target);
  }
}
