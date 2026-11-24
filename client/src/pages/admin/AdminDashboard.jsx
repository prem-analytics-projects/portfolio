import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthContext";
import { ROUTE_PATHS } from "../../app/routing/routePaths";

export default function AdminDashboard() {
  const { user, roles, logout } = useAuth();

  return (
    <main className="admin-dashboard-page">
      <header>
        <h1>Admin Dashboard</h1>
        <p>Welcome{user?.firstName ? `, ${user.firstName}` : ""}.</p>
        <p>Approved roles: {roles.join(", ")}</p>
        <button type="button" onClick={logout}>Sign out</button>
      </header>

      <nav aria-label="Admin navigation">
        <ul>
          <li><Link to={ROUTE_PATHS.ADMIN_ABOUT}>Manage About section</Link></li>
        </ul>
      </nav>
    </main>
  );
}
