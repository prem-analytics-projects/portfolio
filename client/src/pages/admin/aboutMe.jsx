import { useEffect, useState } from "react";

import { getAboutSections } from "../api/aboutApi";

import styles from "./aboutMe.module.css";

export default function About() {
  const [aboutSections, setAboutSections] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAboutSections = async () => {
      try {
        const data = await getAboutSections();
        console.log("API DATA:", data);
        console.log(
          "SECTION IDs:",
          data.map((section) => section.sectionId),
        );
        setAboutSections(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutSections();
  }, []);

  if (loading) {
    return <p>Loading About Sections...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.aboutContainer}>
      <h1>About Me</h1>

      {aboutSections.map((section) => (
        <div key={section.sectionId} className={styles.aboutCard}>
          <h2>{section.heading}</h2>

          <p>{section.description}</p>
        </div>
      ))}
    </div>
  );
}
