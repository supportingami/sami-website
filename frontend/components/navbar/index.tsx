import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ThemeToggle from "./theme-toggle";

interface ILink {
  id: string;
  label: string;
  href: string;
  subLinks?: ILink[];
}

const Navbar = () => {
  const { data: session, status } = useSession();
  const pageLinks: ILink[] = [
    {
      id: "home",
      label: "Home",
      href: "/home",
    },
    {
      id: "projects",
      label: "Projects",
      href: "/projects",
      // TODO - add support for nested nav (see daisyui examples)
      subLinks: [{ id: "mathsCamps", label: "Maths Camps", href: "/camps" }],
    },
    {
      id: "news",
      label: "News",
      href: "/blog-posts",
    },
    {
      id: "about",
      label: "About",
      href: "/about",
    },
    {
      id: "resources",
      label: "Resources",
      href: "/resources",
    },
  ];

  const MobileLinks = () => (
    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <PageLinks />
      <ThemeToggle btnClass="mr-1" />
    </ul>
  );

  const ArrowRight = () => (
    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </svg>
  );

  /** Create a curved notch to display logo overlapping with header */
  const LogoNotch = () => {
    const width = 200;
    const height = 50;
    const navbarOffset = "calc(2 * var(--navbar-padding, 0.5rem) - 2px)";
    const svgFill = "hsl(var(--b1) / var(--tw-bg-opacity))";
    return (
      <div data-cy="logo-container" style={{ height, marginTop: navbarOffset }} className="relative -ml-2">
        <div style={{ height, bottom: -height }} className="absolute flex ">
          <div style={{ width, height }} className="bg-base-100"></div>
          <svg preserveAspectRatio="none" viewBox="0 0 100 100" fill={svgFill}>
            <path d="M 0,0 H 100 C 45,0 70,100 0,100 Z" />
          </svg>
        </div>
      </div>
    );
  };

  const MobileNavbar = () => (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </label>
      {/* Mobile navbar */}
      <MobileLinks />
    </div>
  );

  const PageLinks = () => (
    <>
      {pageLinks.map(({ href, label, id, subLinks }) => (
        <li key={id}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <div data-cy="navbar" className="navbar bg-base-100 z-10 h-16">
      <LogoNotch />
      <div className="navbar-start">
        <MobileNavbar />
        <a className="btn btn-ghost normal-case text-xl">SAMI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <PageLinks />
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle btnClass="mr-1 hidden lg:block" />
        <a className="btn rounded-none rounded-l-lg mr-1">Volunteer</a>
        <a className="btn rounded-none rounded-r-lg gap-2">
          Donate
          <FavoriteIcon />
        </a>
      </div>
    </div>
  );
};

export default Navbar;

/** Deprecated CC 2022-10-09 - Retained in case we want to implement similar sign in in short term
 
  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <Link href="/api/auth/signin">
         <Button
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Sign In
        </Button> }
        </Link>
        );
      };
    
      const signOutButtonNode = () => {
        if (!session) {
          return false;
        }
    
        return (
           <Box className="ml-1">
             <Link href="/api/auth/signout">
               <Button
                 onClick={(e) => {
                   e.preventDefault();
                   signOut();
                 }}
               >
                 Sign Out
               </Button>
             </Link>
           </Box>
        );
      };

 */
