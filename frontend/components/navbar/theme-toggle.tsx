import { useThemeContext } from "lib/themeProvider";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const ThemeToggle = (props: { btnclass?: string }) => {
  const { theme, updateTheme } = useThemeContext();
  function toggleDaisyTheme() {
    const targetTheme = theme === "dark" ? "light" : "dark";
    updateTheme(targetTheme);
  }

  return (
    <button
      aria-label="Toggle theme"
      className={`btn btn-ghost ${props.btnclass}`}
      onClick={toggleDaisyTheme}
      {...props}
    >
      {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
};

export default ThemeToggle;
