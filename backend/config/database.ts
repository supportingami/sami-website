import { resolve } from "path";
import { existsSync } from "fs";

let ROOT_DIR = resolve(__dirname, "../../");
// HACK - compiled code sits in dist dir one level further down
if (__dirname.includes("dist")) {
  ROOT_DIR = resolve(ROOT_DIR, "../");
}

export default ({ env }) => {
  const client: "sqlite" | "postgres" = env("DATABASE_CLIENT", "sqlite");
  // SQLITE
  const dbFilename = env("DATABASE_FILENAME", "data.db");
  const dataDir = env("DATA_DIR", resolve(ROOT_DIR, "data"));
  const filename = resolve(dataDir, dbFilename);
  console.log("SQLITE DB", filename);
  // Avoid creating new sqlite files in production
  // in case waiting for filesystem to initialise (e.g. gcsfuse)
  if (process.env.NODE_ENV !== "development") {
    if (!existsSync(filename)) {
      throw new Error("Sqlite db not found\n" + filename);
    }
  }

  if (client === "sqlite") {
    console.log("\n\n", "SQLITE DB:", filename, "\n");
    return {
      connection: {
        client,
        connection: { filename },
        useNullAsDefault: true,
        debug: false,
        // Enable WAL https://github.com/strapi/strapi/pull/17694
        pool: {
          // docker kills idle connections so set min 0
          // https://docs.strapi.io/dev-docs/configurations/database#database-pooling-options
          min: 0,
          max: 10,
          // NOTE: sqliteConn is the native connection, either sqlite3 or better-sqlite3 depending on your project
          // But exec should work for both afaik
          afterCreate: async (sqliteConn, cb) => {
            await sqliteConn.exec("pragma journal_mode = WAL");
            await sqliteConn.exec("pragma synchronous = normal");
            cb();
          },
        },
      },
    };
  }
  // POSTGRES
  if (client === "postgres") {
    return {
      connection: {
        client,
        connection: {
          host: env("DATABASE_HOST", "127.0.0.1"),
          port: env.int("DATABASE_PORT", 5432),
          database: env("DATABASE_NAME", "strapi"),
          user: env("DATABASE_USERNAME", "strapi"),
          password: env("DATABASE_PASSWORD", "strapi"),
        },
        debug: false,
        pool: {
          min: 1,
          max: 2,
        },
      },
    };
  }
  // No db client provided
  throw new Error("No DB connection provided");
};
