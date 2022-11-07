import { Command } from "commander";
import { logProgramHelp } from "../../utils";
import startCmd from "./start";

/***************************************************************************************
 * CLI
 * @example yarn workspace scripts wp
 *************************************************************************************/

const program = new Command("dev");
program.description("Local development scripts");
program.addCommand(startCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
