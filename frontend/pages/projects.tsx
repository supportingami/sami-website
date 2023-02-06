import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import type { ProjectType, ProjectsQuery, UploadFileEntityResponse } from "../graphql/generated";
import { ProjectsDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";
import { SectionHeader } from "components/layout/Header";
import PageSection from "components/layout/pageSection";
import { ProjectSummaryItemAlt } from "components/pages/projects/projectSummaryItem";
import { HTMLContent } from "components/common/htmlContent";
import { ImageHeadingContentLayout } from "components/layout/columns";
import { getStrapiMedia } from "lib/media";
import Image from "next/image";
import Link from "next/link";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  const projectRes = await serverQuery<ProjectsQuery>(ProjectsDocument);

  return {
    props: {
      projectData: (projectRes?.data?.projectTypes?.data || []).map((p) => ({
        ...(p.attributes as ProjectType),
        id: p.id,
      })),
    },
  };
};

const ProjectsPage = ({ projectData }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>Projects Page</title>
    </Head>
    <SectionHeader background={{ imageName: "bg-tiling-2", size: "1500px 1500px", position: "70px -640px" }}>
      <h1 className="text-white">SAMI Projects</h1>
      <div className="flex gap-2 justify-center flex-1 flex-wrap mb-8">
        {projectData.map(({ id, Name }) => (
          <Link href={`/projects/${id}/${Name}`} key={id}>
            <button className="btn btn-outline btn-primary bg-white">{Name}</button>
          </Link>
        ))}
      </div>
    </SectionHeader>
    {projectData.map(({ Name, id, Icon, HomeSummary, PageSummary, FeatureImage }, index) => (
      <PageSection className={`py-16 ${index % 2 && "bg-base-200"}`} fullwidth key={id}>
        <ImageHeadingContentLayout
          Heading={
            <div className="prose m-auto">
              <ProjectSummaryItemAlt HomeSummary={HomeSummary} id={id} Name={Name} Icon={Icon} />
            </div>
          }
          Content={<HTMLContent className="m-auto mt-8">{PageSummary}</HTMLContent>}
          Image={FeatureImage?.data?.attributes ? <ProjectFeatureImage {...FeatureImage} /> : null}
          imageSide={index % 2 ? "left" : "right"}
        />
      </PageSection>
    ))}
  </>
);

const ProjectFeatureImage = (ImageData: Partial<UploadFileEntityResponse>) => (
  <Image src={getStrapiMedia(ImageData)} alt={"image"} fill placeholder="empty" className="object-contain" />
);

export default ProjectsPage;
