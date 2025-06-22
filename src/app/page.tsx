"use client";

import { useState } from "react";
import Image from "next/image";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import ForgotPasswordForm from "@/components/login/ForgotPasswordForm";

export default function HomePage() {
  const [formType, setFormType] = useState<"login" | "register" | "forgot">(
    "login"
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/amr-taha-YMPX-EXdGpE-unsplash.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Konten Form */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 gap-6">
        {formType === "login" && (
          <>
            <LoginForm onForgotPassword={() => setFormType("forgot")} />
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
  );
}
