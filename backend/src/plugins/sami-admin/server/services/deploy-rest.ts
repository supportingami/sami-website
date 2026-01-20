import { spawn } from "child_process";
import { resolve } from "path";
import type { Core } from "@strapi/types";
import type {ParameterizedContext } from 'koa'

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  /**
   * Trigger deployment via rest request
   * Runs locally and attempts to return final output at end
   * NOTE - as long-running operation may timeout (not well tested)
   * @returns
   */
  async deploy() {
    // Dev note - if making changes need to rebuild and restart server afterwards
    //
    console.log("deploying...", 5);
    const rootDir = resolve(__dirname, "../../../../../../../");
    return new Promise((resolve, reject) => {
      const ctx = strapi.requestContext.get() as ParameterizedContext;
      const child = spawn(`yarn`, ["build --export --no-backend --no-preview --deploy"], {
        cwd: rootDir,
        env: process.env,
        stdio: ["inherit", "inherit", "pipe"],
        shell: true,
      });
      const output = "";
      let err = "";

      child.stderr.setEncoding("utf-8");
      child.stderr.on("data", (data) => {
        data = data.toString();
        err += data;
      });
      child.on("error", (e) => {
        ctx.response.status = 400;
        ctx.response.body = e;
        console.log("child error", e);
        reject(e);
      });
      child.on("exit", (e) => {
        console.log("child exit", e);
        ctx.response.status = err ? 400 : 200;
        ctx.response.body = err ? err : output;
        resolve(e);
      });
      child.on("close", () => {
        console.log("close", { output, err });
        ctx.response.status = err ? 400 : 200;
        ctx.response.body = err ? err : output;
        resolve(ctx.response);
      });
    });
  },
});


