const PageSection = ({ children, className = "", fullwidth = false }) => {
  if (fullwidth) {
    return (
      <div data-testid="pageSectionFullwidth" className={`${className}`}>
        <div data-testid="pageSection" className={`container mx-auto py-10`}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div data-testid="pageSection" className={`container mx-auto py-10 ${className}`}>
      {children}
    </div>
  );
};

export default PageSection;
