import { Command } from "commander";
import { emptyDirSync, ensureDirSync, writeFileSync } from "fs-extra";
import path from "path";
import { PATHS } from "../../paths";
import { logOutput } from "../../utils";
import { createStrapiInstance } from "./common";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  outDir: string;
}
const program = new Command("data:export");
export default program
  .description("Export strapi data")
  .option("-o --out-dir <string>", "Directory to output type defintions")
  .action(async (options: Partial<IProgramOptions>) => {
    const optionsWithDefaults: IProgramOptions = {
      outDir: PATHS.sharedDir,
      ...options,
    };
    dataExport(optionsWithDefaults);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Call strapi plugin import-export-entries to export data
 * https://market.strapi.io/plugins/strapi-plugin-import-export-entries
 **/
async function dataExport(options: IProgramOptions) {
  // setup folders
  const outputDir = path.resolve(PATHS.dataDir, "db");
  ensureDirSync(outputDir);
  emptyDirSync(outputDir);

  // start app
  const app = await createStrapiInstance(true);
  await app.start();

  // List all custom db endpoints for export (e.g. api::members.members)
  const db = app.db;
  const metadata: Map<string, { uid: string; tableName: string }> = (db as any).metadata;
  const dataKeys = [...metadata.keys()].filter((key) => key.startsWith("api::"));

  // Export data
  const service = app.plugin("import-export-entries").service("export");
  for (const key of dataKeys) {
    const { uid, tableName } = metadata.get(key);
    const entries = await app.entityService.findMany(uid);
    const data = await service.exportData(entries, {
      slug: uid,
      dataFormat: "json",
      relationsAsId: false,
    });
    writeFileSync(path.resolve(outputDir, `${tableName}.json`), data);
  }
  logOutput({ msg1: "DB data exported successfully", msg2: outputDir });

  app.stop();
}
