import { resolve } from "path";

const ROOT_DIR = resolve(__dirname, "../../../");

export default ({ env }) => {
  const client: "sqlite" | "postgres" = env("DATABASE_CLIENT", "sqlite");
  // SQLITE
  const filename = resolve(ROOT_DIR, "data", env("DATABASE_FILENAME", "data.db"));
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
