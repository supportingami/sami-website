import React from "react";
import Head from "next/head";
import { getAbsoluteStrapiMedia, SITE_URL } from "../../lib/media";
import type { UploadFile } from "../../graphql/generated";

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: Partial<UploadFile> | string | null;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  schemaData?: Record<string, any> | Record<string, any>[];
  noindex?: boolean;
}

const DEFAULT_TITLE = "SAMI - Supporting African Maths Initiatives";
const DEFAULT_DESCRIPTION =
  "Supporting African Maths Initiatives (SAMI) is a UK charity supporting innovative, sustainable mathematics projects in Africa.";
const DEFAULT_IMAGE = `${SITE_URL}/images/sami-logo.svg`;

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath,
  image,
  imageAlt,
  type = "website",
  article,
  schemaData,
  noindex = false,
}) => {
  const fullTitle = title ? (title.includes("SAMI") ? title : `${title} - SAMI`) : DEFAULT_TITLE;

  const canonicalUrl = canonicalPath
    ? canonicalPath.startsWith("http")
      ? canonicalPath
      : `${SITE_URL}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`
    : undefined;

  const resolvedImage = image ? getAbsoluteStrapiMedia(image) : DEFAULT_IMAGE;
  const resolvedAlt = imageAlt || title || "SAMI - Supporting African Maths Initiatives";

  const schemas = schemaData ? (Array.isArray(schemaData) ? schemaData : [schemaData]) : [];

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Supporting African Maths Initiatives" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:alt" content={resolvedAlt} />
      <meta property="og:locale" content="en_GB" />

      {/* Article specific OG */}
      {type === "article" && article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.authors?.map((author, i) => <meta key={i} property="article:author" content={author} />)}
          {article.tags?.map((tag, i) => <meta key={i} property="article:tag" content={tag} />)}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@supportingami" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={resolvedAlt} />

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
};

export default SEO;
