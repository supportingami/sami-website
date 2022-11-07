import { env as envHelper } from "@strapi/utils";
import Knex from "knex";

/** Mimic strapi methods to load a database.js configuration file and configure a knex db */
export async function loadDb(dbConfigPath: string) {
  const dbInitialiser = (await import(dbConfigPath)).default;
  // Load the connection as defined in `backend\config\database.js` or child environment
  const { connection } = dbInitialiser({ env: envHelper });
  const db = Knex(connection);
  return db;
}
