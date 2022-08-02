import axios from "axios";
import chalk from "chalk";
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";

// Import from backend folders to ensure plugins resolved correctly
import strapi from "../../../../backend/node_modules/@strapi/strapi";
import type { Strapi } from "../../../../backend/node_modules/@strapi/strapi";

import { PATHS } from "../../paths";
import { createFileSync, existsSync, readFileSync } from "fs-extra";

export type IStrapi = Strapi;

export interface IAdminToken {
  name: string;
  description: string;
  type: string;
  accessKey: string;
}
export const ADMIN_TOKENS: { [key in "fullaccess" | "readonly"]: IAdminToken } =
  {
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
export async function createStrapiInstance(
  serveAdminPanel = false,
  autoReload = false
) {
  console.log(chalk.green("Starting Strapi..."));
  loadDevEnvironment();
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

function loadDevEnvironment() {
  // configure environment in same way as when running from backend
  const envPath = path.resolve(PATHS.backendDir, ".env.development");
  process.env.ENV_PATH = envPath;
  dotenv.config({ path: process.env.ENV_PATH });
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

/**
 * Create an axios rest client instance configured with baseUrl and auth headers
 * to communicate with Strapi Rest API endpoints
 *
 * NOTE - most admin operations will not work with token (only logged in user cookie)
 */
export function getAxiosInstance() {
  loadDevEnvironment();

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

export function hash(accessKey: string, salt: string) {
  return crypto.createHmac("sha512", salt).update(accessKey).digest("hex");
}
