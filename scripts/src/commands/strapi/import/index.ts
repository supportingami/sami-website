import { Command } from "commander";
import { DBImport } from "./dbImport";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  table?: string;
}
const program = new Command("import");
export default program
  .description("Import strapi data")
  .option("-t --table <string>", "Single table to import (omit to include all)")
  .action(async (options: IProgramOptions) => {
    new DBImport().run(options).then(() => process.exit(0));
  });
