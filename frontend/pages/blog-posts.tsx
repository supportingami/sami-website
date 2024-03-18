import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { serverQuery } from "lib/graphql";
import type { IBlogPost } from "types/blogpost";
import type { BlogPostsQuery, BlogPost } from "../graphql/generated";
import { BlogPostsDocument } from "../graphql/generated";
import PageLayout from "components/layout/pageLayout";
import { BlogCardComponent } from "components/content/blog-post/blogCard";

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  let blogs: IBlogPost[] = [];
  const blogPostRes = await serverQuery<BlogPostsQuery>(BlogPostsDocument);
  if (blogPostRes) {
    blogs = blogPostRes.data.blogPosts.data.map((b) => ({
      ...(b.attributes as BlogPost),
      id: b.id,
    }));
  }
  return {
    props: {
      blogs,
    },
  };
};

const BlogPosts = ({ blogs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>News Page</title>
      </Head>
      <PageLayout>
        <h1 className="font-semibold text-4xl">News</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {blogs.map((blog) => (
            <BlogCardComponent key={blog.id} blog={blog} />
          ))}
        </div>
      </PageLayout>
    </>
  );
};

export default BlogPosts;
