import { useState } from "react";

export default function DemoPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companySize: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // Placeholder logic — normally you'd call backend and store
    setTimeout(() => {
      setSubmitted(true);
      setSending(false);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-50">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
          <p>We’ll be in touch within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-stretch">
      {/* Left side */}
      <div className="md:w-1/2 bg-gradient-to-br from-purple-100 to-white p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Get a demo from our team</h1>
        <p className="text-gray-700 mb-4">
          Need more information before choosing EvalEdge Pro? Submit the form and we'll be in touch to:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
          <li>Learn about EvalEdge Pro</li>
          <li>Explore premium features</li>
          <li>Discover your ideal plan</li>
        </ul>
      </div>

      {/* Right side */}
      <div className="md:w-1/2 bg-white p-12 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Work email"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Company name"
            required
            className="w-full border border-gray-300 rounded-lg p-3"
          />
          <select
            name="companySize"
            value={form.companySize}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3"
          >
            <option value="" disabled>Company size</option>
            <option>1-50</option>
            <option>51-249</option>
            <option>250-999</option>
            <option>1,000-4,999</option>
            <option>5,000+</option>
          </select>
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 disabled:opacity-50"
          >
            {sending ? "Sending…" : "Submit"}
          </button>
          <p className="text-xs text-gray-500">
            We will process your data as stated in our Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}
