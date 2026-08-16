import { getAbsoluteStrapiMedia, SITE_URL } from "./media";
import type { BlogPost, ProjectType, Faq, Member, Partner } from "../graphql/generated";

/**
 * Organization / NGO Schema for SAMI
 */
export function buildOrganizationSchema(members?: Partial<Member>[], partners?: Partial<Partner>[]) {
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE_URL}/#organization`,
    name: "Supporting African Maths Initiatives",
    alternateName: "SAMI",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/sami-logo.svg`,
      width: 300,
      height: 100,
    },
    description:
      "Supporting African Maths Initiatives (SAMI) is a UK charity supporting innovative, sustainable mathematics projects in Africa.",
    sameAs: [
      "https://twitter.com/supportingami",
      "https://www.facebook.com/supportingami",
      "https://www.linkedin.com/company/supporting-african-maths-initiatives",
      "https://github.com/supportingami",
    ],
  };

  if (members && members.length > 0) {
    schema.member = members.map((m) => ({
      "@type": "Person",
      name: m.Name,
      image: m.Photo ? getAbsoluteStrapiMedia(m.Photo) : undefined,
      sameAs: m.LinkedIn || undefined,
      email: m.Email ? `mailto:${m.Email}` : undefined,
    }));
  }

  if (partners && partners.length > 0) {
    schema.sponsor = partners.map((p) => ({
      "@type": "Organization",
      name: p.Name,
      logo: p.Logo ? getAbsoluteStrapiMedia(p.Logo) : undefined,
    }));
  }

  return schema;
}

/**
 * BlogPosting schema for individual news articles
 */
export function buildBlogPostingSchema(blogPost: Partial<BlogPost>, canonicalUrl: string) {
  const imageUrl = blogPost.FeatureImage
    ? getAbsoluteStrapiMedia(blogPost.FeatureImage)
    : `${SITE_URL}/images/sami-logo.svg`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: blogPost.Title,
    description: blogPost.Summary || undefined,
    image: [imageUrl],
    datePublished: blogPost.DateWritten || undefined,
    dateModified: blogPost.DateWritten || undefined,
    author: {
      "@type": "Organization",
      name: "SAMI",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Supporting African Maths Initiatives",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/sami-logo.svg`,
      },
    },
  };
}

/**
 * FAQPage schema for volunteer and help pages
 */
export function buildFAQSchema(faqs: Partial<Faq>[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((faq) => faq.Question && faq.Response)
      .map((faq) => ({
        "@type": "Question",
        name: faq.Question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.Response,
        },
      })),
  };
}

/**
 * Educational / Community Project Schema
 */
export function buildProjectSchema(project: Partial<ProjectType>, canonicalUrl: string) {
  const imageUrl = project.FeatureImage
    ? getAbsoluteStrapiMedia(project.FeatureImage)
    : project.Icon
      ? getAbsoluteStrapiMedia(project.Icon)
      : `${SITE_URL}/images/sami-logo.svg`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    name: project.Name,
    headline: project.Name,
    description: project.HomeSummary || undefined,
    image: imageUrl,
    provider: {
      "@type": "Organization",
      name: "Supporting African Maths Initiatives",
      url: SITE_URL,
    },
  };
}

/**
 * BreadcrumbList Schema
 */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };
}
