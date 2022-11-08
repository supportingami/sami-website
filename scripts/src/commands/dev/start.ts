import { Command } from "commander";
import type { ConcurrentlyCommandInput } from "concurrently";
import concurrently from "concurrently";
import path from "path";
import { PATHS } from "../../paths";
import type { IBackendEnv, IFrontendEnv } from "../../utils";
import { getBackendEnv, getFrontendEnv } from "../../utils";

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
    const backendEnv = await getBackendEnv();
    const frontendEnv = getFrontendEnv();
    const backendStart = this.getBackendStartCommand(backendEnv);
    const frontendStart = this.getFrontendCommand(backendEnv, frontendEnv);
    const { result } = concurrently([backendStart, frontendStart], {
      killOthers: ["failure", "success"],
    });
    await result;
  }

  private getBackendStartCommand(env: IBackendEnv): ConcurrentlyCommandInput {
    const { envPath, name } = env;
    const relativeEnvPath = path.relative(PATHS.backendDir, envPath);
    console.log("starting backend...");
    return {
      name: "strapi",
      command: "yarn strapi develop",
      cwd: PATHS.backendDir,
      env: {
        ENV_PATH: relativeEnvPath,
        NODE_ENV: name,
      },
      prefixColor: "#8F76FF",
    };
  }
  private getFrontendCommand(backendEnv: IBackendEnv, frontendEnv: IFrontendEnv) {
    // Set local environment to call next from local instance, and if available populate strapi token
    const env = frontendEnv.parsed;
    env.NEXT_PUBLIC_API_URL = "http://localhost:1337";
    // allow override token from backend
    const { STRAPI_READONLY_TOKEN } = backendEnv.parsed;
    if (STRAPI_READONLY_TOKEN) {
      env.STRAPI_READONLY_TOKEN = STRAPI_READONLY_TOKEN;
    }

    // use wait-on to wait for backend server to be ready before starting frontend
    const waitOnBinPath = path.resolve(PATHS.scriptsDir, "node_modules", ".bin", "wait-on");
    return {
      name: "nextJS",
      command: `${waitOnBinPath} http://localhost:1337 && yarn next dev`,
      cwd: PATHS.frontendDir,
      env,
      prefixColor: "bgBlack.white",
    };
  }
}
