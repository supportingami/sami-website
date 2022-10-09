import { useThemeContext } from "lib/themeProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeToggle = (props: { btnClass?: string }) => {
  const { theme, updateTheme } = useThemeContext();
  function toggleDaisyTheme() {
    const targetTheme = theme === "dark" ? "light" : "dark";
    updateTheme(targetTheme);
  }

  return (
    <button
      aria-label="Toggle theme"
      className={`btn btn-ghost ${props.btnClass}`}
      onClick={toggleDaisyTheme}
      {...props}
    >
      {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  );
};

export default ThemeToggle;
