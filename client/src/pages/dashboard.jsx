// export default function Dashboard() {
//   return <h1>Hello, it works</h1>;
// }
// Dashboard.jsx
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Hello, it works</h1>
      </div>
    </div>
  );
}
