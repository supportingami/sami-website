import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/media";
import { serverQuery } from "../lib/graphql";
import { BlogPostContentDocument, ProjectsDocument } from "../graphql/generated";
import type { BlogPostContentQuery, ProjectsQuery } from "../graphql/generated";
import * as fs from "fs";
import * as path from "path";

/**
 * Next.js Metadata Route for generating sitemap.xml
 * Supports both live GraphQL queries during export and local JSON fallback when offline.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (SITE_URL || "https://samicharity.co.uk").replace(/\/$/, "");

  // 1. Core static pages with SEO priorities and change frequencies
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog-posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/volunteer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 2. Dynamic Project pages
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projectRes = await serverQuery<ProjectsQuery>(ProjectsDocument);
    const projects = projectRes?.data?.projectTypes_connection?.nodes || [];
    const seen = new Set<string>();
    projectRoutes = projects
      .filter((p) => {
        if (!p?.Slug || seen.has(p.Slug)) return false;
        seen.add(p.Slug);
        return true;
      })
      .map((p) => ({
        url: `${baseUrl}/projects/${p.Slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
  } catch {
    // Fallback to local db-json if Strapi is offline
    try {
      const dbPath = path.resolve(process.cwd(), "..", "data", "db-json", "project_types.json");
      if (fs.existsSync(dbPath)) {
        const raw = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
        const seenSlugs = new Set<string>();
        projectRoutes = raw
          .filter((p: any) => p.slug && !seenSlugs.has(p.slug) && p.published_at !== null)
          .map((p: any) => {
            seenSlugs.add(p.slug);
            return {
              url: `${baseUrl}/projects/${p.slug}`,
              lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
              changeFrequency: "monthly" as const,
              priority: 0.8,
            };
          });
      }
    } catch {
      // Ignore fallback error
    }
  }

  // 3. Dynamic Blog Post pages
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogRes = await serverQuery<BlogPostContentQuery>(BlogPostContentDocument);
    const blogs = blogRes?.data?.blogPosts_connection?.nodes || [];
    const seen = new Set<string>();
    blogRoutes = blogs
      .filter((b) => {
        if (!b?.Slug || seen.has(b.Slug)) return false;
        seen.add(b.Slug);
        return true;
      })
      .map((b) => ({
        url: `${baseUrl}/blog-posts/${b.Slug}`,
        lastModified: b.DateWritten ? new Date(b.DateWritten) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {
    // Fallback to local db-json if Strapi is offline
    try {
      const dbPath = path.resolve(process.cwd(), "..", "data", "db-json", "blog_posts.json");
      if (fs.existsSync(dbPath)) {
        const raw = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
        const seenSlugs = new Set<string>();
        blogRoutes = raw
          .filter((b: any) => b.slug && !seenSlugs.has(b.slug) && b.published_at !== null)
          .map((b: any) => {
            seenSlugs.add(b.slug);
            return {
              url: `${baseUrl}/blog-posts/${b.slug}`,
              lastModified: b.date_written
                ? new Date(b.date_written)
                : b.updated_at
                  ? new Date(b.updated_at)
                  : new Date(),
              changeFrequency: "monthly" as const,
              priority: 0.7,
            };
          });
      }
    } catch {
      // Ignore fallback error
    }
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
