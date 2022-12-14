import type { ComponentHomeMissionStatement, UploadFileEntityResponse } from "../../../graphql/generated";
import Image from "next/image";
import { ActionButtonsComponent } from "components/common/actionButtons";
import { HTMLContent } from "components/common/htmlContent";
import { getStrapiMedia } from "lib/media";
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
const MissionStatementImage = (ImageData: Partial<UploadFileEntityResponse>) => (
  <Image src={getStrapiMedia(ImageData)} alt={"image"} fill placeholder="empty" className="object-cover" />
);
