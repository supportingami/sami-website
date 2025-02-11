import type { ComponentHomeGetInvolved, UploadFile } from "../../../graphql/generated";
import Image from "next-export-optimize-images/image";
import { ActionButtonsComponent } from "components/common/actionButtons";
import { HTMLContent } from "components/common/htmlContent";
import { getStrapiMedia } from "lib/media";
import { ImageHeadingContentLayout } from "components/layout/columns";

export const GetInvolvedComponent: React.FC<ComponentHomeGetInvolved> = ({
  Title,
  Text,
  Description,
  ActionButtons,
  Image,
}) => (
  <>
    <ImageHeadingContentLayout
      imageSide="right"
      Heading={<h2 className="subtitle">{Title}</h2>}
      Image={<ProjectSummaryImage {...Image} />}
      Content={
        <>
          <h3>{Text}</h3>
          <HTMLContent className="mb-6">{Description}</HTMLContent>
          {ActionButtons && <ActionButtonsComponent actionButtons={ActionButtons} />}
        </>
      }
    />
  </>
);
const ProjectSummaryImage = (ImageData: Partial<UploadFile>) => (
  <Image src={getStrapiMedia(ImageData)} alt={"image"} fill placeholder="empty" className="object-contain" />
);
