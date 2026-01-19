const PageSection = ({
  children,
  className = "",
  childClassName = "",
  fullwidth = false,
  sectionId = "",
  ...props
}) => {
  if (fullwidth) {
    return (
      <div data-testid={props["data-testid"]} className={`${className}`} id={sectionId}>
        <div data-testid="pageSection" className={`container mx-auto ${childClassName}`}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div data-testid="pageSection" className={`container mx-auto ${className}`} id={sectionId}>
      {children}
    </div>
  );
};

export default PageSection;
