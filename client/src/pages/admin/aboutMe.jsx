import { useEffect, useState } from "react";

import { getAboutData } from "../../api/aboutMeApi";

import styles from "./aboutMe.module.css";

export default function About() {
  const [about, setAbout] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await getAboutData();

        setAbout(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);
  if (loading) {
    return <p>Loading About Me...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!about) {
    return <p>No About Me information found.</p>;
  }
  return (
    <section className={styles.about}>
      <h2>{about.heading}</h2>

      <p>{about.description}</p>
    </section>
  );
}

// export default function About() {
//   return (
//     <div>
//       <h1>About Me Admin Page</h1>
//     </div>
//   );
// }
