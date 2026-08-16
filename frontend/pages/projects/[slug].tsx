import React from "react";
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { SEO } from "components/common/seo";
import { buildProjectSchema, buildBreadcrumbSchema } from "lib/schemaOrg";
import { SITE_URL } from "lib/media";
import { serverQuery } from "lib/graphql";
import type { IProject } from "types/project";
import { ProjectTypeComponent } from "components/content/projects/projectType";
import type { ProjectsQuery, ProjectTypeFiltersInput } from "../../graphql/generated";
import { ProjectsDocument } from "../../graphql/generated";

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  // Find project with matching slug
  const filters: ProjectTypeFiltersInput = { Slug: { eq: params.slug as string } };
  const projectRes = await serverQuery<ProjectsQuery>(ProjectsDocument, { filters });
  const matchedProject = projectRes.data.projectTypes_connection.nodes[0];
  if (matchedProject) {
    return { props: { project: matchedProject as IProject } };
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
    projects = queryRes.data.projectTypes_connection.nodes.map((b) => ({
      ...(b as IProject),
      id: b.documentId,
    }));
  }
  return projects;
}

const ProjectTypePage = ({ project }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const canonicalUrl = `${SITE_URL}/projects/${project.Slug}`;
  const description =
    project.HomeSummary || `Learn about SAMI's ${project.Name} project and our educational initiatives across Africa.`;

  const schemaData = [
    buildProjectSchema(project, canonicalUrl),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
      { name: project.Name, url: `/projects/${project.Slug}` },
    ]),
  ];

  return (
    <>
      <SEO
        title={project.Name}
        description={description}
        canonicalPath={`/projects/${project.Slug}`}
        image={project.FeatureImage || project.Icon}
        imageAlt={project.Name}
        schemaData={schemaData}
      />
      <ProjectTypeComponent project={project} />
    </>
  );
};

export default ProjectTypePage;
