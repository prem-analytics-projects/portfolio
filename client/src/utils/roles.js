export const ROLES = {
  USER: "USER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
};

// Roles allowed to access the admin area.
export const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPER_ADMIN];

// Only Super Admin can access Super Admin features.
export const SUPER_ADMIN_ROLES = [ROLES.SUPER_ADMIN];

// Roles allowed to manage portfolio content.
export const CONTENT_MANAGER_ROLES = [
  ROLES.EDITOR,
  ROLES.ADMIN,
  ROLES.SUPER_ADMIN,
];
