import chalk from "chalk";
import { spawnSync } from "child_process";
import { Command } from "commander";
import { PATHS } from "../../paths";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  outDir: string;
}
const program = new Command("generate:types");
export default program
  .description("Generate types")
  .option("-o --out-dir <string>", "Directory to output type defintions")
  .action(async (options: Partial<IProgramOptions>) => {
    const optionsWithDefaults: IProgramOptions = {
      outDir: PATHS.sharedDir,
      ...options,
    };
    generateTypes(optionsWithDefaults);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/** Use the strapi cli method to generate typescript types **/
function generateTypes(options: IProgramOptions) {
  const { outDir } = options;
  const cmd = `yarn strapi ts:generate-types --out-dir ${outDir}`;
  console.log(chalk.gray(cmd));
  spawnSync(cmd, { cwd: PATHS.backendDir, shell: true, stdio: "inherit" });
}
