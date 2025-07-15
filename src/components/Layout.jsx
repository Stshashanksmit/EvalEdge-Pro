import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User, Bell, MessageCircle } from "lucide-react";
import Logo from "./Logo.jsx";
import AIChatbot from "./AIChatbot.jsx";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isPublic = ['/', '/login', '/signup', '/demo'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to={isPublic ? "/" : "/dashboard"} className="flex items-center space-x-3">
                <Logo />
                <span className="text-xl font-bold text-evaledge-text">EvalEdge Pro</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {isPublic ? (
                <>
                  <a href="#features" className="text-gray-600 hover:text-evaledge-base font-medium">Features</a>
                  <a href="#pricing" className="text-gray-600 hover:text-evaledge-base font-medium">Pricing</a>
                  <Link to="/login" className="text-gray-600 hover:text-evaledge-base font-medium">Login</Link>
                  <Link to="/signup" className="btn-primary">Sign up</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className={`font-medium ${location.pathname === '/dashboard' ? 'text-evaledge-base' : 'text-gray-600 hover:text-evaledge-base'}`}>
                    Dashboard
                  </Link>
                  <Link to="/organization-setup" className={`font-medium ${location.pathname === '/organization-setup' ? 'text-evaledge-base' : 'text-gray-600 hover:text-evaledge-base'}`}>
                    Setup
                  </Link>
                  <Link to="/results" className={`font-medium ${location.pathname === '/results' ? 'text-evaledge-base' : 'text-gray-600 hover:text-evaledge-base'}`}>
                    Results
                  </Link>
                  <Link to="/criteria" className={`font-medium ${location.pathname === '/criteria' ? 'text-evaledge-base' : 'text-gray-600 hover:text-evaledge-base'}`}>
                    Criteria
                  </Link>
                  <Link to="/reports" className={`font-medium ${location.pathname === '/reports' ? 'text-evaledge-base' : 'text-gray-600 hover:text-evaledge-base'}`}>
                    Reports
                  </Link>
                  
                  {/* User menu */}
                  <div className="flex items-center space-x-4">
                    <Bell className="w-5 h-5 text-gray-400 hover:text-evaledge-base cursor-pointer" />
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <User className="w-8 h-8 text-gray-400 bg-gray-100 rounded-full p-1" />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-evaledge-base"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-6 space-y-4">
              {isPublic ? (
                <>
                  <a href="#features" className="block text-gray-600 hover:text-evaledge-base font-medium">Features</a>
                  <a href="#pricing" className="block text-gray-600 hover:text-evaledge-base font-medium">Pricing</a>
                  <Link to="/login" className="block text-gray-600 hover:text-evaledge-base font-medium">Login</Link>
                  <Link to="/signup" className="block btn-primary text-center">Sign up</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="block font-medium text-gray-600 hover:text-evaledge-base">Dashboard</Link>
                  <Link to="/organization-setup" className="block font-medium text-gray-600 hover:text-evaledge-base">Setup</Link>
                  <Link to="/results" className="block font-medium text-gray-600 hover:text-evaledge-base">Results</Link>
                  <Link to="/criteria" className="block font-medium text-gray-600 hover:text-evaledge-base">Criteria</Link>
                  <Link to="/reports" className="block font-medium text-gray-600 hover:text-evaledge-base">Reports</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* AI Chatbot - only show on authenticated pages */}
      {!isPublic && <AIChatbot />}

      {/* Footer - only show on public pages */}
      {isPublic && (
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <Logo />
                  <span className="text-xl font-bold text-evaledge-text">EvalEdge Pro</span>
                </div>
                <p className="text-gray-600 max-w-md">
                  Job Evaluation made easy. Align compensation, streamline structures, and make smarter talent decisions — faster than ever.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-evaledge-text mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-600 hover:text-evaledge-base">Features</a></li>
                  <li><a href="#pricing" className="text-gray-600 hover:text-evaledge-base">Pricing</a></li>
                  <li><Link to="/demo" className="text-gray-600 hover:text-evaledge-base">Request Demo</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-evaledge-text mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><button className="text-gray-600 hover:text-evaledge-base">Terms of Service</button></li>
                  <li><button className="text-gray-600 hover:text-evaledge-base">Privacy Policy</button></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8">
              <p className="text-gray-500 text-sm">© 2024 EvalEdge Pro. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}