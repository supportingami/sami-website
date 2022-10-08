import React from "react";
import Head from "next/head";
import { Heading } from "@chakra-ui/core";
import { AboutPageComponent } from "components/pages/about";
import { AnnualReportPageComponent } from "components/pages/annual-reports";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { IAnnualReport } from "types/annualreport";
import { IMember } from "types/member";

import {
  AboutQuery,
  AboutDocument,
  MembersQuery,
  MembersDocument,
  AnnualReportsQuery,
  AnnualReportsDocument,
} from "../graphql/generated";
import { serverQuery } from "lib/graphql";
import { IAbout } from "types/about";
import { MembersComponent } from "components/pages/members";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  let about: IAbout[] = [];
  let members: IMember[] = [];
  let reports: IAnnualReport[] = [];

  const aboutRes = await serverQuery<AboutQuery>(AboutDocument);

  if (aboutRes) {
    about = aboutRes.data.abouts.data.map((m) => ({ ...m.attributes, id: m.id })) || [];
  }

  const membersRes = await serverQuery<MembersQuery>(MembersDocument);
  if (membersRes) {
    members = membersRes.data.members.data.map((m) => ({ ...m.attributes, id: m.id } as IMember)) || [];
  }

  const areportsRes = await serverQuery<AnnualReportsQuery>(AnnualReportsDocument);
  if (areportsRes) {
    reports = areportsRes.data.annualReports.data.map((m) => ({ ...m.attributes, id: m.id } as IAnnualReport)) || [];
  }

  return {
    props: {
      about,
      members,
      reports,
    },
  };
};

const AboutPage = ({ about, members, reports }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <AboutPageComponent aboutPageContent={about} />
      <MembersComponent members={members} />
      <Heading size="md">SAMI Theory of Change</Heading>
      <p>
        At SAMI we’ve been working to build our thoughts on how everything we do can fit into a larger picture to create
        real change across Africa. We hope to use this section to communicate some of these ideas when they are slightly
        further developed. In the meantime you can see our current working document{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.google.com/document/d/1QC0zZ4h59NUzyEfO9x33baYukHwbfP1I4PUNGFjI4JM/edit?usp=sharing"
        >
          here
        </a>
      </p>
      <AnnualReportPageComponent reports={reports} />
    </>
  );
};

export default AboutPage;
