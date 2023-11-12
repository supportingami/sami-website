export default [
  // http://localhost:1337/sami-website-deploy
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
      auth: false,
    },
  },
  // http://localhost:1337/sami-website-deploy/deploy
  {
    method: "GET",
    path: "/deploy",
    handler: "myController.deploy",
    config: {
      policies: [],
      auth: false,
    },
  },
];
