import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import Layout from "./Layout.jsx";
import "./index.css";
import OrganizationSetup from "./OrganizationSetup.jsx";
import PositionSetup from "./PositionSetup.jsx";
import OrganizationWorkspace from "./OrganizationWorkspace.jsx";
import '@fontsource/inter/700.css';
import AdminPage from "./AdminPage.jsx";
import DemoPage from "./DemoPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
          <Route path="organization-setup" element={<OrganizationSetup />} />
          <Route path="position-setup" element={<PositionSetup />} />
          <Route path="workspace" element={<OrganizationWorkspace />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="demo" element={<DemoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
