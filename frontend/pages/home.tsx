import React from "react";
import Head from "next/head";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { serverQuery } from "lib/graphql";
import { HomeContentDocument, HomeContentQuery } from "../graphql/generated";
import { HeroImageComponent } from "components/common/heroImage";

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
      <h2>Our Mission</h2>
    </>
  </>
);

export default HomePage;
