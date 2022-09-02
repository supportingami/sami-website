import { Command } from "commander";
import { readdirSync } from "fs-extra";
import path from "path";
import type { Strapi } from "../../../../backend/node_modules/@strapi/strapi";
import { PATHS } from "../../paths";
import { logOutput } from "../../utils";
import { arrayToHashmap } from "../../utils/object.utils";
import { createStrapiInstance } from "./common";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  outDir: string;
}
const program = new Command("media:populate");
export default program
  .description("Populate strapi media with local uploads")
  .action(async () => new MediaPopulate().run());

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
class MediaPopulate {
  app: Strapi;
  entityName = "plugin::upload.file";
  // https://github.dev/strapi/strapi/blob/main/packages/core/upload/server/services/upload.js
  uploadService: any;
  /**
   * ...
   * TODO - will only handle flat folder structure (not nested)
   **/
  public async run() {
    // start app
    this.app = await createStrapiInstance(true);
    await this.app.start();

    // List all custom db endpoints for export (e.g. api::members.members)
    const dbFiles = await this.app.entityService.findMany(this.entityName);
    this.uploadService = this.app.plugin("upload").service("upload");

    const expectedFiles = readdirSync(PATHS.backendUploadsDir, { withFileTypes: true })
      .filter((f) => f.isFile())
      .map((f) => ({ hash: f.name, filepath: path.resolve(PATHS.backendUploadsDir, f.name) }));

    const dbFilesHashmap = arrayToHashmap(dbFiles, "hash");
    const localFilesHashmap = arrayToHashmap(expectedFiles, "hash");

    const actions: any = { CREATE: [], DELETE: [] };

    // Delete db files that should not exist or are thumbnails
    for (const [key, value] of Object.entries(dbFilesHashmap)) {
      if (!localFilesHashmap.hasOwnProperty(key)) {
        actions.DELETE.push(value);
      }
    }
    // Create db files that do not exist
    for (const [key, value] of Object.entries(localFilesHashmap)) {
      if (!dbFilesHashmap.hasOwnProperty(key)) {
        actions.CREATE.push(value);
      }
    }
    // await this.handleCreate(actions.CREATE);
    // await this.handleDelete(actions.DELETE);

    // Clear all thumbnails
    this.app.stop();
  }

  private async handleCreate(entities: { hash: string; filepath: string }[]) {
    // TODO - remove thumbnails and other compressed/optimised images
    // these will be manage by next.js instead

    for (const entity of entities) {
      const { hash } = entity;
      const extension = path.extname(hash);
      const hashName = path.basename(hash, extension);
      const unhashedName = hashName.split("_").slice(0, -1).join("_");
      const name = unhashedName + extension;
      const data = {
        name: name,

        alternativeText: name,
        caption: name,

        folder: null,
      };
      console.log("create", data);
      // await this.app.entityService.create(this.entityName, { data }).catch((err) => console.log(err.details.errors));
    }
  }
  private async handleDelete(entities: { id: number; formats: any }[]) {
    console.log("delete", entities);
    for (const entity of entities) {
      await this.app.entityService.delete(this.entityName, entity.id);
    }
  }
}
