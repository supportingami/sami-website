import { getStrapiMedia } from "lib/media";
import Image from "next/image";
import React from "react";
import { IMember } from "types/member";

export const MembersListItemComponent: React.FC<{
  member: IMember;
}> = ({ member }) => (
  <div style={{ border: "0.8px solid #ddd", margin: "0 3px" }}>
    <div>
      {member.Photo && <Image src={getStrapiMedia(member.Photo)} alt={`${member.Name}`} height="300px" width="300px" />}
    </div>
    {member.Organisation === "SAMI" ? (
      <div style={{ fontSize: "14px", backgroundColor: "#4a8eff", color: "white", padding: "3px 5px" }}>
        {member.Name}
      </div>
    ) : (
      <div style={{ fontSize: "14px", backgroundColor: "#ff5062", color: "white", padding: "3px 5px" }}>
        {member.Name}
      </div>
    )}
  </div>
);
