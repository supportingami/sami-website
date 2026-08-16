import type { UploadFile } from "../graphql/generated";

/**
 * Depending on environment use a different base url for images
 * If a specific `NEXT_PUBLIC_IMAGE_URL` defined use that
 */
const NEXT_PUBLIC_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://samicharity.co.uk";

function getStrapiURL(path = "") {
  return `${NEXT_PUBLIC_IMAGE_URL}${path}`;
}

export function getStrapiMedia(media: Partial<UploadFile> = {}): string {
  if (!media) return "";
  const { url } = media;
  if (!url) return "";

  // If url is already an absolute external URL (e.g. storage.googleapis.com)
  if (url.startsWith("http://") || url.startsWith("https://")) {
    if (url.includes("localhost:1337/uploads/")) {
      return url.replace(/https?:\/\/localhost:1337/, "");
    }
    return url;
  }

  // If a non-localhost image base URL is explicitly defined (e.g. CDN or remote backend), use it
  if (NEXT_PUBLIC_IMAGE_URL && !NEXT_PUBLIC_IMAGE_URL.includes("localhost:1337")) {
    return getStrapiURL(url);
  }

  // Otherwise, serve relative path from frontend public/shared volume
  return url;
}

export function getAbsoluteStrapiMedia(media?: Partial<UploadFile> | string | null): string {
  if (!media) return `${SITE_URL}/images/sami-logo.svg`;
  if (typeof media === "string") {
    if (media.includes("localhost:1337")) {
      return media.replace(/https?:\/\/localhost:1337/, SITE_URL);
    }
    if (media.startsWith("http://") || media.startsWith("https://")) return media;
    return `${SITE_URL}${media.startsWith("/") ? "" : "/"}${media}`;
  }
  const relOrAbs = getStrapiMedia(media);
  if (!relOrAbs) return `${SITE_URL}/images/sami-logo.svg`;
  if (relOrAbs.startsWith("http://") || relOrAbs.startsWith("https://")) {
    return relOrAbs.replace(/https?:\/\/localhost:1337/, SITE_URL);
  }
  return `${SITE_URL}${relOrAbs.startsWith("/") ? "" : "/"}${relOrAbs}`;
}
