import { Command } from "commander";
import { logProgramHelp } from "../../utils";
import bootstrapCmd from "./bootstrap";
import configExportCmd from "./configExport";
import dbExportCmd from "./dbExport";
import dbImportCmd from "./dbImport";
import typesGenerateCmd from "./typesGenerate";

/***************************************************************************************
 * CLI
 * @example yarn workspace scripts wp
 *************************************************************************************/

const program = new Command("strapi");
program.description("Strapi management scripts");
program.addCommand(bootstrapCmd);
program.addCommand(configExportCmd);
program.addCommand(dbExportCmd);
program.addCommand(dbImportCmd);
program.addCommand(typesGenerateCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
