"use client";
import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() => import("./lottie"), { ssr: false });

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className="w-full h-full fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="w-[150px] h-[150px] pointer-events-none">
        <LottieAnimation />
      </div>
    </div>
  );
};

export default LoadingScreen;
