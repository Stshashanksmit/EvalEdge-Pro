import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, BarChart3, TrendingUp, CheckCircle, Users, Building, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white text-evaledge-text">
      {/* Hero Section */}
      <section className="gradient-bg min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Job Evaluation <br />
            <span className="gradient-text">made easy.</span><br />
            <span className="text-evaledge-base">EvalEdge Pro.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
            EvalEdge Pro makes evaluating roles your competitive edge. Align compensation, 
            streamline structures, and make smarter talent decisions — faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary text-lg px-8 py-4">
              Sign up
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/demo" className="btn-secondary text-lg px-8 py-4">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            How EvalEdge Pro works —
          </h2>
          <p className="text-2xl text-center mb-16 gradient-text font-semibold">
            it's easy as 1, 2, 3…
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-evaledge-base to-evaledge-mid rounded-3xl flex items-center justify-center text-3xl font-bold text-white mx-auto shadow-glow">
                  1
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-evaledge-light/20 to-evaledge-mid/20 rounded-full blur-xl"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-evaledge-base">Start</h3>
              <div className="bg-gray-50 rounded-2xl p-6 text-left">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-evaledge-base mt-0.5 flex-shrink-0" />
                    <span>Identify positions to be evaluated</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-evaledge-base mt-0.5 flex-shrink-0" />
                    <span>Fill Organization details</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-evaledge-base mt-0.5 flex-shrink-0" />
                    <span>Upload Position details</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-evaledge-base to-evaledge-mid rounded-3xl flex items-center justify-center text-3xl font-bold text-white mx-auto shadow-glow">
                  2
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-evaledge-light/20 to-evaledge-mid/20 rounded-full blur-xl"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-evaledge-base">Evaluate</h3>
              <div className="bg-gray-50 rounded-2xl p-6 text-left">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-evaledge-base mt-0.5 flex-shrink-0" />
                    <span>Evaluate positions against EvalEdge factors or</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-evaledge-base mt-0.5 flex-shrink-0" />
                    <span>Use AI to evaluate positions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-evaledge-base mt-0.5 flex-shrink-0" />
                    <span>Identify Salary Bands</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-evaledge-base to-evaledge-mid rounded-3xl flex items-center justify-center text-3xl font-bold text-white mx-auto shadow-glow">
                  3
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-evaledge-light/20 to-evaledge-mid/20 rounded-full blur-xl"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-evaledge-base">Generate Results</h3>
              <div className="bg-gray-50 rounded-2xl p-6 text-left">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-evaledge-base mt-0.5 flex-shrink-0" />
                    <span>Generate results, reports & insights</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-evaledge-base mt-0.5 flex-shrink-0" />
                    <span>Identify over/under banded positions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-evaledge-base mt-0.5 flex-shrink-0" />
                    <span>Make smarter talent decisions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 px-6 gradient-bg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why choose <span className="gradient-text">EvalEdge Pro</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Lightning Fast Analysis */}
            <div className="card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-evaledge-base to-evaledge-mid rounded-xl flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Lightning fast analysis</h3>
              </div>
              <p className="text-gray-600 text-lg">
                Get comprehensive job evaluations at lightning fast speed with our advanced algorithms and streamlined workflows.
              </p>
            </div>

            {/* Bias-free Evaluations */}
            <div className="card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-evaledge-base to-evaledge-mid rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Bias-free evaluations</h3>
              </div>
              <p className="text-gray-600 text-lg">
                Eliminate unconscious bias with objective, data-driven position evaluations using our standardized 9-factor framework.
              </p>
            </div>

            {/* Data Driven Insights */}
            <div className="card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-evaledge-base to-evaledge-mid rounded-xl flex items-center justify-center mr-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Data driven insights</h3>
              </div>
              <p className="text-gray-600 text-lg">
                Visualize your organization's banding structure, identify compensation gaps, and make informed talent decisions.
              </p>
            </div>

            {/* Market Benchmarking */}
            <div className="card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-evaledge-base to-evaledge-mid rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Market Benchmarking</h3>
              </div>
              <p className="text-gray-600 text-lg">
                Access real time, AI powered salary data for informed compensation related decision making from leading market sources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Choose your <span className="gradient-text">plan</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="card text-center">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="text-4xl font-bold text-evaledge-base mb-2">$XX</div>
              <p className="text-gray-600 mb-6">per month</p>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-evaledge-base flex-shrink-0" />
                  <span>Up to X positions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-evaledge-base flex-shrink-0" />
                  <span>Basic reporting</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-evaledge-base flex-shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
              <button className="btn-secondary w-full">Get Started</button>
            </div>

            {/* Growth Plan */}
            <div className="card text-center border-2 border-evaledge-base relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-evaledge-base text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Growth</h3>
              <div className="text-4xl font-bold text-evaledge-base mb-2">$XX</div>
              <p className="text-gray-600 mb-6">per month</p>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-evaledge-base flex-shrink-0" />
                  <span>Up to X positions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-evaledge-base flex-shrink-0" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-evaledge-base flex-shrink-0" />
                  <span>AI auto-evaluation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-evaledge-base flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="btn-primary w-full">Get Started</button>
            </div>

            {/* Enterprise Plan */}
            <div className="card text-center">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-evaledge-base mb-2">$XX</div>
              <p className="text-gray-600 mb-6">per month</p>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-evaledge-base flex-shrink-0" />
                  <span>Unlimited positions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-evaledge-base flex-shrink-0" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-evaledge-base flex-shrink-0" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-evaledge-base flex-shrink-0" />
                  <span>SOC 2 compliance</span>
                </li>
              </ul>
              <button className="btn-secondary w-full">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">
            Trusted by HR leaders at organizations of all sizes
          </h3>
          <div className="flex items-center justify-center space-x-12 opacity-60">
            <Users className="w-12 h-12" />
            <Building className="w-12 h-12" />
            <Globe className="w-12 h-12" />
            <BarChart3 className="w-12 h-12" />
            <TrendingUp className="w-12 h-12" />
          </div>
        </div>
      </section>
    </div>
  );
}