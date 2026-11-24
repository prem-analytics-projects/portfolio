import { useCallback, useMemo, useState } from "react";

import { AuthContext } from "./AuthContext";
import { loginUser } from "../../services/api/authService";

import {
  getToken,
  getUser,
  saveToken,
  saveUser,
  removeToken,
  removeUser,
} from "../../services/storage";

import { ACCOUNT_STATUS, APPROVAL_STATUS } from "../../utils";
import getErrorMessage from "../../utils/getErrorMessage";

// The backend currently returns approved roles as strings, e.g. ["ADMIN"].
// This also accepts role objects to remain compatible with older responses.
function getApprovedRoles(user) {
  if (!Array.isArray(user?.roles)) {
    return [];
  }

  return [
    ...new Set(
      user.roles.flatMap((role) => {
        if (typeof role === "string") {
          return role.trim() ? [role.trim().toUpperCase()] : [];
        }

        if (
          role &&
          typeof role === "object" &&
          role.approvalStatus === APPROVAL_STATUS.APPROVED &&
          typeof role.roleName === "string"
        ) {
          return [role.roleName.trim().toUpperCase()];
        }

        return [];
      }),
    ),
  ];
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUser());
  const [token, setToken] = useState(() => getToken());
  const [loading, setLoading] = useState(false);

  const roles = useMemo(() => getApprovedRoles(user), [user]);

  // Authentication and authorization are deliberately separate.
  // A user can be logged in while waiting for role approval.
  const isAuthenticated = Boolean(
    token && user && user.accountStatus === ACCOUNT_STATUS.ACTIVE,
  );

  const isAccountActive = Boolean(
    user && user.accountStatus === ACCOUNT_STATUS.ACTIVE,
  );

  const login = useCallback(async (loginData) => {
    setLoading(true);

    try {
      const response = await loginUser(loginData);
      const receivedToken = response?.accessToken;
      const receivedUser = response?.user;

      if (!receivedToken || !receivedUser) {
        throw new Error("Invalid login response from the server.");
      }

      saveToken(receivedToken);
      saveUser(receivedUser);
      setToken(receivedToken);
      setUser(receivedUser);

      return { success: true, user: receivedUser };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error, "Login failed."),
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeToken();
    removeUser();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      roles,
      isAuthenticated,
      isAccountActive,
      hasApprovedRole: roles.length > 0,
      login,
      logout,
    }),
    [
      user,
      token,
      loading,
      roles,
      isAuthenticated,
      isAccountActive,
      login,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
