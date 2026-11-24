import { useState } from "react";
import { FiArrowUpRight, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "../app/providers/ThemeContext";
import styles from "./dashboard.module.css";
import Intro from "./intro/intro";
import About from "./sections/aboutMe";
import Skills from "./skills/skills";
import Projects from "./components/projects/projects";
import Contact from "./components/contacts/contacts";
import Footer from "./components/footer/footer";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <header className={styles.header}>
        <a className={styles.brand} href="#home" onClick={closeMenu} aria-label="Prem Kuntia home">
          <span className={styles.brandMark}>P</span>
          <span>PREM KUNTIA<span className={styles.brandDot}>.</span></span>
        </a>
        <button type="button" className={styles.menuToggle} onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="primary-navigation">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav id="primary-navigation" className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`} aria-label="Primary navigation">
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
          <button type="button" className={styles.themeToggle} onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <a className={styles.navCta} href="#contact" onClick={closeMenu}>Let's talk <FiArrowUpRight /></a>
        </nav>
      </header>
      <div id="main-content">
        <Intro />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
