import { spawnSync } from "child_process";
import { Command } from "commander";
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import strapi from "../../../../backend/node_modules/@strapi/strapi";
import type { Strapi as IStrapi } from "../../../../backend/node_modules/@strapi/strapi";
import { PATHS } from "../../paths";
import { existsSync } from "fs";
import * as fs from "fs-extra";

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
class StrapiBootstrap {
  app: IStrapi;
  private adminToken: { accessKey: string };
  private adminTokenFields = ["id", "name", "description", "type", "createdAt"];

  constructor(public options: IProgramOptions) {}

  public async run() {
    await this.startStrapiInstance();
    this.adminToken = await this.checkAccessTokens();
    if (!this.adminToken) {
      await this.addAdminToken();
      this.writeFrontendEnvToken();
    }
    this.stopStrapiInstance();
  }

  /** Run a standalone server instance for strapi */
  private async startStrapiInstance() {
    // configure environment in same way as when running from backend
    const envPath = path.resolve(PATHS.backendDir, ".env.development");
    process.env.ENV_PATH = envPath;

    dotenv.config({ path: process.env.ENV_PATH });
    process.env.DATABASE_FOLDER = path.resolve(PATHS.backendDir);
    this.app = await strapi({
      appDir: PATHS.backendDir,
      distDir: PATHS.backendDir, // non-ts so no compiled folder
      autoReload: false,
      serveAdminPanel: false,
    });
    // ensure db uses same file as backend
    this.app.config.database.connection.connection.filename = path.resolve(
      PATHS.backendDir,
      process.env.DATABASE_FILENAME || ".tmp/data.db"
    );
    await this.app.start();
  }

  private stopStrapiInstance() {
    return this.app.stop();
  }

  /** Query database to see if admin access tokens populated or not */
  private async checkAccessTokens() {
    let tokenName = "admin-readonly";

    const salt = this.app.config.get("admin.apiToken.salt");
    if (!salt) {
      console.error("no salt provided");
      process.exit(1);
    }

    const existingToken = await this.app.query("admin::api-token").findOne({
      select: ["name", "accessKey"],
      where: { name: tokenName },
    });
    this.adminToken = existingToken;
    return existingToken;
  }

  // ba09b084e6c44381d9708c2e2ed0da072ca550d112e83ed90ca670e37e22adee8e91d7edeba2fa52d8aacf25dc111b5b7e405e99a8deeb143f8a520520e7e4fe3562fce14a42a4888bc8ffd4d227bdd92e2617d36f3df18ba6dff9ac214bfed73299c43a20be1490ee4b4e2eba0e6174e09463f2bb816f985592da6280718634

  /**
   * Programatically add an access key to strapi
   * Adapted from Strapi packages/core/admin/server/services/api-token.js
   * https://github.dev/strapi/strapi/blob/7039c0d22836c94457130515b3a55eb93d2411f8/packages/core/admin/server/services/api-token.js#L64
   */
  private async addAdminToken() {
    const token = {
      name: `admin-readonly`,
      description: "admin readonly token",
      type: "read-only",
      accessKey: crypto.randomBytes(128).toString("hex"),
    };
    const salt = this.app.config.get("admin.apiToken.salt");
    if (!salt) {
      console.error("no salt provided");
      process.exit(1);
    }
    // create new token
    await this.app.query("admin::api-token").create({
      select: this.adminTokenFields,
      data: { ...token, accessKey: hash(token.accessKey, salt) },
    });
    this.adminToken = token;
    console.log("apiToken created", token);
  }

  /** Populate frontend local.env with api token */
  private writeFrontendEnvToken() {
    const targetEnvFile = path.resolve(PATHS.frontendDir, ".env.local");
    if (!existsSync(targetEnvFile)) {
      fs.createFileSync(targetEnvFile);
    }
    const envString = fs.readFileSync(targetEnvFile, "utf-8");
    const frontendEnv = dotenv.parse(envString);
    const envToken = frontendEnv["STRAPI_API_TOKEN"];
    if (envToken) {
      const updatedEnv = envString.replace(envToken, this.adminToken.accessKey);
      fs.writeFileSync(targetEnvFile, updatedEnv);
    } else {
      fs.appendFileSync(targetEnvFile, `\nSTRAPI_API_TOKEN=${this.adminToken}`);
    }
    console.log("token written to\n", targetEnvFile);
  }

  private async deleteAdminToken() {
    // revoke existing token
    return this.app.query("admin::api-token").delete({
      select: this.adminTokenFields,
      where: { accessKey: this.adminToken },
    });
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
}
function hash(accessKey: string, salt: string) {
  return crypto.createHmac("sha512", salt).update(accessKey).digest("hex");
}
