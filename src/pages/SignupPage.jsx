import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import Logo from "../components/Logo.jsx";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      setError("Please accept the terms and conditions to continue.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call to check if email has access
    setTimeout(() => {
      const hasAccess = Math.random() > 0.3; // 70% chance of having access
      
      if (!hasAccess) {
        setError("This email address does not have access. Please contact your administrator to request access.");
        setLoading(false);
        return;
      }
      
      setLoading(false);
      // Redirect to dashboard on successful signup
      window.location.href = "/dashboard";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Signup form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Logo size="lg" />
              <span className="text-2xl font-bold text-evaledge-text">EvalEdge Pro</span>
            </div>
            <h1 className="text-3xl font-bold text-evaledge-text mb-2">Create your account</h1>
            <p className="text-gray-600">Join your organization on EvalEdge Pro</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Signup form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="First name"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Work email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your work email"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Only emails with access can create accounts. Contact your administrator if needed.
              </p>
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Create a password"
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

            {/* Confirm Password field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-evaledge-base"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
              disabled={loading || !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !acceptTerms}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-evaledge-base hover:underline font-semibold">
                Sign in
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
              Join your team
            </h2>
            <p className="text-xl opacity-90">
              Start evaluating positions and making data-driven compensation decisions with your organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}