import { resolve } from "path";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";
const backendDir = resolve(__dirname, "../../backend");
const backendProdEnvFile = resolve(backendDir, "environments", "production.env");

export const PATHS = {
  backendDir,
  backendProdEnvFile,
};

export const getBackendEnv = () => {
  const envData = readFileSync(backendProdEnvFile);
  const parsed = dotenv.parse(envData);
  return parsed;
};
