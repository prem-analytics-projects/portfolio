import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AuthPage.module.css";

const initialSignup = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
};

const initialLogin = {
  email: "",
  password: "",
};

export default function AuthPage() {
  const [mode, setMode] = useState("signup");
  const [signupData, setSignupData] = useState(initialSignup);
  const [loginData, setLoginData] = useState(initialLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const isSignup = mode === "signup";

  const updateSignup = (event) => {
    const { name, value } = event.target;
    setSignupData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setMessage("");
  };

  const updateLogin = (event) => {
    const { name, value } = event.target;
    setLoginData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setMessage("");
  };

  const validateSignup = () => {
    const nextErrors = {};

    if (!signupData.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!signupData.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!signupData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (
      signupData.mobile &&
      !/^[0-9]{10,15}$/.test(signupData.mobile.replace(/[+\s-]/g, ""))
    ) {
      nextErrors.mobile = "Enter a valid mobile number.";
    }

    if (signupData.password.length < 8) {
      nextErrors.password = "Password must contain at least 8 characters.";
    }

    if (!/[A-Z]/.test(signupData.password)) {
      nextErrors.password = "Include at least one uppercase letter.";
    } else if (!/[a-z]/.test(signupData.password)) {
      nextErrors.password = "Include at least one lowercase letter.";
    } else if (!/[0-9]/.test(signupData.password)) {
      nextErrors.password = "Include at least one number.";
    }

    if (signupData.password !== signupData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateLogin = () => {
    const nextErrors = {};

    if (!loginData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!loginData.password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    const isValid = isSignup ? validateSignup() : validateLogin();

    if (!isValid) return;

    // API integration will be added after matching the backend DTOs.
    setMessage(
      isSignup
        ? "Your form is valid. Registration API integration is the next step."
        : "Your form is valid. Login API integration is the next step.",
    );
  };

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setErrors({});
    setMessage("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <main className={styles.authPage}>
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.gridPattern} aria-hidden="true" />

      <section className={styles.authShell}>
        <div className={styles.brandPanel}>
          <Link to="/" className={styles.brand}>
            <span className={styles.brandMark} />
            <span>PREM KUNTIA</span>
          </Link>

          <div className={styles.brandContent}>
            <span className={styles.eyebrow}>DATA · DEVELOPMENT · AI</span>

            <h1>
              Build.
              <br />
              Analyze.
              <br />
              <span>Innovate.</span>
            </h1>

            <p>
              A space for analytics, engineering, experiments and ideas. Connect
              to explore the work and the thinking behind it.
            </p>

            <div className={styles.brandFooter}>
              <span className={styles.statusDot} />
              <span>PERSONAL PORTFOLIO & WORKSPACE</span>
            </div>
          </div>

          <div className={styles.decorativeOrb} aria-hidden="true">
            <div className={styles.orbRing} />
            <div className={styles.orbCore} />
          </div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formTop}>
            <span className={styles.mobileBrand}>
              <span className={styles.brandMark} />
              PREM KUNTIA
            </span>

            <span className={styles.secureLabel}>
              <span className={styles.statusDot} />
              SECURE ACCESS
            </span>
          </div>

          <div className={styles.formContent}>
            <div className={styles.heading}>
              <span className={styles.eyebrow}>
                {isSignup ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}
              </span>

              <h2>{isSignup ? "Join the workspace." : "Good to see you."}</h2>

              <p>
                {isSignup
                  ? "Create an account to get started."
                  : "Sign in to continue to your workspace."}
              </p>
            </div>

            <div
              className={styles.tabs}
              role="tablist"
              aria-label="Authentication"
            >
              <button
                type="button"
                role="tab"
                aria-selected={isSignup}
                className={isSignup ? styles.activeTab : ""}
                onClick={() => changeMode("signup")}
              >
                Create account
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={!isSignup}
                className={!isSignup ? styles.activeTab : ""}
                onClick={() => changeMode("login")}
              >
                Sign in
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {isSignup ? (
                <>
                  <div className={styles.nameGrid}>
                    <div className={styles.field}>
                      <label htmlFor="firstName">First name *</label>
                      <input
                        id="firstName"
                        name="firstName"
                        value={signupData.firstName}
                        onChange={updateSignup}
                        placeholder="First name"
                        autoComplete="given-name"
                      />
                      {errors.firstName && (
                        <span className={styles.error}>{errors.firstName}</span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="middleName">Middle name</label>
                      <input
                        id="middleName"
                        name="middleName"
                        value={signupData.middleName}
                        onChange={updateSignup}
                        placeholder="Optional"
                        autoComplete="additional-name"
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="lastName">Last name *</label>
                      <input
                        id="lastName"
                        name="lastName"
                        value={signupData.lastName}
                        onChange={updateSignup}
                        placeholder="Last name"
                        autoComplete="family-name"
                      />
                      {errors.lastName && (
                        <span className={styles.error}>{errors.lastName}</span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="mobile">Mobile number</label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={signupData.mobile}
                        onChange={updateSignup}
                        placeholder="Optional"
                        autoComplete="tel"
                      />
                      {errors.mobile && (
                        <span className={styles.error}>{errors.mobile}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="signupEmail">Email address *</label>
                    <input
                      id="signupEmail"
                      name="email"
                      type="email"
                      value={signupData.email}
                      onChange={updateSignup}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span className={styles.error}>{errors.email}</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="signupPassword">Password *</label>
                    <div className={styles.passwordWrap}>
                      <input
                        id="signupPassword"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={signupData.password}
                        onChange={updateSignup}
                        placeholder="Create a strong password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                    {errors.password && (
                      <span className={styles.error}>{errors.password}</span>
                    )}
                    <span className={styles.fieldHint}>
                      Minimum 8 characters, with uppercase, lowercase and a
                      number.
                    </span>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="confirmPassword">Confirm password *</label>
                    <div className={styles.passwordWrap}>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={signupData.confirmPassword}
                        onChange={updateSignup}
                        placeholder="Enter your password again"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() =>
                          setShowConfirmPassword((value) => !value)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirmPassword ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className={styles.error}>
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.field}>
                    <label htmlFor="loginEmail">Email address</label>
                    <input
                      id="loginEmail"
                      name="email"
                      type="email"
                      value={loginData.email}
                      onChange={updateLogin}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span className={styles.error}>{errors.email}</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="loginPassword">Password</label>
                    <div className={styles.passwordWrap}>
                      <input
                        id="loginPassword"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={updateLogin}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                    {errors.password && (
                      <span className={styles.error}>{errors.password}</span>
                    )}
                  </div>

                  <div className={styles.forgotRow}>
                    <Link to="/forgot-password">Forgot password?</Link>
                  </div>
                </>
              )}

              {message && (
                <div className={styles.infoMessage} role="status">
                  {message}
                </div>
              )}

              <button type="submit" className={styles.submitButton}>
                {isSignup ? "Create account" : "Sign in"}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <p className={styles.switchText}>
              {isSignup ? "Already have an account?" : "New to the workspace?"}{" "}
              <button
                type="button"
                onClick={() => changeMode(isSignup ? "login" : "signup")}
              >
                {isSignup ? "Sign in" : "Create an account"}
              </button>
            </p>

            <p className={styles.terms}>
              By continuing, you agree to use this workspace responsibly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
