import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Link to="/" className="not-found-home-link">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
