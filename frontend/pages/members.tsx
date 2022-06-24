import React from "react";
import Head from "next/head";
import { MembersPageComponent } from "components/pages/members";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { graphQLServerClient } from "lib/graphql";
import { gql } from "@apollo/client";
import { IMember } from "types/member";

const membersQuery = gql`
  query getMembers {
    members {
      data {
        id
        attributes {
          Name
        }
      }
      meta {
        pagination {
          page
          pageSize
          total
          pageCount
        }
      }
    }
  }
`;

interface IMembersQueryResult {
  members: { data: { id: string; attributes: { Name: string } }[] };
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      pageCount: number;
    };
  };
}

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  const client = graphQLServerClient();
  const { data } = await client.query<IMembersQueryResult>({
    query: membersQuery,
  });
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
