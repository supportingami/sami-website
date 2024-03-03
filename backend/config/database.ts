import { resolve } from "path";

const ROOT_DIR = resolve(__dirname, "../../../");

export default ({ env }) => {
  const client: "sqlite" | "postgres" = env("DATABASE_CLIENT", "sqlite");
  // SQLITE
  const filename = resolve(ROOT_DIR, "backend", env("DATABASE_FILENAME", ".tmp/data.db"));
  console.log("\n\n", "SQLITE DB:", filename, "\n");
  if (client === "sqlite") {
    return {
      connection: {
        client,
        connection: { filename },
        useNullAsDefault: true,
        debug: false,
      },
    };
  }
  // POSTGRES
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
    },
  };
};
