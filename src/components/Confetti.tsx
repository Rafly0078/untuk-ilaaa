"use client";

import { motion } from "framer-motion";

const COLORS = [
  "#800020", // maroon
  "#c9707d", // rose
  "#fadadd", // blush
  "#f5e6cc", // champagne
  "#d4a574", // gold
  "#e8a8b0", // rose-light
  "#ff6b6b", // coral
  "#fff8f0", // cream
];

interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  duration: string;
  delay: string;
  spin: string;
  width: string;
  height: string;
  shape: string;
}

const seeded = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const pieces: ConfettiPiece[] = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${seeded(i + 1) * 100}%`,
  color: COLORS[Math.floor(seeded(i + 11) * COLORS.length)],
  duration: `${2 + seeded(i + 21) * 2}s`,
  delay: `${seeded(i + 31) * 0.8}s`,
  spin: `${360 + seeded(i + 41) * 720}deg`,
  width: `${6 + seeded(i + 51) * 8}px`,
  height: `${6 + seeded(i + 61) * 8}px`,
  shape: seeded(i + 71) > 0.5 ? "50%" : "2px",
}));

export default function Confetti() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            backgroundColor: p.color,
            width: p.width,
            height: p.height,
            borderRadius: p.shape,
            ["--confetti-duration" as string]: p.duration,
            ["--confetti-delay" as string]: p.delay,
            ["--confetti-spin" as string]: p.spin,
          }}
        />
      ))}
    </motion.div>
  );
}
