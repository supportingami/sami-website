import axios from "axios";
import chalk from "chalk";
import crypto from "crypto";
import schemaInspector from "knex-schema-inspector";
import path from "path";

import { loadDb } from "backend/scripts/db";

// Import from backend folders to ensure plugins resolved correctly
import strapi from "../../../../backend/node_modules/@strapi/strapi";
import type { Strapi } from "../../../../backend/node_modules/@strapi/strapi";

import { PATHS } from "../../paths";
import { loadEnv } from "../../utils";

export type IStrapi = Strapi;

export interface IAdminToken {
  name: string;
  description: string;
  type: string;
  accessKey: string;
}
export const ADMIN_TOKENS: { [key in "fullaccess" | "readonly"]: IAdminToken } = {
  readonly: {
    name: `STRAPI_READONLY_TOKEN`,
    description: "admin read-only token",
    type: "read-only",
    accessKey: crypto.randomBytes(128).toString("hex"),
  },
  fullaccess: {
    name: `STRAPI_FULLACCESS_TOKEN`,
    description: "admin full-access token",
    type: "full-access",
    // This will change every time script run, stored token can be accessed from file
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
  // create instance
  const app: IStrapi = await strapi({
    appDir: PATHS.backendDir,
    distDir: PATHS.backendDir, // non-ts so no compiled folder
    autoReload,
    serveAdminPanel,
  });
  // ensure db uses same file as backend
  if (app.config.database.connection?.connection?.filename) {
    app.config.database.connection.connection.filename = path.resolve(
      PATHS.dataDir,
      process.env.DATABASE_FILENAME || "data.db"
    );
  }

  return app;
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
export async function getDB(envName: string) {
  const dbConfigPath = path.resolve(PATHS.backendDir, "config", "env", envName, "database.js");
  const db = await loadDb(dbConfigPath);
  return db;
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getAxiosInstance() {
  const { parsed } = await loadEnv();

  const instance = axios.create({
    baseURL: process.env.STRAPI_ADMIN_BACKEND_URL || "http://localhost:1337",
  });

  const { STRAPI_READONLY_TOKEN } = parsed;
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
