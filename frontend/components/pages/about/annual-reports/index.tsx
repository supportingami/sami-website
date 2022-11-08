import React from "react";
import { IAnnualReport } from "types/annualreport";
import { AnnualReportsListItemComponent } from "./ListItem";

export const AnnualReportPageComponent: React.FC<{ reports: IAnnualReport[] }> = ({ reports }) => {
  return (
    <>
      <div className="mt-16 py-16 text-center">
        <p className="font-bold inline text-[40px]">Annual Reports</p>

        <p className="text-base font-normal m-0 h-[65px] leading-[1.6]">{"Find below links to our annual reports. "}</p>

        <div className="grid grid-cols-6 gap-5">
          {reports.map((report) => (
            <AnnualReportsListItemComponent key={report.id} report={report} />
          ))}
        </div>
      </div>
    </>
  );
};
