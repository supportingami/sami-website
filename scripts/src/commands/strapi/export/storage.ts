import { logError } from "../../../utils";

export class StorageExport {
  public async run(gcsBucketName?: string) {
    if (gcsBucketName) {
      return this.exportGoogleStorage();
    }
    // local strapi already writes storage to data dir
  }
  private exportGoogleStorage() {
    // TODO
    logError({ msg1: "Google storage export not currently implemented" });
  }
}
