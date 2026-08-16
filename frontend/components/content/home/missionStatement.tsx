import type { ComponentHomeMissionStatement, UploadFile } from "../../../graphql/generated";
import ResponsiveImage from "components/common/ResponsiveImage";
import { ActionButtonsComponent } from "components/common/actionButtons";
import { HTMLContent } from "components/common/htmlContent";
import { ImageHeadingContentLayout } from "components/layout/columns";

export const MissionStatementComponent: React.FC<ComponentHomeMissionStatement> = ({
  Heading,
  Text,
  Description,
  ActionButtons,
  Image,
}) => (
  <>
    <ImageHeadingContentLayout
      imageSide="right"
      Heading={<h2 className="subtitle">{Heading}</h2>}
      Image={<MissionStatementImage {...Image} />}
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
const MissionStatementImage = (ImageData: Partial<UploadFile>) => (
  <ResponsiveImage
    media={ImageData}
    alt="SAMI Mission"
    fill
    preset="twoColumn"
    placeholder="empty"
    className="object-cover"
  />
);
