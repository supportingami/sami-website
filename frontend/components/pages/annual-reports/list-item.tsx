import { Box, Button } from "@chakra-ui/core";
import React from "react";
import { AReport } from "types/annualreport";
import { getStrapiMedia } from "lib/media";

export const AnnualReportsListItemComponent: React.FC<{
  areport: AReport;
}> = ({ areport }) => (
  <Box>
    <div>
      <div>{areport.Year} Annual Report</div>

      {areport.File && (
        <a href={getStrapiMedia(areport.File)} target="_blank" download rel="noopener noreferrer">
          <Button size="md" backgroundColor="#0ff">
            Download
          </Button>
        </a>
      )}
    </div>
  </Box>
);
