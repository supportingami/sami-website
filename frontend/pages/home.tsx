import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";

import { serverQuery } from "lib/graphql";
import type { HomeContentQuery, ProjectType } from "../graphql/generated";
import { HomeContentDocument } from "../graphql/generated";
import { HeroImageComponent } from "components/common/heroImage";
import { MissionStatementComponent } from "components/pages/home/missionStatement";
import PageSection from "components/layout/pageSection";
import { ProjectSummaryComponent } from "components/pages/home/ProjectSummary";
import { GetInvolvedComponent } from "components/pages/home/getInvolved";
import { ImpactSectionComponent } from "components/pages/home/ImpactSection";
import { BlogCardComponent } from "components/pages/blog-post/blogCard";

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const res = await serverQuery<HomeContentQuery>(HomeContentDocument);
  return {
    props: {
      blogs: res.data.blogPosts?.data || [],
      content: res.data.homeContent.data.attributes,
      projects: (res.data.projectTypes?.data || []).map((p) => ({
        ...(p.attributes as ProjectType),
        id: p.id,
      })),
    },
  };
};

const DonateHeartSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const HomePage = ({ content, blogs, projects }: InferGetStaticPropsType<typeof getStaticProps>) => (
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
        {content.ProjectSummary && <ProjectSummaryComponent Projects={projects} {...(content.ProjectSummary as any)} />}
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
            <BlogCardComponent key={blog.id} blog={blog.attributes as any} />
          ))}
        </div>
      </PageSection>
      <PageSection fullwidth className="bg-accent text-white py-0">
        <div className="flex justify-center items-center">
          <h3 className="text-center">You can help us make a difference</h3>
          <Link href="/donate" className="ml-8">
            <button className="btn btn-accent text-white border-white border-1 hover:!border-white">
              <DonateHeartSVG />
              <span className="ml-1">Donate</span>
            </button>
          </Link>
        </div>
      </PageSection>
      {/* <PageSection fullwidth className="bg-base-200 py-16">
        (TODO - donate buttons)
      </PageSection> */}
    </>
  </>
);

export default HomePage;
