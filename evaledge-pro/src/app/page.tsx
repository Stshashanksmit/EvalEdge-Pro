import Link from 'next/link';
import { ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Zap, Shield, BarChart3, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-eval border-b border-eval-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-eval"></div>
                <span className="text-xl font-bold text-gray-900">EvalEdge Pro</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-gray-600 hover:text-neon-green transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-neon-green transition-colors">Pricing</a>
                <a href="#faq" className="text-gray-600 hover:text-neon-green transition-colors">FAQs</a>
              </div>
            </div>
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

      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-gradient-to-b from-eval-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-heading-lg text-gray-900 mb-6 max-w-4xl mx-auto">
              Job Evaluation made easy. EvalEdge Pro.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              EvalEdge Pro makes evaluating roles your competitive edge. Align compensation, 
              streamline structures, and make smarter talent decisions — faster than ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-primary text-lg px-8 py-4">
                Sign up
              </Link>
              <Link href="/request-demo" className="btn-secondary text-lg px-8 py-4">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-md text-gray-900 mb-4">
              How EvalEdge Pro works; it's easy as 1, 2, 3…
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="card-feature text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-heading-sm text-gray-900 mb-4">Start</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li>• Identify positions to be evaluated</li>
                  <li>• Fill Organisation details</li>
                  <li>• Upload Position details</li>
                </ul>
              </div>
              <div className="hidden md:block absolute top-24 -right-4 text-neon-green">
                <ChevronRightIcon className="w-8 h-8" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="card-feature text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-heading-sm text-gray-900 mb-4">Evaluate</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li>• Evaluate positions against EvalEdge factors or</li>
                  <li>• Use AI to evaluate positions</li>
                  <li>• Identify Salary Bands</li>
                </ul>
              </div>
              <div className="hidden md:block absolute top-24 -right-4 text-neon-green">
                <ChevronRightIcon className="w-8 h-8" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="card-feature text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-heading-sm text-gray-900 mb-4">Generate results</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• Generate results, reports & insights</li>
                <li>• Over/under banded positions</li>
                <li>• Make smarter Talent decisions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-eval-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-md text-gray-900 mb-4">
              Powerful features for modern HR teams
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-feature">
              <Zap className="w-12 h-12 text-neon-green mb-6" />
              <h3 className="text-heading-sm text-gray-900 mb-3">Lightning fast analysis</h3>
              <p className="text-gray-600">Get comprehensive job evaluations at lightning fast speed</p>
            </div>
            <div className="card-feature">
              <Shield className="w-12 h-12 text-neon-green mb-6" />
              <h3 className="text-heading-sm text-gray-900 mb-3">Bias-free evaluations</h3>
              <p className="text-gray-600">Eliminate unconscious bias with objective, data-driven position evaluations</p>
            </div>
            <div className="card-feature">
              <BarChart3 className="w-12 h-12 text-neon-green mb-6" />
              <h3 className="text-heading-sm text-gray-900 mb-3">Data driven insights</h3>
              <p className="text-gray-600">Visualize your organization's banding structure, identify compensation gaps, and make informed talent decisions</p>
            </div>
            <div className="card-feature">
              <TrendingUp className="w-12 h-12 text-neon-green mb-6" />
              <h3 className="text-heading-sm text-gray-900 mb-3">Market Benchmarking</h3>
              <p className="text-gray-600">Access real time, AI powered Salary data for informed compensation related decision making</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-md text-gray-900 mb-4">
              Choose your plan
            </h2>
            <p className="text-xl text-gray-600">Start with a 14-day free trial, no credit card required</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pro Lite */}
            <div className="card-feature">
              <h3 className="text-heading-sm text-gray-900 mb-2">Pro Lite</h3>
              <p className="text-gray-600 mb-6">A fast way to get started with Job Evaluations</p>
              <button className="btn-primary w-full mb-6">Buy Plan</button>
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-3">What's included:</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckIcon className="w-4 h-4 text-neon-green mr-2" />Up-to 100 Job Evaluations per month</li>
                  <li className="flex items-center"><CheckIcon className="w-4 h-4 text-neon-green mr-2" />Access to unlimited users in the team</li>
                  <li className="flex items-center"><CheckIcon className="w-4 h-4 text-neon-green mr-2" />1 consultant call for set-up and tool usage</li>
                  <li className="flex items-center"><CheckIcon className="w-4 h-4 text-neon-green mr-2" />Unlimited tool support</li>
                </ul>
              </div>
            </div>

            {/* Pro + */}
            <div className="card-feature border-2 border-neon-green relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-neon-green text-gray-900 text-sm font-semibold px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-heading-sm text-gray-900 mb-2">Pro +</h3>
              <p className="text-gray-600 mb-6">Unlimited Job Evaluations using AI</p>
              <button className="btn-primary w-full mb-6">Buy Plan</button>
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-3">Everything in Pro Lite and:</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckIcon className="w-4 h-4 text-neon-green mr-2" />Unlimited Job Evaluations per month</li>
                  <li className="flex items-center"><CheckIcon className="w-4 h-4 text-neon-green mr-2" />Access to captive AI for auto-completions</li>
                  <li className="flex items-center"><CheckIcon className="w-4 h-4 text-neon-green mr-2" />4 consultant calls per month</li>
                </ul>
              </div>
            </div>

            {/* Pro Super */}
            <div className="card-feature">
              <h3 className="text-heading-sm text-gray-900 mb-2">Pro Super</h3>
              <p className="text-gray-600 mb-6">Maximum flexibility with access to dynamic market insights</p>
              <button className="btn-primary w-full mb-6">Buy Plan</button>
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-3">Everything in Pro + and:</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckIcon className="w-4 h-4 text-neon-green mr-2" />Dynamic position-specific market salary intelligence</li>
                  <li className="flex items-center"><CheckIcon className="w-4 h-4 text-neon-green mr-2" />On-demand consultant calls per month</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-neon-green hover:text-neon-green-dark font-semibold">
              View detailed pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section id="faq" className="py-20 bg-eval-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-md text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is EvalEdge Pro?</h3>
              <p className="text-gray-600">EvalEdge Pro is an AI-powered SaaS tool designed to simplify job evaluations for HR leaders and organizations. It uses data-driven frameworks and AI to objectively assess positions, align compensation, identify salary bands, and provide insights for talent decisions.</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Who is EvalEdge Pro for?</h3>
              <p className="text-gray-600">It's ideal for HR professionals, small to mid-sized organizations (50-5,000 headcount), and consultants in industries like Tech, Professional Services, Manufacturing, and more.</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I try EvalEdge Pro before purchasing?</h3>
              <p className="text-gray-600">Yes, all plans include a 14-day free trial with Pro Lite features. Sign up directly on the landing page—no credit card required.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing#faq" className="text-neon-green hover:text-neon-green-dark font-semibold">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-green-dark rounded-eval"></div>
                <span className="text-xl font-bold">EvalEdge Pro</span>
              </div>
              <p className="text-gray-400">Making job evaluation your competitive edge.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-neon-green">Features</a></li>
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
            <p className="mt-2 text-sm">Committed to WCAG 2.1 AA accessibility standards</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
