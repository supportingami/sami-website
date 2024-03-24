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
  only: (typeof allTargets)[number];
  ci?: boolean;
}
const allTargets = ["storage", "db"] as const;

const program = new Command("export");
export default program
  .description("Export strapi data")
  .option("-e --environment <string>", "Name of environment to use")
  .option("-o --only <string>", "List of targets to include", allTargets.join(","))
  .option("-ci --ci", "Disable prompts for CI mode")
  .action(async (options: IProgramOptions) => {
    // force ci environment variable if specified
    if (options.ci) {
      process.env.CI = "true";
    }
    const { name, parsed } = await loadEnv(options.environment);
    const targets = allTargets.filter((t) => options.only.includes(t));
    if (targets.includes("db")) {
      console.log(chalk.blue("Exporting DB..."));
      await new DBExport().run(name, parsed);
      console.log(chalk.green("DB exported successfully"));
    }
    if (targets.includes("storage")) {
      console.log(chalk.blue("Exporting Storage..."));
      await new StorageExport().run(parsed.GCS_PUBLIC_BUCKET_NAME);
      console.log(chalk.blue("Storage exported successfully"));
    }

    process.exit(0);
  });
