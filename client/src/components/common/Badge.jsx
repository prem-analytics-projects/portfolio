import styles from "./Badge.module.css";

export default function Badge({
  children,
  variant = "default",
  size = "medium",
  className = "",
}) {
  const badgeClasses = [
    styles.badge,
    styles[variant] || styles.default,
    styles[size] || styles.medium,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={badgeClasses}>{children}</span>;
}
