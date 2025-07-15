function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9fb] px-6">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Sign up for EvalEdge Pro</h1>
      <input
        type="text"
        placeholder="Full Name"
        className="border p-3 rounded-lg w-full max-w-sm mb-4 focus:ring-2 focus:ring-purple-500 transition"
      />
      <input
        type="email"
        placeholder="Work e-mail"
        className="border p-3 rounded-lg w-full max-w-sm mb-4 focus:ring-2 focus:ring-purple-500 transition"
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-3 rounded-lg w-full max-w-sm mb-6 focus:ring-2 focus:ring-purple-500 transition"
      />
      <button className="gradient-button w-full max-w-sm">Sign Up</button>
    </div>
  );
}

export default SignupPage;
