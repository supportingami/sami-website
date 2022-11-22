const PageLayout = ({ children, className = "" }) => {
  return (
    <div data-testid="pageLayout" className={`container mx-auto py-10 ${className}`}>
      {children}
    </div>
  );
};

export default PageLayout;
