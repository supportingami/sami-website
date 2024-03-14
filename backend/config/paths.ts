import { resolve } from "path";

let ROOT_DIR = resolve(__dirname, "../../");
// HACK - compiled code sits in dist dir one level further down
if (__dirname.includes("dist")) {
  ROOT_DIR = resolve(ROOT_DIR, "../");
}

const BACKEND_DIR = resolve(ROOT_DIR, "backend");

export { BACKEND_DIR, ROOT_DIR };
