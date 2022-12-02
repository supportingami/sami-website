import path from "path";

const rootDir = path.resolve(__dirname, "../../");
const backendDir = path.resolve(rootDir, "backend");
const docsDir = path.resolve(rootDir, "docs");
const dataDir = path.resolve(rootDir, "data");
const frontendDir = path.resolve(rootDir, "frontend");
const sharedDir = path.resolve(rootDir, "shared");
const scriptsDir = path.resolve(rootDir, "scripts");
const wpInputDir = path.resolve(scriptsDir, "input");
const wpOutputDir = path.resolve(scriptsDir, "output");

export const PATHS = {
  backendDir,
  dataDir,
  docsDir,
  frontendDir,
  scriptsDir,
  rootDir,
  sharedDir,
  wpInputDir,
  wpOutputDir,
};
