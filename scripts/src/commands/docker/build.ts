import chalk from "chalk";
import { Command } from "commander";
import execa from "execa";

import { loadEnv } from "../../utils";
import { PATHS } from "../../paths";
import packageJson from "../../../../package.json";
import { spawnSync } from "child_process";

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
    "base,backend,frontend"
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
    const buildTargets = ["base", "backend", "frontend"].filter((target) => only.includes(target));

    // TODO - create `.env` in docker file instead of loading global config

    await loadEnv("docker");
    if (buildTargets.includes("base")) {
      await this.buildBase();
    }
    if (buildTargets.includes("backend")) {
      console.log(chalk.blue("Building strapi admin..."));
      // prefer spawn over execa due to memory issues on server
      spawnSync(`yarn workspace backend build`, {
        cwd: PATHS.rootDir,
        shell: true,
        stdio: "inherit",
        // ensure docker config files used
        env: { NODE_ENV: "docker", DATABASE_URL: "will_populate_later", NODE_OPTIONS: "--max_old_space_size=2048" },
      });
      await this.buildBackend();
      // TODO - ensure backend bootstrapped and populate keys to docker/data .env
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
    const args = `--tag samicharity/base:latest --tag samicharity/base:${BASE_TAG} --build-arg "ENV_NAME=development"`;
    const cmd = `docker build --file docker/base.dockerfile ${args} .`;
    console.log(chalk.gray(cmd));
    await execa(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
    console.log(chalk.green("Built base"));
  }

  private async buildBackend() {
    console.log(chalk.blue("Building backend..."));
    const args = `--tag samicharity/backend:latest --tag samicharity/backend:${BASE_TAG} --build-arg "ENV_NAME=development" --build-arg "BASE_TAG=${BASE_TAG}"`;
    const cmd = `docker build --file docker/backend.dockerfile ${args} .`;
    console.log(chalk.gray(cmd));
    await execa(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
    console.log(chalk.green("Built backend"));
  }
  private async buildFrontend() {
    console.log(chalk.blue("Building frontend..."));
    const args = `--tag samicharity/frontend:latest --tag samicharity/frontend:${BASE_TAG} --build-arg "ENV_NAME=development" --build-arg "BASE_TAG=${BASE_TAG}"`;
    const cmd = `docker build --file docker/frontend.dockerfile ${args} .`;
    console.log(chalk.gray(cmd));
    await execa(cmd, { stdio: "inherit", shell: true, cwd: PATHS.rootDir });
    console.log(chalk.green("Built frontend"));
  }
}
