import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard";
import About from "../pages/admin/aboutMe";
import Signup from "../pages/auth/signup";
import Login from "../pages/auth/login";
import VerifyEmail from "../pages/auth/verifyEmail";
import UsersList from "../pages/admin/userList";
import AboutContent from "../pages/admin/aboutContainer";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ApprovalPending from "../pages/auth/ApprovalPending";
import AccountUnavailable from "../pages/auth/AccountUnavailable";

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
      {/* Public portfolio */}
      <Route path={ROUTE_PATHS.HOME} element={<Dashboard />} />

      {/* Guest-only authentication pages */}
      <Route element={<GuestRoute />}>
        <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
        <Route path={ROUTE_PATHS.SIGNUP} element={<Signup />} />
      </Route>

      {/* Status pages remain reachable without an approved role */}
      <Route path={ROUTE_PATHS.APPROVAL_PENDING} element={<ApprovalPending />} />
      <Route path={ROUTE_PATHS.ACCOUNT_UNAVAILABLE} element={<AccountUnavailable />} />
      <Route path={ROUTE_PATHS.VERIFY_EMAIL} element={<VerifyEmail />} />

      {/* Editor, Admin and Super Admin can manage portfolio content */}
      <Route element={<ProtectedRoute allowedRoles={CONTENT_MANAGER_ROLES} />}>
        <Route path={ROUTE_PATHS.ADMIN_ABOUT} element={<About />} />
        <Route path="/admin/aboutContent" element={<AboutContent />} />
      </Route>

      {/* Admin and Super Admin dashboard */}
      <Route element={<ProtectedRoute allowedRoles={ADMIN_ROLES} />}>
        <Route path={ROUTE_PATHS.ADMIN} element={<AdminDashboard />} />
      </Route>

      {/* Super Admin only: user and role management */}
      <Route element={<ProtectedRoute allowedRoles={SUPER_ADMIN_ROLES} />}>
        <Route path={ROUTE_PATHS.SUPER_ADMIN_USERS} element={<UsersList />} />
        <Route path={ROUTE_PATHS.ADMIN_USERS} element={<UsersList />} />
      </Route>

      <Route path={ROUTE_PATHS.UNAUTHORIZED} element={<Unauthorized />} />
      <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}
