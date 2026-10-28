import { useState, useEffect } from "react";
import styles from "./menuFloater.module.css";
import CloseIcon from "../components/icons/closeIcon";
const MENU_ITEMS = [
  {
    label: "About Me",
    children: [
      { label: "Bio", href: "#bio" },
      { label: "Skills", href: "#skills" },
    ],
  },
  {
    label: "Projects",
    children: [
      { label: "Web apps", href: "#web-apps" },
      { label: "Open source", href: "#open-source" },
    ],
  },
  {
    label: "Contact",
    children: [
      { label: "Email", href: "#email" },
      { label: "GitHub", href: "#github" },
    ],
  },
];

export default function MenuFloater({ isOpen, onClose }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Dimmed backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerHeader}>
          <h2 className={styles.title}>Menu</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <nav className={styles.menu}>
          <ul>
            {MENU_ITEMS.map((item, index) => {
              const expanded = openIndex === index;

              return (
                <li key={item.label}>
                  <button
                    className={styles.menuParent}
                    onClick={() => toggle(index)}
                    aria-expanded={expanded}
                  >
                    {item.label}
                    <span
                      className={`${styles.chevron} ${
                        expanded ? styles.chevronOpen : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  <ul
                    className={`${styles.submenu} ${
                      expanded ? styles.submenuOpen : ""
                    }`}
                  >
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a href={child.href} onClick={onClose}>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
