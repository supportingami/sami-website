import chalk from "chalk";
import { spawnSync } from "child_process";
import { Command } from "commander";
import { PATHS } from "../../paths";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

const program = new Command("config:export");
export default program.description("Export strapi config").action(() => {
  configExport();
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Use the strapi cli method to dump strapi plugin config
 * https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-configuration-dump
 **/
function configExport() {
  const cmd = `yarn strapi configuration:dump --file strapi-config-export.json --pretty`;
  console.log(chalk.gray(cmd));
  spawnSync(cmd, {
    cwd: PATHS.backendDir,
    shell: true,
    stdio: "inherit",
    env: { ENV_PATH: "./environments/development.env" },
  });
}
