import { spawnSync } from "child_process";
import { resolve } from "path";
import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },
  async deploy() {
    console.log("deploying...");
    const rootDir = resolve(__dirname, "../../../../../../../");
    console.log("rootDir", rootDir);
    const { stderr, stdout } = spawnSync(`yarn build --export --preview`, { cwd: rootDir, stdio: "pipe", shell: true });
    console.log({ stderr, stdout });

    const errMessage = stderr?.toString("utf-8");
    const outMessage = stdout?.toString("utf-8");
    console.log({ errMessage, outMessage });
    if (outMessage) {
      return { status: 400, errMessage, outMessage };
    }
    if (errMessage) {
      return { status: 200, errMessage, outMessage };
    }
  },
});
