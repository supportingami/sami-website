import React from "react";
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { serverQuery } from "lib/graphql";
import type { IBlogPost } from "types/blogpost";
import type { BlogPost, BlogPostFiltersInput, BlogPostsQuery } from "../../graphql/generated";
import { BlogPostsDocument } from "../../graphql/generated";
import { BlogPostComponent } from "components/pages/blog-post/post";
import PageLayout from "components/layout/pageLayout";

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const filters: BlogPostFiltersInput = { Slug: { eq: params.slug as string } };
  const blogPostRes = await serverQuery<BlogPostsQuery>(BlogPostsDocument, {
    filters,
  });
  const matchedBlogPost = blogPostRes.data.blogPosts.data[0];
  if (matchedBlogPost) {
    return { props: { blogPost: matchedBlogPost.attributes as IBlogPost } };
  }
  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPostRes = await serverQuery<BlogPostsQuery>(BlogPostsDocument);
  let blogs: IBlogPost[] = [];
  if (blogPostRes) {
    blogs = blogPostRes.data.blogPosts.data.map((b) => ({
      ...(b.attributes as BlogPost),
      id: b.id,
    }));
  }
  return {
    paths: blogs.map(({ Slug }) => ({
      params: { slug: Slug },
    })),
    fallback: false, // false or "blocking"
  };
};

const BlogPostPage = ({ blogPost }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{blogPost.Title}</title>
      </Head>
      <PageLayout>
        <BlogPostComponent blogPost={blogPost} />
      </PageLayout>
    </>
  );
};

export default BlogPostPage;
