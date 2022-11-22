import React from "react";
import Head from "next/head";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { serverQuery } from "lib/graphql";
import type { HomeContentQuery } from "../graphql/generated";
import { HomeContentDocument } from "../graphql/generated";
import { HeroImageComponent } from "components/common/heroImage";
import { MissionStatementComponent } from "components/pages/home/missionStatement";
import PageSection from "components/layout/pageSection";
import { ProjectSummaryComponent } from "components/pages/home/ProjectSummary";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  const res = await serverQuery<HomeContentQuery>(HomeContentDocument);
  return { props: { content: res.data.homeContent.data.attributes } };
};

const HomePage = ({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>SAMI</title>
    </Head>
    <>
      {content.HeroImages?.[0] && <HeroImageComponent heroImage={content.HeroImages[0] as any} />}

      {content.MissionStatement && (
        <PageSection className="pt-24">
          <MissionStatementComponent {...(content.MissionStatement as any)} />
        </PageSection>
      )}

      <PageSection fullwidth className="bg-primary primary-content text-white">
        (TODO - stats)
      </PageSection>
      <PageSection fullwidth>
        {content.ProjectSummary && <ProjectSummaryComponent {...(content.ProjectSummary as any)} />}
      </PageSection>
    </>
  </>
);

export default HomePage;
