import path from "path";

const rootDir = path.resolve(__dirname, "../../");
const backendDir = path.resolve(rootDir, "backend");
const sharedDir = path.resolve(rootDir, "shared");

export const PATHS = {
  backendDir,
  sharedDir,
};
