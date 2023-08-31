import Head from "next/head";
import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serverQuery } from "lib/graphql";
import { DonateContentDocument } from "../graphql/generated";
import type { ComponentHomeMissionStatement, DonateContentQuery } from "../graphql/generated";
import PageSection from "components/layout/pageSection";
import Image from "next/image";

import PAHLogo from "public/images/Donate/panafricanhub.png";
import BDULogo from "public/images/Donate/BDU.png";
import InnodemsLogo from "public/images/Donate/innodems.png";
import LWFLogo from "public/images/Donate/LWF.png";
import HausdorffLogo from "public/images/Donate/hausdorff.png";
import IDEMSLogo from "public/images/Donate/idems-international.png";
import { ImageHeadingContentLayout } from "components/layout/columns";
import { HTMLContent } from "components/common/htmlContent";
import { ActionButtonsComponent } from "components/common/actionButtons";
import { getStrapiMedia } from "lib/media";

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const res = await serverQuery<DonateContentQuery>(DonateContentDocument);
  return {
    props: {
      content: res.data.donateContent.data.attributes,
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

const DonatePage = ({ content }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center my-10 items-center">
              <Image src={PAHLogo} alt="" objectFit="contain" />
              <div className="grid grid-cols-1 my-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center items-center mb-10">
                  <Image src={IDEMSLogo} alt="" objectFit="contain" />
                  <Image src={LWFLogo} alt="" objectFit="contain" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center items-center my-10">
                  <Image src={HausdorffLogo} alt="" objectFit="contain" />
                  <Image src={InnodemsLogo} alt="" objectFit="contain" />
                </div>
              </div>
              <Image src={BDULogo} alt="" objectFit="contain" />
            </div>
          </div>
        </PageSection>
      </>
    </>
  );
};

export default DonatePage;
