import { Command } from "commander";
import { emptyDirSync, ensureDirSync, readdirSync, cpSync, writeJSONSync } from "fs-extra";
import { resolve } from "path";
import { PATHS } from "../../paths";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

const program = new Command("deploy");
export default program.description("Start local development server").action(async () => {
  return new DeployCmd().run().then(() => process.exit(0));
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

const FRONTEND_BUILD_DIR = resolve(PATHS.frontendDir, ".next");
const HOSTING_PUBLIC_DIR = resolve(PATHS.rootDir, "hosting", "public");
const HOSTING_FUNCTIONS_DIR = resolve(PATHS.rootDir, "hosting", "functions");

/**
 * Generate a list of all commands available in scripts workspace
 * and write as a markdown table in the docs folder
 */
class DeployCmd {
  allCommands = [];

  public async run() {
    // Asusme built

    ensureDirSync(HOSTING_PUBLIC_DIR);
    emptyDirSync(HOSTING_PUBLIC_DIR);

    this.copyBuild();
    this.copyPublicFolder();
    this.copyStaticPages();
    this.copyStatic();
    this.writeFirebaseJson();
  }
  private copyBuild() {
    cpSync(FRONTEND_BUILD_DIR, resolve(HOSTING_FUNCTIONS_DIR, ".next"), { recursive: true });
  }

  private copyStaticPages() {
    const pagesDir = resolve(FRONTEND_BUILD_DIR, "server", "pages");
    for (const pageName of readdirSync(pagesDir).filter((name) => name.endsWith(".html")))
      cpSync(resolve(FRONTEND_BUILD_DIR, "server", "pages", pageName), resolve(HOSTING_PUBLIC_DIR, pageName));
  }
  private copyPublicFolder() {
    const publicDir = resolve(FRONTEND_BUILD_DIR, "public");
    cpSync(publicDir, HOSTING_PUBLIC_DIR, { recursive: true });
    cpSync(publicDir, resolve(HOSTING_FUNCTIONS_DIR, "public"), { recursive: true });
  }
  private copyStatic() {
    const staticDir = resolve(FRONTEND_BUILD_DIR, "static");
    cpSync(staticDir, resolve(HOSTING_PUBLIC_DIR, "_next", "static"), { recursive: true });
  }
  private writeFirebaseJson() {
    writeJSONSync(resolve(HOSTING_PUBLIC_DIR, "firebase.json"), {
      hosting: {
        public: "public",
        ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
      },
      functions: {
        source: "functions",
      },
    });
    cpSync(resolve(PATHS.rootDir, ".firebaserc"), resolve(HOSTING_PUBLIC_DIR, ".firebaserc"));
  }
}
