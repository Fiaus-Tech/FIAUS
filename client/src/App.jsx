import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import StartProjectModal from './components/common/StartProjectModal';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import CaseStudyPage from './pages/CaseStudyPage';
import AISolutionsPage from './pages/AISolutionsPage';
import ProcessPage from './pages/ProcessPage';
import FAQPage from './pages/FAQPage';
import StartProjectPage from './pages/StartProjectPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminLeadsPage from './pages/admin/AdminLeadsPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import AdminCMSPage from './pages/admin/AdminCMSPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Scroll Restoration
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route for Admin
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-navy-950">
        <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default function App() {
  const [startProjectOpen, setStartProjectOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      <ScrollToTop />

      {/* Public Navbar (Hidden on Admin Routes) */}
      {!isAdminRoute && (
        <Navbar onOpenStartProject={() => setStartProjectOpen(true)} />
      )}

      {/* Routes Routing */}
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<HomePage onOpenStartProject={() => setStartProjectOpen(true)} />}
          />
          <Route
            path="/about"
            element={<AboutPage onOpenStartProject={() => setStartProjectOpen(true)} />}
          />
          <Route
            path="/services"
            element={<ServicesPage onOpenStartProject={() => setStartProjectOpen(true)} />}
          />
          <Route
            path="/projects"
            element={<ProjectsPage onOpenStartProject={() => setStartProjectOpen(true)} />}
          />
          <Route
            path="/work/:slug"
            element={<CaseStudyPage onOpenStartProject={() => setStartProjectOpen(true)} />}
          />
          <Route
            path="/ai-solutions"
            element={<AISolutionsPage onOpenStartProject={() => setStartProjectOpen(true)} />}
          />
          <Route
            path="/process"
            element={<ProcessPage onOpenStartProject={() => setStartProjectOpen(true)} />}
          />
          <Route
            path="/faq"
            element={<FAQPage onOpenStartProject={() => setStartProjectOpen(true)} />}
          />
          <Route path="/start-a-project" element={<StartProjectPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/blog"
            element={<BlogPage onOpenStartProject={() => setStartProjectOpen(true)} />}
          />
          <Route
            path="/blog/:slug"
            element={<BlogPostPage onOpenStartProject={() => setStartProjectOpen(true)} />}
          />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Management */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="leads" element={<AdminLeadsPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="messages" element={<AdminMessagesPage />} />
            <Route path="cms" element={<AdminCMSPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Public Footer (Hidden on Admin Routes) */}
      {!isAdminRoute && <Footer />}

      {/* Global Start a Project Modal */}
      <StartProjectModal
        isOpen={startProjectOpen}
        onClose={() => setStartProjectOpen(false)}
      />
    </div>
  );
}
