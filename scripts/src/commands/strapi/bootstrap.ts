import { spawnSync } from "child_process";
import { Command } from "commander";
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import strapi from "../../../../backend/node_modules/@strapi/strapi";
import type { Strapi as IStrapi } from "../../../../backend/node_modules/@strapi/strapi";
import { PATHS } from "../../paths";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {}
const program = new Command("bootstrap");
export default program
  .description("Bootstrap strapi for development")
  .action(async (options: Partial<IProgramOptions>) => {
    const optionsWithDefaults: IProgramOptions = {
      outDir: PATHS.sharedDir,
      ...options,
    };
    await new StrapiBootstrap(optionsWithDefaults).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * ...
 **/

class StrapiBootstrap {
  constructor(public options: IProgramOptions) {}
  public async run() {
    await this.addApiToken();
    this.addAdminUser();
  }
  private addAdminUser() {
    // const args = `--firstname=SAMI --lastname=Admin --email=admin@supportingami.org`;
    const cmd = `yarn strapi admin:create-user`;
    spawnSync(cmd, {
      stdio: "inherit",
      cwd: PATHS.backendDir,
      shell: true,
      env: { ENV_PATH: "./.env.development" },
    });
  }

  /**
   * Programatically add an access key to strapi
   * Adapted from Strapi packages/core/admin/server/services/api-token.js
   * https://github.dev/strapi/strapi/blob/7039c0d22836c94457130515b3a55eb93d2411f8/packages/core/admin/server/services/api-token.js#L64
   * @param shouldHash
   */
  private async addApiToken(shouldHash = true) {
    // Start up a strapi server instance
    const envPath = path.resolve(PATHS.backendDir, ".env.development");
    process.env.ENV_PATH = envPath;
    dotenv.config({ path: process.env.ENV_PATH });
    const app: IStrapi = await strapi({
      appDir: PATHS.backendDir,
      distDir: PATHS.backendDir, // non-ts so no compiled folder
      autoReload: false,
      serveAdminPanel: false,
    });
    await app.start();

    // Add access key
    const attributes = {
      name: `test-readonly`,
      description: "api-token_tests-description",
      type: "read-only",
    };
    let accessKey = "test1234";
    if (shouldHash) {
      const salt = app.config.get("admin.apiToken.salt");
      accessKey = hash(accessKey, salt);
    }
    const SELECT_FIELDS = ["id", "name", "description", "type", "createdAt"];
    const apiToken = await app.query("admin::api-token").create({
      select: SELECT_FIELDS,
      data: { ...attributes, accessKey },
    });
    console.log("apiToken created", apiToken);
    console.log("\n" + accessKey + "\n");
    app.stop(0);
  }
}
function hash(accessKey: string, salt: string) {
  return crypto.createHmac("sha512", salt).update(accessKey).digest("hex");
}
