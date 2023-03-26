import dotenv from "dotenv";
import { appendFileSync, copyFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from "fs-extra";
import { prompt } from "inquirer";
import path from "path";
import { PATHS } from "../paths";

/************************************************************************************************
 * Environments
 *
 * Strapi and NextJS both have support for .env files, handled in slightly different ways
 * To make it easier to resolve a single set of env configuration is stored at the root config folder
 * and passed to methods as required
 ***********************************************************************************************/

export interface IEnvLoaded {
  /** local name prefix of .env file, e.g. development.env */
  name: string;
  /** full path to .env file */
  envPath: string;
  /** raw string representing env prior to key-value pair parse */
  envString: string;
  /** key-value pairs of variables processed from .env file */
  parsed: Record<string, string>;
}
let envLoaded: IEnvLoaded;

/**
 * Load an environment configuration from root config env files
 * and replicate to frontend and backend folders
 */
export async function loadEnv(envName?: string) {
  if (!envName) {
    envName = await promptEnv();
  }
  // Return if already processed
  if (envLoaded && envLoaded.name === envName) {
    return envLoaded;
  }
  const envDir = path.resolve(PATHS.rootDir, "config");
  const envPath = path.resolve(envDir, `${envName}.env`);
  if (!existsSync(envPath)) {
    throw new Error("Environment config not found\n" + envPath);
  }
  const envData = readFileSync(envPath);
  const parsed = dotenv.parse(envData) as Record<string, string>;
  const envString = envData.toString("utf8");
  dotenv.config({ path: envPath });
  envLoaded = {
    name: envName,
    envPath,
    envString,
    parsed,
  };
  // populate selected .env to global environment
  process.env.ENV_PATH = envPath;
  // Duplicate loaded env to backend local env
  const backendEnvPath = path.resolve(PATHS.backendDir, ".env");
  const frontendEnvPath = path.resolve(PATHS.frontendDir, ".env");
  copyFileSync(envPath, backendEnvPath);
  copyFileSync(envPath, frontendEnvPath);
  return envLoaded;
}

/**
 *
 */
export async function updateEnv(update: Record<string, string>) {
  let { parsed, name, envPath, envString } = getLoadedEnv();
  for (const [key, updatedValue] of Object.entries(update)) {
    if (key in parsed) {
      const replaceRegex = new RegExp(`${key}=.*`);
      envString = envString.replace(replaceRegex, `${key}=${updatedValue}`);
    } else {
      envString = envString + `\n${key}=${updatedValue}`;
    }
  }
  writeFileSync(envPath, envString, "utf8");
  // Clear cached env and reload
  envLoaded = undefined;
  await loadEnv(name);
}

/** Utility to return globally loaded env */
export function getLoadedEnv() {
  if (!envLoaded) {
    throw new Error("No env loaded, cannot call method until after loadEnv()");
  }
  return envLoaded;
}

/** Prompt selection of environment from a list */
async function promptEnv() {
  const envDir = path.resolve(PATHS.rootDir, "config");
  const envFiles = readdirSync(envDir)
    .filter((filename) => filename.endsWith(".env"))
    .map((filename) => {
      const [name] = filename.split(".");
      return name;
    });
  if (envFiles.length === 0) {
    throw new Error("No .env files populated\n" + envDir);
  }
  // Pick the .env file to use. Will prompt selection if more than 1 file available
  let selectedEnv = envFiles[0];
  if (envFiles.length > 1) {
    const { selected } = await prompt([
      { type: "list", choices: envFiles, message: "Select environment", name: "selected" },
    ]);
    selectedEnv = selected;
  }
  return selectedEnv;
}
