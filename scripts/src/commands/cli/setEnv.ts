import { Command } from "commander";

import { loadEnv } from "../../utils";
import chalk from "chalk";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  environment?: string;
}

const program = new Command("setEnv");
export default program
  .description("Specify the default environment to use (CI)")
  .requiredOption("-e --environment <string>", "Name of environment to use")
  .action(async (options: IProgramOptions) => {
    const { name } = await loadEnv(options.environment);
    console.log(chalk.blue(`[Environment] ${name}`));
    process.exit(0);
  });
