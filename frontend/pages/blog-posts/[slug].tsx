import React from "react";
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { SEO } from "components/common/seo";
import { buildBlogPostingSchema, buildBreadcrumbSchema } from "lib/schemaOrg";
import { SITE_URL } from "lib/media";
import { serverQuery } from "lib/graphql";
import type { IBlogPost } from "types/blogpost";
import type { BlogPost, BlogPostFiltersInput, BlogPostContentQuery } from "../../graphql/generated";
import { BlogPostContentDocument } from "../../graphql/generated";
import { BlogPostComponent } from "components/content/blog-post/post";
import PageLayout from "components/layout/pageLayout";

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const filters: BlogPostFiltersInput = { Slug: { eq: params.slug as string } };
  const blogPostRes = await serverQuery<BlogPostContentQuery>(BlogPostContentDocument, {
    filters,
  });
  const matchedBlogPost = blogPostRes.data.blogPosts_connection.nodes[0];
  if (matchedBlogPost) {
    return { props: { blogPost: matchedBlogPost as IBlogPost } };
  }
  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPostRes = await serverQuery<BlogPostContentQuery>(BlogPostContentDocument);
  let blogs: IBlogPost[] = [];
  if (blogPostRes) {
    blogs = blogPostRes.data.blogPosts_connection.nodes.map((b) => ({
      ...(b as BlogPost),
      id: b.documentId,
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
  const canonicalUrl = `${SITE_URL}/blog-posts/${blogPost.Slug}`;
  const description = blogPost.Summary || `Read ${blogPost.Title} from Supporting African Maths Initiatives.`;

  const schemaData = [
    buildBlogPostingSchema(blogPost, canonicalUrl),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "News", url: "/blog-posts" },
      { name: blogPost.Title, url: `/blog-posts/${blogPost.Slug}` },
    ]),
  ];

  return (
    <>
      <SEO
        title={blogPost.Title}
        description={description}
        canonicalPath={`/blog-posts/${blogPost.Slug}`}
        image={blogPost.FeatureImage}
        imageAlt={blogPost.Title}
        type="article"
        article={{
          publishedTime: blogPost.DateWritten || undefined,
          modifiedTime: blogPost.DateWritten || undefined,
        }}
        schemaData={schemaData}
      />
      <PageLayout>
        <BlogPostComponent blogPost={blogPost} />
      </PageLayout>
    </>
  );
};

export default BlogPostPage;
