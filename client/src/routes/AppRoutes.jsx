import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard";
import About from "../pages/admin/aboutMe";
import Signup from "../pages/auth/signup";
import Login from "../pages/auth/Login";
import VerifyEmail from "../pages/auth/verifyEmail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/admin/about" element={<About />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
    </Routes>
  );
}
