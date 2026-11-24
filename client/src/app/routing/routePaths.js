export const ROUTE_PATHS = {
  HOME: "/",

  // Authentication
  LOGIN: "/login",
  SIGNUP: "/signup",
  VERIFY_EMAIL: "/verify-email",
  APPROVAL_PENDING: "/approval-pending",

  // Role-based workspaces
  ADMIN: "/admin",
  ADMIN_ABOUT: "/admin/about",
  ADMIN_USERS: "/admin/users",

  // Super Admin
  SUPER_ADMIN: "/super-admin",
  SUPER_ADMIN_USERS: "/super-admin/users",

  // Error pages
  UNAUTHORIZED: "/unauthorized",
  ACCOUNT_UNAVAILABLE: "/account-unavailable",
  NOT_FOUND: "*",
};

export default ROUTE_PATHS;
