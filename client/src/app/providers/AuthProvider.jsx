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
  // Initialize directly from localStorage.
  const [user, setUser] = useState(() => getUser());
  const [token, setToken] = useState(() => getToken());
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(
    token &&
    user &&
    user.accountStatus === ACCOUNT_STATUS.ACTIVE &&
    user.approvalStatus === APPROVAL_STATUS.APPROVED,
  );

  // Login.
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

  // Logout.
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
      roles: user?.roles || [],
      login,
      logout,
    }),
    [user, token, loading, isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
