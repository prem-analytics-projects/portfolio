import styles from "./Dashboard.module.css";
import MenuIcon from "./components/icons/menuIcon";

export default function Dashboard() {
  return (
    <main className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.menuIcon}>
          <MenuIcon />
        </div>
      </header>

      {/* Dashboard content */}
      <section className={styles.card}>
        Resize the browser to see the color change
      </section>
    </main>
  );
}
