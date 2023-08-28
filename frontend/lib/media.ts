import getConfig from "next/config";
import type { UploadFileEntityResponse } from "../graphql/generated";

/**
 * Depending on environment use a different base url for images
 * If a specific `NEXT_PUBLIC_IMAGE_URL` defined use that
 */
const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_IMAGE_URL } = publicRuntimeConfig;

function getStrapiURL(path = "") {
  return `${NEXT_PUBLIC_IMAGE_URL}${path}`;
}

export function getStrapiMedia(media: Partial<UploadFileEntityResponse>): string {
  if (!media?.data?.attributes) {
    console.error("Media missing");
    return "";
  }
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}
