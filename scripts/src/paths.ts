import path from "path";

const rootDir = path.resolve(__dirname, "../../");
const backendDir = path.resolve(rootDir, "backend");
const frontendDir = path.resolve(rootDir, "frontend");
const sharedDir = path.resolve(rootDir, "shared");
const scriptsDir = path.resolve(rootDir, "scripts");

const wpInputDir = path.resolve(scriptsDir, "input");
const wpOutputDir = path.resolve(scriptsDir, "output");

export const PATHS = {
  backendDir,
  frontendDir,
  sharedDir,
  wpInputDir,
  wpOutputDir,
};
