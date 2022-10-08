import { Box, Button } from "@chakra-ui/core";
import React from "react";
import { IAnnualReport } from "types/annualreport";
import { getStrapiMedia } from "lib/media";

export const AnnualReportsListItemComponent: React.FC<{
  report: IAnnualReport;
}> = ({ report }) => (
  <Box p="2">
    <div>
      {report.File && (
        <a href={getStrapiMedia(report.File)} target="_blank" download rel="noopener noreferrer">
          <strong>{report.Year} Annual Report </strong>
          <Button size="sm" backgroundColor="grey">
            Download
          </Button>
        </a>
      )}
    </div>
  </Box>
);
