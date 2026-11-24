import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthContext";
import { ROUTE_PATHS } from "../../app/routing/routePaths";
import { ROLES } from "../../utils/roles";
import styles from "./Login.module.css";

function getRoleLandingPath(roles = []) {
  if (roles.includes(ROLES.SUPER_ADMIN)) return ROUTE_PATHS.SUPER_ADMIN_USERS;
  if (roles.includes(ROLES.ADMIN)) return ROUTE_PATHS.ADMIN;
  if (roles.includes(ROLES.EDITOR)) return ROUTE_PATHS.ADMIN_ABOUT;
  if (roles.includes(ROLES.USER)) return ROUTE_PATHS.HOME;
  return ROUTE_PATHS.APPROVAL_PENDING;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(formData);

      if (!result.success) {
        setError(result.message);
        return;
      }

      const roles = (result.user?.roles || []).flatMap((role) => {
        if (typeof role === "string") return [role.toUpperCase()];
        if (
          role &&
          typeof role === "object" &&
          role.approvalStatus === "APPROVED" &&
          role.roleName
        ) {
          return [role.roleName.toUpperCase()];
        }
        return [];
      });

      navigate(
        result.user?.accountStatus === "ACTIVE"
          ? getRoleLandingPath(roles)
          : ROUTE_PATHS.ACCOUNT_UNAVAILABLE,
        { replace: true },
      );
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1>Welcome Back</h1>
        <p>Login to your account.</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className={styles.forgotPassword}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className={styles.signupLink}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
