import { Command } from "commander";
import { DBImport } from "./db";
import { loadEnv } from "../../../utils";
import { StorageImport } from "./storage";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  table?: string;
  environment?: string;
  /** specify to only import assets or db */
  only?: "storage" | "db";
}
const program = new Command("import");
export default program
  .description("Import strapi data")
  .option("-e --environment <string>", "Name of environment to use)")
  .option("-o --only <string>", "Specify 'assets' or 'db' to only import")
  .option("-t --table <string>", "Single table to import (omit to include all)")
  .action(async (options: IProgramOptions) => {
    const { name, parsed } = await loadEnv(options.environment);
    // Import storage first as db references will be dropped if assets do not exist
    if (options.only !== "db") {
      await new StorageImport().run(parsed);
    }
    if (options.only !== "storage") {
      await new DBImport().run(name, options.table);
    }
    process.exit(0);
  });
