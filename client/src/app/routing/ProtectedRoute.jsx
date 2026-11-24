import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../providers/AuthContext";
import { ROUTE_PATHS } from "./routePaths";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const {
    isAuthenticated,
    roles,
    loading,
    isAccountActive,
  } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    if (!isAccountActive && location.pathname !== ROUTE_PATHS.LOGIN) {
      return <Navigate to={ROUTE_PATHS.ACCOUNT_UNAVAILABLE} replace />;
    }

    return (
      <Navigate to={ROUTE_PATHS.LOGIN} replace state={{ from: location }} />
    );
  }

  if (roles.length === 0) {
    return <Navigate to={ROUTE_PATHS.APPROVAL_PENDING} replace />;
  }

  const hasPermission =
    allowedRoles.length === 0 ||
    allowedRoles.some((role) => roles.includes(role));

  if (!hasPermission) {
    return <Navigate to={ROUTE_PATHS.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
}
