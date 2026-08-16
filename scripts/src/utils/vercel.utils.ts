import chalk from "chalk";
import execa from "execa";

export interface IVercelDeployOptions {
  cwd: string;
  prod?: boolean;
  prebuilt?: boolean;
  skipDomain?: boolean;
  archive?: boolean;
  beforeRetry?: () => void | Promise<void>;
}

/**
 * Build the project using Vercel CLI
 */
export async function buildWithVercel(options: { cwd: string; prod?: boolean }): Promise<void> {
  const args = ["yarn vercel build"];
  if (options.prod !== false) args.push("--prod");

  console.log(chalk.gray("\nBuilding deployment bundle with Vercel CLI...\n"));
  await execa(args.join(" "), {
    shell: true,
    stdio: "inherit",
    cwd: options.cwd,
  });
}

/**
 * Deploy to Vercel hosting using prebuilt output.
 * Automatically falls back to --archive=tgz upload if individual API uploads fail or exceed free tier limits.
 */
export async function deployToVercel(options: IVercelDeployOptions): Promise<void> {
  const buildDeployCmd = (useArchive: boolean) => {
    const parts = ["yarn vercel deploy"];
    if (options.prebuilt !== false) parts.push("--prebuilt");
    if (options.prod !== false) parts.push("--prod");
    if (options.skipDomain !== false) parts.push("--skip-domain");
    if (useArchive) parts.push("--archive=tgz");
    return parts.join(" ");
  };

  if (options.archive) {
    console.log(chalk.gray("\nDeploying prebuilt site to Vercel using --archive=tgz...\n"));
    await execa(buildDeployCmd(true), {
      shell: true,
      stdio: "inherit",
      cwd: options.cwd,
    });
    return;
  }

  try {
    console.log(chalk.gray("\nDeploying prebuilt site to Vercel...\n"));
    await execa(buildDeployCmd(false), {
      shell: true,
      stdio: "inherit",
      cwd: options.cwd,
    });
  } catch (error) {
    console.warn(
      chalk.yellow(
        "\nStandard Vercel deployment failed (e.g. API upload limit). Retrying with --archive=tgz fallback...\n"
      )
    );
    if (options.beforeRetry) {
      await options.beforeRetry();
    }
    await execa(buildDeployCmd(true), {
      shell: true,
      stdio: "inherit",
      cwd: options.cwd,
    });
  }
}
