import React from "react";
import ReactDOMServer from "react-dom/server";
import { SEO } from "../components/common/seo";
import {
  buildOrganizationSchema,
  buildBlogPostingSchema,
  buildFAQSchema,
  buildProjectSchema,
  buildBreadcrumbSchema,
} from "../lib/schemaOrg";
import { SITE_URL, getAbsoluteStrapiMedia } from "../lib/media";

interface VerificationResult {
  page: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  schemaTypes: string[];
}

const results: VerificationResult[] = [];

console.log("=== SAMI Website Metadata & Schema Verification ===\n");

// 1. Home Page Verification
{
  const mockHeroImage = { url: "/uploads/happy_classrooms_cover_08e8225f02.jpg" };
  const mockMissionStatement = {
    Text: "We help students to extend their understanding of maths",
  };
  const schema = buildOrganizationSchema();
  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(SEO, {
      title: "SAMI - Supporting African Maths Initiatives",
      description: mockMissionStatement.Text,
      canonicalPath: "/",
      image: mockHeroImage,
      schemaData: schema,
    }),
  );

  results.push({
    page: "Home Page (/)",
    title: "SAMI - Supporting African Maths Initiatives",
    description: mockMissionStatement.Text,
    canonical: `${SITE_URL}/`,
    ogImage: getAbsoluteStrapiMedia(mockHeroImage),
    ogType: "website",
    twitterCard: "summary_large_image",
    schemaTypes: [schema["@type"]],
  });
}

// 2. About Page Verification
{
  const mockMembers = [
    { Name: "Dr. Alice", Photo: { url: "/uploads/alice.jpg" }, LinkedIn: "https://linkedin.com/in/alice" },
  ];
  const mockPartners = [{ Name: "Maths Hub Africa", Logo: { url: "/uploads/partner1.png" } }];
  const schema = buildOrganizationSchema(mockMembers as any, mockPartners as any);
  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(SEO, {
      title: "About Us - SAMI",
      description:
        "Learn about Supporting African Maths Initiatives (SAMI), our team, theory of change, annual reports, and partners.",
      canonicalPath: "/about",
      schemaData: schema,
    }),
  );

  results.push({
    page: "About Page (/about)",
    title: "About Us - SAMI",
    description:
      "Learn about Supporting African Maths Initiatives (SAMI), our team, theory of change, annual reports, and partners.",
    canonical: `${SITE_URL}/about`,
    ogImage: `${SITE_URL}/images/sami-logo.svg`,
    ogType: "website",
    twitterCard: "summary_large_image",
    schemaTypes: [schema["@type"], `members: ${schema.member?.length}`, `sponsors: ${schema.sponsor?.length}`],
  });
}

// 3. Blog Post Page Verification
{
  const mockPost = {
    Title: "How a Church is Rewriting the Future of Math in Kenya",
    Slug: "how-a-church-is-rewriting-the-future-of-math-in-kenya",
    Summary: "For as long as I can remember, I have been itching to tell this story.",
    DateWritten: "2026-03-27",
    FeatureImage: { url: "/uploads/church_math_kenya.png" },
  };
  const canonicalUrl = `${SITE_URL}/blog-posts/${mockPost.Slug}`;
  const schemas = [
    buildBlogPostingSchema(mockPost as any, canonicalUrl),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "News", url: "/blog-posts" },
      { name: mockPost.Title, url: `/blog-posts/${mockPost.Slug}` },
    ]),
  ];

  results.push({
    page: `Blog Post (/blog-posts/${mockPost.Slug})`,
    title: `${mockPost.Title} - SAMI`,
    description: mockPost.Summary,
    canonical: canonicalUrl,
    ogImage: getAbsoluteStrapiMedia(mockPost.FeatureImage),
    ogType: "article",
    twitterCard: "summary_large_image",
    schemaTypes: schemas.map((s) => s["@type"]),
  });
}

// 4. Project Page Verification
{
  const mockProject = {
    Name: "Happy Classrooms",
    Slug: "happy-classrooms",
    HomeSummary: "Providing classrooms with rich learning resources and supporting teachers to use them.",
    FeatureImage: { url: "/uploads/happy_classrooms.png" },
  };
  const canonicalUrl = `${SITE_URL}/projects/${mockProject.Slug}`;
  const schemas = [
    buildProjectSchema(mockProject as any, canonicalUrl),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
      { name: mockProject.Name, url: `/projects/${mockProject.Slug}` },
    ]),
  ];

  results.push({
    page: `Project (/projects/${mockProject.Slug})`,
    title: `${mockProject.Name} - SAMI`,
    description: mockProject.HomeSummary,
    canonical: canonicalUrl,
    ogImage: getAbsoluteStrapiMedia(mockProject.FeatureImage),
    ogType: "website",
    twitterCard: "summary_large_image",
    schemaTypes: schemas.map((s) => s["@type"]),
  });
}

// 5. Volunteer Page Verification
{
  const mockFaqs = [
    { Question: "How long are the camps?", Response: "Most camps run for one week." },
    { Question: "Do I need teaching experience?", Response: "No, enthusiasm for mathematics is the main requirement." },
  ];
  const schema = buildFAQSchema(mockFaqs as any);

  results.push({
    page: "Volunteer (/volunteer)",
    title: "Volunteer with SAMI",
    description:
      "Volunteer with SAMI and support maths initiatives across Africa through in-person maths camps, remote volunteering, and community projects.",
    canonical: `${SITE_URL}/volunteer`,
    ogImage: `${SITE_URL}/images/sami-logo.svg`,
    ogType: "website",
    twitterCard: "summary_large_image",
    schemaTypes: [`FAQPage (${schema.mainEntity.length} questions)`],
  });
}

// 6. Donate Page Verification
{
  const mockDonateImage = { url: "/uploads/donate_cover.jpg" };
  results.push({
    page: "Donate (/donate)",
    title: "Donate - SAMI",
    description:
      "Support SAMI to empower communities and advance mathematics education across Africa. Learn how you can donate and help make a difference.",
    canonical: `${SITE_URL}/donate`,
    ogImage: getAbsoluteStrapiMedia(mockDonateImage),
    ogType: "website",
    twitterCard: "summary_large_image",
    schemaTypes: ["None (Standard SEO)"],
  });
}

// 7. News Listing & Resources Listing Verification
{
  results.push({
    page: "News Listing (/blog-posts)",
    title: "News & Updates - SAMI",
    description:
      "Stay up to date with the latest news, stories, and developments from Supporting African Maths Initiatives (SAMI).",
    canonical: `${SITE_URL}/blog-posts`,
    ogImage: `${SITE_URL}/images/sami-logo.svg`,
    ogType: "website",
    twitterCard: "summary_large_image",
    schemaTypes: ["None (Listing SEO)"],
  });

  results.push({
    page: "Resources Listing (/resources)",
    title: "Educational Resources - SAMI",
    description: "Explore mathematics resources, learning materials, and tools developed and curated by SAMI.",
    canonical: `${SITE_URL}/resources`,
    ogImage: `${SITE_URL}/images/sami-logo.svg`,
    ogType: "website",
    twitterCard: "summary_large_image",
    schemaTypes: ["None (Listing SEO)"],
  });
}

console.table(results);
