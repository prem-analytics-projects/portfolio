import styles from "./Card.module.css";

export default function Card({
  children,
  className = "",
  hover = true,
  padding = "medium",
  onClick,
}) {
  const cardClasses = [
    styles.card,
    hover ? styles.hover : "",
    styles[padding] || styles.medium,
    onClick ? styles.clickable : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
