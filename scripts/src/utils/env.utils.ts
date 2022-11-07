import dotenv from "dotenv";
import { createFileSync, existsSync, readdirSync, readFileSync } from "fs-extra";
import { prompt } from "inquirer";
import path from "path";
import { PATHS } from "../paths";

/************************************************************************************************
 * Environments
 *
 * Strapi and NextJS both have support for .env files, handled in slightly different ways
 * The methods below provide access to read and parse env configuration for both frontend and backend
 ***********************************************************************************************/

export interface IFrontendEnv {
  /** local name suffix of .env file, e.g. .env.local */
  name: string;
  /** full path to .env file */
  envPath: string;
  /** raw string representing env prior to key-value pair parse */
  envString: string;
  /** key-value pairs of variables processed from .env file */
  parsed: any;
}

export function getFrontendEnv(): IFrontendEnv {
  const name = "local";
  const envPath = path.resolve(PATHS.frontendDir, `.env.${name}`);
  if (!existsSync(envPath)) {
    createFileSync(envPath);
  }
  const envData = readFileSync(envPath);
  const parsed: IFrontendEnv = dotenv.parse(envData) as any;
  const envString = envData.toString("utf8");
  return { parsed, envPath, name, envString };
}

export interface IBackendEnv {
  /** local name prefix of .env file, e.g. development.env */
  name: string;
  /** full path to .env file */
  envPath: string;
  /** path to related backend database config file */
  dbConfigPath: string;
  /** key-value pairs of variables processed from .env file */
  parsed: any;
}
let loadedEnv: IBackendEnv;

/**
 *
 */
export async function getBackendEnv() {
  if (!loadedEnv) {
    // configure environment in same way as when running from backend
    // select env from env files
    const envDir = path.resolve(PATHS.backendDir, "environments");
    const envFiles = readdirSync(envDir)
      .filter((filename) => filename.endsWith(".env"))
      .map((filename) => {
        const [name] = filename.split(".");
        const envPath = path.resolve(PATHS.backendDir, "environments", filename);
        const dbConfigPath = path.resolve(PATHS.backendDir, "config", "env", name, "database.js");
        const value: IBackendEnv = { name, envPath, dbConfigPath, parsed: {} };
        return { name, value };
      });
    if (envFiles.length === 0) {
      throw new Error("No .env files populated\n" + envDir);
    }
    // Pick the .env file to use. Will prompt selection if more than 1 file available
    loadedEnv = envFiles[0].value;
    if (envFiles.length > 1) {
      const { selected } = await prompt([
        { type: "list", choices: envFiles, message: "Select environment", name: "selected" },
      ]);
      loadedEnv = selected;
    }
    const { envPath } = loadedEnv;
    // populate selected .env to global environment
    process.env.ENV_PATH = envPath;
    const parsed = dotenv.config({ path: process.env.ENV_PATH });
    loadedEnv.parsed = parsed;
  }
  return loadedEnv;
}

/**
 *
 */
export function getLoadedEnvironment() {
  return loadedEnv;
}
