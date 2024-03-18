import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import type { IResource } from "types/resource";
import Head from "next/head";
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
    resources = res.data.resources.data.map((r) => ({
      ...(r.attributes as Resource),
      id: r.id,
    }));
  }
  return {
    props: {
      resources: shuffleArray(resources),
    },
  };
};

const ResourcesPage = ({ resources }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Resources Page</title>
      </Head>
      <PageLayout>
        <ResourcesPageComponent resources={resources} />
      </PageLayout>
    </>
  );
};

export default ResourcesPage;
