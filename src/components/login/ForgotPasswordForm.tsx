"use client";

import { useState } from "react";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({
  onBackToLogin,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Send reset link to:", email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/10 px-6 py-8 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg border border-white/20"
    >
      <h2 className="text-4xl sm:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 drop-shadow-md tracking-wide">
        Forgot Password
      </h2>

      <p className="text-white text-sm italic mb-4 text-center">
        Enter your email to receive a generated password!
      </p>

      <div className="mb-6">
        <label className="block text-white mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 text-sm sm:text-base rounded-md bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition"
      >
        Send Generate Password
      </button>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-sm text-blue-400 hover:underline"
        >
          Back to login
        </button>
      </div>
    </form>
  );
}
