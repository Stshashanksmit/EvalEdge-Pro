import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import DemoPage from './DemoPage';
import DashboardPage from './DashboardPage';
import OrganizationSetup from './OrganizationSetup';
import ResultsPage from './ResultsPage';
import AdminPage from './AdminPage';
import CriteriaPage from './CriteriaPage';

export const AuthContext = createContext(null);

const App = () => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
  });

  const setAuthData = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setAuth(data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuthData, logout }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/dashboard" element={auth.token ? <DashboardPage /> : <Navigate to="/login" />} />
            <Route path="/organization" element={auth.token ? <OrganizationSetup /> : <Navigate to="/login" />} />
            <Route path="/results" element={auth.token ? <ResultsPage /> : <Navigate to="/login" />} />
            <Route path="/criteria" element={auth.token ? <CriteriaPage /> : <Navigate to="/login" />} />
            <Route path="/admin" element={auth.token && auth.user?.role === 'owner' ? <AdminPage /> : <Navigate to="/dashboard" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
