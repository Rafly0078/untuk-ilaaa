"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

interface PasswordLockProps {
  correctPassword: string;
  onUnlock: () => void;
}

export default function PasswordLock({ correctPassword, onUnlock }: PasswordLockProps) {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsUnlocked(true);
      setTimeout(onUnlock, 500); // Call onUnlock after animation
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-6 w-full"
          >
            <motion.div
              animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="bg-white/40 p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-white/50 flex flex-col items-center gap-4 w-full relative"
            >
              {/* Tape */}
              <div className="washi-tape washi-tape-gold w-20 h-5 absolute -top-2 left-1/2 -translate-x-1/2 opacity-80" />
              
              <Lock className="text-maroon mb-2" size={48} />
              
              {isError && (
                <p className="text-maroon font-bold absolute -top-6 text-sm bg-white/80 px-3 py-1 rounded-full shadow-sm">
                  Ih masa lupa?! Coba lagi! 😜
                </p>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <input
                  type="text"
                  maxLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="000000"
                  className="w-full text-center text-3xl tracking-widest font-bold bg-white/60 rounded-xl py-3 text-text-dark border-2 border-transparent focus:border-maroon/30 focus:outline-none focus:bg-white/80 transition-all placeholder:text-text-light/30"
                />
                
                <LiquidButton
                  type="submit"
                  disabled={password.length < 6}
                  className="w-full bg-maroon text-white font-semibold py-3"
                >
                  Buka Gembok
                </LiquidButton>
              </form>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <Unlock className="text-maroon drop-shadow-md" size={64} />
            <p className="font-bold text-xl text-maroon">Yeay kebuka! 🎉</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
