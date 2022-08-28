import React from "react";
import { IProject } from "types/project";

export const ProjectsPageComponent: React.FC<{ projectPageContent: IProject[] }> = ({
  projectPageContent,
  children,
}) => {
  return (
    <>
      {projectPageContent.map((p) => (
        <div key={p.id}>
          <h1 style={{ fontSize: "25px", fontWeight: "600" }}>{p.Title}</h1>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 5fr" }}>
            <div>
              <aside style={{ margin: "10px 0 0 0" }}>
                {p.ProjectTypes.data.map((type) => (
                  <div key={type.id} style={{padding:"2px 0"}}>
                    <a href={`/projects/${type.id}/${type.attributes.Name}`} style={{fontSize:"15px"}}> {type.attributes.Name} </a>
                  </div>
                ))}
              </aside>
              <aside style={{ width: "30%", float: "left" }}>
                {p.Country.data.map((country) => (
                  <div key={country.id}>{country.attributes.Name}</div>
                ))}
              </aside>
            </div>
            <div>
              <section>{children || <div dangerouslySetInnerHTML={{ __html: p.Summary }}></div>}</section>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
