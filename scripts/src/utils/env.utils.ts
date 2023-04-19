import dotenv from "dotenv";
import { ensureFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from "fs-extra";
import { prompt } from "inquirer";
import { resolve } from "path";
import { PATHS } from "../paths";
import { logError } from "./logging.utils";

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

  envLoaded = {
    name: envName,
    envPath,
    parsed,
  };

  //ensure loaded env configured correctly
  healthcheck();

  // populate selected .env to global environment
  process.env.ENV_PATH = envPath;
  // Write combined local and config env to local folder
  const mergedEnv = Object.entries(parsed)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const backendEnvPath = resolve(PATHS.backendDir, ".env");
  const frontendEnvPath = resolve(PATHS.frontendDir, ".env");

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

async function healthcheck() {
  const { STRAPI_READONLY_TOKEN, GOOGLE_APPLICATION_CREDENTIALS } = envLoaded.parsed;
  // ensure frontend bootstrapped

  if (!STRAPI_READONLY_TOKEN) {
    logError({ msg1: "Strapi must be bootstrapped first, run command:", msg2: `yarn scripts strapi bootstrap` });
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
