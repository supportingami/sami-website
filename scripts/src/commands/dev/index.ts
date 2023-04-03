import { Command } from "commander";
import { logProgramHelp } from "../../utils";
import buildCmd from "./build";
import setEnvCmd from "./setEnv";
import startCmd from "./start";

/***************************************************************************************
 * CLI
 * @example yarn workspace scripts wp
 *************************************************************************************/

const program = new Command("dev");
program.description("Local development scripts");
program.addCommand(buildCmd);
program.addCommand(setEnvCmd);
program.addCommand(startCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
