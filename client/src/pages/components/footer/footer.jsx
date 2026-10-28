import { FaReact, FaAws } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";
import styles from "./footer.module.css";

// Same idea as before: one array, easy to add or remove tech.
const stack = [
  { name: "React", icon: <FaReact /> },
  { name: "Spring Boot", icon: <SiSpringboot /> },
  { name: "AWS", icon: <FaAws /> },
];

export default function Footer() {
  // Updates itself every new year, so you never edit it
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.footer__text}>
        This website was designed and developed by <strong>Prem</strong> using
      </p>

      <ul className={styles.footer__stack}>
        {stack.map((tech) => (
          <li key={tech.name}>
            {tech.icon}
            <span>{tech.name}</span>
          </li>
        ))}
      </ul>

      <p className={styles.footer__copy}>
        © {year} Prem Singh Kuntia. All rights reserved.
      </p>
    </footer>
  );
}
