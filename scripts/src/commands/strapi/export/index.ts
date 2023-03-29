import { Command } from "commander";
import { DBExport } from "./db";
import chalk from "chalk";
import { StorageExport } from "./storage";
import { loadEnv } from "../../../utils";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  // TODO - add support back for just a single table export
  table?: string;
  environment?: string;
  /** specify to only import assets or db */
  only?: "storage" | "db";
}

const program = new Command("export");
export default program
  .description("Export strapi data")
  .option("-e --environment <string>", "Name of environment to use")
  .action(async (options: IProgramOptions) => {
    const { name, parsed } = await loadEnv(options.environment);
    if (options.only !== "storage") {
      console.log(chalk.blue("Exporting DB..."));
      await new DBExport().run(name);
      console.log(chalk.green("DB exported successfully"));
    }
    if (options.only !== "db") {
      console.log(chalk.blue("Exporting Storage..."));
      await new StorageExport().run(parsed.GCS_BUCKET_NAME);
      console.log(chalk.blue("Storage exported successfully"));
    }

    process.exit(0);
  });
