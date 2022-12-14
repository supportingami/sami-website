import React from "react";
import type { IAnnualReport } from "types/annualreport";
import { AnnualReportsListItemComponent } from "./ListItem";

export const AnnualReportPageComponent: React.FC<{ reports: IAnnualReport[] }> = ({ reports }) => {
  return (
    <>
      <h2>Annual Reports</h2>
      <p className="mb-10">Find below links to our annual report and other relevant documents</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 px-5 lg:px-24">
        {reports.map((report) => (
          <AnnualReportsListItemComponent key={report.id} report={report} />
        ))}
      </div>
    </>
  );
};
