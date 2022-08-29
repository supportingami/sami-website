import React from "react";
import { About } from "types/about";
import { Heading } from "@chakra-ui/core"; 

export const AboutPageComponent: React.FC<{aboutPageContent: About[]}> = ({aboutPageContent}) => {
  return (
    <>
    {aboutPageContent.map((aboutPageContentItem, index) => (
      <div key={index}>
        <Heading size="md">{aboutPageContentItem.Title}</Heading>
        <p>{aboutPageContentItem.Content}</p>
      </div>
    ))}
    </>
  );
}

export default AboutPageComponent;