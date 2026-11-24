import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../providers/AuthContext";
import { ROUTE_PATHS } from "./routePaths";
import { ROLES } from "../../utils/roles";

function getRoleLandingPath(roles) {
  if (roles.includes(ROLES.SUPER_ADMIN)) {
    return ROUTE_PATHS.SUPER_ADMIN_USERS;
  }

  if (roles.includes(ROLES.ADMIN)) {
    return ROUTE_PATHS.ADMIN;
  }

  if (roles.includes(ROLES.EDITOR)) {
    return ROUTE_PATHS.ADMIN_ABOUT;
  }

  if (roles.includes(ROLES.USER)) {
    return ROUTE_PATHS.HOME;
  }

  return ROUTE_PATHS.APPROVAL_PENDING;
}

export default function GuestRoute() {
  const { isAuthenticated, roles, loading, isAccountActive } = useAuth();

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={getRoleLandingPath(roles)} replace />;
  }

  if (!isAccountActive && roles.length > 0) {
    return <Navigate to={ROUTE_PATHS.ACCOUNT_UNAVAILABLE} replace />;
  }

  return <Outlet />;
}
