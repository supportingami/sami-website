import { existsSync, readFileSync, writeFileSync } from "fs-extra";
import path from "path";
import { PATHS } from "../paths";

export interface ISitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://samicharity.co.uk";

/** Format a date string or timestamp into YYYY-MM-DD */
function formatDate(dateInput?: string | number | Date | null): string {
  if (!dateInput) {
    return new Date().toISOString().split("T")[0];
  }
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return new Date().toISOString().split("T")[0];
    }
    return d.toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

/** Collect all static and dynamic sitemap entries */
export function getSitemapEntries(siteUrl: string = DEFAULT_SITE_URL): ISitemapEntry[] {
  const baseUrl = siteUrl.replace(/\/$/, "");
  const today = formatDate(new Date());

  // 1. Static site routes
  const entries: ISitemapEntry[] = [
    {
      url: `${baseUrl}/`,
      lastmod: today,
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog-posts`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/volunteer`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/donate`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.8,
    },
  ];

  // 2. Dynamic Projects from data/db-json/project_types.json
  const projectTypesPath = path.resolve(PATHS.dataDir, "db-json", "project_types.json");
  if (existsSync(projectTypesPath)) {
    try {
      const rawProjects = JSON.parse(readFileSync(projectTypesPath, "utf-8"));
      const seen = new Set<string>();
      for (const p of rawProjects) {
        if (p.slug && !seen.has(p.slug) && p.published_at !== null) {
          seen.add(p.slug);
          entries.push({
            url: `${baseUrl}/projects/${p.slug}`,
            lastmod: formatDate(p.updated_at || p.created_at),
            changefreq: "monthly",
            priority: 0.8,
          });
        }
      }
    } catch (err) {
      console.warn("Failed to load project_types.json for sitemap:", err);
    }
  }

  // 3. Dynamic Blog Posts from data/db-json/blog_posts.json
  const blogPostsPath = path.resolve(PATHS.dataDir, "db-json", "blog_posts.json");
  if (existsSync(blogPostsPath)) {
    try {
      const rawBlogs = JSON.parse(readFileSync(blogPostsPath, "utf-8"));
      const seen = new Set<string>();
      for (const b of rawBlogs) {
        if (b.slug && !seen.has(b.slug) && b.published_at !== null) {
          seen.add(b.slug);
          entries.push({
            url: `${baseUrl}/blog-posts/${b.slug}`,
            lastmod: formatDate(b.date_written || b.updated_at || b.created_at),
            changefreq: "monthly",
            priority: 0.7,
          });
        }
      }
    } catch (err) {
      console.warn("Failed to load blog_posts.json for sitemap:", err);
    }
  }

  return entries;
}

/** Generate valid XML document for sitemap */
export function buildSitemapXml(entries: ISitemapEntry[]): string {
  const urlsXml = entries
    .map((entry) => {
      let xml = `  <url>\n    <loc>${entry.url}</loc>`;
      if (entry.lastmod) {
        xml += `\n    <lastmod>${entry.lastmod}</lastmod>`;
      }
      if (entry.changefreq) {
        xml += `\n    <changefreq>${entry.changefreq}</changefreq>`;
      }
      if (entry.priority !== undefined) {
        xml += `\n    <priority>${entry.priority.toFixed(1)}</priority>`;
      }
      xml += `\n  </url>`;
      return xml;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;
}

/** Write generated sitemap to all target public & build directories */
export function generateAndSaveSitemap(siteUrl: string = DEFAULT_SITE_URL): {
  entriesCount: number;
  targets: string[];
} {
  const entries = getSitemapEntries(siteUrl);
  const xmlContent = buildSitemapXml(entries);

  const targets = [
    path.resolve(PATHS.dataDir, "public", "sitemap.xml"),
    path.resolve(PATHS.frontendDir, "public", "sitemap.xml"),
  ];

  const outDir = path.resolve(PATHS.frontendDir, "out");
  if (existsSync(outDir)) {
    targets.push(path.resolve(outDir, "sitemap.xml"));
  }

  for (const targetPath of targets) {
    writeFileSync(targetPath, xmlContent, "utf-8");
  }

  return {
    entriesCount: entries.length,
    targets,
  };
}
