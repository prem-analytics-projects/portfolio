import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../providers/AuthContext";
import { ROUTE_PATHS } from "./routePaths";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { isAuthenticated, roles, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTE_PATHS.LOGIN} replace state={{ from: location }} />
    );
  }

  const hasPermission =
    allowedRoles.length === 0 ||
    allowedRoles.some((role) => roles.includes(role));

  if (!hasPermission) {
    return <Navigate to={ROUTE_PATHS.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
}
