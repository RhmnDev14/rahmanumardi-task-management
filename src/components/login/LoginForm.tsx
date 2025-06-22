"use client";

import { useState } from "react";

interface LoginFormProps {
  onForgotPassword: () => void;
}

export default function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/10 px-6 py-8 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg border border-white/20"
    >
      <h2 className="text-4xl sm:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-md tracking-wide">
        Login
      </h2>

      <p className="text-white text-sm italic mb-4 text-center">
        Stay organized, stay productive. Let&apos;s get back to work!
      </p>

      <div className="mb-4">
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

      <div className="mb-2">
        <label className="block text-white mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 text-sm sm:text-base rounded-md bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center text-white text-sm hover:text-blue-300"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      <div className="mb-4 text-right">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-blue-400 hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition text-sm sm:text-base"
      >
        Login
      </button>
    </form>
  );
}
