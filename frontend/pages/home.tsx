import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";

import { serverQuery } from "lib/graphql";
import type { HomeContentQuery, ProjectType } from "../graphql/generated";
import { HomeContentDocument } from "../graphql/generated";
import { HeroImageComponent } from "components/common/heroImage";
import { MissionStatementComponent } from "components/content/home/missionStatement";
import PageSection from "components/layout/pageSection";
import { ProjectSummaryComponent } from "components/content/home/ProjectSummary";
import { GetInvolvedComponent } from "components/content/home/getInvolved";
import { ImpactSectionComponent } from "components/content/home/ImpactSection";
import { BlogCardComponent } from "components/content/blog-post/blogCard";
import { DonateSummary } from "components/content/home/donateSummary";
import Image from "next-export-optimize-images/image";
import { useBreakpointQuery } from "lib/breakpoints";

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const res = await serverQuery<HomeContentQuery>(HomeContentDocument);
  return {
    props: {
      blogs: res.data.blogPosts_connection?.nodes || [],
      content: res.data.homeContent,
      projects: (res.data.projectTypes_connection?.nodes || []).map((p) => ({
        ...(p as ProjectType),
        id: p.documentId,
      })),
    },
  };
};

/**
 * Asymmetric triangle divider, adapted from https://www.shapedivider.app/
 * Alternative designs could be adapted from https://shapedividers.com/
 * (css applied in global styles)
 * @returns
 */
const ShapeDivider = () => (
  <div className="shape-divider">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M1200 0L0 0 1000 40 1200 0z" className="shape-fill"></path>
    </svg>
  </div>
);

const SamiIntroLogo = () => {
  return (
    <div className={`relative h-16 mt-2 -mb-16`}>
      <Image sizes="200px, 100px" src="/images/sami-logo-no-text.svg" fill alt="home-logo"></Image>
    </div>
  );
};
const HomePage = ({ content, blogs, projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isLargeScreen = useBreakpointQuery("lg");
  return (
    <>
      <Head>
        <title>SAMI</title>
      </Head>
      <>
        <div className="relative">
          {content.HeroImages?.[0] && <HeroImageComponent heroImage={content.HeroImages[0] as any} />}
          <ShapeDivider />
        </div>
        {!isLargeScreen && <SamiIntroLogo />}

        {content.MissionStatement && (
          <PageSection className="py-16">
            <MissionStatementComponent {...(content.MissionStatement as any)} />
          </PageSection>
        )}
        <PageSection fullwidth className="bg-primary primary-content text-white py-8">
          {content.ImpactSection && <ImpactSectionComponent {...(content.ImpactSection as any)} />}
        </PageSection>
        <PageSection className="py-16">
          {content.ProjectSummary && (
            <ProjectSummaryComponent Projects={projects} {...(content.ProjectSummary as any)} />
          )}
        </PageSection>
        <PageSection fullwidth className="bg-base-200 py-16">
          {content.GetInvolved && <GetInvolvedComponent {...(content.GetInvolved as any)} />}
        </PageSection>
        <PageSection fullwidth className="bg-primary-focus text-white py-0">
          <h3 className="text-center">Latest News</h3>
        </PageSection>
        <PageSection className="py-16">
          <div className="grid grid-cols-1 gap-5 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
            {blogs.map((blog) => (
              <BlogCardComponent key={blog.documentId} blog={blog as any} />
            ))}
          </div>
        </PageSection>
        <PageSection fullwidth className="bg-accent text-white py-4">
          <DonateSummary />
        </PageSection>
        {/* <PageSection fullwidth className="bg-base-200 py-16"></PageSection> */}
      </>
    </>
  );
};
export default HomePage;
