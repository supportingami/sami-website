const { resolve } = require("path");
const { readdirSync, existsSync, mkdirSync } = require("fs");

// Execute scripts directly from yarn executable
const script = getYarnScriptPath();

// pm2 delete all; pm2 start pm2.config.js

/**
 * Shared config used on both export and standalone builds
 * @type {import('./scripts/node_modules/pm2').StartOptions[]}
 **/
const apps = [
  {
    name: "sami_backend",
    script,
    args: ["start", "--only", "backend", "--build", "--production"],
    restart_delay: 5000,
    ...getLogPaths("backend"),
  },
  // watch not required as next server live-reloads
  // TODO - maybe want build and prod serve?
  {
    name: "sami_frontend",
    script,
    args: ["start", "--only", "frontend"],
    restart_delay: 5000,
    ...getLogPaths("frontend"),
  },
];

module.exports = {
  apps,
};

function getLogPaths(name = "default") {
  const logsDir = resolve(__dirname, "logs");
  if (!existsSync(logsDir)) {
    mkdirSync(logsDir);
  }
  const output = resolve(logsDir, `${name}.log`);
  const error = resolve(logsDir, `${name}.log`);
  return { output, error };
}

function getYarnScriptPath() {
  const yarnDir = resolve(__dirname, ".yarn", "releases");
  const yarnJS = readdirSync(yarnDir)[0];
  const yarnPath = resolve(yarnDir, yarnJS);
  return yarnPath;
}
