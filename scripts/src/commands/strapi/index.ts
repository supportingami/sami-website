import { Command } from "commander";
import { logProgramHelp } from "../../utils";
import bootstrapCmd from "./bootstrap";
import configExportCmd from "./configExport";
import exportCmd from "./export";
import importCmd from "./import";
import typesGenerateCmd from "./typesGenerate";

/***************************************************************************************
 * CLI
 * @example yarn workspace scripts wp
 *************************************************************************************/

const program = new Command("strapi");
program.description("Strapi management scripts");
program.addCommand(bootstrapCmd);
program.addCommand(configExportCmd);
program.addCommand(exportCmd);
program.addCommand(importCmd);
program.addCommand(typesGenerateCmd);

// error on unknown commands
program.on("command:*", function () {
  const cmdName = program.args.join(" ");

  logProgramHelp(program, `Invalid command: ${cmdName}\n`);
  process.exit(1);
});

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
