import { getStrapiMedia } from "lib/media";
import Image from "next/image";
import type { IProject } from "types/project";

export const ProjectSummaryItem = ({ Icon, HomeSummary, Name }: IProject) => (
  <div className="flex items-center gap-8 mb-4">
    <Image src={getStrapiMedia(Icon)} alt={"image"} height={80} width={80} />
    <div className="flex-1">
      <h3>{Name}</h3>
      <p className="max-w-96">{HomeSummary}</p>
    </div>
  </div>
);
