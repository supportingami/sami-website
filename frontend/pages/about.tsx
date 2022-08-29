import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Heading } from "@chakra-ui/core"; 
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
      <Heading size="md">SAMI Theory of Change</Heading>
      <p>
      At SAMI we’ve been working to build our thoughts on how everything we do can fit into a larger picture to create real change across Africa. We hope to use this section to communicate some of these ideas when they are slightly further developed. In the meantime you can see our current working document <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/document/d/1QC0zZ4h59NUzyEfO9x33baYukHwbfP1I4PUNGFjI4JM/edit?usp=sharing">here</a>
        </p>
      <AnnualReportPageComponent areports={areports} />
    </>
  );
};

export default AboutPage;
