import { spawnSync } from "child_process";
import { Command } from "commander";
import crypto from "crypto";
import { PATHS } from "../../paths";
import type { IAdminToken, IStrapi } from "./common";
import { ADMIN_TOKENS, createStrapiInstance } from "./common";
import { getLoadedEnv, loadEnv, updateEnv } from "../../utils";
import chalk from "chalk";
import execa from "execa";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  /** Name of environment to use */
  environment?: string;
}
const program = new Command("bootstrap");
export default program
  .description("Bootstrap strapi for development")
  .option("-e --environment <string>", "Name of environment to use")
  .action(async (options: IProgramOptions) => {
    await new StrapiBootstrap(options).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
class StrapiBootstrap {
  public app: IStrapi;

  constructor(public options: IProgramOptions) {}

  public async run() {
    await loadEnv(this.options.environment, { skipHealthcheck: true });
    await this.buildStrapiAdminUI();
    this.app = await createStrapiInstance();
    await this.app.start();
    await this.checkAccessTokens();
    this.app.stop(0);
  }

  /**
   * Run `strapi build` script to build backend dashboard code
   * TODO - incremental/caching build (possibly via nx) - for now will just always build full
   */
  private async buildStrapiAdminUI() {
    console.log(chalk.gray("\nBuilding Strapi Dashboard\n"));
    const { exitCode } = await execa("yarn build", {
      cwd: PATHS.backendDir,
      shell: true,
      stdio: "inherit",
    });
    if (exitCode !== 0) process.exit(exitCode);
  }

  /** Query database to see if admin access tokens populated or not */
  private async checkAccessTokens() {
    const salt = this.app.config.get("admin.apiToken.salt");
    if (!salt) {
      console.error("no salt provided");
      process.exit(1);
    }
    // clear any old access tokens
    const ref = this.app.query("admin::api-token");
    const dbTokens: IAdminToken[] = await ref.findMany({ where: { id: { $gte: 0 } } });
    if (dbTokens.length > 0) {
      console.log("clearing old access tokens");
      await ref.deleteMany({ where: { id: { $gte: 0 } } });
    }
    // write new
    for (const adminToken of Object.values(ADMIN_TOKENS)) {
      await this.addAdminToken(adminToken);
      await updateEnv({ [adminToken.name]: adminToken.accessKey }, { local: true });
    }

    const { envPath } = getLoadedEnv();
    console.log("tokens written to\n", envPath.replace(".env", ".local.env"));
  }

  /**
   * Programatically add an access key to strapi
   * Adapted from Strapi packages/core/admin/server/services/api-token.js
   * https://github.dev/strapi/strapi/blob/7039c0d22836c94457130515b3a55eb93d2411f8/packages/core/admin/server/services/api-token.js#L64
   */
  private async addAdminToken(token: IAdminToken) {
    const salt = this.app.config.get("admin.apiToken.salt");
    if (!salt) {
      console.error("no salt provided");
      process.exit(1);
    }
    // create new token
    await this.app.query("admin::api-token").create({
      select: adminTokenFields,
      data: { ...token, accessKey: hash(token.accessKey, salt) },
    });
    console.log(chalk.yellow("apiToken created", JSON.stringify(token, null, 2)));
  }

  private async deleteAdminToken(token: IAdminToken) {
    // revoke existing token
    return this.app.query("admin::api-token").delete({
      select: adminTokenFields,
      where: { accessKey: token.accessKey },
    });
  }

  private addAdminUser() {
    // const args = `--firstname=SAMI --lastname=Admin --email=admin@supportingami.org`;
    const cmd = `yarn strapi admin:create-user`;
    spawnSync(cmd, {
      stdio: "inherit",
      cwd: PATHS.backendDir,
      shell: true,
      env: { ENV_PATH: "./environments/development" },
    });
  }
}

const adminTokenFields = ["id", "name", "description", "type", "createdAt"];

function hash(accessKey: string, salt: string) {
  return crypto.createHmac("sha512", salt).update(accessKey).digest("hex");
}
