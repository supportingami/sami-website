import Head from "next/head";
import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { serverQuery } from "lib/graphql";
import { DonateContentDocument } from "../graphql/generated";
import type { DonateContentQuery } from "../graphql/generated";
import PageSection from "components/layout/pageSection";
import { MissionStatementComponent } from "components/pages/home/missionStatement";
import Image from "next/image";

import CAFLogo from "public/images/Donate/caf-logo.png";
import EFLogo from "public/images/Donate/easyfundraising.png";
import AmazonLogo from "public/images/Donate/amazon-smile.png";
import PAHLogo from "public/images/Donate/panafricanhub.png";
import BDULogo from "public/images/Donate/BDU.png";
import InnodemsLogo from "public/images/Donate/innodems.png";
import LWFLogo from "public/images/Donate/LWF.png";
import HausdorffLogo from "public/images/Donate/hausdorff.png";
import IDEMSLogo from "public/images/Donate/idems-international.png";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  const res = await serverQuery<DonateContentQuery>(DonateContentDocument);
  return {
    props: {
      content: res.data.donateContent.data.attributes,
    },
  };
};

const DonatePage = ({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>SAMI Donate</title>
      </Head>
      <>
        {content.DonateStatement && (
          <PageSection fullwidth className="py-16 bg-blue-50">
            <MissionStatementComponent {...(content.DonateStatement as any)} />
          </PageSection>
        )}
        <PageSection fullwidth className="bg-primary-focus text-white py-0">
          <h3 className="text-center">You can help us make a difference - SUPPORT SAMI</h3>
        </PageSection>
        <PageSection fullwidth className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="px-2 mb-10">
              <h4 className="text-xl font-semibold">Donate Directly</h4>
              <div className="flex flex-row mt-5 items-start">
                <Image src={CAFLogo} alt="" objectFit="contain" height={300} />
                <span className="ml-6 text-sm">
                  You can donate to SAMI via CAF. Just enter the text SAMI or our charity number in the search bar
                  (1161994). CAF allows for up to 25% gift aid to be claimed on all donations, with processing fees kept
                  to an absolute minimum. This way we can ensure all money donated is used to the greatest possible
                  effect.
                </span>
              </div>
            </div>
            <div className="px-2">
              <h4 className="text-xl font-semibold">Donate as you shop</h4>
              <div className="flex flex-col mt-5">
                <span className="text-sm">
                  Retailers such as Amazon, Tesco and Expedia will donate a percentage of purchases made when visiting
                  via the links below. Create an account and start raising money now!
                </span>
                <div className="flex flex-row flex-wrap lg:flex-nowrap justify-around items-center px-2 mt-6">
                  <Image src={EFLogo} alt="" objectFit="contain" width={200} />
                  <Image src={AmazonLogo} alt="" objectFit="contain" width={200} />
                </div>
              </div>
            </div>
          </div>
        </PageSection>
        <PageSection fullwidth className="bg-blue-50 py-20 mt-6 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-10">
            <div className="text-left">
              <h3>How we use your donation</h3>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae
              erat. Nunc ut sem vitae risus tristique posuere.
            </div>
            <div>
              Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
              Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
            </div>
          </div>
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
