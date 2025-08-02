'use client';

import Link from 'next/link';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PasswordStrength {
  score: number;
  feedback: string[];
  isValid: boolean;
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    orgName: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const analyzePasswordStrength = (password: string): PasswordStrength => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 12) {
      score += 2;
    } else {
      feedback.push('At least 12 characters');
    }

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Include lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Include uppercase letters');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Include numbers');

    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    else feedback.push('Include special characters');

    return {
      score: Math.min(score, 5),
      feedback,
      isValid: password.length >= 12 && score >= 4
    };
  };

  const passwordStrength = analyzePasswordStrength(formData.password);

  const getStrengthColor = (score: number) => {
    if (score <= 2) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-500';
    if (score <= 4) return 'bg-blue-500';
    return 'bg-neon-green';
  };

  const getStrengthText = (score: number) => {
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert('Please accept the terms and conditions to continue.');
      return;
    }
    if (!passwordStrength.isValid) {
      alert('Please create a stronger password.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Handle signup logic here
      console.log('Signup submitted:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Account created! Please check your email for verification.');
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-eval-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-eval"></div>
            <span className="text-2xl font-bold text-gray-900">EvalEdge Pro</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-600">Start your 14-day free trial today</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-eval shadow-lg border border-eval-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            {/* Organization Name */}
            <div>
              <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name
              </label>
              <input
                id="orgName"
                name="orgName"
                type="text"
                required
                value={formData.orgName}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your organization name"
              />
              <p className="mt-1 text-sm text-gray-500">
                This will create a new organization workspace
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pr-10"
                  placeholder="Create a strong password"
                  minLength={12}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Password Strength Meter */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength.score)}`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${passwordStrength.isValid ? 'text-neon-green' : 'text-red-500'}`}>
                      {getStrengthText(passwordStrength.score)}
                    </span>
                  </div>
                  {passwordStrength.feedback.length > 0 && (
                    <div className="space-y-1">
                      {passwordStrength.feedback.map((item, index) => (
                        <div key={index} className="flex items-center text-sm text-red-600">
                          <XMarkIcon className="w-4 h-4 mr-2" />
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                  {passwordStrength.isValid && (
                    <div className="flex items-center text-sm text-neon-green">
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Password meets security requirements
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="accept-terms"
                  name="accept-terms"
                  type="checkbox"
                  required
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="focus:ring-neon-green h-4 w-4 text-neon-green border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="accept-terms" className="text-gray-600">
                  I accept the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-neon-green hover:text-neon-green-dark underline"
                  >
                    Terms and Conditions
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-neon-green hover:text-neon-green-dark underline"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting || !passwordStrength.isValid}
              className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* SSO Options */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-eval-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-3 px-4 border border-eval-gray-300 rounded-eval shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-eval-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-3 px-4 border border-eval-gray-300 rounded-eval shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-eval-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.5 12.4c0-7.73-5.77-13.4-13.5-13.4S-3.5 4.67-3.5 12.4c0 6.23 4.23 11.29 9.5 12.77V16.4H2.5v-4H6V9.9c0-3.47 2.03-5.4 5.17-5.4 1.5 0 3.07.27 3.07.27v3.37h-1.73c-1.7 0-2.23 1.07-2.23 2.17v2.59h3.8l-.6 4h-3.2v8.77c5.27-1.48 9.5-6.54 9.5-12.77z"/>
                </svg>
                <span className="ml-2">Microsoft</span>
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-neon-green hover:text-neon-green-dark font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Trial Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Free 14-day trial • No credit card required • Cancel anytime</p>
        </div>
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-eval max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms and Conditions</h3>
              <div className="text-sm text-gray-600 space-y-3">
                <p>Welcome to EvalEdge Pro. By using our service, you agree to these terms.</p>
                <p><strong>1. Service Description:</strong> EvalEdge Pro provides AI-powered job evaluation tools for HR professionals and organizations.</p>
                <p><strong>2. User Accounts:</strong> You are responsible for maintaining the confidentiality of your account credentials.</p>
                <p><strong>3. Data Usage:</strong> We process your data in accordance with our Privacy Policy to provide evaluation services.</p>
                <p><strong>4. AI Services:</strong> Our AI suggestions are tools to assist decision-making, not replace human judgment.</p>
                <p><strong>5. Limitation of Liability:</strong> EvalEdge Pro is provided "as is" without warranties.</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-eval max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Policy</h3>
              <div className="text-sm text-gray-600 space-y-3">
                <p>Your privacy is important to us. This policy explains how we collect and use your information.</p>
                <p><strong>Data Collection:</strong> We collect organization details, position data, and usage metrics to provide our services.</p>
                <p><strong>Data Usage:</strong> Information is used for evaluations, insights, and service improvement.</p>
                <p><strong>Data Security:</strong> We use AES-256 encryption and comply with GDPR and SOC2 standards.</p>
                <p><strong>Data Retention:</strong> Data is retained while your account is active, with inactive data deleted after 90 days.</p>
                <p><strong>Your Rights:</strong> You can access, correct, or delete your data through the Admin settings.</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}