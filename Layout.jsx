import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './App';

const Layout = ({ children }) => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm fixed w-full top-0 z-50">
        <Link to={auth.token ? "/dashboard" : "/"} className="flex items-center space-x-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8L16 4L24 8L16 12L8 8Z" fill="#5E4DB4"/>
            <path d="M8 16L16 12L24 16L16 20L8 16Z" fill="#6C5CE7"/>
            <path d="M8 24L16 20L24 24L16 28L8 24Z" fill="#B8A6FF"/>
          </svg>
          <span className="text-2xl font-bold tracking-wide text-gray-800">EvalEdge Pro</span>
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium">
          {auth.token ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-purple-700">Dashboard</Link>
              <Link to="/organization" className="text-gray-700 hover:text-purple-700">Organization</Link>
              <Link to="/results" className="text-gray-700 hover:text-purple-700">Results</Link>
              <Link to="/criteria" className="text-gray-700 hover:text-purple-700">Criteria</Link>
              {auth.user?.role === 'owner' && <Link to="/admin" className="text-gray-700 hover:text-purple-700">Admin</Link>}
              <button onClick={handleLogout} className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-800 transition">Logout</button>
            </>
          ) : (
            <>
              <a href="/#features" className="text-gray-700 hover:text-purple-700">Features</a>
              <a href="/#pricing" className="text-gray-700 hover:text-purple-700">Pricing</a>
              <Link to="/demo" className="text-gray-700 hover:text-purple-700">Request Demo</Link>
              <Link to="/login" className="text-gray-700 hover:text-purple-700">Login</Link>
              <Link to="/signup" className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-800 transition">Sign up</Link>
            </>
          )}
        </div>
      </nav>
      <main className="pt-20 flex-grow">
        <div className="container mx-auto px-4 py-8">
         {children}
        </div>
      </main>
      <footer className="bg-white py-8 px-6 border-t">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-bold mb-2">Product</h4>
              <ul>
                <li><a href="/#features" className="hover:underline">Features</a></li>
                <li><a href="/#pricing" className="hover:underline">Pricing</a></li>
                <li><Link to="/demo" className="hover:underline">Request Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Company</h4>
              <ul>
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Legal</h4>
              <ul>
                <li><a href="#" className="hover:underline">Terms</a></li>
                <li><a href="#" className="hover:underline">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Follow</h4>
              <ul>
                <li><a href="#" className="hover:underline">LinkedIn</a></li>
                <li><a href="#" className="hover:underline">Twitter</a></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-8">© 2025 EvalEdge Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
