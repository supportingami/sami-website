import { execSync } from "child_process";
import { Command } from "commander";
import { emptyDirSync, ensureDirSync, rmSync, copySync, readFileSync, writeFileSync } from "fs-extra";
import { resolve } from "path";
import { PATHS } from "../../paths";
import { getBackendEnv, getFrontendEnv } from "../../utils";

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

const FRONTEND_BUILD_DIR = resolve(PATHS.rootDir, "dist", "frontend");

/**
 * ...
 *
 * Adapted from 
 * https://github.dev/vercel/next.js/blob/canary/examples/with-docker-multi-env/docker/development/Dockerfile#L39

 */
class DeployCmd {
  allCommands = [];

  public async run() {
    // Assume built
    // copySync(resolve(STANDALONE_DIR, ".next/standalone"), resolve(STANDALONE_DIR), { overwrite: true });
    // this.hackUpdateDist();
    // writeFileSync(resolve(STANDALONE_DIR, "yarn.lock"), "");
    // // install deps along with sharp
    // execSync("yarn add sharp", { cwd: STANDALONE_DIR, stdio: "inherit" });
    // rmSync(resolve(STANDALONE_DIR, ".yarn"), { recursive: true });
  }
  private hackUpdateDist() {
    // const serverJsPath = resolve(STANDALONE_DIR, "server.js");
    // const serverJsContent = readFileSync(serverJsPath, "utf8");
    // const replacedContent = serverJsContent.replace(/"distDir":"[^"]*"/g, '"distDir":"./.next"');
    // writeFileSync(serverJsPath, replacedContent);
  }
}

//   private copyBuild() {
//     copySync(FRONTEND_BUILD_DIR, resolve(HOSTING_FUNCTIONS_DIR, ".next"), { recursive: true });
//   }

//   private copyStaticPages() {
//     const pagesDir = resolve(FRONTEND_BUILD_DIR, "server", "pages");
//     for (const pageName of readdirSync(pagesDir).filter((name) => name.endsWith(".html")))
//       copySync(resolve(FRONTEND_BUILD_DIR, "server", "pages", pageName), resolve(STANDALONE_DIR, pageName));
//   }
//   private copyPublicFolder() {
//     const publicDir = resolve(FRONTEND_BUILD_DIR, "public");
//     copySync(publicDir, STANDALONE_DIR, { recursive: true });
//     copySync(publicDir, resolve(HOSTING_FUNCTIONS_DIR, "public"), { recursive: true });
//   }
//   private copyStatic() {
//     const staticDir = resolve(FRONTEND_BUILD_DIR, "static");
//     copySync(staticDir, resolve(STANDALONE_DIR, "_next", "static"), { recursive: true });
//   }
//   private writeFirebaseJson() {
//     writeJSONSync(resolve(STANDALONE_DIR, "firebase.json"), {
//       hosting: {
//         // TODO - new examples use 'source' instead of public, however need to bypass discovery functions
//         // although that seems more suited for pre-production
//         public: "public",
//         ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
//       },
//       functions: {
//         source: "functions",
//       },
//     });
//     copySync(resolve(PATHS.rootDir, ".firebaserc"), resolve(STANDALONE_DIR, ".firebaserc"));
//   }
//   private async writeEnv() {
//     const backendEnv = await getBackendEnv();
//     const frontendEnv = getFrontendEnv();
//     // TODO - should be possible to get everything from frontend only
//     // (not receiving NEXT_PUBLIC_API_URL which is inherited from additional env file)
//     const { STRAPI_READONLY_TOKEN, STRAPI_FULLACCESS_TOKEN } = frontendEnv.parsed;
//     const { NEXT_PUBLIC_API_URL } = backendEnv.parsed.parsed;

//     const deploymentEnv = this.jsonToEnv({
//       NEXT_PUBLIC_API_URL,
//       STRAPI_READONLY_TOKEN,
//       STRAPI_FULLACCESS_TOKEN,
//       ["__FIREBASE_FRAMEWORKS_ENTRY__"]: "next.js", // used by firebase-frameworks (not required for self-api methods)
//     });
//     writeFileSync(resolve(HOSTING_FUNCTIONS_DIR, ".env"), deploymentEnv);
//   }

//   private jsonToEnv(jsonEnv: Record<string, string>) {
//     return Object.entries(jsonEnv)
//       .map(([key, value]) => `${key}=${value}`)
//       .join("\n");
//   }
// }
