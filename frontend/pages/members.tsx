import React from "react";
import Head from "next/head";
import { MembersPageComponent } from "components/pages/members";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { graphQLServerClient } from "lib/graphql";
import { gql } from "@apollo/client";
import { IMember } from "types/member";
/**
 * Use GraphQL to extract data from the datbase
 * This is comparable to SQL
 * `SELECT Name, Email from members`
 * @example
 * 
  query getMembers {       // name of function
    members {               // table to query
      data {                // return from query data
        id                  // primary key to use
        attributes {        // what fields to return
          Name
          Email
        }
      }
      meta {                // return from query meta
        pagination {
          page
          pageSize
          total
          pageCount
        }
      }
    }
  }
 */
const membersQuery = gql`
  query getMembers {
    members {
      data {
        id
        attributes {
          Name
          Email
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
  members: {
    data: { id: string; attributes: { Name: string; Email: string } }[];
  };
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
