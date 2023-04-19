import { Command } from "commander";
import { resolve } from "path";
import { PATHS } from "../../paths";
import { loadEnv } from "../../utils";
import execa from "execa";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  environment?: string;
}

const program = new Command("build");
export default program
  .description("Build site stack")
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
  public async run(envName?: string) {
    await loadEnv(envName);
    await this.buildBackend();
    await this.buildFrontend();
  }

  private async buildBackend() {
    await execa("yarn build", {
      stdio: "inherit",
      shell: true,
      cwd: PATHS.backendDir,
    });
  }

  private buildFrontend() {
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
