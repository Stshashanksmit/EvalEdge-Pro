import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 8L16 4L24 8L16 12L8 8Z" fill="#5E4DB4" />
            <path d="M8 16L16 12L24 16L16 20L8 16Z" fill="#6C5CE7" />
            <path d="M8 24L16 20L24 24L16 28L8 24Z" fill="#B8A6FF" />
          </svg>
          <span className="text-xl font-bold tracking-wide text-gray-800">EvalEdge Pro</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#features" className="text-gray-700 hover:text-purple-700">Features</a>
          <a href="#pricing" className="text-gray-700 hover:text-purple-700">Pricing</a>
          <Link to="/demo" className="text-gray-700 hover:text-purple-700">Request Demo</Link>
          <Link to="/login" className="text-gray-700 hover:text-purple-700">Login</Link>
          <Link to="/signup" className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-800 transition">Sign Up</Link>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}
