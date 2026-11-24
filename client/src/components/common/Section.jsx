import styles from "./Section.module.css";

export default function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`${styles.section} ${className}`.trim()}>
      {children}
    </section>
  );
}
