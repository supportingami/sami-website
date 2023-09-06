import { Command } from "commander";
import execa from "execa";

import { PATHS } from "../../paths";
import { BASE_TAG } from "./build";
import chalk from "chalk";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {}

const program = new Command("push");
export default program.description("Push images to dockerhub").action(async (options: IProgramOptions) => {
  return new DockerRunCmd(options).push().then(() => process.exit(0));
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Push locally built images to docker hub
 * NOTE - assumes user logged into docker with access to repo
 */
class DockerRunCmd {
  constructor(private options: IProgramOptions) {}

  public async push() {
    const images = ["backend", "frontend"];
    for (const image of images) {
      for (const tag of ["latest", BASE_TAG]) {
        const imageName = `samicharity/${image}:${tag}`;
        const cmd = `docker push ${imageName}`;
        console.log(chalk.gray(cmd));
        await execa(cmd, { cwd: PATHS.rootDir, shell: true, stdio: "inherit" });
      }
    }
  }
}
