import { spawnSync } from "child_process";
import { Command } from "commander";
import crypto from "crypto";
import { PATHS } from "../../paths";
import * as fs from "fs-extra";
import { ADMIN_TOKENS, createStrapiInstance, getFrontendEnv, IAdminToken, IStrapi } from "./common";

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
  public app: IStrapi;

  constructor(public options: IProgramOptions) {}

  public async run() {
    this.app = await createStrapiInstance();
    await this.app.start();
    await this.checkAccessTokens();
    this.app.stop();
  }

  /** Query database to see if admin access tokens populated or not */
  private async checkAccessTokens() {
    const salt = this.app.config.get("admin.apiToken.salt");
    if (!salt) {
      console.error("no salt provided");
      process.exit(1);
    }
    for (const [key, token] of Object.entries(ADMIN_TOKENS)) {
      const existingToken = await this.app.query("admin::api-token").findOne({
        select: ["name", "accessKey"],
        where: { name: token.name },
      });
      if (!existingToken) {
        await this.addAdminToken(token);
        const envTokenName = `STRAPI_${key.toUpperCase()}_TOKEN`;
        this.writeFrontendEnvToken(token, envTokenName);
      }
    }
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
    console.log("apiToken created", token);
  }

  /** Populate frontend local.env with api token */
  private writeFrontendEnvToken(token: IAdminToken, envName: string) {
    const { envFile, envString, parsed } = getFrontendEnv();
    const envToken = parsed[envName];
    if (envToken) {
      const updatedEnv = envString.replace(envToken, token.accessKey);
      fs.writeFileSync(envFile, updatedEnv);
    } else {
      fs.appendFileSync(envFile, `\n${envName}=${token.accessKey}`);
    }
    console.log("token written to\n", envFile);
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
      env: { ENV_PATH: "./.env.development" },
    });
  }
}

const adminTokenFields = ["id", "name", "description", "type", "createdAt"];

function hash(accessKey: string, salt: string) {
  return crypto.createHmac("sha512", salt).update(accessKey).digest("hex");
}
