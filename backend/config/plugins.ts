export default ({ env }) => ({
  email: {
    config: {
      provider: "strapi-provider-email-resend",
      providerOptions: {
        apiKey: env("RESEND_API_KEY"),
      },
      settings: {
        defaultFrom: "admin@samicharity.co.uk",
        defaultReplyTo: "admin@samicharity.co.uk",
      },
    },
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 9,
      amountLimit: 100,
      defaultLimit: -1, // default do not paginate and return all results
      apolloServer: {
        tracing: false,
      },
    },
  },

  "sami-admin": {
    enabled: false,
    resolve: "./src/plugins/sami-admin",
  },
});
