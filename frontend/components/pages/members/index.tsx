import React from "react";
import { IMember } from "types/member";
import { MembersListItemComponent } from "./list-item";
import { Heading } from "@chakra-ui/core"; 

export const MembersPageComponent: React.FC<{ members: IMember[] }> = ({
  members,
}) => {
  return (
    <>
      <Heading size="md">Members</Heading>
      {members.map((member) => (
        <MembersListItemComponent key={member.id} member={member} />
      ))}
    </>
  );
};
