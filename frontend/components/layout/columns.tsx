import { useBreakpointQuery } from "lib/breakpoints";

/**
 * Layout designed to image alongside heading and content.
 * Responsive, so that on smaller screens a single column is shown
 * ```
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
  const isLargeScreen = useBreakpointQuery("lg");
  return isLargeScreen ? (
    <>
      <div className={`flex align-center gap-32 ${imageSide === "right" && "flex-row-reverse"}`}>
        <div className="flex-1 relative rounded-md overflow-hidden">{Image}</div>
        <div className="flex-1">
          {Heading}
          {Content}
        </div>
      </div>
    </>
  ) : (
    <>
      {Heading}
      <div className="relative mb-6 h-[300px] mx-auto max-w-md rounded-md">{Image}</div>
      {Content}
    </>
  );
};
