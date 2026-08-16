import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import type { IResource } from "types/resource";
import { SEO } from "components/common/seo";
import { ResourcesPageComponent } from "components/content/resources";
import type { ResourcesQuery, Resource } from "../graphql/generated";
import { ResourcesDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";
import PageLayout from "components/layout/pageLayout";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  let resources: IResource[] = [];
  const res = await serverQuery<ResourcesQuery>(ResourcesDocument);
  if (res) {
    resources = res.data.resources_connection.nodes.map((r) => ({
      ...(r as Resource),
      id: r.documentId,
    }));
  }
  return {
    props: {
      resources: shuffleArray(resources),
    },
  };
};

const ResourcesPage = ({ resources }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const resourceImage = resources.find((r) => r.Image)?.Image;

  return (
    <>
      <SEO
        title="Educational Resources - SAMI"
        description="Explore mathematics resources, learning materials, and tools developed and curated by SAMI."
        canonicalPath="/resources"
        image={resourceImage}
      />
      <PageLayout>
        <ResourcesPageComponent resources={resources} />
      </PageLayout>
    </>
  );
};

export default ResourcesPage;
