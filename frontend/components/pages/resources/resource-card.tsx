import { Box, Button } from "@chakra-ui/core";
import Image from "next/image";
import { getStrapiMedia } from "lib/media";
import React from "react";
import { IResource } from "types/resource";

export const ResourceCardComponent: React.FC<{
  resource: IResource;
}> = ({ resource }) => (
  <Box borderWidth="1px" borderBottom="1px solid #ddd" maxWidth="300px">
    {resource.Image?.data && <Image src={getStrapiMedia(resource.Image)} alt={"image"} height="150px" width="300px" />}
    <Box p="6" borderBottom="0.6px solid #ddd">
      <Box textTransform="capitalize" fontWeight="bold" letterSpacing="0.6px">
        {resource.Title}
      </Box>
    </Box>
    <Box>
      <Box p="3">{resource.Description}</Box>
    </Box>
    {resource.Media?.data && (
      <a href={getStrapiMedia(resource.Media)} target="_blank" download rel="noopener noreferrer">
        <Button size="md" backgroundColor="#0ff">
          Download
        </Button>
      </a>
    )}
  </Box>
);
