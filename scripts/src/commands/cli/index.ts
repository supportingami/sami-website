import { Command } from "commander";
import { logProgramHelp } from "../../utils";
import buildCmd from "./build";
import deployCmd from "./deploy";
import startCmd from "./start";

/***************************************************************************************
 * CLI
 * @example yarn workspace scripts wp
 *************************************************************************************/

const program = new Command("cli");
program.description("Local command line scripts");
program.addCommand(buildCmd);
program.addCommand(deployCmd);
program.addCommand(startCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}