import React from "react";
import Head from "next/head";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { serverQuery } from "lib/graphql";
import type { HomeContentQuery, BlogPostsQuery, BlogPost } from "../graphql/generated";
import { HomeContentDocument, BlogPostsDocument } from "../graphql/generated";
import { HeroImageComponent } from "components/common/heroImage";
import { MissionStatementComponent } from "components/pages/home/missionStatement";
import PageSection from "components/layout/pageSection";
import { ProjectSummaryComponent } from "components/pages/home/ProjectSummary";
import { GetInvolvedComponent } from "components/pages/home/getInvolved";
import { ImpactSectionComponent } from "components/pages/home/ImpactSection";
import type { IBlogPost } from "types/blogpost";
import { BlogCardComponent } from "components/pages/blog-post/blogCard";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  const res = await serverQuery<HomeContentQuery>(HomeContentDocument);
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
      content: res.data.homeContent.data.attributes,
    },
  };
};

const HomePage = ({ content, blogs }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>SAMI</title>
    </Head>
    <>
      {content.HeroImages?.[0] && <HeroImageComponent heroImage={content.HeroImages[0] as any} />}

      {content.MissionStatement && (
        <PageSection className="py-16">
          <MissionStatementComponent {...(content.MissionStatement as any)} />
        </PageSection>
      )}
      <PageSection fullwidth className="bg-primary primary-content text-white py-8">
        {content.ImpactSection && <ImpactSectionComponent {...(content.ImpactSection as any)} />}
      </PageSection>
      <PageSection className="py-16">
        {content.ProjectSummary && <ProjectSummaryComponent {...(content.ProjectSummary as any)} />}
      </PageSection>
      <PageSection fullwidth className="bg-base-200 py-16">
        {content.GetInvolved && <GetInvolvedComponent {...(content.GetInvolved as any)} />}
      </PageSection>
      <PageSection fullwidth className="bg-primary-focus text-white py-0">
        <h3 className="text-center">Latest News</h3>
      </PageSection>
      <PageSection className="py-16">
        <div className="grid grid-cols-1 gap-5 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
          {blogs && blogs.slice(0,3).map((blog) => <BlogCardComponent key={blog.id} blog={blog} />)}
        </div>
      </PageSection>
      <PageSection fullwidth className="bg-accent text-white py-0">
        <h3 className="text-center">You can help us make a difference</h3>
      </PageSection>
      <PageSection fullwidth className="bg-base-200 py-16">
        (TODO - donate buttons)
      </PageSection>
      <PageSection fullwidth className="bg-primary text-white text-center py-16">
        <h3>Sign up to get latest updates</h3>
        <p>
          Be the first to hear about new projects and receive occasional updates about SAMI
          <br></br>
          <br></br>
          (TODO - mailing list signup)
        </p>
      </PageSection>
      <PageSection fullwidth className="bg-base-300 py-16">
        (TODO - sitemap)
      </PageSection>
      <PageSection className="py-4">(TODO - footer)</PageSection>
    </>
  </>
);

export default HomePage;
