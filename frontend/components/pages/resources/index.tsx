import React from "react";
import type { IResource } from "types/resource";
import { ResourceCardComponent } from "./resourceCard";

export const ResourcesPageComponent: React.FC<{ resources: IResource[] }> = ({ resources }) => {
  return (
    <>
      <h1>Resources</h1>

      <div>
        <div className="flex justify-between wrap">
          {resources.map((resource) => (
            <ResourceCardComponent key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </>
  );
};
