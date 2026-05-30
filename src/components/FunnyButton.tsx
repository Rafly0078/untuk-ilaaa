"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import { PERSON_NAME } from "@/data/story";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

interface FunnyButtonProps {
  onSuccess: () => void;
  onPopupClose?: () => void;
}

export default function FunnyButton({ onSuccess, onPopupClose }: FunnyButtonProps) {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [caught, setCaught] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const maxDodges = 13;

  const dodge = useCallback(() => {
    if (caught) {
      setShowPopup(true);
      return;
    }

    if (dodgeCount < maxDodges) {
      // Pick a new random direction that's clearly different from current
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 60;
      const newX = Math.round(Math.cos(angle) * distance);
      const newY = Math.round(Math.sin(angle) * distance);

      // Clamp
      const clampedX = Math.max(-160, Math.min(160, newX));
      const clampedY = Math.max(-100, Math.min(100, newY));

      setPosition({ x: clampedX, y: clampedY });
      setDodgeCount((prev) => prev + 1);
    } else {
      // Caught!
      setPosition({ x: 0, y: 0 });
      setCaught(true);
      setShowPopup(true);
      onSuccess();
    }
  }, [dodgeCount, caught, onSuccess]);

  const handleClosePopup = () => {
    setShowPopup(false);
    if (onPopupClose) onPopupClose();
  };

  const dodgeMessages = [
    "",
    "Eh, meleset 😜",
    "Hampir kena! 😏",
    "Satu lagi...!",
    "Coba lagi! 😜",
    "Kamu nggak bisa lari! 😏",
    "Ini udah kena! 😜",
    "Aduh, kena deh! 😅",
    "Gak bisa lari lagi! 😜",
    "Kamu kena! 😏",
    "Ini udah kena! 😜",
    "Aduh, kena deh! 😅",
    "Gak bisa lari lagi! 😜",
    "Kamu kena! 😏",
  ];

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ minHeight: "200px", minWidth: "300px" }}
    >
      {/* Button that dodges via CSS transform */}
      <div
        className="z-10"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <LiquidButton
          onClick={dodge}
          variant="default"
          className="px-7 py-3.5 font-medium text-white shadow-lg shadow-maroon/20 bg-maroon"
          id="funny-button"
        >
          {caught ? "Buka Pesan 💌" : "Pencet aku!"}
        </LiquidButton>
      </div>

      {/* Feedback text — stays in place */}
      {dodgeCount > 0 && dodgeCount <= maxDodges && !caught && (
        <p
          key={dodgeCount}
          className="absolute bottom-2 text-sm text-text-light whitespace-nowrap"
        >
          {dodgeMessages[dodgeCount] || "Satu lagi...!"}
        </p>
      )}

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 2 }}
              className="bg-[#fef0f1] border-2 border-white/60 rounded-sm p-6 max-w-sm w-full shadow-2xl relative flex flex-col items-center text-center gap-4"
            >
              <div className="washi-tape washi-tape-pink w-16 h-5 absolute -top-3 left-1/2 -translate-x-1/2 opacity-80 tilt-right" />
              
              <button
                onClick={handleClosePopup}
                className="absolute top-3 right-3 text-maroon hover:bg-maroon/10 rounded-full p-1 transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              <Heart size={48} className="text-maroon fill-maroon animate-pulse mt-2" />
              
              <h2 className="text-2xl font-bold text-maroon handwriting">Ketangkep! 💖</h2>
              <p className="text-lg font-medium text-text-dark leading-snug handwriting mt-2">
                Nggak bisa lari lagi kan? 😜
              </p>
              <p className="text-md text-text-medium leading-relaxed font-serif">
                Aku cuma mau bilang aku suka sama Ilaaa dan aku sayanggg bangettt sama Ilaaaa! tolong kalau butuh sesuatu bilang aja yaa, aku bakal usahain semampu aku buat bikin Ilaaa senenggg! ❤️
              </p>
              
              <LiquidButton
                onClick={handleClosePopup}
                className="mt-4 bg-maroon text-white w-full"
              >
                Makasihhhh ❤️
              </LiquidButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
