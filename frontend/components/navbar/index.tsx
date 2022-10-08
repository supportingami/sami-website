import React from "react";
import { NextComponentType } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Box, Stack, Link as ChakraLink, Button, useColorMode } from "@chakra-ui/core";
import ThemeToggle from "./theme-toggle";

const Navbar: NextComponentType = () => {
  const { data: session, status } = useSession();
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };

  const linksForAllUsers = [
    {
      id: "home",
      label: "Home",
      href: "/",
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

  const linksForAuthenticatedUsers = [
    {
      id: "feeds",
      label: "Feeds",
      href: "/feeds",
    },
    {
      id: "myAccount",
      label: "My Account",
      href: "/my-account",
    },
  ];

  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <Box className="ml-1">
        <Link href="/api/auth/signin">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </Button>
        </Link>
      </Box>
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

  return (
    <Box bg={bgColor[colorMode]}>
      <Box p={4} color={color[colorMode]} shadow="lg" pos="relative">
        <Box maxW="xl" mx="auto" w="full">
          <Stack isInline spacing={4} align="center" justifyContent="space-between" w="full">
            <Box>
              <Stack isInline spacing={4} align="center" fontWeight="semibold">
                {linksForAllUsers.map((link) => {
                  return (
                    <Box key={link.id}>
                      <Link href={link.href}>
                        <ChakraLink>{link.label}</ChakraLink>
                      </Link>
                    </Box>
                  );
                })}
                {session &&
                  linksForAuthenticatedUsers.map((link) => {
                    return (
                      <Box key={link.id}>
                        <Link href={link.href}>
                          <ChakraLink>{link.label}</ChakraLink>
                        </Link>
                      </Box>
                    );
                  })}
              </Stack>
            </Box>
            <Box>
              <Stack isInline spacing={4} align="center">
                <ThemeToggle />
                {signInButtonNode()}
                {signOutButtonNode()}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
