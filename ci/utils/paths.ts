import { resolve } from "path";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";
const backendDir = resolve(__dirname, "../../backend");

export const PATHS = {
  backendDir,
};

export const getBackendEnv = (envName: string) => {
  const envFilePath = resolve(backendDir, "environments", `${envName}.env`);
  const envData = readFileSync(envFilePath);
  const parsed = dotenv.parse(envData);
  return parsed;
};
