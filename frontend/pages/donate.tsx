import Head from "next/head";
import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serverQuery } from "lib/graphql";
import { DonateContentDocument, DonorsDocument } from "../graphql/generated";
import type { ComponentHomeMissionStatement, DonateContentQuery, Donor, DonorsQuery } from "../graphql/generated";
import PageSection from "components/layout/pageSection";
import Image from "next-export-optimize-images/image";

import { ImageHeadingContentLayout } from "components/layout/columns";
import { HTMLContent } from "components/common/htmlContent";
import { ActionButtonsComponent } from "components/common/actionButtons";
import { getStrapiMedia } from "lib/media";

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const donateContentRes = await serverQuery<DonateContentQuery>(DonateContentDocument);
  const donorsRes = await serverQuery<DonorsQuery>(DonorsDocument);
  return {
    props: {
      content: donateContentRes.data.donateContent,
      donors: (donorsRes.data.donors_connection.nodes as Donor[]) || [],
    },
  };
};

export const DonateContentComponent: React.FC<ComponentHomeMissionStatement> = ({
  ActionButtons,
  Description,
  Heading,
  Image: UploadedImage,
  Text,
}) => (
  <>
    <ImageHeadingContentLayout
      imageSide="right"
      Heading={<h2 className="subtitle">{Heading}</h2>}
      Image={
        <Image src={getStrapiMedia(UploadedImage)} alt={"image"} fill placeholder="empty" className="object-cover" />
      }
      Content={
        <>
          <h3>{Text}</h3>
          <HTMLContent className="mb-6">{Description}</HTMLContent>
          {ActionButtons && <ActionButtonsComponent actionButtons={ActionButtons} className="mt-8" />}
        </>
      }
    />
  </>
);

const DonatePage = ({ content, donors }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>SAMI Donate</title>
      </Head>
      <>
        {content.DonateStatement && (
          <PageSection fullwidth className="py-16 bg-blue-50">
            <DonateContentComponent {...(content.DonateStatement as any)} />
          </PageSection>
        )}
        <PageSection fullwidth className="bg-primary-focus text-white py-0">
          <h3 className="text-center">You can help us make a difference - SUPPORT SAMI</h3>
        </PageSection>

        <PageSection className="mt-6 mb-12 text-center">
          <div>
            <div>
              <h3 className="text-lg font-normal">OUR DONORS INCLUDE</h3>
            </div>
            <div className="grid auto-rows-[100px] gap-20 grid-cols-2 md:grid-cols-3 my-10 mx-auto md:my-20 items-center justify-center max-w-3xl">
              {donors.map((donor) => (
                <div className="relative h-full w-full" key={donor.Name}>
                  <Image
                    className="object-contain"
                    src={getStrapiMedia(donor.Logo)}
                    alt={donor.Name}
                    fill
                    sizes="100"
                  />
                </div>
              ))}
            </div>
          </div>
        </PageSection>
      </>
    </>
  );
};

export default DonatePage;
