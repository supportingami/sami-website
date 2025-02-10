import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import type { VolunteerContentQuery, FaqsQuery, Faq, DynamicContentContentDynamicZone } from "../graphql/generated";
import { VolunteerContentDocument, FaqsDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";
import type { IFaq } from "types/faq";
import { SectionHeader } from "components/layout/Header";
import PageSection from "components/layout/pageSection";
import { DynamicComponents } from "components/common/dynamic";
import { VolunteerFAQs } from "components/content/VounteerFAQs";

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  let volunteerPageContent: DynamicContentContentDynamicZone[];
  let faqs: IFaq[] = [];
  const volunteerRes = await serverQuery<VolunteerContentQuery>(VolunteerContentDocument);
  if (volunteerRes) {
    volunteerPageContent = volunteerRes.data.volunteerContent.Content as DynamicContentContentDynamicZone[];
  }
  const faqRes = await serverQuery<FaqsQuery>(FaqsDocument);
  if (faqRes) {
    faqs = faqRes.data.faqs_connection.nodes.map((faq) => ({
      ...(faq as Faq),
      id: faq.documentId,
    }));
  }
  return {
    props: {
      volunteerPageContent,
      faqs,
    },
  };
};

const VolunteerPage = ({ volunteerPageContent, faqs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Volunteer</title>
      </Head>
      <SectionHeader background={{ imageName: "bg-tiling-2", size: "1500px 1500px", position: "70px -640px" }}>
        <h1 className="text-white">Volunteer</h1>
      </SectionHeader>
      <PageSection className="py-8">
        <DynamicComponents blocks={volunteerPageContent} />
      </PageSection>
      <PageSection fullwidth className="bg-base-200 py-6">
        <h2>FAQs</h2>
      </PageSection>
      <PageSection className="py-8">
        {faqs.map((f) => (
          <VolunteerFAQs key={f.id} faq={f} />
        ))}
      </PageSection>
    </>
  );
};

export default VolunteerPage;
