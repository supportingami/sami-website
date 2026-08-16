import chalk from "chalk";
import { Command } from "commander";
import type { ConcurrentlyCommandInput } from "concurrently";
import concurrently from "concurrently";
import { copySync, emptyDirSync, ensureDirSync } from "fs-extra";
import { resolve } from "path";
import execa from "execa";

import { PATHS } from "../../paths";
import {
  buildWithVercel,
  deployToVercel,
  loadEnv,
  promptConfirm,
  pruneUnoptimizedUploads,
  serveStaticDirectory,
  waitForAnyInput,
} from "../../utils";

/***************************************************************************************
 * Types & CLI Options
 *************************************************************************************/

interface IProgramOptions {
  /** Specify whether to preview locally */
  preview?: boolean;
  /** Specify whether to deploy to server */
  deploy?: boolean;
  /** Specify whether to force tgz archive for deployment */
  archive?: boolean;
  /** Specify whether to export data prior to build */
  export?: boolean;
  /** Next config mode */
  config: "standalone" | "export";
  /** Specify whether to start the backend server during build (default: True) */
  backend?: boolean;
  /** Specify environment */
  environment: string;
  /** Specify whether to run next-export-optimize-images (default: True) */
  optimizeImages?: boolean;
}

/***************************************************************************************
 * Command Registration
 *************************************************************************************/

const program = new Command("build");
export default program
  .description("Build and optionally deploy static site export")
  .option("-e --environment <string>", "Specify environment", "development")
  .option("-p --preview", "Preview build locally")
  .option("--no-preview", "Do not preview build locally")
  .option("-d --deploy", "Deploy build")
  .option("--no-deploy", "Do not deploy build")
  .option("-a --archive", "Use tgz archive upload for Vercel deployment (avoid file count rate limit)")
  .option("--backend", "Start backend server", true)
  .option("--no-backend", "Skip starting backend server (if already running)")
  .option("-e --export", "Export local data")
  .option("--no-export", "Do not export local data")
  .option("-c --config <string>", "Next config mode, 'standalone' or 'export'", "export")
  .option("--optimize-images", "Optimize images after static export (default: true)", true)
  .option("--no-optimize-images", "Skip image optimization after static export")
  .action(async (options: IProgramOptions) => {
    console.log(`Generate ${options.config} build`);
    return new BuildDeploySSGCommand(options).run().then(() => process.exit(0));
  });

/***************************************************************************************
 * Build & Deploy SSG Command
 *************************************************************************************/

/**
 * Creates a static-site generated export and optionally deploys to Vercel hosting.
 *
 * Pipeline steps:
 * 1. Sync public data uploads to frontend/public
 * 2. Start Strapi backend & Next.js static export concurrently
 * 3. Prune duplicate un-optimized images from static export folders
 * 4. (Optional) Launch local preview web server
 * 5. (Optional) Build with Vercel CLI & deploy with automatic --archive=tgz fallback
 */
class BuildDeploySSGCommand {
  constructor(private options: IProgramOptions) {}

  public async run() {
    let { export: shouldExport, preview: shouldPreview, deploy: shouldDeploy } = this.options;
    const { environment } = this.options;

    // 1. Environment & data export preparation
    await loadEnv(environment, { skipHealthcheck: true });
    if (shouldExport === undefined) {
      shouldExport = await promptConfirm("Would you like to export data first?", false);
    }
    if (shouldExport) {
      console.log(chalk.gray("Ensuring data exported"));
      await execa(`yarn scripts strapi export -e ${environment}`, {
        cwd: PATHS.rootDir,
        shell: true,
        stdio: "inherit",
      });
    }

    // 2. Synchronize upload assets into frontend public directory
    this.syncPublicAssets();

    // 3. Run build processes
    await this.exportStaticSite();

    // 4. Clean duplicate unoptimized raster images from export directory
    this.pruneRedundantImages();

    // 5. Optional local preview server
    if (shouldPreview === undefined) {
      shouldPreview = await promptConfirm("Would you like to preview the build locally?", true);
    }
    if (shouldPreview) {
      await serveStaticDirectory(resolve(PATHS.frontendDir, "out"));
    }

    // 6. Optional Vercel deployment with archive fallback
    if (shouldDeploy === undefined) {
      shouldDeploy = await promptConfirm("Would you like to deploy the build?", true);
    }
    if (shouldDeploy) {
      await this.deploy();
    }

    // Keep process alive if preview server was launched
    if (shouldPreview) {
      await waitForAnyInput("Press any key to terminate preview server");
    }
  }

  /* -----------------------------------------------------------------------------------
   * Build Pipeline Steps
   * --------------------------------------------------------------------------------- */

  /** Copy all public uploads from data directory to frontend public directory */
  private syncPublicAssets() {
    const srcDir = resolve(PATHS.dataDir, "public");
    const targetDir = resolve(PATHS.frontendDir, "public");
    ensureDirSync(targetDir);
    emptyDirSync(targetDir);
    copySync(srcDir, targetDir);
  }

  /** Run backend server and frontend build script concurrently */
  private async exportStaticSite() {
    const commands: ConcurrentlyCommandInput[] = [this.getFrontendBuildCommand()];
    if (this.options.backend) {
      commands.push(this.getBackendStartCommand());
    }

    console.log(chalk.gray("\nGenerating a static site export...\n"));
    const { result } = concurrently(commands, {
      ["killOthers" as any]: ["failure", "success"],
      successCondition: "first",
    });
    await result;
    console.log(chalk.green("\nBuild Success\n"));
  }

  /**
   * Strip duplicate raster images from output directories to minimize upload payload size.
   * Keeps non-image files (PDFs, SVGs) in place.
   */
  private pruneRedundantImages() {
    const targetUploadDirs = [
      resolve(PATHS.frontendDir, "out", "uploads"),
      resolve(PATHS.frontendDir, ".vercel", "output", "static", "uploads"),
    ];
    const pruned = pruneUnoptimizedUploads(targetUploadDirs);
    if (pruned > 0) {
      console.log(chalk.gray(`Pruned ${pruned} redundant un-optimized images from build output`));
    }
  }

  /** Build prebuilt bundle and deploy to Vercel with archive fallback */
  private async deploy() {
    // 1. Compile Vercel build bundle
    await buildWithVercel({ cwd: PATHS.frontendDir, prod: true });

    // 2. Ensure un-optimized images are pruned from .vercel/output/static/uploads
    this.pruneRedundantImages();

    // 3. Deploy prebuilt bundle (with automatic --archive=tgz fallback)
    await deployToVercel({
      cwd: PATHS.frontendDir,
      prod: true,
      prebuilt: true,
      skipDomain: true,
      archive: this.options.archive,
      beforeRetry: () => this.pruneRedundantImages(),
    });
  }

  /* -----------------------------------------------------------------------------------
   * Sub-process Command Generators
   * --------------------------------------------------------------------------------- */

  /** Backend Strapi development server command */
  private getBackendStartCommand(): ConcurrentlyCommandInput {
    return {
      name: "strapi",
      command: "yarn start",
      cwd: PATHS.backendDir,
      prefixColor: "#8F76FF",
    };
  }

  /** Frontend Next.js build command */
  private getFrontendBuildCommand(): ConcurrentlyCommandInput {
    const { config: NEXT_CONFIG_MODE } = this.options;
    const waitOnBin = resolve(PATHS.scriptsDir, "node_modules", ".bin", "wait-on");
    let buildScript = "yarn next build";

    if (NEXT_CONFIG_MODE === "export") {
      const optimize = this.options.optimizeImages !== false;
      buildScript = optimize ? "yarn next build && yarn next-export-optimize-images" : "yarn next build";
    }

    return {
      name: "nextjs",
      command: `${waitOnBin} http://localhost:1337 && ${buildScript}`,
      cwd: PATHS.frontendDir,
      prefixColor: "bgBlack.white",
      env: {
        NEXT_CONFIG_MODE,
        NODE_ENV: "production",
      },
    };
  }
}
