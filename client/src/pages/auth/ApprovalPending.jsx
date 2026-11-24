import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthContext";
import { ROUTE_PATHS } from "../../app/routing/routePaths";

export default function ApprovalPending() {
  const { user, logout } = useAuth();

  return (
    <main className="account-status-page">
      <section className="account-status-card">
        <h1>Approval Pending</h1>
        <p>
          Your account is registered{user?.email ? ` (${user.email})` : ""}, but
          no approved role is currently assigned. A Super Admin must approve
          your access before you can use protected areas.
        </p>
        <button type="button" onClick={logout}>Sign out</button>
        <p><Link to={ROUTE_PATHS.HOME}>Return to portfolio</Link></p>
      </section>
    </main>
  );
}
