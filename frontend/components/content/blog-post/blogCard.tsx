import Image from "next-export-optimize-images/image";
import { getStrapiMedia } from "lib/media";
import React from "react";
import type { IBlogPost } from "types/blogpost";
import { BiCalendar } from "react-icons/bi";
import dayjs from "dayjs";
import Link from "next/link";

export const BlogCardComponent: React.FC<{
  blog: IBlogPost;
}> = ({ blog }) => (
  <Link href={`/blog-posts/${blog.Slug}`}>
    <div
      className="
  relative flex flex-col justify-start items-start min-h-full max-h-full font-sans rounded 
  border-gray-200 shadow-md cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
    >
      <div className="relative h-48 w-full">
        {blog.FeatureImage && (
          <Image
            src={getStrapiMedia(blog.FeatureImage)}
            alt={"image"}
            fill
            sizes="320"
            placeholder="empty"
            className="object-cover"
          />
        )}
      </div>

      <div className="capitalize text-left font-semibold p-2 pt-4 leading-4">
        <div className="text-lg">{blog.Title}</div>
        <div className="uppercase font-semibold flex flex-row justify-start items-center text-gray-500 text-xs pt-2">
          <BiCalendar />
          {dayjs(blog.DateWritten).format("MMM D, YYYY")}
        </div>
      </div>
      <div data-cy="blog-summary" className="py-2 px-2 relative flex-1 flex flex-col">
        <div className="pt-0 text-sm overflow-ellipsis overflow-hidden max-h-20 relative whitespace-pre-line">
          {blog.Summary}
        </div>
      </div>
    </div>
  </Link>
);
