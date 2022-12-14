import { useRouter } from "next/router";
import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { serverQuery } from "lib/graphql";
// import { ProjectTypeComponent } from "components/pages/projects/projectType";
import type { ProjectsQuery, ProjectType } from "../../../graphql/generated";
import { ProjectsDocument } from "../../../graphql/generated";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  const router = useRouter();
  const id = router.query.id as string;
  console.log({ id });
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

const ProjectTypePage = ({ projectData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const projectId = router.query.id as string;
  const projectName = router.query.type as string;
  console.log({ projectData, projectId });
  return (
    <>
      <Head>
        <title>{projectName}</title>
      </Head>
      {/* <ProjectTypeComponent projectType={projectData} id={projectId} /> */}
    </>
  );
};

export default ProjectTypePage;
