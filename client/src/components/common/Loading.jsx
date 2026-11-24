import styles from "./Loading.module.css";

export default function Loading({
  message = "Loading...",
  fullScreen = false,
}) {
  return (
    <div
      className={`${styles.loading} ${fullScreen ? styles.fullScreen : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.spinner} aria-hidden="true" />

      <p>{message}</p>
    </div>
  );
}
