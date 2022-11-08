import { useRouter } from "next/router";
import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { serverQuery } from "lib/graphql";
import type { IProject } from "types/project";
import { ProjectTypeComponent } from "components/pages/projects/project-type";
import type { Project, ProjectsQuery } from "../../../graphql/generated";
import { ProjectsDocument } from "../../../graphql/generated";

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

const ProjectTypePage = ({ projectData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const projectId = router.query.id as string;
  const projectName = router.query.type as string;

  return (
    <>
      <Head>
        <title>Project {projectName}</title>
      </Head>
      <ProjectTypeComponent projectType={projectData} id={projectId} />
    </>
  );
};

export default ProjectTypePage;
