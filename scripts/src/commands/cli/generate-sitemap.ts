import chalk from "chalk";
import { Command } from "commander";
import { generateAndSaveSitemap, getSitemapEntries } from "../../utils/sitemap.utils";

const program = new Command("sitemap");

export default program
  .description("Generate and validate sitemap.xml for the website")
  .option("-u, --url <string>", "Base site URL", "https://samicharity.co.uk")
  .action(async (options: { url: string }) => {
    console.log(chalk.blue(`\nGenerating sitemap.xml for ${options.url}...`));
    const entries = getSitemapEntries(options.url);
    console.log(chalk.gray(`Found ${entries.length} total URLs to include in sitemap:`));

    entries.forEach((e) => {
      console.log(`  - ${chalk.green(e.url)} (freq: ${e.changefreq || "N/A"}, priority: ${e.priority ?? "N/A"})`);
    });

    const result = generateAndSaveSitemap(options.url);
    console.log(chalk.green(`\nSuccessfully written sitemap.xml (${result.entriesCount} entries) to:`));
    result.targets.forEach((t) => console.log(`  ✓ ${t}`));
  });
