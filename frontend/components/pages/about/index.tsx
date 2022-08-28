import React from "react";
import { About } from "types/about";

export const AboutPageComponent: React.FC<{aboutPageContent: About[]}> = ({aboutPageContent}) => {
  return (
    <>
    {aboutPageContent.map((aboutPageContentItem, index) => (
      <div key={index}>
        <h1>{aboutPageContentItem.Title}</h1>
        <p>{aboutPageContentItem.Content}</p>
      </div>
    ))}
    </>
  );
}

export default AboutPageComponent;