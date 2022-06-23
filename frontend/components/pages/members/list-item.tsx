import { Box } from "@chakra-ui/core";
import React from "react";
import { IMember } from "types/member";

export const MembersListItemComponent: React.FC<{
  member: IMember;
}> = ({ member }) => (
  <Box>
    <div>{member.Name}</div>
  </Box>
);
