import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { serverQuery } from "lib/graphql";
import type { IProject } from "types/project";
import { ProjectTypeComponent } from "components/pages/projects/projectType";
import type { ProjectsQuery, ProjectTypeFiltersInput } from "../../graphql/generated";
import { ProjectsDocument } from "../../graphql/generated";

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  // Find project with matching slug
  const filters: ProjectTypeFiltersInput = { Slug: { eq: params.slug as string } };
  const projectRes = await serverQuery<ProjectsQuery>(ProjectsDocument, { filters });
  const matchedProject = projectRes.data.projectTypes.data[0];
  if (matchedProject) {
    return { props: { project: matchedProject.attributes as IProject } };
  }
  return {
    notFound: true,
  };
};

const ProjectTypePage = ({ project }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{project.Name}</title>
      </Head>
      <ProjectTypeComponent project={project} />
    </>
  );
};

export default ProjectTypePage;
