import React from "react";
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { serverQuery } from "lib/graphql";
import type { IProject } from "types/project";
import { ProjectTypeComponent } from "components/content/projects/projectType";
import type { ProjectsQuery, ProjectTypeFiltersInput } from "../../graphql/generated";
import { ProjectsDocument } from "../../graphql/generated";

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await fetchProjects();
  return {
    paths: projects.map(({ Slug }) => ({
      params: { slug: Slug },
    })),
    fallback: false, // false or "blocking"
  };
};

async function fetchProjects() {
  let projects: IProject[] = [];
  const queryRes = await serverQuery<ProjectsQuery>(ProjectsDocument);
  if (queryRes) {
    projects = queryRes.data.projectTypes.data.map((b) => ({
      ...(b.attributes as IProject),
      id: b.id,
    }));
  }
  return projects;
}

const ProjectTypePage = ({ project }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
