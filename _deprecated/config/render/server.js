const path = require("path");
console.log("get server ");

module.exports = ({ env }) => ({
  url: env("RENDER_EXTERNAL_URL"),
  dirs: {
    public: env("RENDER_PUBLIC_DIR", path.join(__dirname, "../../../../", "data")),
  },
});
