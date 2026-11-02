import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard";
import About from "../pages/admin/aboutMe";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/admin/about" element={<About />} />
    </Routes>
  );
}
