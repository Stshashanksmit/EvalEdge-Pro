import React, { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!accept) {
      setMessage("Please accept Terms and Privacy Policy.");
      return;
    }

    // Placeholder: Here you'd check invite or reCAPTCHA
    try {
      const res = await axios.post("http://localhost:5000/api/register", { email, password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9fb] px-6">
      <h1 className="text-4xl font-bold text-[#4B2E83] mb-6">Sign up for EvalEdge Pro</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-3 rounded"
          required
        />
        <input
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded"
          required
        />
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={accept}
            onChange={(e) => setAccept(e.target.checked)}
          />
          <span>
            I accept the{" "}
            <a href="#" className="underline">Terms</a> and{" "}
            <a href="#" className="underline">Privacy Policy</a>
          </span>
        </label>

        {/* Placeholder for reCAPTCHA */}
        <div className="text-gray-500 text-xs mb-2">[reCAPTCHA placeholder]</div>

        <button
          type="submit"
          className="bg-[#4B2E83] text-white px-6 py-3 rounded-full hover:bg-purple-900 transition"
        >
          Sign Up
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}
