import { spawnSync } from "child_process";
import { Command } from "commander";

import { loadEnv } from "../../utils";
import { PATHS } from "../../paths";
import chalk from "chalk";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  environment?: string;
}

const program = new Command("build");
export default program
  .description("Build deployment images")
  .option("-e --environment <string>", "Name of environment to use")
  .action(async (options: IProgramOptions) => {
    return new BuildCmd().run(options.environment).then(() => process.exit(0));
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Generate a list of all commands available in scripts workspace
 * and write as a markdown table in the docs folder
 */
class BuildCmd {
  allCommands = [];

  public async run(envName?: string) {
    const envLoaded = await loadEnv(envName);
    this.buildBase();
    this.buildBackend();
    this.buildFrontend();
  }

  private buildBase() {
    console.log(chalk.blue("Building base..."));
    const cmd = `docker build --file docker/base.dockerfile --tag sami/base .`;
    spawnSync(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
  }

  private buildBackend() {
    console.log(chalk.blue("Building backend..."));
    const cmd = `docker build --file docker/backend.dockerfile --tag sami/backend .`;
    spawnSync(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
  }
  private buildFrontend() {
    console.log(chalk.blue("Building frontend..."));
    const cmd = `docker build --file docker/frontend.dockerfile --tag sami/frontend .`;
    spawnSync(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
  }
}
