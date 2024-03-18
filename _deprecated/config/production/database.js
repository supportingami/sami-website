module.exports = ({ env }) => {
  const DATABASE_URL = env("DATABASE_URL");
  if (!DATABASE_URL) {
    process.exitCode = 1;
    throw new Error("DATABASE_URL not provided");
  }

  return {
    // neondb connection string
    // https://github.com/knex/knex/issues/5161
    connection: {
      client: "postgres",
      connection: env("DATABASE_URL"),
      pool: {
        min: 0,
      },
    },
  };
};
