import React, { useState } from "react";

const LoginForm = ({ onLogin, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-gray-700 bg-[#11171d] p-8 shadow-shadowOne"
      >
        <h2 className="text-3xl font-bold text-white mb-4">Admin Login</h2>
        <p className="text-sm text-gray-400 mb-6">
          Enter your admin credentials to access the dashboard.
        </p>
        <label className="block text-sm text-gray-400 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-4 py-3 text-white outline-none focus:border-designColor"
          placeholder="admin@rakhalchandra.online"
          required
        />
        <label className="block text-sm text-gray-400 mt-4 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-4 py-3 text-white outline-none focus:border-designColor"
          placeholder="Enter your password"
          required
        />
        {error ? (
          <p className="text-sm text-red-400 mt-3">{error}</p>
        ) : null}
        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-designColor px-4 py-3 text-white font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
