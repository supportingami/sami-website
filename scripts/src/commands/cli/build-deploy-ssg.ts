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
import { copySync, emptyDirSync, ensureDirSync } from "fs-extra";
import { promptConfirm, waitForAnyInput } from "../../utils/cli.utils";
import execa from "execa";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

interface IProgramOptions {
  /** Specify whether to preview locally */
  preview?: boolean;
  /** Specify whether to deploy to server */
  deploy?: boolean;
  /** Specify whether to export data prior to build */
  export?: boolean;
  /** Next config mode */
  config: "standalone" | "export";
  /** Specify whether to start the backend server during build (default: True)*/
  backend?: boolean;
  /** Specify environment */
  environment: "string";
}

const program = new Command("build");
export default program
  .description("Build deployment images")
  .option("-e --environment <string>", "Specify environment", "development")
  .option("-p --preview", "Preview build locally")
  .option("--no-preview", "Do not preview build locally")
  .option("-d --deploy", "Deploy build")
  .option("--no-deploy", "Do not deploy build")
  .option("--backend", "Start backend server", true)
  .option("--no-backend", "Skip starting backend server (if already running)")
  .option("-e --export", "Export local data")
  .option("--no-export", "Do not export local data")
  .option("-c --config <string>", "Next config mode, 'standalone' or 'export'", "export")
  .action(async (options: IProgramOptions) => {
    console.log(`Generate ${options.config} build`);
    return new BuildCmd(options).run().then(() => process.exit(0));
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
 *
 * NOTES
 * Static site used instead of nextJS server as local build required (to pull from strapi)
 * but deploy to vercel does not work from local (at least on windows, symlinks not uploaded)
 *
 * Vercel does support serverless functions, but folder structure slightly different than nextjs
 * and a corresponding package.json to support imports
 */
class BuildCmd {
  constructor(private options: IProgramOptions) {}
  public async run() {
    let { export: shouldExport, preview: shouldPreview, deploy: shouldDeploy } = this.options;
    const { environment } = this.options;
    // Deployments will always read data from local development server
    // If wanting to use other data it must first be imported locally
    await loadEnv(environment, { skipHealthcheck: true });

    // Ensure data exported
    if (shouldExport === undefined) {
      shouldExport = await promptConfirm("Would you like to export local data first?", false);
    }
    if (shouldExport) {
      console.log(chalk.gray("Ensuring data exported"));
      await execa(`yarn scripts strapi export -e ${environment}`, {
        cwd: PATHS.rootDir,
        shell: true,
        stdio: "inherit",
      });
    }

    this.preBuild();

    // Start backend server and call build script once running
    const buildCmd = this.getFrontendBuildCommand();
    const commands = [buildCmd];
    if (this.options.backend) {
      const backendCmd = this.getBackendStartCommand();
      commands.push(backendCmd);
    }
    console.log(chalk.gray("\nGenerating a static site export...\n"));
    const { result } = concurrently(commands, {
      ["killOthers" as any]: ["failure", "success"],
      successCondition: "first",
    });
    await result;

    console.log(chalk.green("\nBuild Success\n"));

    // Optionally serve a preview of the built site
    if (shouldPreview === undefined) {
      shouldPreview = await promptConfirm("Would you like to preview the build locally?", true);
    }
    if (shouldPreview) {
      await this.serveBuild();
    }

    // Optionally deploy to vercel
    if (shouldDeploy === undefined) {
      shouldDeploy = await promptConfirm("Would you like to deploy the build?", true);
    }
    if (shouldDeploy) {
      // Use vercel build locally to copy next build and package functions, then deploy prebuilt
      const cmd = `yarn vercel build && yarn vercel deploy --prebuilt`;
      await execa(cmd, { stdio: "inherit", cwd: PATHS.frontendDir });
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

  /**
   * Depending on nextjs build mode (standalone or export) prepare different scripts
   */
  private getFrontendBuildCommand(): ConcurrentlyCommandInput {
    const { config: NEXT_CONFIG_MODE } = this.options;
    // use wait-on to wait for backend server to be ready before building
    const waitOnBin = resolve(PATHS.scriptsDir, "node_modules", ".bin", "wait-on");
    let buildScript: string;

    // When building static export create nextJS build and optimize images
    if (NEXT_CONFIG_MODE === "export") {
      buildScript = `yarn next build && yarn next-export-optimize-images`;
    }
    // If building for standalone deployment will still need to call `yarn vercel build` later
    if (NEXT_CONFIG_MODE === "standalone") {
      buildScript = `yarn next build`;
    }
    return {
      name: "nextjs",
      command: `${waitOnBin} http://localhost:1337 && ${buildScript}`,
      cwd: PATHS.frontendDir,
      prefixColor: "bgBlack.white",
      //   use local folder for image hosting which will also use optimised folders
      env: {
        NEXT_CONFIG_MODE,
        // HACK - when building export need to ensure not dev environment
        // https://github.com/vercel/next.js/issues/56481
        NODE_ENV: "production",
      },
    };
  }

  /**
   * Copy all public uploads from data to build directory to include in static site
   */
  private preBuild() {
    // Copy all public uploads from data to build directory to include in static site
    const srcDir = resolve(PATHS.dataDir, "public");
    const targetDir = resolve(PATHS.frontendDir, "public");
    // TODO - ideally want to rsync for better caching
    ensureDirSync(targetDir);
    emptyDirSync(targetDir);
    copySync(srcDir, targetDir);
  }

  /**
   * Use Vercel's `serve-handler` package to run a local webserver for generated content
   * Once running open user browser to view
   * TODO - probably better to use vercel CLI instead with config
   * `yarn vercel dev --cwd frontend/out`
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
