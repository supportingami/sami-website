import React from "react";
import Head from "next/head";
import { AboutPageComponent } from "components/pages/about";
import { AnnualReportPageComponent } from "components/pages/about/annual-reports";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import type { IAnnualReport } from "types/annualreport";
import type { IMember } from "types/member";

import type { AboutQuery, MembersQuery, AnnualReportsQuery } from "../graphql/generated";
import { AboutDocument, MembersDocument, AnnualReportsDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";
import type { IAbout } from "types/about";
import { MembersComponent } from "components/pages/about/members";
import ToC from "components/pages/about/ToC";
import Testimonials from "components/pages/about/testmonials/Testmonials";
import Partners from "components/pages/about/partners";
import PageSection from "components/layout/pageSection";

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
      <PageSection className="text-center mt-16">
        <MembersComponent members={members} />
      </PageSection>
      <PageSection fullwidth className="bg-base-200 py-16">
        <ToC />
      </PageSection>
      <PageSection className="text-center py-16">
        <AnnualReportPageComponent reports={reports} />
      </PageSection>
      <PageSection fullwidth className="bg-base-200 py-16">
        <Testimonials />
      </PageSection>
      <Partners />
    </>
  );
};

export default AboutPage;
