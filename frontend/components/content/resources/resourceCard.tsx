import Image from "next-export-optimize-images/image";
import { getStrapiMedia } from "lib/media";
import React from "react";
import type { IResource } from "types/resource";
import { ExternalLink } from "components/common/externalLink";

export const ResourceCardComponent: React.FC<{
  resource: IResource;
}> = ({ resource }) => {
  return (
    <div
      data-testId="resource-card"
      className={`
  relative flex flex-col justify-start items-start min-h-full max-h-full font-sans rounded 
  border-neutral-content border shadow-md hover:scale-105 transition-all duration-200 ease-in-out`}
    >
      <div className="relative h-48 max-h-40 lg:max-h-48 w-full flex justify-center">
        {resource.Image && (
          <Image src={getStrapiMedia(resource.Image)} alt={"image"} placeholder="empty" className="object-cover" fill />
        )}
      </div>
      <div className="capitalize text-left font-semibold p-2 pt-3 leading-4">
        <div className="text-lg">{resource.Title}</div>
      </div>
      <div data-cy="resource-description" className="py-2 px-2 relative flex-1 flex flex-col">
        <div className="pt-0 text-sm overflow-ellipsis overflow-hidden max-h-20 relative">{resource.Description}</div>
      </div>
      <div>
        {resource.Media && (
          <ExternalLink href={getStrapiMedia(resource.Media)} download>
            <button className="btn btn-primary m-2">Download</button>
          </ExternalLink>
        )}
        {(resource.Links || []).map(({ Link, Text }) => (
          <ExternalLink key={Link} href={Link}>
            <button className="btn btn-primary m-2">{Text}</button>
          </ExternalLink>
        ))}
      </div>
    </div>
  );
};
