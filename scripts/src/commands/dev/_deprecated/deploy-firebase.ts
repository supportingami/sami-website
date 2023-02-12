import { Command } from "commander";
import { emptyDirSync, ensureDirSync, readdirSync, cpSync, writeJSONSync, writeFileSync } from "fs-extra";
import { resolve } from "path";
import { PATHS } from "../../../paths";
import { getBackendEnv, getFrontendEnv } from "../../../utils";

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
 * ...
 *
 * Adapted from https://github.dev/firebase/firebase-tools/blob/master/src/frameworks/next/index.ts
 * https://github.dev/jthegedus/firebase-gcp-examples/tree/main/functions-nextjs
 * https://github.com/vercel/next.js/blob/canary/examples/with-firebase-hosting
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
    await this.writeEnv();
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
        // TODO - new examples use 'source' instead of public, however need to bypass discovery functions
        // although that seems more suited for pre-production
        public: "public",
        ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
      },
      functions: {
        source: "functions",
      },
    });
    cpSync(resolve(PATHS.rootDir, ".firebaserc"), resolve(HOSTING_PUBLIC_DIR, ".firebaserc"));
  }
  private async writeEnv() {
    const backendEnv = await getBackendEnv();
    const frontendEnv = getFrontendEnv();
    // TODO - should be possible to get everything from frontend only
    // (not receiving NEXT_PUBLIC_API_URL which is inherited from additional env file)
    const { STRAPI_READONLY_TOKEN, STRAPI_FULLACCESS_TOKEN } = frontendEnv.parsed;
    const { NEXT_PUBLIC_API_URL } = backendEnv.parsed.parsed;

    const deploymentEnv = this.jsonToEnv({
      NEXT_PUBLIC_API_URL,
      STRAPI_READONLY_TOKEN,
      STRAPI_FULLACCESS_TOKEN,
      ["__FIREBASE_FRAMEWORKS_ENTRY__"]: "next.js", // used by firebase-frameworks (not required for self-api methods)
    });
    writeFileSync(resolve(HOSTING_FUNCTIONS_DIR, ".env"), deploymentEnv);
  }

  private jsonToEnv(jsonEnv: Record<string, string>) {
    return Object.entries(jsonEnv)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");
  }
}
