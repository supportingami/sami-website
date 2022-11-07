const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const DATABASE_URL = env("DATABASE_URL");
  if (!DATABASE_URL) {
    process.exitCode = 1;
    throw new Error("DATABASE_URL not provided");
  }
  const { host, port, database, user, password } = parse(env("DATABASE_URL"));

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
        max: 2, // TODO - should expose/increase if using dedicated db instance
      },
      debug: false,
    },
  };
};
