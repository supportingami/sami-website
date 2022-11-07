import dotenv from "dotenv";
import { createFileSync, existsSync, readdirSync, readFileSync } from "fs-extra";
import { prompt } from "inquirer";
import path from "path";
import { PATHS } from "../paths";

/************************************************************************************************
 * Environments
 *
 * By default Strapi allows population of .env files specific to a given NODE_ENV
 * It also allows environment-specific configuration files, such as config/env/production/database.js
 *
 * The methods below mimic environment handling as strapi
 ***********************************************************************************************/
interface ILoadedEnv {
  name: string;
  envPath: string;
  dbConfigPath: string;
}
let loadedEnv: ILoadedEnv;

export function getFrontendEnv() {
  const envFile = path.resolve(PATHS.frontendDir, ".env.local");
  if (!existsSync(envFile)) {
    createFileSync(envFile);
  }
  const envData = readFileSync(envFile);
  const parsed = dotenv.parse(envData);
  const envString = envData.toString("utf8");
  return { envString, parsed, envFile };
}

/**
 *
 */
export async function loadEnvironment() {
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
        const value: ILoadedEnv = { name, envPath, dbConfigPath };
        return { name, value };
      });
    const { selected } = await prompt([
      { type: "list", choices: envFiles, message: "Select environment", name: "selected" },
    ]);
    loadedEnv = selected;
    const { envPath } = loadedEnv;
    // populate selected .env to global environment
    process.env.ENV_PATH = envPath;
    dotenv.config({ path: process.env.ENV_PATH });
  }
  return loadedEnv;
}

/**
 *
 */
export function getLoadedEnvironment() {
  return loadedEnv;
}
