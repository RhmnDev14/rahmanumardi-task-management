"use client";

import { useState } from "react";
import API from "@/lib/api";

interface LoginFormProps {
  onForgotPassword: () => void;
}

export default function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/login", { email, password });
      setMessage(res.data.message || "Login berhasil!");
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        const errMsg = axiosErr.response?.data?.message || "Login gagal.";
        setMessage(errMsg);
      } else {
        setMessage("Login gagal.");
      }
    } finally {
      setLoading(false); // ⬅️ ini penting
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/10 px-6 py-8 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg border border-white/20"
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-md tracking-wide">
        Task Management
      </h2>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center text-white tracking-wide">
        Login
      </h2>
      <p className="text-white text-sm italic mb-4 text-center">
        Stay organized, stay productive — let’s get back to work!
      </p>

      {message && (
        <p className="text-sm text-center text-white mb-4">{message}</p>
      )}

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
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
