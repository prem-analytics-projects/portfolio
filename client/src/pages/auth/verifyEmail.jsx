import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../api/authApi";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const verificationStarted = useRef(false);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (verificationStarted.current) return;

    verificationStarted.current = true;

    async function confirmEmail() {
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing.");
        return;
      }

      try {
        const response = await verifyEmail(token);

        setStatus("success");
        setMessage(response.message);
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.detail ||
            err.response?.data?.message ||
            err.message ||
            "Email verification failed.",
        );
      }
    }

    confirmEmail();
  }, [token]);

  return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <h1>
        {status === "loading" && "Verifying Email"}
        {status === "success" && "Email Verified"}
        {status === "error" && "Verification Failed"}
      </h1>

      <p>{message}</p>

      {status === "success" && <p>Your account is awaiting admin approval.</p>}

      {status !== "loading" && <Link to="/login">Go to Login</Link>}
    </div>
  );
}
