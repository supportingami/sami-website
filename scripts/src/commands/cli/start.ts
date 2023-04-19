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
}

const program = new Command("start");
export default program
  .description("Start local development server")
  .option("-e --environment <string>", "Name of environment to use")
  .action(async (options: IProgramOptions) => {
    return new StartCmd().run(options.environment).then(() => process.exit(0));
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

  public async run(envName?: string) {
    const envLoaded = await loadEnv(envName);
    const backendStart = this.getBackendStartCommand(envLoaded);
    // when running frontend always assume local config
    const frontendStart = this.getFrontendCommand();
    const { result } = concurrently([backendStart, frontendStart], {
      ["killOthers" as any]: ["failure", "success"],
    });
    await result;
  }

  private getBackendStartCommand(envLoaded: IEnvLoaded): ConcurrentlyCommandInput {
    console.log("starting backend...");
    return {
      name: "strapi",
      command: "yarn strapi develop",
      cwd: PATHS.backendDir,
      env: {
        NODE_ENV: envLoaded.name === "development" ? "development" : "production",
      },
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
