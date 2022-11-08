import { Command } from "commander";
import { resolve } from "path";
import { readFileSync } from "fs-extra";
import { PATHS } from "../../paths";
import { jsonToMDTable } from "../../utils/string.utils";
import { writeFileSync } from "fs";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
const program = new Command("cli");
export default program.description("Generate CLI docs").action(async () => {
  return new CLIDocsGenerator().run();
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Generate a list of all commands available in scripts workspace
 * and write as a markdown table in the docs folder
 */
class CLIDocsGenerator {
  allCommands = [];

  public run() {
    const parent = this.getTopParentCommand(program);
    this.listCLICommandsRecursively(parent);
    console.log("writing docs");
    console.table(this.allCommands);
    this.writeCLIDocs();
  }

  /** Retrieve the top-most command used in the CLI (i.e `yarn scripts`) */
  private getTopParentCommand(childProgram: Command): ICommandWithMeta {
    if (childProgram.parent) {
      return this.getTopParentCommand(childProgram.parent);
    }
    return childProgram as ICommandWithMeta;
  }

  /** Iterate through all commands and subcommands to generate a list of names and descriptions */
  private listCLICommandsRecursively(parent: ICommandWithMeta, prefix = "") {
    // eslint-disable-next-line prefer-const
    let { _description: description, _name, commands } = parent;
    // Ignore name of main index command
    if (_name === "index") {
      _name = "";
    }
    const name = `${prefix} ${_name}`.trim();
    if (name) {
      this.allCommands.push({ name, description });
    }
    if (commands) {
      for (const childCommand of commands) {
        this.listCLICommandsRecursively(childCommand, name);
      }
    }
  }

  /** Write list of commands as a markdown table in the the docs */
  private writeCLIDocs() {
    const docsPath = resolve(PATHS.docsDir, "dev-scripts.md");
    const fileContents = readFileSync(docsPath, "utf-8");
    // ensure insert point tags exist for adding content
    const startTag = "<!-- begin generated content -->";
    const endTag = "<!-- end generated content -->";
    const regex = new RegExp(`(${startTag})[\\s\\S]*?(${endTag})`);
    if (!fileContents.match(regex)) {
      throw new Error("Could not find begin and end generated content tags");
    }
    // insert docs summary markdown table between insert points
    const insertContent = jsonToMDTable({ headers: ["name", "description"], rows: this.allCommands });
    const replaceContent = `${startTag}\n\n${insertContent}\n${endTag}`;
    const replaced = fileContents.replace(regex, replaceContent);
    writeFileSync(docsPath, replaced);
  }
}

interface ICommandWithMeta extends Command {
  _name: string;
  _description: string;
  commands: ICommandWithMeta[];
}
