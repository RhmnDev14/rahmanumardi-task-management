"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function ErrorPopup({
  message,
  onClose,
  duration = 4000,
}: ErrorPopupProps) {
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
        <div className="bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-md border border-white/30 shadow-lg flex items-center gap-3">
          <span className="text-sm">{message}</span>
          <button
            onClick={onClose}
            className="text-white hover:text-red-300 font-bold text-lg"
          >
            ✖
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
