import dotenv from "dotenv";
import { ensureFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from "fs-extra";
import { prompt } from "inquirer";
import { resolve } from "path";
import { PATHS } from "../paths";
import { logError } from "./logging.utils";
import execa from "execa";
import chalk from "chalk";

/************************************************************************************************
 * Environments
 *
 * Strapi and NextJS both have support for .env files, handled in slightly different ways
 * To make it easier to resolve a single set of env configuration is stored at the root config folder
 * and passed to methods as required
 ***********************************************************************************************/

const backendEnvPath = resolve(PATHS.backendDir, ".env");
const frontendEnvPath = resolve(PATHS.frontendDir, ".env");

export interface IEnvLoaded {
  /** local name prefix of .env file, e.g. development.env */
  name: string;
  /** full path to .env file */
  envPath: string;
  /** key-value pairs of variables processed from .env file */
  parsed: Record<string, string>;
}
let envLoaded: IEnvLoaded;
let isHealthcheckRetry = false;

/** Use local config files to retroactively set env config for CI operations (where config folder ignored) */
// function loadEnvNameCI(): string {
//   if (!existsSync(backendEnvPath)) {
//     throw new Error("Failed to load current env");
//   }
//   // HACK - assumes frontend and backend env same - copy to config
//   const { parsed } = dotenv.config({ path: backendEnvPath, override: true });
//   const name = parsed.envName;
//   const envPath = resolve(PATHS.configDir, `${name}.env`);
//   ensureDirSync(PATHS.configDir);
//   copyFileSync(backendEnvPath, envPath);
//   return name;
// }

/**
 * Load an environment configuration from root config env files
 * and replicate to frontend and backend folders
 */
export async function loadEnv(envName?: string, options: { skipHealthcheck?: boolean } = {}) {
  if (!envName) {
    // If running on CI without interactive prompts attempt to use whatever env last loaded
    // TODO - not needed if only 1 env configured in docker build
    // if (process.env.CI) {
    // envName = loadEnvNameCI();
    // } else {
    envName = await promptEnv();
  }
  // }
  // Return if already processed
  if (envLoaded && envLoaded.name === envName) {
    return envLoaded;
  }
  const envDir = resolve(PATHS.rootDir, "config");
  const envPath = resolve(envDir, `${envName}.env`);

  if (!existsSync(envPath)) {
    throw new Error("Environment config not found\n" + envPath);
  }

  // populate to process env
  let { parsed } = dotenv.config({ path: envPath, override: true });

  // add local env overrides
  const envLocalOverridesPath = resolve(envDir, `${envName}.local.env`);
  if (existsSync(envLocalOverridesPath)) {
    parsed = {
      ...parsed,
      ...dotenv.config({ path: envLocalOverridesPath, override: true }).parsed,
    };
  }

  //ensure loaded env configured correctly
  if (!options.skipHealthcheck) {
    await healthcheck({ envParsed: parsed, envName });
  }

  envLoaded = {
    name: envName,
    envPath,
    parsed,
  };

  // populate selected .env to global environment
  process.env.ENV_PATH = envPath;
  // Write combined local and config env to local folder
  const mergedEnv = Object.entries(parsed)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  writeFileSync(backendEnvPath, mergedEnv, "utf8");
  writeFileSync(frontendEnvPath, mergedEnv, "utf8");

  return envLoaded;
}

/**
 *
 * @param opts.local assign as local overrides to a .local.env file
 */
export async function updateEnv(update: Record<string, string>, opts: { local?: boolean } = {}) {
  const loadedEnv = getLoadedEnv();
  const { parsed, name } = loadedEnv;
  let { envPath } = loadedEnv;
  if (opts.local) {
    envPath = envPath.replace(".env", ".local.env");
    ensureFileSync(envPath);
  }
  const envData = readFileSync(envPath);
  let envString = envData.toString("utf8");
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
  const envDir = resolve(PATHS.rootDir, "config");
  const envFiles = readdirSync(envDir)
    .filter((filename) => filename.endsWith(".env") && !filename.includes(".local."))
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

async function healthcheck(options: { envParsed?; envName?: string } = {}) {
  const { envParsed, envName } = options;
  const { STRAPI_READONLY_TOKEN, GOOGLE_APPLICATION_CREDENTIALS } = envParsed;
  // ensure frontend bootstrapped
  if (!STRAPI_READONLY_TOKEN) {
    if (isHealthcheckRetry) {
      logError({ msg1: "Failed to boostrap Strapi, retry manually", msg2: "yarn scripts strapi boostrap" });
    }
    const bootstrapCmd = `yarn scripts strapi bootstrap -e ${envName}`;
    console.log(envName, "STRAPI_READONLY_TOKEN not detected, attempting bootstrap", envParsed);
    console.log(chalk.gray(bootstrapCmd));
    await execa(bootstrapCmd, { shell: true, cwd: PATHS.rootDir, stdio: "inherit" });
    isHealthcheckRetry = true;
    return loadEnv(envName);
  }
  // ensure external storage configured
  if (GOOGLE_APPLICATION_CREDENTIALS) {
    const serviceAccountPath = resolve(PATHS.configDir, GOOGLE_APPLICATION_CREDENTIALS);
    if (!existsSync(serviceAccountPath)) {
      logError({
        msg1: "Google application credentials not found",
        msg2: serviceAccountPath,
      });
    }
    // rewrite as absolute path
    process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountPath;
  }
}
