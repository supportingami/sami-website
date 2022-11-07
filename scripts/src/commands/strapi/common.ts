import axios from "axios";
import chalk from "chalk";
import crypto from "crypto";
import dotenv from "dotenv";
import { createFileSync, existsSync, readFileSync, readdirSync } from "fs-extra";
import schemaInspector from "knex-schema-inspector";
import path from "path";
import { prompt } from "inquirer";

import { loadDb } from "backend/scripts/db";

// Import from backend folders to ensure plugins resolved correctly
import strapi from "../../../../backend/node_modules/@strapi/strapi";
import type { Strapi } from "../../../../backend/node_modules/@strapi/strapi";

import { PATHS } from "../../paths";

export type IStrapi = Strapi;

export interface IAdminToken {
  name: string;
  description: string;
  type: string;
  accessKey: string;
}
export const ADMIN_TOKENS: { [key in "fullaccess" | "readonly"]: IAdminToken } = {
  fullaccess: {
    name: `admin-readonly`,
    description: "admin read-only token",
    type: "read-only",
    // This will change every time script run, stored token can be accessed from file
    accessKey: crypto.randomBytes(128).toString("hex"),
  },
  readonly: {
    name: `admin-fullaccess`,
    description: "admin full-access token",
    type: "full-access",
    accessKey: crypto.randomBytes(128).toString("hex"),
  },
};

/**
 * Create a standalone server instance for strapi
 * @example
 * ```
 * const app = await createStrapiInstance()
 * await app.start()
 * // perform operations on strapi instance
 * app.stop()
 * ```
 * */
export async function createStrapiInstance(serveAdminPanel = false, autoReload = false) {
  console.log(chalk.green("Starting Strapi..."));
  await loadEnvironment();
  // create instance
  const app: IStrapi = await strapi({
    appDir: PATHS.backendDir,
    distDir: PATHS.backendDir, // non-ts so no compiled folder
    autoReload,
    serveAdminPanel,
  });
  // ensure db uses same file as backend
  app.config.database.connection.connection.filename = path.resolve(
    PATHS.backendDir,
    process.env.DATABASE_FILENAME || ".tmp/data.db"
  );
  return app;
}

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

async function loadEnvironment() {
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

/************************************************************************************************
 * DB
 ***********************************************************************************************/

/**
 * Connect to the same db as strapi for a given environment
 *
 * TODO - schema inspector doesn't support better-sqlite3 so using sqlite3
 * https://github.com/knex/knex-schema-inspector/issues/94
 *
 */
export async function getDB() {
  const { dbConfigPath } = await loadEnvironment();
  const db = await loadDb(dbConfigPath);
  return db;
}
export function getLoadedEnvironment() {
  return loadedEnv;
}
/** Load knex schema inspector to allow schema queries such as listing all tables */
export function getDBInspector(db: Awaited<ReturnType<typeof getDB>>) {
  const inspector = schemaInspector(db as any);
  return inspector;
}

export async function listDBTables(db: Awaited<ReturnType<typeof getDB>>) {
  const inspector = getDBInspector(db);
  const allTables = await inspector.tables();
  // manually add sqlite_sequence as not included by knex
  if (db.client.config.client === "sqlite") {
    allTables.push("sqlite_sequence");
  }
  return allTables;
}

/** Iterate over all db rows and map fields as specified in mapping */
export function mapDBData(rows: any[], mappings: Record<string, (v: any) => any>) {
  if (rows.length > 0) {
    const columnsToMap = Object.keys(rows[0]).filter((c) => c in mappings);
    if (columnsToMap.length > 0) {
      rows = rows.map((row) => {
        for (const column of columnsToMap) {
          if (row.hasOwnProperty(column)) {
            const value = row[column];
            const mapping = mappings[column];
            row[column] = mapping(value);
          }
        }
        return row;
      });
    }
  }
  return rows;
}

/************************************************************************************************
 * REST
 ***********************************************************************************************/

/**
 * Create an axios rest client instance configured with baseUrl and auth headers
 * to communicate with Strapi Rest API endpoints
 *
 * NOTE - most admin operations will not work with token (only logged in user cookie)
 */
async function getAxiosInstance() {
  await loadEnvironment();

  const instance = axios.create({
    baseURL: process.env.STRAPI_ADMIN_BACKEND_URL || "http://localhost:1337",
  });
  const frontendEnv = getFrontendEnv();
  const { STRAPI_READONLY_TOKEN } = frontendEnv.parsed;
  instance.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `Bearer ${STRAPI_READONLY_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  return instance;
}
