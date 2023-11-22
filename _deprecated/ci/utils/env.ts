import * as dotenv from "dotenv";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { PATHS } from "./paths";
import { spawnSync } from "child_process";

export const setEnv = (envName: string) => {
  const envFilePath = resolve(PATHS.configDir, `${envName}.env`);
  if (!existsSync(envFilePath)) {
    throw new Error("Env file not found\n" + envFilePath);
  }
  const envData = readFileSync(envFilePath);
  const parsed = dotenv.parse(envData);

  // Ensure env files populated frontend and backend before returning
  spawnSync(`yarn scripts dev setEnv --environment ${envName}`, { cwd: PATHS.rootDir, shell: true, stdio: "inherit" });

  return parsed;
};
