import React from "react";

/**
 * Layout designed to display image alongside heading and content.
 * Responsive, so that on smaller screens a single column is shown
 *  * ```
 *
 *  // large
 * ------------------
 * image  | heading
 *        | content
 * ------------------
 *
 *  // small-medium
 * -----------
 *  heading
 *  image
 *  content
 * -----------
 * ```
 * */
export const ImageHeadingContentLayout: React.FC<{
  Heading: React.ReactNode;
  Image: React.ReactNode;
  Content: React.ReactNode;
  imageSide?: "left" | "right";
}> = ({ Image, Content, Heading, imageSide = "left" }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row lg:items-center lg:gap-32 ${
        imageSide === "right" ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full lg:hidden">{Heading}</div>
      {Image && (
        <div className="flex-1 relative rounded-md overflow-hidden w-full max-w-md lg:max-w-none h-[300px] lg:h-auto min-h-[300px] lg:min-h-[360px] lg:self-stretch mb-6 lg:mb-0 mx-auto">
          {Image}
        </div>
      )}
      <div className="flex-1 w-full">
        <div className="hidden lg:block">{Heading}</div>
        {Content}
      </div>
    </div>
  );
};
