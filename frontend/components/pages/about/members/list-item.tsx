import { getStrapiMedia } from "lib/media";
import Image from "next/image";
import React from "react";
import { IMember } from "types/member";
import VectorTriangle from "./assets/VectorTriangle";



export const MembersListItemComponent: React.FC<{
  member: IMember;
}> = ({ member }) => (

<div>
  <div className="relative w-[210px] h-[248px]">
    
  <div className="absolute left-0 font-medium w-[210px] h-[248px] text-[rgba(29,33,48,1)]">
        <p
          className="inset-x-0 bottom-0 absolute text-xl inline w-[210px] leading-[1.6]">
          {member.Name}
        </p>
         <div className="inset-x-0 top-0 absolute rounded-lg w-[210px] h-[200px] bottom-[15.44%]">
            {member.Photo && (
              <Image 
                src={getStrapiMedia(member.Photo)} 
                alt={`${member.Name}`} 
                layout="fill"
                objectFit="cover" />
            )}
          </div>

          {member.Organisation === "AMI" ? (

          <div
          className="inset-x-0 rounded-t-lg top-0 absolute w-[210px] bottom-[95.97%] bg-[rgba(237,17,100,1)]"
          />

          ) : (

        <div
          className="inset-x-0 top-[80.53%] bottom-[15.44%] rounded-b-lg absolute w-[210px] bg-[rgba(0,177,233,1)]"
         />

          )}

        {/*Blue Triangle*/}

        {
        member.Organisation === "SAMI_Trustees" ? 
        (
        <VectorTriangle />) : null
        }
    </div>
  </div>
</div>
  
);
