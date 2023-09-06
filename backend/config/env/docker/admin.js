module.exports = ({ env }) => {
  const adminConfig = {
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
    apiToken: {
      salt: env("API_TOKEN_SALT"),
    },
    transfer: {
      token: {
        salt: env("TRANSFER_TOKEN_SALT"),
      },
    },
    url: "/admin",
  };
  const adminSuffix = env("STRAPI_ADMIN_SUFFIX");
  if (adminSuffix) {
    adminConfig.url = adminSuffix;
  }
  console.log({ adminConfig });
  return adminConfig;
};
