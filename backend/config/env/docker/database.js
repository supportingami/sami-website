const { parse } = require("pg-connection-string");
const { join } = require("path");

module.exports = ({ env }) => {
  // postgres
  const dbUrl = env("DATABASE_URL");
  if (dbUrl) {
    console.log("[DB] Postgres");
    return getPostgresConnection(dbUrl);
  }

  // sqlite
  const dbFilename = env("DATABASE_FILENAME");
  if (dbFilename) {
    console.log("[DB] SQLITE");
    return getSqliteConnection(dbFilename);
  }
  throw new Error("No DB connection provided");
};

function getPostgresConnection(databaseUrl = "") {
  const { host, port, database, user, password } = parse(databaseUrl);

  return {
    connection: {
      client: "postgres",
      connection: {
        host,
        port,
        database,
        user,
        password,
      },
      pool: {
        min: 1,
        max: 2,
      },
      debug: false,
    },
  };
}

function getSqliteConnection(filename) {
  return {
    connection: {
      client: "sqlite",
      connection: {
        filename: join(__dirname, "../../../", filename),
      },
      useNullAsDefault: true,
      debug: false,
    },
  };
}
