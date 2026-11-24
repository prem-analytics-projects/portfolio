import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import styles from "./intro.module.css";

export default function Intro() {
  return (
    <section className={styles.intro} id="home" aria-labelledby="intro-title">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> AVAILABLE FOR THE RIGHT OPPORTUNITY</p>
          <p className={styles.intro__hello}>Hello, I'm</p>
          <h1 className={styles.intro__name} id="intro-title">Prem Singh <span>Kuntia.</span></h1>
          <h2 className={styles.intro__role}>Data Analytics Lead</h2>
          <p className={styles.summary}>I turn complex data into clear business decisions. I build analytics solutions, develop insightful dashboards and automate reporting workflows that help teams move faster with confidence.</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#projects">Explore my work <FiArrowUpRight /></a>
            <a className={styles.secondaryAction} href="#contact">Get in touch</a>
          </div>
          <div className={styles.quickFacts} aria-label="Professional highlights">
            <div><strong>4+</strong><span>Years in analytics</span></div>
            <div><strong>SQL</strong><span>Data querying</span></div>
            <div><strong>BI</strong><span>Dashboards & insights</span></div>
          </div>
        </div>
        <div className={styles.heroVisual} aria-label="Analytics and data visualization illustration">
          <div className={styles.visualGlow} />
          <div className={styles.visualCard}>
            <div className={styles.cardTop}><span className={styles.liveDot} /> ANALYTICS OVERVIEW <span className={styles.cardMenu}>•••</span></div>
            <div className={styles.metricLabel}>Data → Decisions</div>
            <div className={styles.metricValue}>Insight<span>.</span></div>
            <div className={styles.chart}>{[34,52,43,68,56,82,70,94,76,100,86,112].map((height,index)=><span key={index} style={{height:`${height}px`}} />)}</div>
            <div className={styles.chartFooter}><span>Understand the signal</span><span className={styles.chartAccent}>Build what matters ↗</span></div>
          </div>
          <div className={styles.floatingTag}><span>⌘</span> SQL · Python · BI</div>
          <div className={styles.orbit} />
        </div>
      </div>
      <a className={styles.scrollCue} href="#about"><span>SCROLL TO EXPLORE</span><FiArrowDown /></a>
    </section>
  );
}
