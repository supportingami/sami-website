import React from "react";
import Head from "next/head";
import { AboutPageComponent} from "components/pages/about";
import { MembersPageComponent } from "components/pages/members";
import { AnnualReportPageComponent } from "components/pages/annual-reports";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {About } from "types/about"
import { AReport } from "types/annualreport";
import { IMember } from "types/member";

import { AboutQuery, AboutDocument, MembersQuery, MembersDocument,AnnualReportsQuery, AnnualReportsDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  let about: About[] = [];
  let members: IMember[] = [];
  let areports: AReport[] = [];
  
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

    const areportsRes = await serverQuery<AnnualReportsQuery>(AnnualReportsDocument);
    if (areportsRes) {
        areports =
            areportsRes.data.annualReports.data.map((m) => ({ ...m.attributes, id: m.id })) || [];
    }

    return {
        props: {
            about,
            members,
            areports
        },
    };
};





const AboutPage = ({
  about,
  members,
  areports
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <AboutPageComponent aboutPageContent={about} />
      <MembersPageComponent members={members} />
      <AnnualReportPageComponent areports={areports} />
    </>
  );
};

export default AboutPage;
