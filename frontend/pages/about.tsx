import React from "react";
import Head from "next/head";
import { AboutPageComponent } from "components/pages/about";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";

import type { AboutQuery, MembersQuery, AnnualReportsQuery, Partner, PartnersQuery } from "../graphql/generated";
import { AboutDocument, MembersDocument, AnnualReportsDocument, PartnersDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";
import type { IAbout } from "types/about";
import type { IAnnualReport } from "types/annualreport";
import type { IMember } from "types/member";
import { MembersComponent } from "components/pages/about/members";
import ToC from "components/pages/about/ToC";
import Testimonials from "components/pages/about/testmonials/Testmonials";
import PageSection from "components/layout/pageSection";
import { SectionHeader } from "components/layout/Header";
import { getStrapiMedia } from "lib/media";
import { AnnualReportComponent } from "components/content/AnnualReport";

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  let about: IAbout[] = [];
  let members: IMember[] = [];
  let reports: IAnnualReport[] = [];
  let partners: Partner[] = [];

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

  const partnersRes = await serverQuery<PartnersQuery>(PartnersDocument);
  if (partners) {
    partners = partnersRes.data.partners.data.map((m) => ({ ...(m.attributes as Partner) }));
  }

  return {
    props: {
      about,
      members,
      reports,
      partners,
    },
  };
};

const headerButtons = [
  {
    id: "toc",
    text: "Theory of Change",
  },
  {
    id: "members",
    text: "Members & Volunteers",
  },
  {
    id: "reports",
    text: "Annual Reports",
  },
];

const AboutPage = ({ about, members, reports, partners }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
        <AboutPageComponent aboutPageContent={about} />
        <PageSection className="text-center mt-16" sectionId="members">
          <MembersComponent members={members} />
        </PageSection>
        <PageSection fullwidth className="bg-base-200 py-16" sectionId="toc">
          <ToC />
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
          <Testimonials />
        </PageSection>
        <PageSection fullwidth className="bg-primary-focus text-white py-0">
          <h2 className="text-center">Our Partners</h2>
        </PageSection>
        <PageSection fullwidth className="mb-36">
          <div className="grid auto-rows-[100px] gap-16 grid-cols-2 md:grid-cols-4 my-10 md:my-20 items-center justify-items-center">
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
