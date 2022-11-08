import Image from "next/image";
import { getStrapiMedia } from "lib/media";
import React from "react";
import type { IBlogPost } from "types/blogpost";
import { BiCalendar } from "react-icons/bi";
import dayjs from "dayjs";

export const BlogCardComponent: React.FC<{
  blog: IBlogPost;
}> = ({ blog }) => (
  <div className="relative flex flex-col justify-start items-start min-h-full max-h-full font-sans rounded border-gray-200 shadow-md">
    {blog.FeatureImage && (
      <Image
        src={getStrapiMedia(blog.FeatureImage)}
        alt={"image"}
        height={200}
        width={320}
        placeholder="empty"
        objectFit="cover"
      />
    )}
    <div className="capitalize text-left font-semibold p-2 pt-4 leading-4">
      <div className="text-lg">{blog.Title}</div>
      <div className="uppercase font-semibold flex flex-row justify-start items-center text-gray-500 text-xs pt-2">
        <BiCalendar />
        {dayjs(blog.DateWritten).format("MMM D, YYYY")}
      </div>
    </div>
    <div data-cy="blog-summary" className="py-2 px-2 relative flex-1 flex flex-col">
      <div className="pt-0 text-sm overflow-ellipsis overflow-hidden max-h-20 relative">{blog.Summary}</div>
      <div className="min-h-30 pt-2 mt-auto">
        <button className="text-center text-sm font-semibold bg-blue-600 py-2 px-4 rounded text-white ">
          <a href={`/blog-posts/${blog.Title}`}>Read More</a>
        </button>
      </div>
    </div>
  </div>
);
