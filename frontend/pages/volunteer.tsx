import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { SEO } from "components/common/seo";
import { buildFAQSchema } from "lib/schemaOrg";
import type {
  VolunteerContentQuery,
  FaqsQuery,
  Faq,
  DynamicContentContentDynamicZone,
  ComponentCommonImage,
} from "../graphql/generated";
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
  const firstImageBlock = volunteerPageContent?.find(
    (b) => (b as ComponentCommonImage).__typename === "ComponentCommonImage" && (b as ComponentCommonImage).Media,
  ) as ComponentCommonImage | undefined;
  const volunteerImage = firstImageBlock?.Media;

  return (
    <>
      <SEO
        title="Volunteer with SAMI"
        description="Volunteer with SAMI and support maths initiatives across Africa through in-person maths camps, remote volunteering, and community projects."
        canonicalPath="/volunteer"
        image={volunteerImage}
        schemaData={buildFAQSchema(faqs)}
      />
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
