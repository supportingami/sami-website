import React from "react";
import type { IAnnualReport } from "types/annualreport";
import { getStrapiMedia } from "lib/media";
import bg from "public/images/AnnualReport.png";

const style = {
  backgroundImage: `url(${bg.src})`,
  width: "100%",
  height: "100%",
};

export const AnnualReportsListItemComponent: React.FC<{
  report: IAnnualReport;
}> = ({ report }) => (
  <div>
    <div className="relative w-[200px] h-[150px]">
      {report.File && (
        <div className="absolute w-[200px] h-[150px]" style={style}>
          <a
            className="text-xl inline bottom-0 absolute leading-[1.6] w-[200px] h-[2px] inset-x-0"
            href={getStrapiMedia(report.File)}
            target="_blank"
            download
            rel="noopener noreferrer"
          >
            {report.Year} Annual Report
          </a>
        </div>
      )}
    </div>
  </div>
);
