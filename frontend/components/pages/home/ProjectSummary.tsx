import type {
  ComponentHomeProjectSummary,
  ComponentHomeProjectSummaryItem,
  UploadFileEntityResponse,
} from "../../../graphql/generated";
import Image from "next/image";
import { ActionButtonsComponent } from "components/common/actionButtons";
import { getStrapiMedia } from "lib/media";

export const ProjectSummaryComponent: React.FC<ComponentHomeProjectSummary> = ({
  Projects,
  Title,
  ActionButtons,
  Image,
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
        {Projects && Projects.map((project) => <ProjectItem key={project.id} {...project} />)}
        <ActionButtonsComponent actionButtons={ActionButtons} className="mt-8" />
      </div>
    </div>
  </>
);

const ProjectItem = ({ Icon, Description, Title }: ComponentHomeProjectSummaryItem) => (
  <div className="flex items-center gap-8 mb-4">
    <Image src={getStrapiMedia(Icon)} alt={"image"} height={80} width={80} />
    <div className="flex-1">
      <h3>{Title}</h3>
      <p className="w-96">{Description}</p>
    </div>
  </div>
);

const ProjectSummaryImage = (ImageData: Partial<UploadFileEntityResponse>) => (
  <Image src={getStrapiMedia(ImageData)} alt={"image"} fill placeholder="empty" className="object-cover" />
);
