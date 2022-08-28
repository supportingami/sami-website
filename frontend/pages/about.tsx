import React from "react";
import Head from "next/head";
import { AboutPageComponent} from "components/pages/about";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {About } from "types/about"
import { AboutQuery, AboutDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  let about: About[] = [];
  
  const res = await serverQuery<AboutQuery>(AboutDocument);
  console.log("Testing", res);

  if (res) {
    about =
      res.data.abouts.data.map((m) => ({ ...m.attributes, id: m.id })) || [];
  }
  return {
    props: {
      about,
    },
  };
};

const AboutPage = ({
  about,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <AboutPageComponent aboutPageContent={about} />
    </>
  );
};

export default AboutPage;
