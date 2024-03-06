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
 *
 * Adapted from https://github.com/a-smiggle/DaisyUI-ThemeProvider
 */
export default function ThemeProvider(props: CustomProps) {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  function systemCheck() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
    else setTheme("light");
  }

  function handleThemeChange(theme: string) {
    document.documentElement.setAttribute("data-theme", theme);
    setTheme(theme);
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem("daisyUI-theme");
    if (storedTheme) {
      const temp: string = storedTheme;
      // Only check system theme if light or dark used.
      if ((temp === "light" || temp === "dark") && props.useSystem === true) {
        systemCheck();
      } else {
        handleThemeChange(temp);
      }
    } else if (props.useSystem) {
      systemCheck();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("daisyUI-theme", theme);
    setLoading(false);
  }, [theme]);

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
