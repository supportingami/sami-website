import chalk from "chalk";
import { spawnSync } from "child_process";
import { Command } from "commander";
import { PATHS } from "../../paths";
import { relative } from "path";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  outDir: string;
}
const program = new Command("types:generate");
export default program
  .description("Generate types")
  .option("-o --out-dir <string>", "Directory to output type defintions")
  .action(async () =>
    // options: Partial<IProgramOptions>
    {
      // const optionsWithDefaults: IProgramOptions = {
      //   outDir: PATHS.sharedDir,
      //   ...options,
      // };
      generateQueryTypes();
      // generateSchemaTypes(optionsWithDefaults);
    },
  );

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

/** Use graphql-codegen to generate query types **/
function generateQueryTypes() {
  const cmd = `yarn generate`;
  console.log(chalk.gray(cmd));
  spawnSync(cmd, { cwd: PATHS.frontendDir, shell: true, stdio: "inherit" });
}
