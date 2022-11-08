import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import type { Project, ProjectsQuery } from "../graphql/generated";
import { ProjectsDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";
import type { IProject } from "types/project";
import { ProjectsPageComponent } from "components/pages/projects";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  let projectData: IProject[] = [];

  const projectRes = await serverQuery<ProjectsQuery>(ProjectsDocument);
  if (projectRes) {
    projectData = projectRes.data.projects.data.map((p) => ({
      ...(p.attributes as Project),
      id: p.id,
    }));
  }

  return {
    props: {
      projectData,
    },
  };
};

const ProjectsPage = ({ projectData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Projects Page</title>
      </Head>
      <ProjectsPageComponent projectPageContent={projectData} />
    </>
  );
};

export default ProjectsPage;
