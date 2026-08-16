import type { ComponentHomeProjectSummary, UploadFile } from "../../../graphql/generated";
import ResponsiveImage from "components/common/ResponsiveImage";
import { ActionButtonsComponent } from "components/common/actionButtons";
import { ProjectSummaryItem } from "../projects/projectSummaryItem";
import type { IProject } from "types/project";
import { ImageHeadingContentLayout } from "components/layout/columns";

export const ProjectSummaryComponent: React.FC<ComponentHomeProjectSummary & { Projects: IProject[] }> = ({
  Title,
  ActionButtons,
  Image,
  Projects,
}) => (
  <ImageHeadingContentLayout
    Heading={<h2 className="subtitle">{Title}</h2>}
    Image={<ProjectSummaryImage {...Image} />}
    Content={
      <>
        {Projects && Projects.map((project) => <ProjectSummaryItem key={project.documentId} {...project} />)}
        <ActionButtonsComponent actionButtons={ActionButtons} className="mt-8" />
      </>
    }
  />
);

const ProjectSummaryImage = (ImageData: Partial<UploadFile>) =>
  ImageData ? (
    <ResponsiveImage
      media={ImageData}
      alt="SAMI Projects"
      fill
      preset="twoColumn"
      placeholder="empty"
      className="object-cover"
    />
  ) : null;
