import chalk from "chalk";
import { createServer } from "http";
import open from "open";
import handler from "serve-handler";

export interface IStaticServeOptions {
  port?: number;
  openBrowser?: boolean;
  cleanUrls?: boolean;
  redirects?: Array<{ source: string; destination: string; type: number }>;
}

/**
 * Run a local web server to serve static assets with clean URLs and custom redirects
 */
export async function serveStaticDirectory(
  publicDir: string,
  options: IStaticServeOptions = {}
): Promise<void> {
  const port = options.port || 3000;
  const shouldOpen = options.openBrowser !== false;

  return new Promise((promiseResolve) => {
    const server = createServer((request, response) => {
      return handler(request, response, {
        cleanUrls: options.cleanUrls ?? true,
        redirects: options.redirects ?? [{ source: "/home", destination: "/", type: 301 }],
        public: publicDir,
        directoryListing: false,
      });
    });

    server.listen(port, async () => {
      const serveTarget = `http://localhost:${port}`;
      console.log(chalk.green(`\nPreview running at ${serveTarget}\n`));
      if (shouldOpen) {
        open(serveTarget);
      }
      promiseResolve();
    });
  });
}
