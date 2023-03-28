import { Command } from "commander";
import type { ConcurrentlyCommandInput } from "concurrently";
import concurrently from "concurrently";
import path, { resolve } from "path";
import { PATHS } from "../../paths";
import { IEnvLoaded, logError } from "../../utils";
import { loadEnv } from "../../utils";
import { existsSync } from "fs";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

const program = new Command("start");
export default program.description("Start local development server").action(async () => {
  return new StartCmd().run().then(() => process.exit(0));
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

  public async run() {
    const envLoaded = await loadEnv();
    const backendStart = this.getBackendStartCommand(envLoaded);
    // when running frontend always assume local config
    const frontendStart = this.getFrontendCommand(envLoaded);
    const { result } = concurrently([backendStart, frontendStart], {
      killOthers: ["failure", "success"],
    });
    await result;
  }

  private getBackendStartCommand(envLoaded: IEnvLoaded): ConcurrentlyCommandInput {
    const { STRAPI_READONLY_TOKEN, GOOGLE_APPLICATION_CREDENTIALS } = envLoaded.parsed;
    // ensure frontend bootstrapped

    if (!STRAPI_READONLY_TOKEN) {
      logError({ msg1: "Strapi must be bootstrapped first, run command:", msg2: `yarn scripts strapi bootstrap` });
    }
    // ensure external storage configured
    if (GOOGLE_APPLICATION_CREDENTIALS) {
      const serviceAccountPath = resolve(PATHS.backendDir, GOOGLE_APPLICATION_CREDENTIALS);
      if (!existsSync(serviceAccountPath)) {
        logError({
          msg1: "Google application credentials not found",
          msg2: serviceAccountPath,
        });
      }
    }

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
  private getFrontendCommand(envLoaded: IEnvLoaded) {
    // use wait-on to wait for backend server to be ready before starting frontend
    const waitOnBinPath = path.resolve(PATHS.scriptsDir, "node_modules", ".bin", "wait-on");
    return {
      name: "nextJS",
      command: `${waitOnBinPath} http://localhost:1337 && yarn next dev`,
      cwd: PATHS.frontendDir,
      prefixColor: "bgBlack.white",
    };
  }
}
