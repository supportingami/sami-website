import React from "react";
import { Heading } from "@chakra-ui/core"; 
import { AReport } from "types/annualreport";
import { IMember } from "types/member";
import { AnnualReportsListItemComponent } from "./list-item";

export const AnnualReportPageComponent: React.FC<{ areports: AReport[] }> = ({
  areports,
}) => {
  return (
    <>
      <Heading size="md">Annual Reports</Heading>
      {areports.map((areport) => (
        <AnnualReportsListItemComponent key={areport.id} areport={areport} />
      ))}
    </>
  );
};
