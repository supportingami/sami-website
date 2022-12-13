import React from "react";
import type { IAnnualReport } from "types/annualreport";
import { getStrapiMedia } from "lib/media";
import bg from "public/images/AnnualReport.png";

const style = {
  backgroundImage: `url(${bg.src})`,
  backgroundPosition: "center",
  width: "100%",
  height: "100%",
};

export const AnnualReportsListItemComponent: React.FC<{
  report: IAnnualReport;
}> = ({ report }) => (
  <div>
    <div className="h-40 flex justify-center align-center">
      {report.File && (
        <div className="flex flex-col">
          <div style={style} className="bg-cover bg-bottom"></div>
          <a
            className="text-lg font-semibold"
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
