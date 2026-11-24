import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../providers/AuthContext";
import { ROUTE_PATHS } from "./routePaths";

export default function GuestRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.HOME} replace />;
  }

  return <Outlet />;
}
