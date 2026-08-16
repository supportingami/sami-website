import type { ComponentHomeGetInvolved, UploadFile } from "../../../graphql/generated";
import ResponsiveImage from "components/common/ResponsiveImage";
import { ActionButtonsComponent } from "components/common/actionButtons";
import { HTMLContent } from "components/common/htmlContent";
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
  <ResponsiveImage
    media={ImageData}
    alt="Get Involved with SAMI"
    fill
    preset="twoColumn"
    placeholder="empty"
    className="object-contain"
  />
);
