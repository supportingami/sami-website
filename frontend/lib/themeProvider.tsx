import React, { createContext, useContext, useEffect, useState } from "react";

type CustomProps = {
  children: React.ReactNode;
  useSystem?: boolean;
};
type ThemeValue = {
  theme: string;
  updateTheme: (newTheme: string) => void;
};

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

/**
 * Provide access to current theme and update function
 * Adapted from https://github.com/a-smiggle/DaisyUI-ThemeProvider
 * and https://github.com/saadeghi/theme-change
 */
export default function ThemeProvider(props: CustomProps) {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  function handleThemeChange(newTheme: string) {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("daisyUI-theme", newTheme);
    setTheme(newTheme);
  }

  // On initial load try to load theme from storage
  useEffect(() => {
    const storedTheme = localStorage.getItem("daisyUI-theme");
    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(storedTheme);
    }
    setLoading(false);
  }, []);

  // Public method to allow setting theme from components
  const updateTheme = (newTheme: string) => {
    if (newTheme) {
      handleThemeChange(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {loading ? null : <>{props.children}</>}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useThemeContext must be used inside ThemeContext");
  }

  return context;
}

/**
 * Legacy function to check user system preferred theme
 * Prefer promoting light theme for now (as dark still has some poor UI for icons/images)
 * but may use again in future
 */
// function checkSystemTheme() {
//   if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
//   else setTheme("light");
// }
