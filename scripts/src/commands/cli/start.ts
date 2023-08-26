import chalk from "chalk";
import { Command } from "commander";
import type { ConcurrentlyCommandInput } from "concurrently";
import concurrently from "concurrently";
import { resolve } from "path";
import { PATHS } from "../../paths";
import { loadEnv } from "../../utils";
import type { IEnvLoaded } from "../../utils";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  environment?: string;
  only?: "frontend" | "backend";
}

const program = new Command("start");
export default program
  .description("Start local development server")
  .option("-e --environment <string>", "Name of environment to use")
  .option("-o --only <string>", "Specify only 'frontend' or 'backend'")
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

  private getBackendStartCommand(envLoaded: IEnvLoaded): ConcurrentlyCommandInput {
    console.log(chalk.blue("Starting backend..."));
    const NODE_ENV = envLoaded.name === "development" ? "development" : "production";
    if (NODE_ENV === "production") console.log("Production start may take a minute to compile...");
    return {
      name: "strapi",
      command: "yarn start",
      cwd: PATHS.backendDir,
      env: { NODE_ENV },
      prefixColor: "#8F76FF",
    };
  }

  private getFrontendCommand() {
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
