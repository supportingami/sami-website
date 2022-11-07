import { Command } from "commander";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  env: string;
}
const program = new Command("start");
export default program
  .description("Start local development server")
  .action(async (options: Partial<IProgramOptions>) => {
    return new StartCmd().run().then(() => process.exit(0));
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Generate a list of all commands available in scripts workspace
 * and write as a markdown table in the docs folder
 */
class StartCmd {
  allCommands = [];

  public async run() {
    console.log("starting");
  }
}
