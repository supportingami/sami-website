import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import type { IResource } from "types/resource";
import Head from "next/head";
import { ResourcesPageComponent } from "components/pages/resources";
import type { ResourcesQuery, Resource } from "../graphql/generated";
import { ResourcesDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
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

const ResourcesPage = ({ resources }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
