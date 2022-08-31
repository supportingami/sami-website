import { Command } from "commander";
import { logProgramHelp } from "../../utils";
import extractAssetsCmd from "./assetsExtract";

/***************************************************************************************
 * CLI
 * @example yarn workspace scripts wp
 *************************************************************************************/

const program = new Command("wp");
program.description("Wordpress management scripts");
program.addCommand(extractAssetsCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
