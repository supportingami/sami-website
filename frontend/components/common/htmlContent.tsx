export const HTMLContent = ({ children, className = "" }) => (
  <div dangerouslySetInnerHTML={{ __html: children }} className={"prose text-base " + className}></div>
);
