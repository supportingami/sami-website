import type { ComponentHomeProjectSummary, UploadFileEntityResponse } from "../../../graphql/generated";
import Image from "next/image";
import { ActionButtonsComponent } from "components/common/actionButtons";
import { getStrapiMedia } from "lib/media";
import { ProjectSummaryItem } from "../projects/projectSummaryItem";
import type { IProject } from "types/project";

export const ProjectSummaryComponent: React.FC<ComponentHomeProjectSummary & { Projects: IProject[] }> = ({
  Title,
  ActionButtons,
  Image,
  Projects,
}) => (
  <>
    <div data-testid="projectSummary" className="flex align-center gap-32">
      <div className="flex-1 relative hidden lg:block rounded-md overflow-hidden">
        <ProjectSummaryImage {...Image} />
      </div>
      <div className="flex-1">
        <h2 className="subtitle">{Title}</h2>
        {/* Mobile Image under text (dektop alongside) */}
        <div className="relative mb-6 lg:hidden h-[300px] mx-auto max-w-md rounded-md">
          <ProjectSummaryImage {...Image} />
        </div>
        {Projects && Projects.map((project) => <ProjectSummaryItem key={project.id} {...project} />)}
        <ActionButtonsComponent actionButtons={ActionButtons} className="mt-8" />
      </div>
    </div>
  </>
);

const ProjectSummaryImage = (ImageData: Partial<UploadFileEntityResponse>) =>
  ImageData?.data?.attributes ? (
    <Image src={getStrapiMedia(ImageData)} alt={"image"} fill placeholder="empty" className="object-cover" />
  ) : null;
