import React from "react";
import Head from "next/head";
import { MembersPageComponent } from "components/pages/members";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { IMember } from "types/member";
import { MembersQuery, MembersDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  let members: IMember[] = [];
  const res = await serverQuery<MembersQuery>(MembersDocument);
  if (res) {
    members =
      res.data.members.data.map((m) => ({ ...m.attributes, id: m.id })) || [];
  }
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
