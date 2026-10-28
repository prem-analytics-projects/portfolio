import * as Si from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import styles from "./skills.module.css";

const icon = (name, fallback) => {
  const Icon = Si[name];
  return Icon ? <Icon /> : <span className="skills__letter">{fallback}</span>;
};

const skills = [
  // Data and warehouse
  { name: "SQL", icon: <FaDatabase /> },
  { name: "Python", icon: icon("SiPython", "Py") },
  { name: "Pandas", icon: icon("SiPandas", "Pd") },
  { name: "PostgreSQL", icon: icon("SiPostgresql", "Pg") },
  { name: "Amazon Redshift", icon: icon("SiAmazonredshift", "RS") },
  { name: "Snowflake", icon: icon("SiSnowflake", "Sf") },
  { name: "dbt", icon: icon("SiDbt", "dbt") },
  { name: "AWS S3", icon: icon("SiAmazons3", "S3") },

  // Business intelligence
  { name: "Tableau", icon: icon("SiTableau", "Tb") },
  { name: "Power BI", icon: icon("SiPowerbi", "BI") },
  { name: "Metabase", icon: icon("SiMetabase", "Mb") },
  { name: "Redash", icon: icon("SiRedash", "R") },

  // Automation
  { name: "Jenkins", icon: icon("SiJenkins", "Jk") },
  { name: "Google Sheets API", icon: icon("SiGooglesheets", "GS") },
  { name: "Excel", icon: icon("SiMicrosoftexcel", "Xl") },
  { name: "Email Automation", icon: icon("SiGmail", "@") },

  // AI tools
  { name: "Cursor AI", icon: icon("SiCursor", "Cu") },
  { name: "ChatGPT / Codex", icon: icon("SiOpenai", "AI") },

  // Version control
  { name: "Git", icon: icon("SiGit", "Git") },
  { name: "GitHub", icon: icon("SiGithub", "GH") },

  // Web
  { name: "React", icon: icon("SiReact", "Re") },
  { name: "JavaScript", icon: icon("SiJavascript", "JS") },
  { name: "HTML5", icon: icon("SiHtml5", "H5") },
  { name: "CSS3", icon: icon("SiCss3", "C3") },
];
export default function Skills() {
  return (
    <section className={styles.skills} id={styles.skills}>
      <h2 className={styles.skills__heading}>Skills</h2>
      <p className={styles.skills__sub}>Tools and Technologies</p>

      <div className={styles.skills__grid}>
        {skills.map((skill) => (
          <div key={skill.name} className={styles.skills__item}>
            <span className={styles.skills__icon}>
              {skill.svg ? (
                <span dangerouslySetInnerHTML={{ __html: skill.svg }} />
              ) : (
                skill.icon
              )}
            </span>
            <span className={styles.skills__name}>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// Safe lookup: if the icon exists, show it. If not, show the fallback text.
