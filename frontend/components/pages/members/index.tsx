import React from "react";
import { IMember } from "types/member";
import { MembersListItemComponent } from "./list-item";

export const MembersPageComponent: React.FC<{ members: IMember[] }> = ({
  members,
}) => {
  return (
    <>
      <h1>Members</h1>
      {members.map((member) => (
        <MembersListItemComponent key={member.id} member={member} />
      ))}
    </>
  );
};
