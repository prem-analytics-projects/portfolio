import DescriptionForm from "./aboutDescriptionForm";
import DescriptionList from "./aboutDiscriptionList";
import { useState } from "react";
import styles from "./aboutContainer.module.css";
export default function AboutContent() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshDescriptions = () => {
    setRefreshKey((previous) => previous + 1);
  };

  return (
    <div className={styles.adminAboutContainer}>
      <h1>Manage About Sections</h1>

      <section className="admin-about-form">
        <DescriptionForm onSuccess={refreshDescriptions} />
      </section>

      <hr />

      <section className="admin-about-list">
        <DescriptionList key={refreshKey} />
      </section>
    </div>
  );
}
