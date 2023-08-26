import getConfig from "next/config";
import type { UploadFileEntityResponse } from "../graphql/generated";

/**
 * Depending on environment use a different base url for images
 * If a specific `NEXT_PUBLIC_IMAGE_URL` defined use that
 *
 * Otherwise fallback to `NEXT_PUBLIC_API_URL`
 * NOTE - use of process.env vs publicRuntimeConfig will depend on server/build config
 * public runtime config used when running standalone (docker) as process.env not defined
 */
function getBaseUrl() {
  const { publicRuntimeConfig } = getConfig();
  return publicRuntimeConfig.NEXT_PUBLIC_IMAGE_URL;
}

function getStrapiURL(path = "") {
  return `${getBaseUrl()}${path}`;
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
