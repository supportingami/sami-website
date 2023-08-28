import Navbar from "components/navbar";

const Layout = ({ children, className = "" }) => {
  return (
    <div data-cy="layout-container" className={`flex flex-col w-100 ${className}`}>
      <Navbar />
      <div className="flex-1 z-0" data-cy="layout-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
