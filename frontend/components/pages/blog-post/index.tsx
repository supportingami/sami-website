import React from "react";
import type { IBlogPost } from "types/blogpost";
import { BlogCardComponent } from "./blog-card";

export const BlogPageComponent: React.FC<{ blogs: IBlogPost[] }> = ({ blogs }) => {
  return (
    <>
      <h1 className="font-semibold text-4xl">News</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {blogs.map((blog) => (
          <BlogCardComponent key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};
