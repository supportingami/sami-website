import React from "react";
import Head from "next/head";
import { MembersPageComponent } from "components/pages/members";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { IMember } from "types/member";
import { MembersQuery, MembersDocument } from "../graphql/generated";
import { graphQLServerClient } from "lib/graphql";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  const client = graphQLServerClient();
  const query = MembersDocument;
  const { data } = await client.query<MembersQuery>({ query });

  const members: IMember[] =
    data.members.data.map((m) => ({ ...m.attributes, id: m.id })) || [];
  return {
    props: {
      members,
    },
  };
};

const MembersPage = ({
  members,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Members Page</title>
      </Head>
      <MembersPageComponent members={members} />
    </>
  );
};

export default MembersPage;
