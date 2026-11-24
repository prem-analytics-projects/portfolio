import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}) {
  return (
    <div className={styles.error} role="alert" aria-live="assertive">
      <div className={styles.icon} aria-hidden="true">
        !
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {onRetry && (
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
