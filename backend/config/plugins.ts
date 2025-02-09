export default ({ env }) => ({
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
