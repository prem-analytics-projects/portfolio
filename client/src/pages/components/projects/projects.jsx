import { useState, useEffect } from "react";
import styles from "./projects.module.css";

const projects = [
  {
    title: "Sales Dashboard",
    description: "Executive KPI dashboard with drill-downs.",
    image: "/projects/sales-dashboard.png",
    tags: ["Tableau", "SQL"],
    link: "https://public.tableau.com/app/profile/prem.kuntia/vizzes",
  },
  {
    title: "ETL Pipeline",
    description: "Daily loads into the warehouse with quality checks.",
    image: "/projects/etl-pipeline.png",
    tags: ["Python", "dbt"],
    link: "#",
  },
  {
    title: "ETL Pipeline",
    description: "Daily loads into the warehouse with quality checks.",
    image: "/projects/etl-pipeline.png",
    tags: ["Python", "dbt"],
    link: "#",
  },
  // add more projects here (6 or more feels good)
];

// How many cards fit at this screen width: 1 / 2 / 3
function getPerView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

export default function Projects() {
  const [perView, setPerView] = useState(getPerView());
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const maxIndex = projects.length - perView; // last position we can slide to

  // Update perView when the window is resized
  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Keep index valid if perView changed
  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(projects.length - perView, 0)));
  }, [perView]);

  // Auto-slide every 3 seconds (stops while hovering)
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1)); // loop back to start
    }, 3000);
    return () => clearInterval(timer);
  }, [paused, maxIndex]);

  const slideWidth = 100 / perView; // each card's width in %

  return (
    <section className={styles.projects} id={styles.projects}>
      <h2 className={styles.projects__heading}>Projects</h2>
      <p className={styles.projects__sub}>Things I have built</p>

      <div
        className={styles.projects__viewport}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={styles.projects__track}
          style={{ transform: `translateX(-${index * slideWidth}%)` }}
        >
          {projects.map((p) => (
            <div
              key={p.title}
              className={styles.projects__slot}
              style={{ flexBasis: `${slideWidth}%` }}
            >
              <article className={styles.projects__card}>
                <img src={p.image} alt={p.title} loading="lazy" />
                <div className={styles.projects__body}>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className={styles.projects__tags}>
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer">
                    View project →
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className={styles.projects__dots}>
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={i === index ? styles.active : ""}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
