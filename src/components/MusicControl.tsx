"use client";

import { useCallback, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface MusicControlProps {
  audioRef: RefObject<HTMLAudioElement | null>;
}

export default function MusicControl({ audioRef }: MusicControlProps) {
  const [playing, setPlaying] = useState(true);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying((p) => !p);
  }, [playing, audioRef]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full
                  bg-maroon/80 backdrop-blur-sm text-white
                  flex items-center justify-center
                  shadow-lg shadow-maroon/20
                  transition-colors duration-200
                  hover:bg-maroon cursor-pointer
                  ${playing ? "music-pulse" : ""}`}
      aria-label={playing ? "Pause musik" : "Play musik"}
      id="music-control"
    >
      {playing ? (
        <Volume2 size={20} aria-hidden="true" />
      ) : (
        <VolumeX size={20} aria-hidden="true" />
      )}
    </motion.button>
  );
}
