import chalk from "chalk";
import { Command } from "commander";
import type { ConcurrentlyCommandInput } from "concurrently";
import concurrently from "concurrently";
import { resolve } from "path";
import { PATHS } from "../../paths";
import { loadEnv } from "../../utils";
import type { IEnvLoaded } from "../../utils";
import { spawnSync } from "child_process";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  environment?: string;
  only?: "frontend" | "backend";
  /** Build backend before starting - required if strapi dashboard or plugins updated */
  build?: boolean;
  /** Run production server */
  production?: boolean;
}

const program = new Command("start");
export default program
  .description("Start local development server")
  .option("-e --environment <string>", "Name of environment to use", "development")
  .option("-o --only <string>", "Specify only 'frontend' or 'backend'")
  .option("-b --build", "Build backend before starting server")
  .option("-p --production", "Run production server")
  .action(async (options: IProgramOptions) => {
    return new StartCmd(options).run().then(() => process.exit(0));
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

  constructor(private options: IProgramOptions) {}

  public async run() {
    const { environment, only, build } = this.options;
    const envLoaded = await loadEnv(environment);
    const cmds: ConcurrentlyCommandInput[] = [];
    const targets = ["frontend", "backend"].filter((target) => !only || only.includes(target));
    if (targets.includes("backend")) {
      if (build) {
        await this.buildBackend();
      }
      const backendStart = this.getBackendStartCommand(envLoaded);
      cmds.push(backendStart);
    }
    if (targets.includes("frontend")) {
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
    spawnSync(`yarn build`, { stdio: "inherit", shell: true, cwd: PATHS.backendDir });
  }

  private getBackendStartCommand(envLoaded: IEnvLoaded): ConcurrentlyCommandInput {
    const NEXT_CONFIG_MODE = "standalone";
    // use node_env as defined from env file, with development fallback
    const NODE_ENV = envLoaded.parsed.NODE_ENV || "development";
    const command = this.options.production ? "yarn start:prod" : "yarn start";
    console.log(chalk.blue("Starting backend...\n"), chalk.gray(command));
    return {
      name: "strapi",
      command,
      cwd: PATHS.backendDir,
      env: { NODE_ENV, NEXT_CONFIG_MODE },
      prefixColor: "#8F76FF",
    };
  }

  private getFrontendCommand() {
    // use wait-on to wait for backend server to be ready before starting frontend
    const waitOnBinPath = resolve(PATHS.scriptsDir, "node_modules", ".bin", "wait-on");
    const nextBinPath = resolve(PATHS.frontendDir, "node_modules", ".bin", "next");
    // Always run `dev` command as production optimised for static export only
    const nextCmd = "dev";
    console.log(chalk.blue("Starting frontend...\n"), chalk.gray(`next ${nextCmd}`));
    return {
      name: "nextJS",
      command: `${waitOnBinPath} http://localhost:1337 && ${nextBinPath} ${nextCmd}`,
      prefixColor: "bgBlack.white",
      cwd: PATHS.frontendDir,
    };
  }
}
