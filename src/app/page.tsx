"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Navbar from "@/components/navbar/navbar";
import UserTable from "@/components/table/table";

export default function HomePage() {
  const [formType, setFormType] = useState<"login" | "register" | "forgot">(
    "login"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cek token saat pertama kali render
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔍 useEffect: Cek token dari localStorage:", token);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Logging perubahan login state
  useEffect(() => {
    console.log("📢 State isLoggedIn berubah:", isLoggedIn);
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    console.log("✅ page.tsx: handleLoginSuccess dipanggil");

    // Tambahkan sedikit delay untuk memastikan token tersimpan sebelum render ulang
    setTimeout(() => {
      const token = localStorage.getItem("token");
      console.log("🔁 page.tsx: Rechecking token after delay:", token);
      if (token) {
        setIsLoggedIn(true);
      }
    }, 100);
  };

  return (
    <div className="relative w-screen min-h-screen">
      {/* Background */}
      <Image
        src="/images/background.jpg"
        alt="Background"
        fill
        className="object-cover -z-10"
        priority
      />

      {isLoggedIn ? (
        <>
          <Navbar />
          <div className="pt-24 px-4">
            <UserTable />
          </div>
        </>
      ) : (
        <div className="absolute inset-0 z-20 overflow-y-auto">
          <div className="min-h-full flex flex-col items-center justify-center p-4 gap-6">
            {formType === "login" && (
              <>
                <LoginForm
                  onForgotPassword={() => setFormType("forgot")}
                  onLoginSuccess={handleLoginSuccess}
                />
                <p className="text-sm text-white mt-2 text-center">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => setFormType("register")}
                    className="text-blue-400 hover:underline"
                  >
                    Register here!
                  </button>
                </p>
              </>
            )}

            {formType === "register" && (
              <>
                <RegisterForm onRegisterSuccess={() => setFormType("login")} />
                <p className="text-sm text-white mt-2 text-center">
                  Already have an account?{" "}
                  <button
                    onClick={() => setFormType("login")}
                    className="text-blue-400 hover:underline"
                  >
                    Login here!
                  </button>
                </p>
              </>
            )}

            {formType === "forgot" && (
              <ForgotPasswordForm onBackToLogin={() => setFormType("login")} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
