import React from "react";
import type { IAnnualReport } from "types/annualreport";
import { getStrapiMedia } from "lib/media";
import { ExternalLink } from "components/common/externalLink";

const style = {
  width: 100,
  height: 100,
};

export const AnnualReportComponent: React.FC<{
  report: IAnnualReport;
}> = ({ report }) => (
  <ExternalLink href={getStrapiMedia(report.File)}>
    <div className="h-40 flex justify-center align-center">
      {report.File && (
        <div className="flex flex-col">
          <div
            style={{ ...style, backgroundImage: `url(${getStrapiMedia(report.CoverImage)})` }}
            className="bg-contain bg-center"
          ></div>
          <span className="text-lg font-semibold">{report.Year}</span>
        </div>
      )}
    </div>
  </ExternalLink>
);
