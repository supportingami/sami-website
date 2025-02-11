import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next-export-optimize-images/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { serverQuery } from "lib/graphql";
import { getStrapiMedia } from "lib/media";
import type { ProjectType, ProjectsQuery, UploadFile } from "../graphql/generated";
import { ProjectsDocument } from "../graphql/generated";
import { SectionHeader } from "components/layout/Header";
import PageSection from "components/layout/pageSection";
import { ProjectSummaryItemAlt } from "components/content/projects/projectSummaryItem";
import { HTMLContent } from "components/common/htmlContent";
import { ImageHeadingContentLayout } from "components/layout/columns";

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const projectRes = await serverQuery<ProjectsQuery>(ProjectsDocument);
  const projectData = (projectRes?.data?.projectTypes_connection?.nodes || []).map((p) => ({
    ...(p as ProjectType),
    id: p.documentId,
  }));
  const projects = projectData.sort((a, b) => {
    if (a.Status === "Completed") return 1;
    if (a.Status === b.Status) return 1;
    return -1;
  });

  return {
    props: {
      projects,
    },
  };
};
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectsPage = ({ projects }: Props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Projects Page</title>
      </Head>
      <SectionHeader background={{ imageName: "bg-tiling-2", size: "1500px 1500px", position: "70px -640px" }}>
        <h1 className="text-white">SAMI Projects</h1>
        <div className="flex gap-2 justify-center flex-1 flex-wrap mb-8">
          {projects.map(({ id, Name, Slug }) => (
            <Link href={`${router.asPath}/${Slug}`} key={id}>
              <button className="btn btn-outline btn-primary bg-white">{Name}</button>
            </Link>
          ))}
        </div>
      </SectionHeader>
      {projects
        .filter((p) => p.Status !== "Completed")
        .map((project, index) => (
          <ProjectEntry key={project.id} index={index} project={project} />
        ))}
      <h2>Previous Projects</h2>
      {projects
        .filter((p) => p.Status === "Completed")
        .map((project, index) => (
          <ProjectEntry key={project.id} index={index} project={project} />
        ))}
    </>
  );
};
const ProjectEntry = (props: { index: number; project: Props["projects"][0] }) => {
  const { index, project } = props;
  const { Name, id, Icon, HomeSummary, PageSummary, FeatureImage, Slug } = project;
  return (
    <PageSection className={`py-16 ${index % 2 && "bg-base-200"}`} fullwidth key={id}>
      <ImageHeadingContentLayout
        Heading={
          <div className="prose m-auto">
            <ProjectSummaryItemAlt HomeSummary={HomeSummary} documentId={id} Name={Name} Icon={Icon} Slug={Slug} />
          </div>
        }
        Content={
          <>
            <HTMLContent className="m-auto mt-8">{PageSummary}</HTMLContent>
            <Link href={`/projects/${Slug}`}>
              <button className="mt-4 btn btn-primary">Read More</button>
            </Link>
          </>
        }
        Image={FeatureImage ? <ProjectFeatureImage {...FeatureImage} /> : null}
        imageSide={index % 2 ? "left" : "right"}
      />
    </PageSection>
  );
};

const ProjectFeatureImage = (ImageData: Partial<UploadFile>) => (
  <Image src={getStrapiMedia(ImageData)} alt={"image"} fill placeholder="empty" className="object-contain" />
);

export default ProjectsPage;
