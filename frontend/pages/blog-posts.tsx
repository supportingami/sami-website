import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { serverQuery } from "lib/graphql";
import { IBlogPost } from "types/blogpost";
import { BlogPostsQuery } from "../graphql/generated";
import { BlogPostsDocument } from "../graphql/generated";
import { BlogPost } from "../graphql/generated";
import { BlogPageComponent } from "components/pages/blog-post";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
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

const VolunteerPage = ({ blogs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>News Page</title>
      </Head>
      <BlogPageComponent blogs={blogs} />
    </>
  );
};

export default VolunteerPage;
