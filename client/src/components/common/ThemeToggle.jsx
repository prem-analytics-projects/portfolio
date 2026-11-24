import { FiMoon, FiSun } from "react-icons/fi";
import styles from "./ThemeToggle.module.css";
import { useTheme } from "../../app/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles["theme-toggle"]}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
}
