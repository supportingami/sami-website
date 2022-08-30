import { FC } from "react";
import { IconButton, useColorMode } from "@chakra-ui/core";
import { useThemeContext } from "lib/themeProvider";

const ThemeToggle: FC<{}> = () => {
  // Chakra theme
  const { colorMode, toggleColorMode } = useColorMode();
  const handleToggleTheme = () => {
    toggleColorMode();
    toggleDaisyTheme();
  };

  // Tailwind theme
  const { theme, updateTheme } = useThemeContext();
  function toggleDaisyTheme() {
    const targetTheme = colorMode === "dark" ? "light" : "dark";
    console.log("toggle daisy theme", theme);
    updateTheme(targetTheme);
  }

  return (
    <IconButton
      aria-label="Toggle theme"
      fontSize="20px"
      icon={colorMode === "dark" ? "sun" : "moon"}
      onClick={handleToggleTheme}
    />
  );
};

export default ThemeToggle;
