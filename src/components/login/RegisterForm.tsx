"use client";

import { useState } from "react";
import API from "@/lib/api";

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

export default function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [job, setJob] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/signin", {
        fullname,
        email,
        phone_number: phone,
        gender,
        password,
        profession: job,
      });

      setMessage(res.data.message || "Register success!");
      onRegisterSuccess(); // switch to login
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Register failed. Please try again.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/10 px-6 py-8 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg border border-white/20"
    >
      <h2 className="text-4xl sm:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 drop-shadow-md tracking-wide">
        Register
      </h2>

      <p className="text-white text-sm italic mb-4 text-center">
        Get started on your journey to better task management!
      </p>

      {message && (
        <p className="text-white text-sm mb-4 text-center">{message}</p>
      )}

      <div className="mb-3">
        <label className="block text-white mb-1">Full Name</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your full name"
        />
      </div>

      <div className="mb-3">
        <label className="block text-white mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-3">
        <label className="block text-white mb-1">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your phone number"
        />
      </div>

      <div className="mb-3">
        <label className="block text-white mb-1">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-white/20 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Select gender
          </option>
          <option value="male" className="text-black">
            Male
          </option>
          <option value="female" className="text-black">
            Female
          </option>
          <option value="other" className="text-black">
            Other
          </option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-white mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
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

      <div className="mb-5">
        <label className="block text-white mb-1">Profession</label>
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your job"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition text-sm sm:text-base"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
