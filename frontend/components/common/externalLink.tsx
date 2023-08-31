/**
 * Uses a simple anchor tag to open external link, default in new tab with noopener rel
 * https://pointjupiter.com/what-noopener-noreferrer-nofollow-explained/
 * */
export const ExternalLink = ({
  href = "",
  download = false,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
}) => (
  <a href={href} target={target} download={download} rel={rel}>
    {children}
  </a>
);
