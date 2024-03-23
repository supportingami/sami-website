import { Command } from "commander";
import execa from "execa";

import { PATHS } from "../../paths";
import { BASE_TAG } from "./build";
import chalk from "chalk";
import { loadEnv } from "../../utils";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  only?: string;
}

const program = new Command("push");
export default program
  .description("Push images to dockerhub")
  .option("-o --only <string>", "Only push specific images", "backend,frontend")

  .action(async (options: IProgramOptions) => {
    return new DockerRunCmd(options).push().then(() => process.exit(0));
  });

const useGCR = true;
/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Push locally built images to docker hub
 * NOTE - assumes user logged into docker with access to repo
 * https://hub.docker.com/repositories/samicharity
 */
class DockerRunCmd {
  constructor(private options: IProgramOptions) {}

  public async push() {
    await loadEnv("docker");

    const { only } = this.options;
    const images = ["backend", "frontend"].filter((target) => only.includes(target));
    for (const image of images) {
      for (const tag of ["latest", BASE_TAG]) {
        const imageName = useGCR
          ? `europe-west1-docker.pkg.dev/sami-website-365718/sami-website/${image}:${tag}`
          : `samicharity/${image}:${tag}`;
        const cmd = `docker push ${imageName}`;
        console.log(chalk.gray(cmd));
        await execa(cmd, { cwd: PATHS.rootDir, shell: true, stdio: "inherit" });
      }
    }
  }
}
