import { resolve } from "path";

const ROOT_DIR = resolve(__dirname, "../../");

export default ({ env }) => {
  const client: "sqlite" | "postgres" = env("DATABASE_CLIENT", "sqlite");
  // SQLITE
  const dbFilename = env("DATABASE_FILENAME", "data.db");
  const dataDir = env("DATA_DIR", resolve(ROOT_DIR, "data"));
  const filename = resolve(dataDir, dbFilename);
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
