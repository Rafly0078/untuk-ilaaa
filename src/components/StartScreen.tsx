"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

interface StartScreenProps {
  text: string;
  subtext: string;
  onStart: () => void;
  started: boolean;
}

export default function StartScreen({
  subtext,
  onStart,
  started,
}: StartScreenProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["lucu", "spesial", "manis", "berbeda", "kecil"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center max-w-md mx-auto z-10 relative">
      {/* Decorative hearts */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative mb-4"
      >
        <Heart
          className="text-maroon"
          size={56}
          fill="currentColor"
          strokeWidth={0}
          aria-hidden="true"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Heart
            className="text-maroon/30"
            size={72}
            fill="currentColor"
            strokeWidth={0}
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>

      {/* Main animated text */}
      <div className="flex flex-col gap-2">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-dark leading-snug tracking-tight"
          aria-label={`Aku bikin sesuatu yang ${titles[titleNumber]} buat kamu.`}
        >
          <span>Aku bikin sesuatu yang</span>
          <span
            className="relative flex w-full justify-center overflow-hidden text-center h-[1.2em] my-1"
            aria-hidden="true"
          >
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute font-bold text-maroon handwriting text-4xl sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: "-100%" }}
                transition={{ type: "spring", stiffness: 50 }}
                animate={
                  titleNumber === index
                    ? { y: 0, opacity: 1 }
                    : { y: titleNumber > index ? "-150%" : "150%", opacity: 0 }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
          <span>buat kamu.</span>
        </motion.h1>
      </div>

      {/* Subtext */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 2 }}
        transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        className="mt-4"
      >
        <div className="paper-note px-5 py-3 inline-block">
          <div className="washi-tape washi-tape-pink w-10 h-4 top-[-6px] left-[15px] opacity-70 tilt-right" />
          <p className="handwriting text-xl sm:text-2xl text-text-dark">
            {subtext}
          </p>
        </div>
      </motion.div>

      {/* Start button */}
      {!started && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <LiquidButton
            onClick={onStart}
            id="start-button"
            className="mt-4 px-8 py-4 border-2 border-maroon text-maroon hover:bg-maroon/10 bg-transparent rounded-full shadow-none"
            variant="default"
          >
            Mulai
          </LiquidButton>
        </motion.div>
      )}

      {/* Scroll hint after start */}
      {started && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex flex-col items-center gap-2 text-text-light"
        >
          <p className="text-sm">Scroll ke bawah ↓</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-text-light/40 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-3 bg-text-light/60 rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
