import type { UploadFileEntityResponse } from "../graphql/generated";

function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
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
