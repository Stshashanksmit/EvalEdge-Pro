import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Logo from "../components/Logo.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert("Please accept the terms and conditions to continue.");
      return;
    }
    
    setLoading(true);
    // Simulate login API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to dashboard on successful login
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Logo size="lg" />
              <span className="text-2xl font-bold text-evaledge-text">EvalEdge Pro</span>
            </div>
            <h1 className="text-3xl font-bold text-evaledge-text mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-evaledge-base"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="flex items-start space-x-3">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 text-evaledge-base bg-gray-100 border-gray-300 rounded focus:ring-evaledge-light focus:ring-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I accept the{" "}
                <button 
                  type="button" 
                  className="text-evaledge-base hover:underline font-medium"
                  onClick={() => alert("Terms of Service modal would open here")}
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button 
                  type="button" 
                  className="text-evaledge-base hover:underline font-medium"
                  onClick={() => alert("Privacy Policy modal would open here")}
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !email || !password || !acceptTerms}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-evaledge-base hover:underline font-semibold">
                Sign up
              </Link>
            </p>
            <Link to="/demo" className="text-sm text-gray-500 hover:text-evaledge-base mt-4 inline-block">
              Request a demo instead
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Gradient background with illustration */}
      <div className="hidden lg:block flex-1 gradient-bg relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-lg px-8">
            <div className="w-32 h-32 mx-auto mb-8 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Logo size="xl" variant="dark" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Make smarter talent decisions
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of HR leaders who trust EvalEdge Pro for objective, data-driven job evaluations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}