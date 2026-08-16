import { existsSync, readFileSync } from "fs";
import path from "path";

interface SitemapCheck {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

function verifySitemap() {
  console.log("=== SAMI Website Sitemap & Robots.txt Verification ===\n");

  const sitemapPaths = [
    path.resolve(__dirname, "../../data/public/sitemap.xml"),
    path.resolve(__dirname, "../../frontend/public/sitemap.xml"),
  ];

  for (const sitemapPath of sitemapPaths) {
    if (!existsSync(sitemapPath)) {
      throw new Error(`Sitemap not found at: ${sitemapPath}`);
    }

    const xml = readFileSync(sitemapPath, "utf-8");
    console.log(`[PASS] Found sitemap at: ${sitemapPath} (${xml.length} bytes)`);

    // 1. XML Header and namespace check
    if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
      throw new Error(`Invalid XML header in: ${sitemapPath}`);
    }
    if (!xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
      throw new Error(`Missing or invalid <urlset> namespace in: ${sitemapPath}`);
    }
    if (!xml.trim().endsWith("</urlset>")) {
      throw new Error(`Missing </urlset> closing tag in: ${sitemapPath}`);
    }

    // 2. Parse URLs
    const urlMatches = xml.match(/<url>([\s\S]*?)<\/url>/g);
    if (!urlMatches || urlMatches.length === 0) {
      throw new Error(`No <url> blocks found in: ${sitemapPath}`);
    }

    const parsedUrls: SitemapCheck[] = [];
    for (const block of urlMatches) {
      const locMatch = block.match(/<loc>(.*?)<\/loc>/);
      const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/);
      const changefreqMatch = block.match(/<changefreq>(.*?)<\/changefreq>/);
      const priorityMatch = block.match(/<priority>(.*?)<\/priority>/);

      if (!locMatch || !locMatch[1]) {
        throw new Error(`Invalid <url> entry missing <loc>: ${block}`);
      }

      const loc = locMatch[1];
      if (!loc.startsWith("https://samicharity.co.uk")) {
        throw new Error(`Invalid URL domain in sitemap: ${loc}`);
      }

      if (lastmodMatch) {
        const lastmod = lastmodMatch[1];
        if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
          throw new Error(`Invalid lastmod date format "${lastmod}" in URL: ${loc}`);
        }
      }

      if (priorityMatch) {
        const p = parseFloat(priorityMatch[1]);
        if (isNaN(p) || p < 0 || p > 1) {
          throw new Error(`Invalid priority value "${priorityMatch[1]}" in URL: ${loc}`);
        }
      }

      parsedUrls.push({
        url: loc,
        lastmod: lastmodMatch?.[1],
        changefreq: changefreqMatch?.[1],
        priority: priorityMatch?.[1],
      });
    }

    console.log(`[PASS] Successfully validated ${parsedUrls.length} URL entries in ${path.basename(sitemapPath)}`);

    // Verify key static routes
    const expectedStaticRoutes = [
      "https://samicharity.co.uk/",
      "https://samicharity.co.uk/about",
      "https://samicharity.co.uk/projects",
      "https://samicharity.co.uk/blog-posts",
      "https://samicharity.co.uk/resources",
      "https://samicharity.co.uk/volunteer",
      "https://samicharity.co.uk/donate",
    ];

    for (const route of expectedStaticRoutes) {
      const found = parsedUrls.some((u) => u.url === route);
      if (!found) {
        throw new Error(`Expected static route missing from sitemap: ${route}`);
      }
    }
    console.log(`[PASS] All 7 primary static pages present.`);

    // Verify dynamic routes present
    const projectRoutes = parsedUrls.filter((u) => u.url.includes("/projects/"));
    const blogRoutes = parsedUrls.filter((u) => u.url.includes("/blog-posts/"));

    if (projectRoutes.length === 0) {
      throw new Error("No dynamic project routes found in sitemap");
    }
    if (blogRoutes.length === 0) {
      throw new Error("No dynamic blog post routes found in sitemap");
    }

    console.log(`[PASS] Dynamic projects count: ${projectRoutes.length}`);
    console.log(`[PASS] Dynamic blog posts count: ${blogRoutes.length}`);
  }

  // 3. Verify robots.txt
  const robotsPaths = [
    path.resolve(__dirname, "../../data/public/robots.txt"),
    path.resolve(__dirname, "../../frontend/public/robots.txt"),
  ];

  for (const robotsPath of robotsPaths) {
    if (!existsSync(robotsPath)) {
      throw new Error(`robots.txt not found at: ${robotsPath}`);
    }
    const robots = readFileSync(robotsPath, "utf-8");
    if (!robots.includes("Sitemap: https://samicharity.co.uk/sitemap.xml")) {
      throw new Error(`robots.txt missing Sitemap directive in: ${robotsPath}`);
    }
    if (!robots.includes("User-agent: *") || !robots.includes("Allow: /")) {
      throw new Error(`robots.txt missing standard crawler allowance in: ${robotsPath}`);
    }
    console.log(`[PASS] robots.txt validated at ${robotsPath}`);
  }

  console.log("\n All Sitemap and Robots.txt verifications passed successfully!");
}

verifySitemap();
