import React from "react";
import { IProject } from "types/project";

export const ProjectsPageComponent: React.FC<{ projectPageContent: IProject[] }> = ({ projectPageContent }) => {
  return (
    <>
      {projectPageContent.map((p) => (
        <div key={p.id}>
          <h1 style={{fontSize:"25px", fontWeight:"600"}}>{p.Title}</h1>
          <aside style={{width:"30%", float:"left", height:"300vh", margin:"10px 0 0 0"}}>
            {p.ProjectTypes.data.map((type) => (
              <div key={type.id}>{type.attributes.Name}</div>
            ))}
          </aside>
          <aside style={{width:"30%", float:"left"}}>
            {p.Country.data.map((country) => (
              <div key={country.id}>{country.attributes.Name}</div>
            ))}
          </aside>
          <section>
            <div dangerouslySetInnerHTML={{ __html: p.Summary }}></div>
          </section>
        </div>
      ))}
    </>
  );
};
