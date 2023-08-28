import { resolve } from "path";
import { GcloudStorage } from "../../../utils";
import { PATHS } from "../../../paths";
import { replicateDir } from "../../../utils/file.utils";
import prompts from "prompts";
import chalk from "chalk";

export class StorageImport {
  public async run(parsedEnv?: any) {
    const { GCS_BUCKET_NAME, GOOGLE_APPLICATION_CREDENTIALS } = parsedEnv;
    if (GCS_BUCKET_NAME) {
      // Ensure GOOGLE_APPLICATION_CREDENTIALS point to absolute path (not just relative config)
      // This will be loaded by default when performing operations using gcloud sdks
      process.env.GOOGLE_APPLICATION_CREDENTIALS = resolve(PATHS.configDir, GOOGLE_APPLICATION_CREDENTIALS);
      return this.importGoogleStorage(GCS_BUCKET_NAME);
    }
    return this.importLocalStorage();
  }
  private async importGoogleStorage(bucketname: string) {
    console.log(chalk.gray("Google Storage Provider"));
    const gcloudStorage = new GcloudStorage(bucketname);
    const localDir = resolve(PATHS.dataDir, "uploads");
    const ops = await gcloudStorage.copyLocalToServer(localDir, { dryRun: true });
    // Skip confirmation if all ignored
    if (ops.create.length === 0 && ops.update.length === 0 && ops.delete.length === 0) {
      console.log(chalk.green("Storage - Up to date"));
      return;
    }
    const confirmed = await this.confirmImport(ops);
    if (confirmed) {
      await gcloudStorage.copyLocalToServer(localDir);
    }
  }

  private async importLocalStorage() {
    console.log(chalk.gray("Local Storage Provider"));

    const source = resolve(PATHS.dataDir, "uploads");
    const target = resolve(PATHS.backendDir, "public", "uploads");

    // TODO - dry run confirmation

    const ops = replicateDir(source, target, { dryRun: true });
    if (ops.create.length === 0 && ops.update.length === 0 && ops.delete.length === 0) {
      console.log(chalk.green("Storage - Up to date"));
      return;
    }
    const confirmed = await this.confirmImport(ops);
    if (confirmed) {
      replicateDir(source, target);
    }
  }

  private async confirmImport(ops: ReturnType<typeof replicateDir>) {
    if(process.env.CI) return true
    if (ops.create.length > 0) {
      console.log(chalk.blue("\nCreate"));
      console.log(ops.create.length, "files");
      console.table(ops.create.map(({ relativePath }) => trimText(relativePath, 50)));
    }

    if (ops.update.length > 0) {
      console.log(chalk.blue("\nUpdate"));
      console.log(ops.update.length, "files");
      console.table(ops.update.map(({ relativePath }) => trimText(relativePath, 50)));
    }

    if (ops.delete.length > 0) {
      console.log(chalk.blue("\nDelete"));
      console.log(ops.delete.length, "files");
      console.table(ops.delete.map(({ relativePath }) => trimText(relativePath, 50)));
    }
    if (ops.ignore.length > 0) {
      console.log(chalk.blue("\nIgnore"));
      console.log(ops.ignore.length, "files\n");
    }

    const { confirmed } = await prompts({ type: "confirm", name: "confirmed", message: "Continue?" });
    return confirmed;
  }
}

function trimText(text: string, maxLength: number) {
  return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
}
