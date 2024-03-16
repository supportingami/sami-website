import { Enum_Member_Organisation as Org } from "../../../graphql/generated";
import React, { useState } from "react";
import type { IMember } from "types/member";
import { MembersListItemComponent } from "./ListItem";

export const MembersComponent: React.FC<{ members: IMember[] }> = ({ members }) => {
  const [filteredMembers, setFilteredMembers] = useState(members);

  const filterByOrganisation = (organisation?: IMember["Organisation"]) => {
    if (organisation) {
      const filtered = members.filter((m) => m.Organisation === organisation);
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members);
    }
  };

  const Organisations = [
    {
      title: "All",
    },
    {
      title: "SAMI",
      organisation: Org.Sami,
      iconClass: "absolute bottom-0 w-full h-1 bg-blue-350",
    },
    {
      title: "AMI",
      organisation: Org.Ami,
      iconClass: "absolute top-0 w-full h-1 bg-pink-600",
    },
    {
      title: "Trustees",
      organisation: Org.SamiTrustees,
    },
  ];

  return (
    <>
      <h2 className="font-bold">Members & Volunteers</h2>
      <p className="mt-3 mb-10 lg:px-12 px-5">
        SAMI is extremely thankful to have a fantastic team of members and volunteers that support in the UK and Africa.
        <br />
        Here are a few of the people that make everything possible day-to-day:
      </p>
      {/* <nav className="mb-10 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 col-start-2 col-end-3 gap-2 md:gap-3 px-5 text-sm lg:text-base"> */}
      <div className="flex justify-center flex-wrap gap-4 my-8">
        {Organisations.map(({ title, organisation, iconClass }, i) => (
          <button
            key={i}
            className="border-gray-300 border rounded font-semibold relative w-24"
            onClick={() => filterByOrganisation(organisation)}
          >
            <div className={iconClass || ""}></div>
            <div className="p-2">{title}</div>
          </button>
        ))}
      </div>
      <div>
        {/* <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-2 px-5 lg:px-24"> */}
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,200px))] justify-center">
          {filteredMembers.map((member) => (
            <MembersListItemComponent key={member.id} member={member} />
          ))}
        </div>
      </div>
    </>
  );
};
