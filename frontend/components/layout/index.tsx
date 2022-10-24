import Navbar from "components/navbar";

const Layout = ({ children }) => {
  return (
    <div data-cy="layout-container" className="flex flex-col w-100">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
