import React from "react";
import { AReport } from "types/annualreport";
import { IMember } from "types/member";
import { AnnualReportsListItemComponent } from "./list-item";

export const AnnualReportPageComponent: React.FC<{ areports: AReport[] }> = ({
  areports,
}) => {
  return (
    <>
      <h1>Annual Reports</h1>
      {areports.map((areport) => (
        <AnnualReportsListItemComponent key={areport.id} areport={areport} />
      ))}
    </>
  );
};
