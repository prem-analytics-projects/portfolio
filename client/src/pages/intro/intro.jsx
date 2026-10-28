import { useState, useEffect } from "react";
import styles from "./intro.module.css";

const roles = ["Data Analytics", "Full Stack Developer"];

export default function Intro() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.intro}>
      <h2 className={styles.intro__hello}>Hi, Welcome</h2>
      <h1 className={styles.intro__name}>I am Prem</h1>
      <p key={index} className={styles.intro__role}>
        {roles[index]}
      </p>
    </section>
  );
}
