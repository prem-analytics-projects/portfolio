import { useEffect, useRef, useState } from "react";
import styles from "./AnimatedElement.module.css";

const animationClasses = {
  "fade-up": styles.fadeUp,
  "fade-down": styles.fadeDown,
  "fade-left": styles.fadeLeft,
  "fade-right": styles.fadeRight,
  "fade-in": styles.fadeIn,
};

export default function AnimatedElement({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  once = true,
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once]);

  const animationClass = animationClasses[animation] || styles.fadeUp;

  return (
    <div
      ref={elementRef}
      className={`${styles.animatedElement} ${
        animationClass
      } ${isVisible ? styles.visible : ""} ${className}`.trim()}
      style={{
        "--animation-delay": `${delay}ms`,
        "--animation-duration": `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
