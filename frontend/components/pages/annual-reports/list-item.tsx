import { Box } from "@chakra-ui/core";
import React from "react";
import { AReport } from "types/annualreport";

export const AnnualReportsListItemComponent: React.FC<{
  areport: AReport;
}> = ({ areport }) => (
  <Box>
    <div>
      <div>Year{areport.Year}</div>
    </div>
  </Box>
);
