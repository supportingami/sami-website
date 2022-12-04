import React from "react";
import type { IMember } from "types/member";
import { MembersListItemComponent } from "./ListItem";

export const MembersComponent: React.FC<{ members: IMember[] }> = ({ members }) => {
  return (
    <>
      <div className="text-center mt-16">
        <h2 className="font-bold">Members & Volunteers</h2>
        <p className="mt-3 mb-10 px-12">
          SAMI is extremely thankful to have a fantastic team of members and volunteers that support in the UK and
          Africa.
          <br />
          Here are a few of the people that make everything possible day-to-day:
        </p>
        <div>
          <div className="grid grid-cols-6 gap-1 px-24">
            {members.map((member) => (
              <MembersListItemComponent key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
