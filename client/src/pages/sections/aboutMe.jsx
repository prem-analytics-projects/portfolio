import styles from "./aboutMe.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-heading">
      <h2 className={styles.about__heading} id="about-heading">About Me</h2>
      <h3 className={styles.about__title}>Data Analytics Lead</h3>
      <p className={styles.about__role}>Turning data into decisions</p>
      <p className={styles.about__intro}>
        I work at the intersection of data, technology and business. My experience
        includes leading analytics delivery, building dashboards, working with
        cloud data warehouses and automating recurring reporting. I enjoy making
        complex information easier to understand and helping teams act on it.
      </p>
      <a href="#contact" className={styles.about__btn}>Let's connect</a>
    </section>
  );
}
