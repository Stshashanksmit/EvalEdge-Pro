'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function RequestDemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companySize: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const companySizeOptions = [
    { value: '', label: 'Select company size' },
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1,000 employees' },
    { value: '1001-5000', label: '1,001-5,000 employees' },
    { value: '5000+', label: '5,000+ employees' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call to send demo request
      console.log('Demo request submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-eval-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-eval"></div>
            <span className="text-2xl font-bold text-gray-900">EvalEdge Pro</span>
          </Link>
          
          <div className="bg-white rounded-eval shadow-lg border border-eval-gray-200 p-8">
            <div className="w-16 h-16 bg-neon-green rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Received!</h2>
            <p className="text-gray-600 mb-6">
              Thanks for your interest in EvalEdge Pro! Our team will reach out within 24 hours to schedule your personalized demo.
            </p>
            <Link href="/" className="btn-primary inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-eval border-b border-eval-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-eval"></div>
              <span className="text-xl font-bold text-gray-900">EvalEdge Pro</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-neon-green font-medium">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-20 bg-gradient-to-b from-eval-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Description */}
            <div className="space-y-8">
              <div>
                <h1 className="text-heading-lg text-gray-900 mb-6">
                  Get a demo from our team
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Need more information before choosing EvalEdge Pro? Submit the form and we'll be in touch to help you discover the product and choose from our available plans.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Learn more about EvalEdge Pro</h3>
                    <p className="text-gray-600">
                      Understand how our AI-powered job evaluation platform can transform your HR processes and decision-making.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore premium features</h3>
                    <p className="text-gray-600">
                      See how AI auto-evaluation, market salary intelligence, and advanced reporting can accelerate your workflow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Discover your ideal plan</h3>
                    <p className="text-gray-600">
                      Get personalized recommendations based on your organization size, industry, and evaluation needs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-eval p-6 border border-eval-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">What to expect:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• 30-minute personalized demo</li>
                  <li>• Live walkthrough of key features</li>
                  <li>• Custom setup recommendations</li>
                  <li>• Q&A with our product experts</li>
                  <li>• No sales pressure, just education</li>
                </ul>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:pl-8">
              <div className="bg-white rounded-eval shadow-xl border border-eval-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about yourself</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First name *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last name *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Work email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
                      Company size *
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      required
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      {companySizeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Demo'}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-eval-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    We will process your data as stated in our{' '}
                    <Link href="/privacy-policy" className="text-neon-green hover:text-neon-green-dark underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-neon-green mr-1" />
                    SOC 2 Compliant
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-neon-green mr-1" />
                    GDPR Ready
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-neon-green mr-1" />
                    Enterprise Security
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-md text-gray-900 mb-4">
              See what makes EvalEdge Pro different
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-eval mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                80%
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Faster Evaluations</h3>
              <p className="text-gray-600">Reduce evaluation time by 80% with AI-powered analysis</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-eval mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                9
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Factors</h3>
              <p className="text-gray-600">Comprehensive 9-factor framework for objective evaluation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-eval mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                24/7
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Always Available</h3>
              <p className="text-gray-600">Real-time market data and insights whenever you need them</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-eval"></div>
                <span className="text-xl font-bold">EvalEdge Pro</span>
              </Link>
              <p className="text-gray-400">Making job evaluation your competitive edge.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/#features" className="hover:text-neon-green">Features</a></li>
                <li><a href="/pricing" className="hover:text-neon-green">Pricing</a></li>
                <li><a href="/request-demo" className="hover:text-neon-green">Request Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-neon-green">About</a></li>
                <li><a href="#" className="hover:text-neon-green">Contact</a></li>
                <li><a href="#" className="hover:text-neon-green">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-neon-green">Terms of Service</button></li>
                <li><button className="hover:text-neon-green">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EvalEdge Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}