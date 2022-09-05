import React from "react";
import { Heading } from "@chakra-ui/core";
import { IAnnualReport } from "types/annualreport";
import { AnnualReportsListItemComponent } from "./list-item";

export const AnnualReportPageComponent: React.FC<{ reports: IAnnualReport[] }> = ({ reports }) => {
  return (
    <>
      <Heading size="md">Annual Reports</Heading>
      {reports.map((report) => (
        <AnnualReportsListItemComponent key={report.id} report={report} />
      ))}
    </>
  );
};
