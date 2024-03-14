import path from "path";

const rootDir = path.resolve(__dirname, "../../");
const backendDir = path.resolve(rootDir, "backend");
const configDir = path.resolve(rootDir, "config");
const dockerDataDir = path.resolve(rootDir, "docker", "data");
const docsDir = path.resolve(rootDir, "docs");
const dataDir = path.resolve(rootDir, "data");
const logsDir = path.resolve(rootDir, "logs");
const frontendDir = path.resolve(rootDir, "frontend");
const sharedDir = path.resolve(rootDir, "shared");
const scriptsDir = path.resolve(rootDir, "scripts");
const wpInputDir = path.resolve(scriptsDir, "input");
const wpOutputDir = path.resolve(scriptsDir, "output");

export const PATHS = {
  backendDir,
  configDir,
  dataDir,
  dockerDataDir,
  docsDir,
  logsDir,
  frontendDir,
  scriptsDir,
  rootDir,
  sharedDir,
  wpInputDir,
  wpOutputDir,
};
