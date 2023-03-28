import { Command } from "commander";
import { DBImport } from "./db";
import { loadEnv } from "../../../utils";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  table?: string;
  environment?: string;
}
const program = new Command("import");
export default program
  .description("Import strapi data")
  .option("-t --table <string>", "Single table to import (omit to include all)")
  .action(async (options: IProgramOptions) => {
    const { name } = await loadEnv(options.environment);
    new DBImport().run(name, options.table).then(() => process.exit(0));
  });
