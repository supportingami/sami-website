const PageSection = ({ children, className = "", childClassName = "", fullwidth = false, ...props }) => {
  if (fullwidth) {
    return (
      <div data-testid={props["data-testid" || "props"]} className={`${className}`}>
        <div data-testid="pageSection" className={`container mx-auto ${childClassName}`}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div data-testid="pageSection" className={`container mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default PageSection;
