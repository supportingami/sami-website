import { Command } from "commander";
import { DBExport } from "./dbExport";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/

const program = new Command("export");
export default program.description("Export strapi data").action(async () => {
  new DBExport().run().then(() => process.exit(0));
});
