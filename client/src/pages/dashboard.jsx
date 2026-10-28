import { useState } from "react";
import styles from "./Dashboard.module.css";
import MenuIcon from "./components/icons/menuIcon";
import MenuFloater from "./menu/menuFloater";
import Intro from "./intro/intro";
import SocialLinks from "./socailLinks/socialLinks";
import About from "./sections/aboutMe";
import Skills from "./skills/skills";
import Projects from "./components/projects/projects";
import Contact from "./components/contacts/contacts";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>P</h2>
        <button
          className={styles.menuIcon}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </div>
      <MenuFloater isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <SocialLinks />
      <Intro />

      <div className={styles.hireMe}>
        <h2 className={styles.title}>Hire Me</h2>
        <button className={styles.downloadButton}>Download Resume</button>
      </div>
      <About />
      <Skills />
      <Projects />
      <Contact />
      {/* Dashboard content */}
      {/* <section className={styles.card}>
        Resize the browser to see the color change
      </section> */}
    </main>
  );
}
