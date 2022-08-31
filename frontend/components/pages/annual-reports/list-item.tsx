import { Box, Button } from "@chakra-ui/core";
import React from "react";
import { AReport } from "types/annualreport";
import { getStrapiMedia } from "lib/media";

export const AnnualReportsListItemComponent: React.FC<{
  areport: AReport;
}> = ({ areport }) => (
  (
    <Box p="2">
      <div>
        {areport.File && (
          <a href={getStrapiMedia(areport.File)} target="_blank" download rel="noopener noreferrer">
            
            <strong>{areport.Year} Annual Report </strong>
            <Button size="sm" backgroundColor="grey">
              Download
            </Button>
          </a>
        )}
      </div>
    </Box>
  )
);
