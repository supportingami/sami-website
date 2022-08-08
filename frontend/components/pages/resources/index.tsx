import { Box, Flex, FormControl, IconButton, Input } from "@chakra-ui/core";
import React from "react";
import { IResource } from "types/resource";
import { ResourceCardComponent } from "./resource-card";

export const ResourcesPageComponent: React.FC<{ resources: IResource[] }> = ({ resources }) => {
  return (
    <>
      <h1>Resources</h1>
      <Box borderWidth="1px" mt="30px">
        <FormControl>
          <Flex>
            <Input placeholder="Search" />
            <IconButton aria-label="Search resources" />
          </Flex>
        </FormControl>
      </Box>
      <Box mt="100px">
        <Flex justifyContent="space-between" flexWrap="wrap">
          {resources.map((resource) => (
            <ResourceCardComponent key={resource.id} resource={resource} />
          ))}
        </Flex>
      </Box>
    </>
  );
};
