import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import styles from "./socailLinks.module.css";

const links = [
  {
    name: "GitHub",
    url: "https://github.com/your-username",
    icon: <FaGithub />,
  },
  {
    name: "Gmail",
    url: "mailto:your-email@gmail.com",
    icon: <SiGmail />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/your-profile",
    icon: <FaLinkedinIn />,
  },
  {
    name: "Naukri",
    url: "https://www.naukri.com/mnjuser/profile",
    icon: <span className={styles.social__letter}>N</span>,
  },
];

export default function SocialLinks() {
  return (
    <nav className={styles.social} aria-label="Social links">
      {/* 2. .map() loops over the array and makes one <a> per item */}
      {links.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          aria-label={item.name}
          title={item.name}
        >
          {item.icon}
        </a>
      ))}
    </nav>
  );
}
// export default function SocialLinks() {
//   return <h2 className={styles.title}>Social Links</h2>;
// }
