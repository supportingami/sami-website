import { Command } from "commander";
import { loadEnv } from "../../utils";
import type { IEnvLoaded } from "../../utils";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  environment?: string;
}

const program = new Command("deploy");
export default program
  .description("Deploy site stack")
  .option("-e --environment <string>", "Name of environment to use")
  .action(async (options: IProgramOptions) => {
    return new DeployCmd().run(options.environment).then(() => process.exit(0));
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Generate a list of all commands available in scripts workspace
 * and write as a markdown table in the docs folder
 */
class DeployCmd {
  public async run(envName?: string) {
    const envLoaded = await loadEnv(envName);
  }

  private deployBackend(envLoaded: IEnvLoaded) {}

  private deployFrontend() {}
}
