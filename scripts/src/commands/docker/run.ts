import { Command } from "commander";
import execa from "execa";

import { PATHS } from "../../paths";
import { BASE_TAG } from "./build";
import { ensureDirSync } from "fs-extra";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  only?: string;
}

const program = new Command("run");
export default program
  .description("Run docker")
  .option("-o --only <string>", "Only run single container'backend', 'frontend'")
  .action(async (options: IProgramOptions) => {
    return new DockerRunCmd().run(options).then(() => process.exit(0));
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Generate a list of all commands available in scripts workspace
 * and write as a markdown table in the docs folder
 */
class DockerRunCmd {
  allCommands = [];

  public async run(options: IProgramOptions) {
    ensureDirSync(PATHS.dockerDataDir);
    // variables are only interpolated for compose file when referenced by cli
    // https://github.com/docker/compose/issues/3435
    const envArgs = `--env-file ./config/docker.env --env-file ./config/docker.local.env`;
    await execa(`docker compose -p sami-development ${envArgs} up -d`, {
      cwd: PATHS.rootDir,
      shell: true,
      stdio: "inherit",
      env: {
        BASE_TAG,
        NODE_ENV: "development",
        // https://docs.docker.com/compose/profiles/
        COMPOSE_PROFILES: options.only || "backend,frontend",
      },
    });
  }
}
