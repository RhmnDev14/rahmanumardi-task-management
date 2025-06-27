"use client";

import { useState } from "react";
import API from "@/lib/api";
import LoadingScreen from "@/components/loading";
import ErrorPopup from "@/components/alert/error";

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

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetForm = () => {
    setFullname("");
    setEmail("");
    setPhone("");
    setGender("");
    setPassword("");
    setJob("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await API.post("/register", {
        fullname,
        email,
        phone_number: phone,
        gender,
        password,
        profession: job,
      });

      resetForm();
      onRegisterSuccess();
    } catch (error: unknown) {
      const msg =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as any).response?.data?.message
          ? (error as any).response.data.message
          : "Register failed. Please try again.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingScreen isLoading={loading} />
      {errorMessage && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="px-6 py-6 sm:px-6 sm:py-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg border border-white/20 max-h-[calc(100vh-100px)] flex flex-col backdrop-blur-md bg-white/10"
      >
        <div className="sticky top-0 z-10 pb-2">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 drop-shadow-md tracking-wide">
            Register
          </h2>
          <p className="text-white text-sm italic text-center">
            Get started on your journey to better task management!
          </p>
        </div>

        <div className="overflow-y-auto flex-1 mt-4 space-y-3 pr-2 scrollbar-custom scroll-smooth">
          <Input label="Fullname" value={fullname} onChange={setFullname} />
          <Input label="Email" type="email" value={email} onChange={setEmail} />
          <Input
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={setPhone}
          />

          <div>
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

          <div>
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

          <Input label="Profession" value={job} onChange={setJob} />
        </div>

        <div className="sticky bottom-0 pt-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition text-sm sm:text-base active:scale-95 ${
              loading ? "pointer-events-none opacity-80" : ""
            }`}
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
}

// Reusable Input Component
function Input({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block text-white mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  );
}
