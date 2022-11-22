module.exports = ({ env }) => ({
  ckeditor: true,
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
  "import-export-entries": {
    enabled: true,
  },
});
