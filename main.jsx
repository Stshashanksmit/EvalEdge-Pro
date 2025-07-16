import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Layout from "./Layout.jsx";
import LoginPage from "./LoginPage.jsx";
import SignupPage from "./SignupPage.jsx";
import DemoPage from "./DemoPage.jsx";
import AdminPage from "./AdminPage.jsx";
import "./index.css";
import OrganizationWorkspace from "./OrganizationWorkspace.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="demo" element={<DemoPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="workspace" element={<OrganizationWorkspace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
