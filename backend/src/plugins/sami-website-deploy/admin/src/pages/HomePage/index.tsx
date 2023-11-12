/*
 *
 * HomePage
 *
 */

import React from "react";

// https://design-system.strapi.io/components
import { BaseHeaderLayout, Box, Button } from "@strapi/design-system";

const triggerDeploy = () => {
  console.log("triggering deploy");
  fetch("/sami-website-deploy/deploy", {
    method: "GET", // default, so we can ignore
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

const HomePage = () => {
  return (
    <div>
      <BaseHeaderLayout title="SAMI Admin" as="h2" />
      <Box paddingLeft={10} paddingRight={10} background="neutral100">
        <Button onClick={() => triggerDeploy()}>Deploy to live site</Button>
      </Box>
    </div>
  );
};

export default HomePage;
