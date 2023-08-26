import chalk from "chalk";
import { Command } from "commander";
import type { ConcurrentlyCommandInput } from "concurrently";
import concurrently from "concurrently";
import { createServer } from "http";
import open from "open";
import { resolve } from "path";
import handler from "serve-handler";

import { loadEnv } from "../../utils";
import { PATHS } from "../../paths";
import { copySync, mkdirSync } from "fs-extra";
import { promptConfirm, waitForAnyInput } from "../../utils/cli.utils";
import execa from "execa";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {}

const program = new Command("build");
export default program.description("Build deployment images").action(async (options: IProgramOptions) => {
  console.log("Creating static generated build");
  return new BuildCmd().run(options).then(() => process.exit(0));
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Create a static-site generated exported and deploy to Vercel hosting.
 *
 * Main steps:
 * - Start the strapi backend server
 * - Create a next static site build.
 * - Export static build for deployment to static server
 * - Optionally preview build
 * - Optionally deploy to vercel
 */
class BuildCmd {
  public async run(options: IProgramOptions) {
    // Deployments will always read data from local development server
    // If wanting to use other data it must first be impoorted locally
    await loadEnv("development");
    // Start backend server and call build script once running
    const backendCmd = this.getBackendStartCommand();
    const buildCmd = this.getBuildCommand();
    console.log(chalk.gray("\nThis command will start a backend server and then generate a static site export...\n"));
    const { result } = concurrently([backendCmd, buildCmd], {
      ["killOthers" as any]: ["failure", "success"],
      successCondition: "first",
    });
    await result;

    // Copy backend uploads to build directory
    this.copyBackendUploads();
    console.log(chalk.green("\nBuild Success\n"));

    // Optionally serve a preview of the built site
    const shouldPreview = await promptConfirm("Would you like to preview the build locally?", true);
    if (shouldPreview) {
      await this.serveBuild();
    }

    // Optionally deploy to vercel
    const shouldDeploy = await promptConfirm("Would you like to deploy the build?", true);
    if (shouldDeploy) {
      let cmd = `vercel`;
      const isProduction = await promptConfirm("Use production deployment?", false);
      if (isProduction) {
        cmd += ` --prod`;
      }
      await execa(cmd, { stdio: "inherit", cwd: PATHS.rootDir });
    }
    // Wait for key press to terminate running preview server
    if (shouldPreview) {
      await waitForAnyInput("Press any key to terminate preview server");
    }
  }

  /** Run simple development backend server */
  private getBackendStartCommand(): ConcurrentlyCommandInput {
    const command = `yarn start`;
    return { name: "strapi", command, cwd: PATHS.backendDir, prefixColor: "#8F76FF" };
  }

  private getBuildCommand(): ConcurrentlyCommandInput {
    // use wait-on to wait for backend server to be ready before building
    const waitOnBinPath = resolve(PATHS.scriptsDir, "node_modules", ".bin", "wait-on");
    return {
      name: "nextjs",
      command: `${waitOnBinPath} http://localhost:1337 && yarn build:ssg`,
      cwd: PATHS.rootDir,
      prefixColor: "bgBlack.white",
      //   use local 'public' folder for image hosting where images will be copied to
      env: {
        NEXT_PUBLIC_IMAGE_URL: "public",
      },
    };
  }

  /**
   * Copy all public uploads from backend to build directory to include in static site
   */
  private copyBackendUploads() {
    const srcDir = resolve(PATHS.backendDir, "public");
    const targetDir = resolve(PATHS.frontendDir, "out", "public");
    mkdirSync(targetDir);
    copySync(srcDir, targetDir);
  }

  /**
   * Use Vercel's `serve-handler` package to run a local webserver for generated content
   * Once running open user browser to view
   * */
  private async serveBuild() {
    return new Promise((promiseResolve) => {
      const server = createServer((request, response) => {
        // Serve config to replicate similar to root vercel.json
        return handler(request, response, {
          cleanUrls: true,
          rewrites: [{ source: "/", destination: "/home.html" }],
          public: resolve(PATHS.frontendDir, "out"),
          directoryListing: false,
        });
      });

      server.listen(3000, async () => {
        const serveTarget = "http://localhost:3000";
        console.log(chalk.green(`\nPreview running at ${serveTarget}\n`));
        open(serveTarget);
        promiseResolve(true);
      });
    });
  }
}
