import React from "react";
import Lottie from "lottie-react";
import animateLoading from "@/assets/loading/loading.json"; // path bisa disesuaikan

const LottieAnimation = () => {
  return (
    <div style={{ width: 150, height: 150 }}>
      <Lottie animationData={animateLoading} loop={true} />
    </div>
  );
};

export default LottieAnimation;
