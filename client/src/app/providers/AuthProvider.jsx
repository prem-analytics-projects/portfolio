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

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUser());
  const [token, setToken] = useState(() => getToken());
  const [loading, setLoading] = useState(false);

  // Extract only approved roles from the backend response.
  const roles = useMemo(
    () =>
      (user?.roles || [])
        .filter((role) => role.approvalStatus === APPROVAL_STATUS.APPROVED)
        .map((role) => role.roleName),
    [user],
  );

  // Check account authentication.
  const isAuthenticated = Boolean(
    token &&
    user &&
    user.accountStatus === ACCOUNT_STATUS.ACTIVE &&
    roles.length > 0,
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

      return {
        success: true,
        user: receivedUser,
      };
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
      isAuthenticated,
      roles,
      login,
      logout,
    }),
    [user, token, loading, isAuthenticated, roles, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
