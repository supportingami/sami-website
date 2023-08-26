import chalk from "chalk";
import prompts from "prompts";

/**
 * Prompt a user to confirm an action, via `Y/n` or `y/N` input
 * @param message Text to display as part of user prompt
 * @param initial Default user input
 * https://www.npmjs.com/package/prompts#confirmmessage-initial
 */
export async function promptConfirm(message: string, initial: boolean) {
  const { confirmed } = await prompts({
    type: "confirm",
    name: "confirmed",
    message: chalk.blue(message),
    initial,
  });
  return confirmed ? true : false;
}

/**
 * Pause function execution until user inputs any key
 * https://stackoverflow.com/a/19692588
 */
export async function waitForAnyInput(message = "Press any key to continue...") {
  console.log(chalk.gray(`\n${message}`));
  return new Promise((resolve) => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", () => {
      resolve(true);
    });
  });
}
