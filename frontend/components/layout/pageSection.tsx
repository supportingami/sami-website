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
      <div data-test-id={props["data-test-id"]} className={`${className}`} id={sectionId}>
        <div data-test-id="pageSection" className={`container mx-auto ${childClassName}`}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div data-test-id="pageSection" className={`container mx-auto ${className}`} id={sectionId}>
      {children}
    </div>
  );
};

export default PageSection;
