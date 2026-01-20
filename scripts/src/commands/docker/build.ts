import chalk from "chalk";
import { Command } from "commander";
import execa from "execa";

import { loadEnv } from "../../utils";
import { PATHS } from "../../paths";
import packageJson from "../../../../package.json";

// version number to tag base image with
export const BASE_TAG = packageJson.version;

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  only?: "base" | "backend" | "frontend";
}

const program = new Command("build");
export default program
  .description("Build standalone images")
  .option(
    "-o --only <string>",
    "Only build single step, allowed comma-separated 'base', 'backend', 'frontend'",
    "base,backend,frontend",
  )
  .action(async (options: IProgramOptions) => {
    return new DockerBuildCmd().run(options).then(() => process.exit(0));
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * ...
 */
class DockerBuildCmd {
  allCommands = [];

  public async run(options: IProgramOptions) {
    const { only } = options;
    const buildTargets = ["base", "backend", "frontend", "gcs_fuse"].filter((target) => only.includes(target));

    // TODO - create `.env` in docker file instead of loading global config

    await loadEnv("docker");
    if (buildTargets.includes("base")) {
      await this.buildBase();
    }
    if (buildTargets.includes("backend")) {
      console.log(chalk.blue("Building strapi admin..."));
      await this.buildBackend();
      // TODO - ensure backend bootstrapped and populate keys to docker/data .env
    }
    if (buildTargets.includes("gcs_fuse")) {
      await this.buildGCSFuse();
    }
    if (buildTargets.includes("frontend")) {
      //  Build locally frontend and backend locally
      const cmd = `yarn build --no-export --no-preview --no-deploy --config standalone`;
      await execa(cmd, { cwd: PATHS.rootDir, shell: true, stdio: "inherit" });
      await this.buildFrontend();
    }
  }

  private async buildBase() {
    console.log(chalk.blue("Building base..."));
    const tags = this.getTags("base");
    const args = `${tags} --build-arg "ENV_NAME=development"`;
    const cmd = `docker build --file docker/base.dockerfile ${args} .`;
    console.log(chalk.gray(cmd));
    await execa(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
    console.log(chalk.green("Built base"));
  }

  private async buildBackend() {
    console.log(chalk.blue("Building backend..."));
    const tags = this.getTags("backend", true);
    const secrets = this.getSecrets();
    const args = `${tags} --build-arg "ENV_NAME=development" --build-arg "BASE_TAG=${BASE_TAG}" ${secrets}`;
    const cmd = `docker build --file docker/backend.dockerfile ${args} .`;
    console.log(chalk.gray(cmd));
    await execa(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
    console.log(chalk.green("Built backend"));
  }

  private async buildGCSFuse() {
    console.log(chalk.blue("Building gcs_fuse..."));
    const tags = this.getTags("gcs_fuse");
    const args = `${tags} --build-arg "ENV_NAME=development" --build-arg "BASE_TAG=${BASE_TAG}"`;
    const cmd = `docker build --file docker/gcs_fuse.dockerfile ${args} .`;
    console.log(chalk.gray(cmd));
    await execa(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
    console.log(chalk.green("Built gcs_fuse"));
  }

  private async buildFrontend() {
    console.log(chalk.blue("Building frontend..."));
    const tags = this.getTags("frontend", true);
    const args = `${tags} --build-arg "ENV_NAME=development" --build-arg "BASE_TAG=${BASE_TAG}"`;
    const cmd = `docker build --file docker/frontend.dockerfile ${args} .`;
    console.log(chalk.gray(cmd));
    await execa(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
    console.log(chalk.green("Built frontend"));
  }

  private getTags(imageName: string, includeGCR = false) {
    const dockerRepo = `samicharity`;
    const tags = [`${dockerRepo}/${imageName}:latest`, `${dockerRepo}/${imageName}:${BASE_TAG}`];
    if (includeGCR) {
      const gcrRepo = `europe-west1-docker.pkg.dev/sami-website-365718/sami-website`;
      tags.push(`${gcrRepo}/${imageName}:latest`);
      tags.push(`${gcrRepo}/${imageName}:${BASE_TAG}`);
    }
    return `--tag ${tags.join(" --tag ")}`;
  }

  // Pass .env files as build secrets to use as required
  private getSecrets() {
    return `--secret id=_env,src=config/docker.env`;
  }
}
