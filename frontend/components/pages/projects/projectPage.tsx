import React from "react";
import type { IProject } from "types/project";

export const ProjectsPageComponent: React.FC<{ projectPageContent: IProject[]; children?: any }> = ({
  projectPageContent,
  children,
}) => {
  return (
    <>
      {projectPageContent.map((p) => (
        <div key={p.id}>
          <h1>{p.Name}</h1>
          {/* TODO - will require refactor */}

          {/* <div style={{ display: "grid", gridTemplateColumns: "2fr 5fr" }}>
            <div>
              <aside style={{ margin: "10px 0 0 0" }}>
                {p.ProjectTypes.data.map((type) => (
                  <div key={type.id} style={{ padding: "2px 0" }}>
                    <a href={`/projects/${type.id}/${type.attributes.Name}`} style={{ fontSize: "15px" }}>
                      {" "}
                      {type.attributes.Name}{" "}
                    </a>
                  </div>
                ))}
              </aside>
              <aside style={{ margin: "10px 0 0 0" }}>
                {p.Country.data.map((country) => (
                  <div key={country.id}>{country.attributes.Name}</div>
                ))}
              </aside>
            </div>
            <div>
              <section>
                {children || <div dangerouslySetInnerHTML={{ __html: p.Summary }} className="prose"></div>}
              </section>
            </div>
          </div> */}
        </div>
      ))}
    </>
  );
};
