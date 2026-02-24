import React from "react";
import type { IAnnualReport } from "types/annualreport";
import { getStrapiMedia } from "lib/media";
import { ExternalLink } from "components/common/externalLink";
import Image from "next-export-optimize-images/image";

export const AnnualReportComponent: React.FC<{
  report: IAnnualReport;
}> = ({ report }) => (
  <ExternalLink href={getStrapiMedia(report.File)}>
    <div className="h-40 flex justify-center align-center">
      {report.File && (
        <div className="flex flex-col items-center">
          <div className="relative" style={{ width: 100, height: 100 }}>
            {report.CoverImage && (
              <Image
                src={getStrapiMedia(report.CoverImage)}
                alt={`${report.Year} Annual Report`}
                className="object-contain"
                fill
              />
            )}
          </div>
          <span className="text-lg font-semibold mt-2">{report.Year}</span>
        </div>
      )}
    </div>
  </ExternalLink>
);
