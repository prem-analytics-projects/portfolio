import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <main className="unauthorized-page">
      <div className="unauthorized-content">
        <h1>403</h1>

        <h2>Access Denied</h2>

        <p>
          You don't have permission to access this page. Please contact the
          administrator if you believe this is a mistake.
        </p>

        <Link to="/" className="unauthorized-home-link">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
