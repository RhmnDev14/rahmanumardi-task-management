"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function SuccessPopup({
  message,
  onClose,
  duration = 3000,
}: SuccessPopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999]"
      >
        <div className="bg-green-600/80 text-white px-5 py-3 rounded-md shadow-md flex items-center gap-3 backdrop-blur-sm">
          <span className="text-sm">{message}</span>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 font-bold text-lg"
          >
            ✖
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
