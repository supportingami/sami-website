import { getStrapiMedia } from "lib/media";
import Image from "next-export-optimize-images/image";
import React from "react";
import type { IMember } from "types/member";
import VectorTriangle from "./assets/VectorTriangle";

export const MembersListItemComponent: React.FC<{
  member: IMember;
}> = ({ member }) => (
  <>
    <div className="relative flex flex-col min-h-full max-h-full">
      {member.Tags.includes("AMI") ? <div className="bg-error h-2 rounded-t-lg" /> : <div />}
      {/*Blue Triangle*/}
      {member.Tags.includes("Trustee") ? <VectorTriangle /> : null}
      <div className="relative h-48 w-full">
        {member.Photo && (
          <Image src={getStrapiMedia(member.Photo)} alt={`${member.Name}`} fill sizes="200" className="object-cover" />
        )}
      </div>
      {member.Tags.includes("SAMI") ? <div className="bg-blue-350 h-2 rounded-b-lg" /> : <div className="h-2" />}
      <div className="mb-5">
        <span className="text-base font-semibold">{member.Name}</span>
      </div>
    </div>
  </>
);
