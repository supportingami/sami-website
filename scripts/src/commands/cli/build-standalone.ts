import chalk from "chalk";
import { Command } from "commander";
import execa from "execa";

import { loadEnv } from "../../utils";
import { PATHS } from "../../paths";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  environment?: string;
  only?: "base" | "backend" | "frontend";
}

const program = new Command("build-standalone");
export default program
  .description("Build standalone images")
  .option("-e --environment <string>", "Name of environment to use")
  .option("-o --only <string>", "Only build single step, allowed 'base', 'backend', 'frontend'")
  .action(async (options: IProgramOptions) => {
    return new BuildStandaloneCmd().run(options).then(() => process.exit(0));
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Generate a list of all commands available in scripts workspace
 * and write as a markdown table in the docs folder
 */
class BuildStandaloneCmd {
  allCommands = [];

  public async run(options: IProgramOptions) {
    const { environment, only } = options;
    const loadedEnv = await loadEnv(environment);
    if (only === undefined || only === "base") {
      await this.buildBase();
    }
    if (only === undefined || only === "backend") {
      await this.buildBackend(loadedEnv.name);
    }
    if (only === undefined || only === "frontend") {
      await this.buildFrontend();
    }
  }

  private async buildBase() {
    console.log(chalk.blue("Building base..."));
    const cmd = `docker build --file docker/base.dockerfile --tag sami/base .`;
    console.log(chalk.gray(cmd));
    await execa(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
    console.log(chalk.green("Built base"));
  }

  private async buildBackend(envName: string) {
    console.log(chalk.blue("Building backend..."));
    const args = `--build-arg ENV_NAME=${envName}`;
    const cmd = `docker build --file docker/backend.dockerfile ${args} --tag sami/backend .`;
    console.log(chalk.gray(cmd));
    await execa(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
    console.log(chalk.green("Built backend"));
  }
  private async buildFrontend() {
    console.log(chalk.blue("Building frontend..."));
    const cmd = `docker build --file docker/frontend.dockerfile --tag sami/frontend .`;
    console.log(chalk.gray(cmd));
    await execa(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
    console.log(chalk.green("Built frontend"));
  }
}
