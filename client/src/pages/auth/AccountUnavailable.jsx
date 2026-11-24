import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthContext";
import { ROUTE_PATHS } from "../../app/routing/routePaths";

export default function AccountUnavailable() {
  const { user, logout } = useAuth();

  return (
    <main className="account-status-page">
      <section className="account-status-card">
        <h1>Account Unavailable</h1>
        <p>
          Your account is not active. Please contact the administrator if you
          believe this is a mistake.
        </p>
        {user?.email && <p>Account: {user.email}</p>}
        <button type="button" onClick={logout}>Sign out</button>
        <p><Link to={ROUTE_PATHS.HOME}>Return to portfolio</Link></p>
      </section>
    </main>
  );
}
