import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

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
      id: "resources",
      label: "Resources",
      href: "/resources",
    },
    {
      id: "projects",
      label: "Projects",
      href: "/projects",
      subLinks: [{ id: "mathsCamps", label: "Maths Camps", href: "/camps" }],
    },
    {
      id: "about",
      label: "About",
      href: "/about",
    },
    {
      id: "volunteer",
      label: "Volunteer",
      href: "/volunteer",
    },
    {
      id: "news",
      label: "News",
      href: "/blog-posts",
    },
  ];

  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <Link href="/api/auth/signin">
        {/* <Button
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Sign In
        </Button> */}
      </Link>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <div></div>
      // <Box className="ml-1">
      //   <Link href="/api/auth/signout">
      //     <Button
      //       onClick={(e) => {
      //         e.preventDefault();
      //         signOut();
      //       }}
      //     >
      //       Sign Out
      //     </Button>
      //   </Link>
      // </Box>
    );
  };

  const MobileNavbar = () => (
    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      {pageLinks.map(({ href, label, id, subLinks }) => (
        <li key={id}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
      {/* <li>
        <a>Item 1</a>
      </li>
      <li tabIndex={0}>
        <a className="justify-between">
          Parent
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </a>
        <ul className="p-2">
          <li>
            <a>Submenu 1</a>
          </li>
          <li>
            <a>Submenu 2</a>
          </li>
        </ul>
      </li>
      <li>
        <a>Item 3</a>
      </li> */}
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

  return (
    <div data-cy="navbar" className="navbar bg-base-100 z-10 h-16">
      <LogoNotch />
      <div className="navbar-start">
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
          <MobileNavbar />
        </div>
        <a className="btn btn-ghost normal-case text-xl">SAMI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <a>
              Parent <ArrowRight />
            </a>
            <ul className="p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle btnClass="mr-1" />
        <a className="btn rounded-none rounded-l-lg mr-1">Volunteer</a>
        <a className="btn rounded-none rounded-r-lg">Donate</a>
      </div>
    </div>
    // <div data-cy="navbar" className="z-10">
    //   <Box p={4} color={color[colorMode]} shadow="lg" pos="relative">
    //     <Box maxW="xl" mx="auto" w="full">
    //       <Box>
    //         <Stack isInline spacing={4} align="center" fontWeight="semibold">
    //           {linksForAllUsers.map((link) => {
    //             return (
    //               <Box key={link.id}>
    //                 <Link href={link.href}>
    //                   <ChakraLink>{link.label}</ChakraLink>
    //                 </Link>
    //               </Box>
    //             );
    //           })}
    //           {session &&
    //             linksForAuthenticatedUsers.map((link) => {
    //               return (
    //                 <Box key={link.id}>
    //                   <Link href={link.href}>
    //                     <ChakraLink>{link.label}</ChakraLink>
    //                   </Link>
    //                 </Box>
    //               );
    //             })}
    //         </Stack>
    //       </Box>
    //       <Box>
    //         <ThemeToggle />
    //         {signInButtonNode()}
    //         {signOutButtonNode()}
    //       </Box>
    //     </Box>
    //   </Box>
    // </div>
  );
};

export default Navbar;
