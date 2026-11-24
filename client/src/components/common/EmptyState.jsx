import styles from "./EmptyState.module.css";

export default function EmptyState({
  title = "Nothing to display yet",
  message = "Content will appear here when it becomes available.",
  actionLabel,
  onAction,
}) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.icon} aria-hidden="true">
        <span>○</span>
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {actionLabel && onAction && (
        <button
          type="button"
          className={styles.actionButton}
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
