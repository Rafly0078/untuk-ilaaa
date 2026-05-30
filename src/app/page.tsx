"use client";

import { useState, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { chapters } from "@/data/story";
import StartScreen from "@/components/StartScreen";
import StoryChapter from "@/components/StoryChapter";
import FloatingHearts from "@/components/FloatingHearts";
import FunnyButton from "@/components/FunnyButton";
import MusicControl from "@/components/MusicControl";
import ConfettiButton from "@/components/ConfettiButton";
import Confetti from "@/components/Confetti";
import ChapterDecorations from "@/components/ChapterDecorations";

import PasswordLock from "@/components/PasswordLock";
import CoupleQuiz from "@/components/CoupleQuiz";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isFunnyFinished, setIsFunnyFinished] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleStart = useCallback(() => {
    setStarted(true);

    // Play music if possible with fade-in
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0;
      
      audio.play().then(() => {
        // Fade in over 2 seconds
        const targetVolume = 0.5;
        const duration = 2000;
        const intervalTime = 100;
        const step = targetVolume / (duration / intervalTime);
        
        const fadeInterval = setInterval(() => {
          if (audio.volume + step < targetVolume) {
            audio.volume += step;
          } else {
            audio.volume = targetVolume;
            clearInterval(fadeInterval);
          }
        }, intervalTime);
      }).catch(() => {
        // Autoplay might be blocked; user can use the music control
      });
    }

    // Scroll to lock screen
    setTimeout(() => {
      const lockChapter = document.getElementById("chapter-lock-screen");
      if (lockChapter && containerRef.current) {
        lockChapter.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }, []);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true);
    triggerConfetti();
    
    // Scroll to the next chapter (first-impression)
    setTimeout(() => {
      const nextChapter = document.getElementById("chapter-first-impression");
      if (nextChapter && containerRef.current) {
        nextChapter.scrollIntoView({ behavior: "smooth" });
      }
    }, 800);
  }, [triggerConfetti]);

  const handleQuizFinish = useCallback(() => {
    setIsQuizFinished(true);
    
    // Scroll to the next chapter (funny)
    setTimeout(() => {
      const nextChapter = document.getElementById("chapter-funny");
      if (nextChapter && containerRef.current) {
        nextChapter.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }, []);

  const handleFunnyCatch = useCallback(() => {
    triggerConfetti();
  }, [triggerConfetti]);

  const handleFunnyClose = useCallback(() => {
    setIsFunnyFinished(true);
    
    // Scroll to the next chapter (romantic)
    setTimeout(() => {
      const nextChapter = document.getElementById("chapter-romantic");
      if (nextChapter && containerRef.current) {
        nextChapter.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, []);

  let visibleIndex = 0;
  
  if (started) {
    visibleIndex = chapters.findIndex(c => c.type === "lock");
    
    if (isUnlocked) {
      visibleIndex = chapters.findIndex(c => c.type === "quiz");
      
      if (isQuizFinished || visibleIndex === -1) {
        visibleIndex = chapters.findIndex(c => c.type === "funny");
        
        if (isFunnyFinished || visibleIndex === -1) {
          visibleIndex = chapters.length - 1;
        }
      }
    }
  }
  
  const visibleChapters = chapters.slice(0, visibleIndex !== -1 ? visibleIndex + 1 : chapters.length);

  return (
    <>
      {/* Background music audio element */}
      <audio ref={audioRef} src="/audio/bg-music.mp3" loop preload="none" />

      {/* Music control — only visible after story starts */}
      <AnimatePresence>{started && <MusicControl audioRef={audioRef} />}</AnimatePresence>

      {/* Confetti overlay */}
      <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>

      {/* Main scroll container */}
      <div ref={containerRef} className="snap-container">
        {visibleChapters.map((chapter) => {
          // Opening screen
          if (chapter.type === "intro") {
            return (
              <section
                key={chapter.id}
                id={`chapter-${chapter.id}`}
                className="snap-section bg-section-intro"
              >
                <ChapterDecorations type="intro" />
                <StartScreen
                  text={chapter.text}
                  subtext={chapter.subtext!}
                  onStart={handleStart}
                  started={started}
                />
              </section>
            );
          }

          // Lock screen
          if (chapter.type === "lock") {
            return (
              <section
                key={chapter.id}
                id={`chapter-${chapter.id}`}
                className="snap-section bg-section-story-1"
              >
                <ChapterDecorations type="story-1" />
                <StoryChapter chapter={chapter} sectionBg="story">
                  <PasswordLock correctPassword="070207" onUnlock={handleUnlock} />
                </StoryChapter>
              </section>
            );
          }

          // Quiz screen
          if (chapter.type === "quiz") {
            return (
              <section
                key={chapter.id}
                id={`chapter-${chapter.id}`}
                className="snap-section bg-section-funny"
              >
                <ChapterDecorations type="funny" />
                <StoryChapter chapter={chapter} sectionBg="funny">
                  <CoupleQuiz onFinish={handleQuizFinish} />
                </StoryChapter>
              </section>
            );
          }

          // Ending screen
          if (chapter.type === "ending") {
            return (
              <section
                key={chapter.id}
                id={`chapter-${chapter.id}`}
                className="snap-section bg-section-ending relative"
              >
                <ChapterDecorations type="ending" />
                <StoryChapter chapter={chapter} sectionBg="story">
                  <ConfettiButton onReact={triggerConfetti} />
                </StoryChapter>

                <footer className="absolute bottom-0 w-full py-5 text-center text-xs md:text-sm text-maroon/70 font-medium tracking-[0.2em] uppercase border-t border-maroon/10 bg-white/40 backdrop-blur-md z-20">
                  <p className="flex items-center justify-center gap-2">
                    Made With <Heart size={14} className="fill-maroon text-maroon animate-pulse" /> Love
                  </p>
                </footer>
              </section>
            );
          }

          // Funny chapter
          if (chapter.type === "funny") {
            return (
                <section
                  key={chapter.id}
                  id={`chapter-${chapter.id}`}
                  className="snap-section bg-section-funny"
                >
                <ChapterDecorations type="funny" />
                <StoryChapter
                  chapter={chapter}
                  sectionBg="funny"
                >
                  <FunnyButton onSuccess={handleFunnyCatch} onPopupClose={handleFunnyClose} />
                </StoryChapter>
              </section>
            );
          }

          // Romantic chapter — with hearts
          if (chapter.type === "romantic") {
            return (
              <section
                key={chapter.id}
                id={`chapter-${chapter.id}`}
                className="snap-section bg-section-romantic"
              >
                <ChapterDecorations type="romantic" />
                <FloatingHearts />
                <StoryChapter chapter={chapter} sectionBg="romantic" />
              </section>
            );
          }

          // Regular story chapters
          const isFirst = chapter.id === "first-impression";
          const bgClass = isFirst ? "bg-section-story-1" : "bg-section-story-2";
          const decoType = isFirst ? "story-1" : "story-2";
          const showHearts = chapter.id === "little-things";

          return (
            <section
              key={chapter.id}
              id={`chapter-${chapter.id}`}
              className={`snap-section ${bgClass}`}
            >
              <ChapterDecorations type={decoType} />
              {showHearts && <FloatingHearts />}
              <StoryChapter chapter={chapter} sectionBg="story" />
            </section>
          );
        })}
      </div>
    </>
  );
}
