import { gql, useQuery } from "@apollo/client";
import Loader from "components/loader";
import React from "react";
import { IMember } from "types/member";
import { MembersListItemComponent } from "./list-item";

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

export const MembersPageComponent = () => {
  const { loading, error, data } = useQuery(membersQuery, {});
  const result = data as IMembersQueryResult;
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (result) {
    const members: IMember[] = result.members.data.map(
      ({ id, attributes }) => ({
        ...attributes,
        id,
      })
    );
    return (
      <>
        {members.map((member) => (
          <MembersListItemComponent key={member.id} member={member} />
        ))}
      </>
    );
  }
};
