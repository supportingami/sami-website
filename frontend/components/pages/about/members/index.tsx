import React, { useState } from "react";
import type { IMember } from "types/member";
import { MembersListItemComponent } from "./ListItem";
import VectorTriangle from "./assets/VectorTriangle";

export const MembersComponent: React.FC<{ members: IMember[] }> = ({ members }) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const onClickTabItem = (tab) => setSelectedTab(tab);

  return (
    <>
      <div className="text-center mt-16">
        <h2 className="font-bold">Members & Volunteers</h2>
        <p className="mt-3 mb-10 lg:px-12 px-5">
          SAMI is extremely thankful to have a fantastic team of members and volunteers that support in the UK and
          Africa.
          <br />
          Here are a few of the people that make everything possible day-to-day:
        </p>
        <nav className="mb-10 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 col-start-2 col-end-3 gap-2 md:gap-3 px-5 text-sm lg:text-base">
          <button
            className="border-gray-300 border rounded md:px-5 px-1 font-semibold md:col-start-2 lg:col-start-3"
            onClick={() => onClickTabItem("all")}
          >
            All
          </button>
          <button
            className="border-gray-300 border rounded md:px-5 px-1 font-semibold flex flex-row items-center justify-evenly"
            onClick={() => onClickTabItem("ami")}
          >
            <div className="h-5 w-1 bg-pink-600 rotate-90"></div>
            <div>AMI</div>
          </button>
          <button
            className="border-gray-300 border rounded md:px-5 px-1 font-semibold flex flex-row items-center justify-evenly"
            onClick={() => onClickTabItem("sami")}
          >
            <div className="h-5 w-1 bg-blue-350 rotate-90"></div>
            <div>SAMI</div>
          </button>
          <button
            className="border-gray-300 border rounded md:px-5 px-1 font-semibold flex flex-row"
            onClick={() => onClickTabItem("sami-trustees")}
          >
            <div>
              <VectorTriangle />
            </div>
            <div>SAMI Trustees</div>
          </button>
        </nav>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-2 px-5 lg:px-24">
            {selectedTab === "all" &&
              members.map((member) => <MembersListItemComponent key={member.id} member={member} />)}
            {selectedTab === "ami" &&
              members
                .filter((member) => member.Organisation === "AMI")
                .map((member) => <MembersListItemComponent key={member.id} member={member} />)}
            {selectedTab === "sami" &&
              members
                .filter((member) => member.Organisation === "SAMI")
                .map((member) => <MembersListItemComponent key={member.id} member={member} />)}
            {selectedTab === "sami-trustees" &&
              members
                .filter((member) => member.Organisation === "SAMI_Trustees")
                .map((member) => <MembersListItemComponent key={member.id} member={member} />)}
          </div>
        </div>
      </div>
    </>
  );
};
