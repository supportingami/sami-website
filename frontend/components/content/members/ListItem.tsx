import ResponsiveImage from "components/common/ResponsiveImage";
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
          <ResponsiveImage media={member.Photo} alt={member.Name} fill preset="avatarGrid" className="object-cover" />
        )}
      </div>
      {member.Tags.includes("SAMI") ? <div className="bg-blue-350 h-2 rounded-b-lg" /> : <div className="h-2" />}
      <div className="mb-5">
        <span className="text-base font-semibold">{member.Name}</span>
      </div>
    </div>
  </>
);
