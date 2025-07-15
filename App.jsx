import { Link } from "react-router-dom";

export default function App() {
return (
  <>
    <h1>TESTING NEW APP.JSX</h1>
    <div className="bg-white text-gray-900">
      {/* rest of your sections here */}
    </div>
  </>
);
return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="text-center py-24 px-6 bg-gradient-to-b from-white to-purple-50">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Job Evaluation made easy.<br /> <span className="text-purple-700">EvalEdge Pro.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          EvalEdge Pro makes evaluating roles your competitive edge. Align compensation, streamline structures, and make smarter talent decisions — faster than ever.
        </p>
        <div className="space-x-4">
          <Link to="/signup" className="bg-purple-700 text-white px-6 py-3 rounded-full shadow hover:bg-purple-800 transition">Sign up</Link>
          <Link to="/demo" className="border border-purple-700 text-purple-700 px-6 py-3 rounded-full hover:bg-purple-50 transition">Request Demo</Link>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How EvalEdge Pro works — it’s easy as 1, 2, 3…</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <p className="font-semibold mb-2">Start</p>
            <p className="text-sm text-gray-500">Identify positions, fill organization details, upload position data.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <p className="font-semibold mb-2">Evaluate</p>
            <p className="text-sm text-gray-500">Use EvalEdge factors or AI to evaluate positions, identify salary bands.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <p className="font-semibold mb-2">Generate Results</p>
            <p className="text-sm text-gray-500">Generate reports, insights (over/under banded/paid), make decisions.</p>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-6 bg-white">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold mb-2">Lightning fast analysis</h3>
            <p className="text-sm text-gray-600">Get comprehensive job evaluations at lightning speed.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold mb-2">Bias-free evaluations</h3>
            <p className="text-sm text-gray-600">Eliminate unconscious bias with objective, data-driven evaluations.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold mb-2">Data-driven insights</h3>
            <p className="text-sm text-gray-600">Visualize banding structure, identify compensation gaps, make informed decisions.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold mb-2">Market Benchmarking</h3>
            <p className="text-sm text-gray-600">Access real-time, AI-powered salary data for compensation decisions.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-purple-50">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {["Free", "Premium", "Enterprise"].map((tier, i) => (
            <div key={tier} className="border rounded-xl p-6 bg-white hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{tier}</h3>
              <p className="text-3xl font-bold mb-4">${i * 49 + 49}<span className="text-sm">/mo</span></p>
              <button className="w-full bg-purple-700 text-white py-2 rounded-full hover:bg-purple-800 transition">Choose</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-2">Product</h4>
            <ul>
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#pricing" className="hover:underline">Pricing</a></li>
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
}
