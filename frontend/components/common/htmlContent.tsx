export const HTMLContent = ({ children, className = "" }) => (
  <div
    dangerouslySetInnerHTML={{ __html: children }}
    className={"prose text-base m-auto max-w-screen-lg" + className}
  ></div>
);
