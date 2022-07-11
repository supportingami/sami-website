import { Box } from "@chakra-ui/core";
import React from "react";
import { IMember } from "types/member";

export const MembersListItemComponent: React.FC<{
  member: IMember;
}> = ({ member }) => (
  <Box>
    <div>
      <div>Name{member.Name}</div>
      <div>Email {member.Email}</div>
    </div>
  </Box>
);
