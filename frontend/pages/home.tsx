import React from "react";
import Head from "next/head";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { serverQuery } from "lib/graphql";
import type { HomeContentQuery } from "../graphql/generated";
import { HomeContentDocument } from "../graphql/generated";
import PageLayout from "components/layout/pageLayout";
import { HeroImageComponent } from "components/common/heroImage";
import { MissionStatementComponent } from "components/pages/home/missionStatement";

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
      <PageLayout>
        {content.MissionStatement && <MissionStatementComponent {...(content.MissionStatement as any)} />}
      </PageLayout>
    </>
  </>
);

export default HomePage;
