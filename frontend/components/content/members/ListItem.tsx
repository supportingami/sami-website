import { getStrapiMedia } from "lib/media";
import Image from "next/image";
import React from "react";
import type { IMember } from "types/member";
import VectorTriangle from "./assets/VectorTriangle";

export const MembersListItemComponent: React.FC<{
  member: IMember;
}> = ({ member }) => (
  <>
    <div className="relative flex flex-col min-h-full max-h-full">
      {member.Organisation === "AMI" ? <div className="bg-pink-600 h-2 rounded-t-lg" /> : <div />}
      {/*Blue Triangle*/}
      {member.Organisation === "SAMI_Trustees" ? <VectorTriangle /> : null}
      <div className="relative h-48 w-full">
        {member.Photo && (
          <Image src={getStrapiMedia(member.Photo)} alt={`${member.Name}`} fill sizes="200" className="object-cover" />
        )}
      </div>
      {member.Organisation === "SAMI" ? <div className="bg-blue-350 h-2 rounded-b-lg" /> : <div className="h-2" />}
      <div className="mb-5">
        <span className="text-base font-semibold">{member.Name}</span>
      </div>
    </div>
  </>
);
