import Link from "next/link";
import { MdFavorite } from "react-icons/md";

import ThemeToggle from "./themeToggle";
import Image from "next/image";
import { useRouter } from "next/router";

interface ILink {
  id: string;
  label: string;
  href: string;
  subLinks?: ILink[];
}

const Navbar = () => {
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

  // TODO - might need arrow for nested nav, TBC
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ArrowRight = () => (
    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </svg>
  );

  /** Create a curved notch to display logo overlapping with header (desktop only) */
  const LogoNotch = () => {
    const width = 200;
    const height = 50;
    const navbarOffset = "calc(2 * var(--navbar-padding, 0.5rem) - 2px)";
    const svgFill = "hsl(var(--b1) / var(--tw-bg-opacity))";
    const router = useRouter();
    const isHomePage = router.asPath === "/home";
    // make logo larger on home screen
    const logoSizeClass = isHomePage ? "w-[200px] h-[70px] mt-0" : "w-[100px] h-[35px] -mt-2 no-animation";
    return (
      <div
        data-cy="logo-container"
        style={{ height, marginTop: navbarOffset }}
        className="relative -ml-2 hidden lg:block"
      >
        <div style={{ height, bottom: -height }} className="absolute flex ">
          {
            // Notch
            isHomePage && (
              <>
                <div style={{ width, height }} className="bg-base-100"></div>
                <svg preserveAspectRatio="none" viewBox="0 0 100 100" fill={svgFill}>
                  <path d="M 0,0 H 100 C 45,0 70,100 0,100 Z" />
                </svg>
              </>
            )
          }
        </div>
        <Link href="/home">
          <div className={`btn btn-link absolute inset-0 m-2  ${logoSizeClass}`}>
            <Image sizes="200px, 100px" src="/images/sami-logo-no-text.svg" fill alt="home-logo"></Image>
          </div>
        </Link>
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
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <PageLinks />
        <ThemeToggle btnclass="mr-1" />
      </ul>
    </div>
  );

  const DesktopNavbar = () => (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal p-0">
        <PageLinks />
      </ul>
    </div>
  );

 const PageLinks = () => (
    <>
      {pageLinks.map(({ href, label, id }) => (
        <li key={id}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </>
  );

  

  return (
    <div data-cy="navbar" className="navbar bg-base-100 z-10 h-16">
      <LogoNotch />
      <div className="navbar-start">
        <MobileNavbar />
      </div>
      <DesktopNavbar />
      <div className="navbar-end">
        <ThemeToggle btnclass="mr-1 hidden lg:block" />
        <a className="btn rounded-none rounded-l-lg mr-1">Volunteer</a>
        <a className="btn rounded-none rounded-r-lg gap-2" href="/donate">
          Donate
          <MdFavorite />
        </a>
      </div>
    </div>
  );
};

export default Navbar;

