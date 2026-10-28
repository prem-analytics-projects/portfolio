import styles from "./aboutMe.module.css";

export default function About() {
  return (
    <section className={styles.about} id={styles.about}>
      <h2 className={styles.about__heading}>About Me</h2>

      <h3 className={styles.about__title}>I am a Data Analyst</h3>
      <p className={styles.about__role}>Team Lead</p>

      <p className={styles.about__intro}>
        I turn raw data into clear insights and lead a team that builds
        dashboards and tools people actually use. Replace this with your own
        short intro.
      </p>

      <a href="#contact" className={styles.about__btn}>
        Learn more
      </a>
    </section>
  );
}
