export const HTMLContent = ({ children, className = "" }) => (
  <div
    dangerouslySetInnerHTML={{ __html: cleanHTML(children) }}
    className={"prose text-base m-auto max-w-screen-lg " + className}
  ></div>
);

function cleanHTML(html: string) {
  html = stripStyles(html);
  html = replaceEmptyLines(html);
  return html;
}

/**
 * Remove any hardcoded color, background or font-family styling
 * These are commonly populated if content copy-pasted from a google doc
 */
function stripStyles(html: string) {
  const removedStyles = ["background-color", "color", "background", "font-family"];
  const styleRegex = /style="([^"]*)"/gi;
  return html.replace(styleRegex, (s, ...args) => {
    const inlineStyle: string = args[0];
    const cleanedStyles = inlineStyle
      .split(";")
      .filter((s) => {
        const [key] = s.split(":").map((v) => v.trim());
        return !removedStyles.includes(key);
      })
      .join(";");
    return cleanedStyles ? `style="${cleanedStyles}"` : "";
  });
}

function replaceEmptyLines(html: string) {
  return html.replace(/<p>(<br>)*&nbsp;<\/p>/gi, "");
}
