// "use client";

import { useState } from "react";
import API from "@/lib/api";
import LoadingScreen from "@/components/loading";
import ErrorPopup from "@/components/alert/error";
import SuccessPopup from "@/components/alert/success";

interface LoginFormProps {
  onForgotPassword: () => void;
  onLoginSuccess: () => void;
}

export default function LoginForm({
  onForgotPassword,
  onLoginSuccess,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await API.post("/login", { email, password });

      // ✅ Tangani response JSON: res.data.Data.token
      const token = res.data?.Data?.token;
      const refreshToken = res.data?.Data?.refresh_token;
      const userId = res.data?.Data?.user_id;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken || "");
        localStorage.setItem("userId", userId?.toString() || "");

        setSuccessMessage("Login berhasil!");

        console.log("✅ LoginForm: token saved", token);

        setTimeout(() => {
          console.log("✅ LoginForm: calling onLoginSuccess()");
          onLoginSuccess();
        }, 1000);
      } else {
        throw new Error("Token tidak ditemukan di respons");
      }
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Login gagal. Terjadi kesalahan.";
      setErrorMessage(errMsg);
      console.error("❌ LoginForm error:", errMsg);
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

      {successMessage && (
        <SuccessPopup
          key={successMessage}
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
          duration={1000}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/10 px-6 py-8 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg border border-white/20"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 drop-shadow-md tracking-wide">
          Login
        </h2>

        <p className="text-white text-sm italic mb-4 text-center">
          Stay organized, stay productive. Let’s get back to work!
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
          disabled={loading}
          className={`w-full bg-blue-500 text-white font-semibold py-2 rounded-md transition transform active:scale-[0.97] ${
            loading
              ? "opacity-80 cursor-wait"
              : "hover:bg-blue-600 hover:shadow-lg"
          }`}
        >
          Login
        </button>
      </form>
    </>
  );
}
