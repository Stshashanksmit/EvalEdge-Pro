import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Layout from "./components/Layout.jsx";
import "./index.css";

// Import pages
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DemoPage from "./pages/DemoPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OrganizationSetup from "./pages/OrganizationSetup.jsx";
import Results from "./pages/Results.jsx";
import Criteria from "./pages/Criteria.jsx";
import Reports from "./pages/Reports.jsx";
import AdminSettings from "./pages/AdminSettings.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="demo" element={<DemoPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="organization-setup" element={<OrganizationSetup />} />
          <Route path="results" element={<Results />} />
          <Route path="criteria" element={<Criteria />} />
          <Route path="reports" element={<Reports />} />
          <Route path="admin" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);