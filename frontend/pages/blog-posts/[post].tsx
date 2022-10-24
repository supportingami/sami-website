import { useRouter } from "next/router";
import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { serverQuery } from "lib/graphql";
import { IBlogPost } from "types/blogpost";
import { BlogPostsQuery } from "../../graphql/generated";
import { BlogPostsDocument } from "../../graphql/generated";
import { BlogPost } from "../../graphql/generated";
import { BlogPostComponent } from "components/pages/blog-post/post";
import PageLayout from "components/layout/page-layout";

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

const BlogPostPage = ({ blogs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const postTitle = router.query.post as string;
  return (
    <>
      <Head>
        <title>{postTitle}</title>
      </Head>
      <PageLayout>
        <BlogPostComponent blogPosts={blogs} title={postTitle} />
      </PageLayout>
    </>
  );
};

export default BlogPostPage;
