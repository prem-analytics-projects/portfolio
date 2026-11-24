import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard";
import About from "../pages/admin/aboutMe";
import Signup from "../pages/auth/signup";
import Login from "../pages/auth/Login";
import VerifyEmail from "../pages/auth/verifyEmail";
import UsersList from "../pages/admin/userList";
import AboutContent from "../pages/admin/aboutContainer";

import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

import ProtectedRoute from "../app/routing/ProtectedRoute";
import GuestRoute from "../app/routing/GuestRoute";

import { ROUTE_PATHS } from "../app/routing/routePaths";

import {
  ADMIN_ROLES,
  CONTENT_MANAGER_ROLES,
  SUPER_ADMIN_ROLES,
} from "../utils";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path={ROUTE_PATHS.HOME} element={<Dashboard />} />

      <Route element={<GuestRoute />}>
        <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
        <Route path={ROUTE_PATHS.SIGNUP} element={<Signup />} />
      </Route>

      {/* Email verification remains accessible separately */}
      <Route path={ROUTE_PATHS.VERIFY_EMAIL} element={<VerifyEmail />} />

      {/* Content management */}
      <Route element={<ProtectedRoute allowedRoles={CONTENT_MANAGER_ROLES} />}>
        <Route path={ROUTE_PATHS.ADMIN_ABOUT} element={<About />} />
        <Route path="/admin/aboutContent" element={<AboutContent />} />
      </Route>

      {/* Super Admin user management */}
      <Route element={<ProtectedRoute allowedRoles={SUPER_ADMIN_ROLES} />}>
        <Route path={ROUTE_PATHS.ADMIN_USERS} element={<UsersList />} />
      </Route>

      {/* Error pages */}
      <Route path={ROUTE_PATHS.UNAUTHORIZED} element={<Unauthorized />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
