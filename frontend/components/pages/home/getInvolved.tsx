import type { ComponentHomeGetInvolved, UploadFileEntityResponse } from "../../../graphql/generated";
import Image from "next/image";
import { ActionButtonsComponent } from "components/common/actionButtons";
import { HTMLContent } from "components/common/htmlContent";
import { getStrapiMedia } from "lib/media";

export const GetInvolvedComponent: React.FC<ComponentHomeGetInvolved> = ({
  Title,
  Text,
  Description,
  ActionButtons,
  Image,
}) => (
  <>
    <div data-testid="getInvolved" className="flex align-center gap-32">
      <div className="flex-1">
        <h2 className="subtitle">{Title}</h2>
        <h3>{Text}</h3>
        {/* Mobile Image under text (dektop alongside) */}
        <div className="relative mx-auto mb-6 lg:hidden w-full h-96 max-w-lg ">
          <ProjectSummaryImage {...Image} />
        </div>
        <HTMLContent className="mb-6">{Description}</HTMLContent>
        {ActionButtons && <ActionButtonsComponent actionButtons={ActionButtons} />}
      </div>
      <div className="flex-1 relative hidden lg:block rounded-md overflow-hidden">
        <ProjectSummaryImage {...Image} />
      </div>
    </div>
  </>
);
const ProjectSummaryImage = (ImageData: Partial<UploadFileEntityResponse>) => (
  <Image src={getStrapiMedia(ImageData)} alt={"image"} fill placeholder="empty" className="object-contain" />
);
