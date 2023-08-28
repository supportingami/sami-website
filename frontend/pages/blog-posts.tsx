import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { serverQuery } from "lib/graphql";
import type { IBlogPost } from "types/blogpost";
import type { BlogPostsQuery, BlogPost } from "../graphql/generated";
import { BlogPostsDocument } from "../graphql/generated";
import { BlogPageComponent } from "components/pages/blog-post";
import PageLayout from "components/layout/pageLayout";

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

const VolunteerPage = ({ blogs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>News Page</title>
      </Head>
      <PageLayout>
        <BlogPageComponent blogs={blogs} />
      </PageLayout>
    </>
  );
};

export default VolunteerPage;
