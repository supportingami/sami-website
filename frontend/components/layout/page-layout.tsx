import Navbar from "components/navbar";

const PageLayout = ({ children }) => {
  return <div className="sm:container mx-auto flex-1 py-10">{children}</div>;
};

export default PageLayout;
