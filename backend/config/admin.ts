export default ({ env }) => {
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
    url: env("STRAPI_ADMIN_SUFFIX", "/admin"),
  };
  return adminConfig;
};
