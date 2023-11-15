import chalk from "chalk";
import { Command } from "commander";
import type { ConcurrentlyCommandInput } from "concurrently";
import concurrently from "concurrently";
import { readdirSync, ensureDirSync, emptyDirSync } from "fs-extra";
import { resolve } from "path";
import pm2 from "pm2";
import { PATHS } from "../../paths";
import { loadEnv } from "../../utils";
import type { IEnvLoaded } from "../../utils";
import execa from "execa";

const pm2Bin = resolve(PATHS.scriptsDir, "node_modules", ".bin", "pm2");

interface IProgramOptions {
  environment?: string;
  forceRestart?: boolean;
}
/**
 * @deprecated (?) - easier to use pm2 config file approach
 *
 * Production server management scripts
 * These are mostly wrappers around pm2 process management system
 *
 * CLI
 * @example yarn workspace scripts cli pm2 -e development --force-restart
 **/
const program = new Command("pm2");

export default program
  .description("PM2 server management")
  .option("-e --environment <string>", "Name of environment to use", "development")
  .option("-f --force-restart", "Force restart of running applications", true)
  .option("--no-force-restart")
  .argument("[subcommand]", "pm2Command", "start")
  .action(async (subcommand, options: IProgramOptions) => {
    console.table({ ...options, subcommand });
    // if passing `pm2 start` run custom start command
    // Otherwise pass back default `pm2 [command]`
    if (subcommand === "start") {
      return new StartCmd(options).run().then(() => process.exit(0));
    } else {
      await execa(`${pm2Bin} ${subcommand}`, { shell: true, stdio: "inherit" });
    }
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

class StartCmd {
  private logsDir = resolve(PATHS.scriptsDir, "logs");
  constructor(private options: IProgramOptions) {}

  public async run() {
    const { environment } = this.options;
    const envLoaded = await loadEnv(environment);

    await this.startPm2();
    await this.setupLogging();
    const backendStart = this.getBackendStartCommand(envLoaded);
    await this.startPm2Process(backendStart);
    // await this.logOutputs();
    await this.waitForServer(1337);
    // when running frontend always assume local config
    const frontendStart = this.getFrontendCommand();
    await this.startPm2Process(frontendStart);
    await this.logOutputs();
  }

  private async setupLogging() {
    ensureDirSync(this.logsDir);
    // Manually kill process to allow clearing logs dir
    // Default will attach to existing logs
    if (this.options.forceRestart) {
      const processes = await this.listPM2Processes();
      for (const process of processes) {
        await this.deletePM2Process(process.name);
      }
      emptyDirSync(this.logsDir);
    }
  }

  private async startPm2Process(options: pm2.StartOptions) {
    const { name } = options;
    const output = resolve(this.logsDir, `${name}.output.log`);
    const error = resolve(this.logsDir, `${name}.error.log`);
    return new Promise<pm2.Proc>((resolve, reject) => {
      pm2.start(
        {
          ...options,
          output,
          error,
          force: this.options.forceRestart,
          autorestart: true,
          max_restarts: 5,
          min_uptime: 10000,
          restart_delay: 5000,
        },
        (err, proc) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          console.log(chalk.green(`Started ${name}`));
          resolve(proc);
        }
      );
    });
  }

  private async startPm2() {
    return new Promise((resolve, reject) => {
      // connect manager
      pm2.connect(async (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  /** Stream pm2 log streams concurrently for strapi and nextJS */
  private async logOutputs() {
    const cmds: ConcurrentlyCommandInput[] = [
      { name: "strapi", prefixColor: "#8F76FF" },
      { name: "nextJS", prefixColor: "bgBlack.white" },
    ].map(({ name, prefixColor }) => ({
      name,
      command: `${pm2Bin} logs ${name} --raw`,
      prefixColor,
    }));
    const { result } = concurrently(cmds, {
      ["killOthers" as any]: ["failure", "success"],
    });
    await result;
  }

  private getBackendStartCommand(envLoaded: IEnvLoaded): pm2.StartOptions {
    const NEXT_CONFIG_MODE = "standalone";
    // use node_env as defined from env file, with development fallback
    const NODE_ENV = envLoaded.parsed.NODE_ENV || "development";
    return {
      script: getYarnScriptPath(),
      name: "strapi",
      args: ["start"],
      env: { NODE_ENV, NEXT_CONFIG_MODE },
      cwd: PATHS.backendDir,
      // prefixColor: "#8F76FF",
    };
  }

  private async waitForServer(port: number) {
    const waitOnBinPath = resolve(PATHS.scriptsDir, "node_modules", ".bin", "wait-on");
    const endpoint = `http://localhost:${port}`;
    console.log(`Waiting for ready: ${endpoint}...`);
    return execa(`${waitOnBinPath} ${endpoint}`, { stdio: "inherit", shell: true });
  }

  private getFrontendCommand(): pm2.StartOptions {
    // use wait-on to wait for backend server to be ready before starting frontend
    return {
      script: getYarnScriptPath(),
      name: "nextJS",
      args: [`start`],
      cwd: PATHS.frontendDir,
      // prefixColor: "bgBlack.white",
    };
  }

  private async monitorPM2() {
    return execa(`${pm2Bin} monit`, { shell: true, stdio: "inherit" });
  }

  private async clearPM2Logs() {
    return new Promise((resolve, reject) => {
      pm2.flush("all", (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  /**
   * Delete a process by name
   * Will perform check first to see if process exists, and delete accordingly
   */
  private async deletePM2Process(name: string) {
    const list = await this.listPM2Processes();
    const existingProcess = list.find((l) => l.name === name);
    if (existingProcess) {
      console.log("[PM2] Delete Processes", { name, pid: existingProcess.pid });
      return new Promise((resolve, reject) => {
        pm2.delete(name, (err) => {
          if (err) reject(err);
          resolve(true);
        });
      });
    }
  }
  private async listPM2Processes() {
    return new Promise<pm2.ProcessDescription[]>((resolve, reject) => {
      pm2.list((err, list) => {
        if (err) reject(err);
        resolve(list);
      });
    });
  }
  private async stopPm2() {
    return new Promise((resolve, reject) => {
      pm2.delete("all", (err) => {
        if (err) reject(err);
        pm2.killDaemon((err) => {
          if (err) {
            throw err;
          }
          pm2.disconnect();
          console.log("pm2 exited");
          resolve(true);
        });
      });
    });
  }
}

/**
 * Get path to yarn executable script
 * This may be required if trying to start a `yarn` command via pm2
 * Alternatively can use bin path of child commands (e.g. strapi/next)
 * https://github.com/Unitech/pm2/issues/4100
 */
function getYarnScriptPath() {
  const yarnDir = resolve(PATHS.rootDir, ".yarn", "releases");
  const yarnJS = readdirSync(yarnDir)[0];
  const yarnPath = resolve(yarnDir, yarnJS);
  return yarnPath;
}
