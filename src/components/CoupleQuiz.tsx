"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Heart, AlertCircle, X } from "lucide-react";

const questions = [
  {
    id: 1,
    text: "1. Siapa yang tidurnya paling lama?",
    options: ["Rafly", "Ila"],
    correctAnswer: "Rafly",
  },
  {
    id: 2,
    text: "2. Sekarang siapa yang tidurnya paling telat?",
    options: ["Rafly", "Ila"],
    correctAnswer: "Ila",
  },
  {
    id: 3,
    text: "3. Dimana pertama kali kita ketemu?",
    options: ["Roblox", "Mobile Legends", "PUBG", "Free Fire"],
    correctAnswer: "Roblox",
  },
  {
    id: 4,
    text: "4. Warna favorit aku apaa?",
    options: ["Merah", "Maroon", "Hijau", "Biru"],
    correctAnswer: "Hijau",
  },
  {
    id: 5,
    text: "5. Siapa yang paling sayang diantara kita?",
    options: ["Rafly", "Ila"],
  },
];

interface CoupleQuizProps {
  onFinish?: () => void;
}

export default function CoupleQuiz({ onFinish }: CoupleQuizProps = {}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [finalAttempts, setFinalAttempts] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [showWrongMsg, setShowWrongMsg] = useState(false);

  const handleAnswer = (option: string) => {
    const q = questions[currentQ];

    if (currentQ < 4) {
      if (option === q.correctAnswer) {
        setShowWrongMsg(false);
        setCurrentQ(currentQ + 1);
      } else {
        triggerWrong();
      }
    } else {
      // Final question logic (Question 5)
      const newAttempts = finalAttempts + 1;
      setFinalAttempts(newAttempts);
      
      if (newAttempts >= 4) {
        setShowErrorPopup(true);
      } else {
        triggerWrong();
      }
    }
  };

  const triggerWrong = () => {
    setWrongShake(true);
    setShowWrongMsg(true);
    setTimeout(() => setWrongShake(false), 400);
    // Hide wrong msg after 2 seconds
    setTimeout(() => setShowWrongMsg(false), 2000);
  };

  const handleClosePopup = () => {
    setShowErrorPopup(false);
    setQuizFinished(true);
    onFinish?.();
  };

  if (quizFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <Heart className="text-maroon fill-maroon animate-pulse" size={64} />
        <h3 className="text-2xl font-bold text-maroon font-serif">Kuis Selesai!</h3>
        <p className="text-lg font-medium">Terbukti kita sama-sama sayang ❤️</p>
      </motion.div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="w-full max-w-sm mx-auto relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={wrongShake ? { x: [-10, 10, -10, 10, 0] } : { opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/50 backdrop-blur-sm border-2 border-white/60 p-6 rounded-2xl shadow-lg flex flex-col items-center gap-6"
        >
          {/* Paper pin */}
          <div className="push-pin bg-rose absolute -top-2 left-1/2 -translate-x-1/2" />
          
          <h3 className="text-xl font-semibold text-center text-text-dark min-h-[60px] flex items-center justify-center">
            {q.text}
          </h3>

          <div className="flex flex-col gap-3 w-full">
            {q.options.map((opt) => (
              <LiquidButton
                key={opt}
                onClick={() => handleAnswer(opt)}
                variant="default"
                className="w-full bg-maroon text-white font-medium py-3 shadow-md"
              >
                {opt}
              </LiquidButton>
            ))}
          </div>

          <div className="h-6 flex items-center justify-center">
            {showWrongMsg && (
              <p className="text-maroon text-sm font-bold animate-bounce">
                Salah! Coba lagi 😜
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Special Popup Error */}
      <AnimatePresence>
        {showErrorPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#fef0f1] border-4 border-maroon rounded-2xl p-6 max-w-sm w-full shadow-2xl relative flex flex-col items-center text-center gap-4"
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-3 right-3 text-maroon hover:bg-maroon/10 rounded-full p-1 transition-colors"
              >
                <X size={20} />
              </button>
              
              <AlertCircle size={48} className="text-maroon" />
              <h2 className="text-2xl font-bold text-maroon">SYSTEM ERROR!</h2>
              <p className="text-lg font-medium text-text-dark leading-snug">
                Dalam hubungan ini nggak ada kata yang "paling sayang", karena kita berdua sama-sama sayang dan setara! 🥰❤️
              </p>
              
              <LiquidButton
                onClick={handleClosePopup}
                className="mt-2 bg-maroon text-white w-full"
              >
                Awww, okee!
              </LiquidButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
