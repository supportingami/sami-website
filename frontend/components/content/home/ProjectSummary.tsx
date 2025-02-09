import type { ComponentHomeProjectSummary, UploadFile } from "../../../graphql/generated";
import Image from "next/image";
import { ActionButtonsComponent } from "components/common/actionButtons";
import { getStrapiMedia } from "lib/media";
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
    <Image src={getStrapiMedia(ImageData)} alt={"image"} fill placeholder="empty" className="object-cover" />
  ) : null;
