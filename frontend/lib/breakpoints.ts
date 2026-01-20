import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config"; // Fix the path

const fullConfig = resolveConfig(tailwindConfig);
const breakpoints = fullConfig.theme.screens;

/**
 * Listen for media query change
 * Adapted from https://fireship.io/snippets/use-media-query-hook/
 */
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    // Set initial value
    listener();

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [query]);

  return matches;
};

/**
 * Listen for specific tailwind breakpoint change
 * Adapted from https://stackoverflow.com/a/71098593
 */
const useBreakpointQuery = (breakpoint: "sm" | "md" | "lg" | "xl", range: "min" | "max" = "min") => {
  const query = `(${range}-width: ${breakpoints[breakpoint]})`;
  return useMediaQuery(query);
};

export { useBreakpointQuery };
