import type { UploadFile } from "../graphql/generated";

/**
 * Depending on environment use a different base url for images
 * If a specific `NEXT_PUBLIC_IMAGE_URL` defined use that
 */
const NEXT_PUBLIC_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

function getStrapiURL(path = "") {
  return `${NEXT_PUBLIC_IMAGE_URL}${path}`;
}

export function getStrapiMedia(media: Partial<UploadFile> = {}): string {
  if (media) {
    const { url } = media;
    const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
    return imageUrl;
  } else {
    console.trace("Media missing", media);
    return "";
  }
}
