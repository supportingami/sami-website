const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

const SERVER_JS_PATH = resolve(__dirname, ".next", "standalone", "frontend", "server.js");

/**
 * When running standalone process.env variables are not included
 * Update server config to include any variables stringified as "process.env" to use runtime process
 */
function postbuild() {
  const serverJS = readFileSync(SERVER_JS_PATH, "utf8");
  const replaced = serverJS.replace(/"process\.env\.[a-z0-9-._]+"/gi, (match) => match.replace(/"/gi, ""));
  writeFileSync(SERVER_JS_PATH, replaced);
}

postbuild();
