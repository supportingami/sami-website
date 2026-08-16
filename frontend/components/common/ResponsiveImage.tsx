import React from "react";
import Image from "next-export-optimize-images/image";
import type { ImageProps } from "next/image";
import type { UploadFile } from "../../graphql/generated";
import { getStrapiMedia } from "lib/media";

/**
 * Standard Tailwind CSS breakpoints
 */
const BP = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

/**
 * Centralized responsive image sizing presets mapped to Tailwind breakpoints.
 */
export const IMAGE_SIZES = {
  /** Full viewport width (e.g., Hero banners) */
  hero: "100vw",

  /** 50/50 side-by-side content sections on desktop, single column on mobile */
  twoColumn: `(max-width: ${BP.sm}) calc(100vw - 2rem), (max-width: ${BP.lg}) 448px, 50vw`,

  /** Grid cards (1 col mobile, 2 col tablet, 3-4 col desktop) */
  cardGrid: `(max-width: ${BP.sm}) calc(100vw - 2rem), (max-width: ${BP.lg}) 50vw, 384px`,

  /** Avatars, team member photos, partner & donor logos */
  avatarGrid: `(max-width: ${BP.sm}) 50vw, (max-width: ${BP.lg}) 33vw, 200px`,

  /** Header / Navbar logo */
  navLogo: `(min-width: ${BP.lg}) 200px, 100px`,

  /** Dynamic article / prose content images */
  articleContent: `(max-width: ${BP.md}) calc(100vw - 2rem), (max-width: ${BP.lg}) 768px, 800px`,

  /** Small fixed thumbnails/icons */
  thumbnail: "100px",
} as const;

export type ImageSizePreset = keyof typeof IMAGE_SIZES;

export interface ResponsiveImageProps extends Omit<ImageProps, "src" | "sizes" | "alt"> {
  src?: ImageProps["src"];
  media?: Partial<UploadFile> | null;
  preset?: ImageSizePreset;
  sizes?: string;
  alt?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ media, src, preset, sizes, alt, ...props }) => {
  const resolvedSrc = src || (media ? getStrapiMedia(media) : "");
  if (!resolvedSrc) return null;

  const resolvedSizes = sizes || (preset ? IMAGE_SIZES[preset] : undefined);
  const resolvedAlt = alt || media?.alternativeText || `${preset} image`;

  return <Image src={resolvedSrc} sizes={resolvedSizes} alt={resolvedAlt} {...props} />;
};

export default ResponsiveImage;
