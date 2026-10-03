import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import OurMission from "./pages/OurMission.jsx";
import OurPackages from "./pages/OurPackages.jsx";

// Auth page imports
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
// Dashboard imports
import UserDashboard from './components/UserDashboard.jsx';

// === NEW: Admin layout + feature imports (replaces old AdminDashboard.jsx) ===
import AdminLayout from './components/layout/AdminLayout.jsx';
import Dashboard from './features/dashboard/Dashboard.jsx';
import HumanResourceManagement from './features/human-resource/HumanResourceManagement.jsx';
import MaterialLog from './features/material-log/MaterialLog.jsx';
import SiteEngineers from './features/site-engineers/SiteEngineers.jsx';
import UsersLayout from './features/users/UsersLayout.jsx';
import UserManagement from './features/users/UserManagement.jsx';
import Logout from './features/auth/Logout.jsx';
import RolesPermissions from './features/roles-permissions/RolesPermissions.jsx';
import ActivityLog from './features/activity-log/ActivityLog.jsx';
import NewsAlerts from './features/news-alerts/NewsAlerts.jsx';
import ConstructionSites from './features/construction-sites/ConstructionSites.jsx';
import SettingsPage from './features/settings/SettingsPage.jsx';

// Scroll to the top whenever the public pages change route
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Public website shell: Navbar + page + Footer. Dashboards do NOT use this.
function PublicLayout({ user, onLogout }) {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-grow"><Outlet /></main>
      <Footer />
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log('No valid session found');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setLoadingAuth(false);
  }, []);

  const handleLogin = (userData) => {
    // userData is the full JSON response from POST /api/auth/login,
    // e.g. { _id, name, email, role, clientCode, hasPurchasedServices, token }.
    // Laravel Sanctum tokens are opaque (not JWTs), so we can't decode
    // claims out of the token itself — we just store what the backend
    // already gave us directly.
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  if (loadingAuth) {
    return <div className="min-h-screen bg-light-bg"></div>; 
  }

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Routes>
        {/* Public website: header + footer */}
        <Route element={<PublicLayout user={user} onLogout={handleLogout} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/OurMission" element={<OurMission />} />
          <Route path="/packages" element={<OurPackages />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
        </Route>

        {/* Client dashboard: own fixed header/footer, only content scrolls */}
        <Route
          path="/dashboard"
          element={
            user
              ? (user.role === 'admin' ? <Navigate to="/admin" replace /> : <UserDashboard user={user} onLogout={handleLogout} />)
              : <Navigate to="/login" replace />
          }
        />

        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />

        {/* Admin dashboard: own fixed header/footer, only content scrolls */}
        <Route
          path="/admin/*"
          element={user && user.role === 'admin' ? <AdminLayout user={user} onLogout={handleLogout} /> : <Navigate to={user ? '/dashboard' : '/login'} replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="human-resource" element={<HumanResourceManagement />} />
          <Route path="material-log" element={<MaterialLog />} />
          <Route path="site-engineers" element={<SiteEngineers />} />
          <Route path="users" element={<UsersLayout />}>
            <Route index element={<UserManagement />} />
            <Route path="roles" element={<RolesPermissions />} />
            <Route path="activity" element={<ActivityLog />} />
          </Route>
          <Route path="roles-permissions" element={<RolesPermissions />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="news-alerts" element={<NewsAlerts />} />
          <Route path="construction-sites" element={<ConstructionSites />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;