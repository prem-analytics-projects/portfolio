import { Children, cloneElement, isValidElement } from "react";
import styles from "./StaggerContainer.module.css";

export default function StaggerContainer({
  children,
  staggerDelay = 120,
  initialDelay = 0,
  className = "",
}) {
  const staggeredChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      return child;
    }

    return cloneElement(child, {
      style: {
        ...child.props.style,
        "--stagger-delay": `${initialDelay + index * staggerDelay}ms`,
      },
    });
  });

  return (
    <div className={`${styles.container} ${className}`.trim()}>
      {staggeredChildren}
    </div>
  );
}
