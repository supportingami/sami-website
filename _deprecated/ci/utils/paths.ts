import { resolve } from "path";

const rootDir = resolve(__dirname, "../../");
const backendDir = resolve(rootDir, "backend");
const configDir = resolve(rootDir, "config");

export const PATHS = {
  backendDir,
  configDir,
  rootDir,
};
