import React from "react";
import { IAbout } from "types/about";
import { Heading } from "@chakra-ui/core";

export const AboutPageComponent: React.FC<{ aboutPageContent: IAbout[] }> = ({ aboutPageContent }) => {
  return (
    <>
      {aboutPageContent.map((aboutPageContentItem, index) => (
        <div key={index}>
          <Heading size="md">{aboutPageContentItem.Title}</Heading>
          <p dangerouslySetInnerHTML={{ __html: aboutPageContentItem.Content }} className="prose"></p>
        </div>
      ))}
    </>
  );
};

export default AboutPageComponent;
