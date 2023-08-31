import React from "react";
import type { IResource } from "types/resource";
import { ResourceCardComponent } from "./resourceCard";

export const ResourcesPageComponent: React.FC<{ resources: IResource[] }> = ({ resources }) => {
  return (
    <>
      <h1 className="font-semibold text-4xl">Resources</h1>

      <div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {resources.map((resource) => (
            <ResourceCardComponent key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </>
  );
};
