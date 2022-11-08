import React from "react";
import { IMember } from "types/member";
import { MembersListItemComponent } from "./ListItem";

export const MembersComponent: React.FC<{ members: IMember[] }> = ({ members }) => {
  return (
    <>
      <div className={`text-center font-['Roboto']`}>
        <p className="font-bold inline text-[40px]">Members & Volunteers</p>

        <p className="text-base font-normal m-0 h-[65px] leading-[1.6]">
          {
            "SAMI is extremely thankful to have a fantastic team of members and volunteers that support in the UK and Africa. "
          }
          <br />
          Here are a few of the people that make everything possible day-to-day:
        </p>

        <div>
          <div className="grid grid-cols-6 gap-1">
            {members.map((member) => (
              <MembersListItemComponent key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
