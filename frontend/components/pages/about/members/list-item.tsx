import { getStrapiMedia } from "lib/media";
import Image from "next/image";
import React from "react";
import { IMember } from "types/member";
import VectorTriangle from "./assets/VectorTriangle";
import VectorTriangle6 from "./assets/VectorTriangle6";
import VectorTriangle5 from "./assets/VectorTriangle5";
import VectorTriangle2 from "./assets/VectorTriangle2";


export const MembersListItemComponent: React.FC<{
  member: IMember;
}> = ({ member }) => (

<div>
  <div className="relative w-[300px] h-[300px]">
    
  <div className="absolute left-0 font-medium w-[300px] h-[300px] right-[83.85%] top-[22.37%] bottom-[53.78%] text-[rgba(29,33,48,1)]">
        <p
          className="inset-x-0 bottom-0 absolute text-xl inline m-0 h-[25.35px] w-[210px] top-[89.79%] leading-[1.6]">
          {member.Name}
        </p>
         <div className="inset-x-0 top-0 absolute rounded-lg w-[210px] bottom-[15.44%]">
            {member.Photo && (
              <Image 
                src={getStrapiMedia(member.Photo)} 
                alt={`${member.Name}`} 
                layout="fill"
                objectFit="cover" />
            )}
          </div>
        <div
          className="inset-x-0 rounded-b-lg absolute w-[210px] top-[80.53%] bottom-[15.44%] bg-[rgba(0,177,233,1)]"
         />
    <VectorTriangle />
    </div>
  </div>
</div>
  
);
