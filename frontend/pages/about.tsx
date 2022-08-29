import React from "react";
import Head from "next/head";
import { AboutPageComponent} from "components/pages/about";
import { MembersPageComponent } from "components/pages/members";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {About } from "types/about"
import { AboutQuery, AboutDocument, MembersQuery, MembersDocument } from "../graphql/generated";
import { IMember } from "types/member";
import { serverQuery } from "lib/graphql";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  let about: About[] = [];
  let members: IMember[] = [];
  
  const aboutRes = await serverQuery<AboutQuery>(AboutDocument);

  if (aboutRes) {
    about =
      aboutRes.data.abouts.data.map((m) => ({ ...m.attributes, id: m.id })) || [];
  }
  
  const membersRes = await serverQuery<MembersQuery>(MembersDocument);
    if (membersRes) {
        members =
            membersRes.data.members.data.map((m) => ({ ...m.attributes, id: m.id })) || [];
    }
    return {
        props: {
            about,
            members
        },
    };
};





const AboutPage = ({
  about,
  members
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <AboutPageComponent aboutPageContent={about} />
      <MembersPageComponent members={members} />
    </>
  );
};

export default AboutPage;
