const PageLayout = ({ children, className = "" }) => {
  return (
    <div data-testid="pageLayout" className={`lg:container mx-auto p-10 ${className}`}>
      {children}
    </div>
  );
};

export default PageLayout;
