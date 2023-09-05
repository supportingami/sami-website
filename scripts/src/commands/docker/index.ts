import { Command } from "commander";
import { logProgramHelp } from "../../utils";
import buildCmd from "./build";
import runCmd from "./run";

/***************************************************************************************
 * CLI
 * @example yarn workspace scripts wp
 *************************************************************************************/

const program = new Command("docker");
program.description("Local docker scripts");
program.addCommand(buildCmd);
program.addCommand(runCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
