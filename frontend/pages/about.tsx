import React from "react";
import Head from "next/head";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";

import type {
  AboutContent,
  MembersQuery,
  AnnualReportsQuery,
  Partner,
  PartnersQuery,
  AboutContentQuery,
} from "../graphql/generated";
import { MembersDocument, AnnualReportsDocument, PartnersDocument, AboutContentDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";
import type { IAnnualReport } from "types/annualreport";
import type { IMember } from "types/member";
import { MembersComponent } from "components/content/members";
import TheoryOfChange from "components/content/TheoryOfChange";
import Testimonials from "components/content/Testmonials";
import PageSection from "components/layout/pageSection";
import { SectionHeader } from "components/layout/Header";
import { getStrapiMedia } from "lib/media";
import { AnnualReportComponent } from "components/content/AnnualReport";
import { HTMLContent } from "components/common/htmlContent";
import SamiPrinciples from "components/content/SamiPrinciples";

interface IAboutProps {
  content: AboutContent;
  members: IMember[];
  reports: IAnnualReport[];
  partners: Partner[];
}

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const contentRes = await serverQuery<AboutContentQuery>(AboutContentDocument);
  const membersRes = await serverQuery<MembersQuery>(MembersDocument);
  const reportsRes = await serverQuery<AnnualReportsQuery>(AnnualReportsDocument);
  const partnersRes = await serverQuery<PartnersQuery>(PartnersDocument);

  const props: IAboutProps = {
    content: contentRes.data?.aboutContent as AboutContent,
    members: membersRes.data?.members_connection.nodes.map((m) => ({ ...m, id: m.documentId } as IMember)) || [],
    partners: partnersRes.data.partners_connection.nodes.map((m) => m as Partner) || [],
    reports:
      reportsRes.data.annualReports_connection.nodes.map((m) => ({ ...m, id: m.documentId } as IAnnualReport)) || [],
  };

  return {
    props,
  };
};

const headerButtons = [
  {
    id: "members",
    text: "Members & Volunteers",
  },
  {
    id: "toc",
    text: "Theory of Change",
  },
  {
    id: "reports",
    text: "Annual Reports",
  },
];

const AboutPage = ({ content, members, reports, partners }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <SectionHeader background={{ imageName: "bg-tiling-1", size: "1660px 480px", position: "-150px -58px" }}>
        <h1 className="text-white">Our Work</h1>
        <div className="flex gap-2 justify-center flex-1 flex-wrap mb-8">
          {headerButtons.map(({ text, id }) => (
            <a key={id} className="btn btn-outline btn-primary bg-white" href={`#${id}`}>
              {text}
            </a>
          ))}
        </div>
      </SectionHeader>
      <div style={{ scrollBehavior: "smooth", display: "contents" }}>
        <PageSection className="py-16 max-w-screen-lg" sectionId="intro">
          <HTMLContent>{content.Intro}</HTMLContent>
        </PageSection>
        <PageSection fullwidth className="bg-base-200 py-8" id="principles">
          <h2 className="text-center">All projects live by the following principles</h2>
          <SamiPrinciples />
        </PageSection>
        <PageSection className="text-center my-16" sectionId="members">
          <h2>Members & Volunteers</h2>
          <p className="mt-3 mb-10 lg:px-12 px-5">
            SAMI is extremely thankful to have a fantastic team of members and volunteers that support in the UK and
            Africa.
            <br />
            Here are a few of the people that make everything possible day-to-day:
          </p>
          <MembersComponent members={members} />
        </PageSection>
        <PageSection fullwidth className="bg-base-200 py-16 text-center md:px-5" sectionId="toc">
          <h2>SAMI Theory of Change</h2>
          <TheoryOfChange />
        </PageSection>
        <PageSection className="text-center py-16" sectionId="reports">
          <h2>Annual Reports</h2>
          <p className="mb-10">Find below links to our annual report and other relevant documents</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 px-5 lg:px-24">
            {reports.map((report) => (
              <AnnualReportComponent key={report.id} report={report} />
            ))}
          </div>
        </PageSection>
        <PageSection fullwidth className="bg-base-200 py-16">
          <h2 className="text-center">Improving Lives</h2>
          <Testimonials testimonials={content.Testimonials_connection.nodes || []} />
        </PageSection>
        <PageSection fullwidth className="bg-primary-focus text-white py-0">
          <h2 className="text-center text-white">Our Partners</h2>
        </PageSection>
        <PageSection fullwidth className="mb-36">
          <div className="grid auto-rows-[120px] gap-16 grid-cols-2 md:grid-cols-4 my-10 md:my-20 items-center justify-items-center">
            {partners.map((partner) => (
              <PartnerImage key={partner.Name} partner={partner} />
            ))}
          </div>
        </PageSection>
      </div>
    </>
  );
};

const PartnerImage = ({ partner }: { partner: Partner }) => (
  <div className="relative h-full w-full">
    <Image className="object-contain" src={getStrapiMedia(partner.Logo)} alt={partner.Name} fill sizes="100" />
  </div>
);

export default AboutPage;
