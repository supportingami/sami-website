import type { IProject } from "types/project";
import { ProjectsPageComponent } from ".";

export const ProjectTypeComponent: React.FC<{ projectType: IProject[]; id }> = ({ projectType, id }) => {
  return (
    <>
      <ProjectsPageComponent projectPageContent={projectType}>
        {projectType.map((p) =>
          p.ProjectTypes.data
            .filter((type) => type.id === id)
            .map((t) => (
              <div key={t.id} className="prose" dangerouslySetInnerHTML={{ __html: t.attributes.Content }}></div>
            ))
        )}
      </ProjectsPageComponent>
    </>
  );
};
