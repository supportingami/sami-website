import Image from "next/image";
import { getStrapiMedia } from "lib/media";
import React from "react";
import type { IResource } from "types/resource";

export const ResourceCardComponent: React.FC<{
  resource: IResource;
}> = ({ resource }) => (
  <div style={{ borderWidth: "1px", borderBottom: "1px solid #ddd", maxWidth: "300px" }}>
    {resource.Image?.data && <Image src={getStrapiMedia(resource.Image)} alt={"image"} height="150" width="300" />}
    <div>
      <div>{resource.Title}</div>
    </div>
    <div>
      <div>{resource.Description}</div>
    </div>
    {resource.Media?.data && (
      <a href={getStrapiMedia(resource.Media)} target="_blank" download rel="noopener noreferrer">
        <button className="button">Download</button>
      </a>
    )}
  </div>
);
