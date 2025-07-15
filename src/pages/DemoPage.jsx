import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Building2, Users, Lightbulb, Send } from "lucide-react";
import Logo from "../components/Logo.jsx";

export default function DemoPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companySize: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const companySizes = [
    "1-10 employees",
    "11-50 employees", 
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Send alert email to administrator (simulated)
      console.log("Demo request sent to administrator:", formData);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-evaledge-text mb-4">
            Thank you for your interest!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We've received your demo request and our team will be in touch within 24 hours to schedule your personalized demonstration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/signup" className="btn-secondary">
              Sign up instead
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Content */}
      <div className="flex-1 gradient-bg flex items-center justify-center px-6 py-12">
        <div className="max-w-lg text-white">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to home</span>
          </Link>

          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <Logo size="lg" variant="dark" />
            <span className="text-2xl font-bold">EvalEdge Pro</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Get a demo from our team
          </h1>

          {/* Subtext */}
          <p className="text-xl mb-12 opacity-90 leading-relaxed">
            Need more information before choosing EvalEdge Pro? Submit the form and we'll be in touch to help you discover the product and choose from our available plans.
          </p>

          {/* Benefits list */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Learn more about EvalEdge Pro</h3>
                <p className="opacity-80">See how our platform can transform your job evaluation process</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Explore premium features</h3>
                <p className="opacity-80">Discover AI-powered evaluations, advanced analytics, and more</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Discover your ideal plan</h3>
                <p className="opacity-80">Get personalized recommendations based on your organization's needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-evaledge-text mb-2">Tell us about yourself</h2>
            <p className="text-gray-600">We'll customize the demo to your needs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last name *
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
                Work email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="your.email@company.com"
                required
              />
            </div>

            {/* Company size dropdown */}
            <div>
              <label htmlFor="companySize" className="block text-sm font-semibold text-gray-700 mb-2">
                Company size *
              </label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select company size</option>
                {companySizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !formData.firstName || !formData.lastName || !formData.email || !formData.companySize}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                "Sending request..."
              ) : (
                <>
                  Submit request
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </button>

            {/* Privacy disclaimer */}
            <p className="text-xs text-gray-500 text-center">
              We will process your data as stated in our{" "}
              <button 
                type="button" 
                className="text-evaledge-base hover:underline"
                onClick={() => alert("Privacy Policy modal would open here")}
              >
                Privacy Policy
              </button>
              .
            </p>
          </form>

          {/* Footer links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Already know what you need?{" "}
              <Link to="/signup" className="text-evaledge-base hover:underline font-semibold">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}