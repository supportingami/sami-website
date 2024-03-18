import React, { useState } from "react";
import type { IMember } from "types/member";
import { MembersListItemComponent } from "./ListItem";

export const MembersComponent: React.FC<{ members: IMember[] }> = ({ members }) => {
  const [filteredMembers, setFilteredMembers] = useState(members);
  const [filter, setFilter] = useState("");

  const filterByTag = (tag?: IMember["Tags"]) => {
    if (tag) {
      const filtered = members.filter((m) => m.Tags.includes(tag));
      setFilter(tag);
      setFilteredMembers(filtered);
    } else {
      setFilter(undefined);
      setFilteredMembers(members);
    }
  };

  const Tags = [
    {
      title: "All",
      tag: "",
      getClass: (isActive) => `btn-outline`,
    },
    {
      title: "SAMI",
      tag: "SAMI",
      getClass: (isActive) => (isActive ? "btn-primary" : "btn-outline hover:btn-primary"),
    },
    {
      title: "AMI",
      tag: "AMI",
      getClass: (isActive) => (isActive ? "btn-error" : "btn-outline hover:btn-error"),
    },
    {
      title: "Trustees",
      tag: "Trustee",
      getClass: (isActive) => (isActive ? "btn-primary" : "btn-outline hover:btn-primary"),
    },
  ];

  return (
    <>
      {/* <nav className="mb-10 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 col-start-2 col-end-3 gap-2 md:gap-3 px-5 text-sm lg:text-base"> */}
      <div className="flex justify-center flex-wrap gap-4 my-8">
        {Tags.map(({ title, tag, getClass }, i) => {
          const btnBase = `btn relative w-24 `;
          const isActive = tag === filter;
          const btnClass = getClass(isActive);
          return (
            <button key={i} className={`${btnBase} ${btnClass}`} onClick={() => filterByTag(tag)}>
              <div className="p-2">{title}</div>
            </button>
          );
        })}
      </div>
      <div>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,200px))] justify-center max-w-screen-lg m-auto">
          {filteredMembers.map((member) => (
            <MembersListItemComponent key={member.id} member={member} />
          ))}
        </div>
      </div>
    </>
  );
};
