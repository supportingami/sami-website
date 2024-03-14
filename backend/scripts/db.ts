import { env as envHelper } from "@strapi/utils";
import Knex from "knex";

/** Mimic strapi methods to load a database.js configuration file and configure a knex db */
export async function loadDb(dbConfigPath: string) {
  const dbInitialiser = (await import(dbConfigPath)).default;

  // Load the connection as defined in `backend\config\database.js` or child environment
  const { connection } = dbInitialiser({ env: envHelper });
  // 'sqlite' connection mapping done by strapi
  // https://docs.strapi.io/dev-docs/configurations/database#configuration-structure

  // TODO - schema inspector doesn't support better-sqlite3 so using sqlite3
  // (seems to auto-configure (?))
  // https://github.com/knex/knex-schema-inspector/issues/94

  const db = Knex(connection);
  return db;
}
