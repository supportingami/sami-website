import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import type { IResource } from "types/resource";
import Head from "next/head";
import { ResourcesPageComponent } from "components/pages/resources";
import type { ResourcesQuery, Resource } from "../graphql/generated";
import { ResourcesDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";

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
      resources,
    },
  };
};

const ResourcesPage = ({ resources }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Resources Page</title>
      </Head>
      <ResourcesPageComponent resources={resources} />
    </>
  );
};

export default ResourcesPage;
