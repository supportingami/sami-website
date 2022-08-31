import { Command } from "commander";
import { logProgramHelp } from "../../utils";
import cliCmd from "./cli";

/***************************************************************************************
 * CLI
 * @example yarn workspace scripts docs
 *************************************************************************************/

const program = new Command("docs");
program.description("Documentation generator tools");
program.addCommand(cliCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
