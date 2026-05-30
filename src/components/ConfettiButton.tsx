"use client";

import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

interface ConfettiButtonProps {
  onReact: () => void;
}

export default function ConfettiButton({ onReact }: ConfettiButtonProps) {
  return (
    <div className="flex justify-center w-full">
      <motion.button
        onClick={onReact}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-maroon text-white shadow-xl shadow-maroon/20 transition-colors hover:bg-maroon-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon/25"
        aria-label="Tampilkan konfeti"
      >
        <PartyPopper size={30} aria-hidden="true" />
      </motion.button>
    </div>
  );
}
