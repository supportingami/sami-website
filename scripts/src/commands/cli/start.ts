import chalk from "chalk";
import { Command } from "commander";
import type { ConcurrentlyCommandInput } from "concurrently";
import concurrently from "concurrently";
import { resolve } from "path";
import { PATHS } from "../../paths";
import { loadEnv } from "../../utils";
import type { IEnvLoaded } from "../../utils";
import execa from "execa";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  environment?: string;
  only?: "frontend" | "backend";
  /** Build backend before starting - required if strapi dashboard or plugins updated */
  build?: boolean;
}

const program = new Command("start");
export default program
  .description("Start local development server")
  .option("-e --environment <string>", "Name of environment to use", "development")
  .option("-o --only <string>", "Specify only 'frontend' or 'backend'")
  .option("-b --build", "Build backend before starting server")
  .action(async (options: IProgramOptions) => {
    return new StartCmd().run(options).then(() => process.exit(0));
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Generate a list of all commands available in scripts workspace
 * and write as a markdown table in the docs folder
 */
class StartCmd {
  allCommands = [];

  public async run(options: IProgramOptions) {
    const { environment, only } = options;
    const envLoaded = await loadEnv(environment);
    const cmds: ConcurrentlyCommandInput[] = [];
    if (only !== "frontend") {
      if (options.build) {
        await this.buildBackend();
      }
      const backendStart = this.getBackendStartCommand(envLoaded);
      cmds.push(backendStart);
    }
    if (only !== "backend") {
      // when running frontend always assume local config
      const frontendStart = this.getFrontendCommand();
      cmds.push(frontendStart);
    }
    const { result } = concurrently(cmds, {
      ["killOthers" as any]: ["failure", "success"],
    });
    await result;
  }

  private async buildBackend() {
    console.log(chalk.blue("Building backend..."));
    await execa(`yarn build`, { stdio: "inherit", shell: true, cwd: PATHS.backendDir });
  }

  private getBackendStartCommand(envLoaded: IEnvLoaded): ConcurrentlyCommandInput {
    console.log(chalk.blue("Starting backend..."));
    const NEXT_CONFIG_MODE = "standalone";
    // use node_env as defined from env file, with development fallback
    const NODE_ENV = envLoaded.parsed.NODE_ENV || "development";
    return {
      name: "strapi",
      command: "yarn start",
      cwd: PATHS.backendDir,
      env: { NODE_ENV, NEXT_CONFIG_MODE },
      prefixColor: "#8F76FF",
    };
  }

  private getFrontendCommand() {
    console.log(chalk.blue("Starting frontend..."));
    // use wait-on to wait for backend server to be ready before starting frontend
    const waitOnBinPath = resolve(PATHS.scriptsDir, "node_modules", ".bin", "wait-on");
    return {
      name: "nextJS",
      command: `${waitOnBinPath} http://localhost:1337 && yarn next dev`,
      cwd: PATHS.frontendDir,
      prefixColor: "bgBlack.white",
    };
  }
}
