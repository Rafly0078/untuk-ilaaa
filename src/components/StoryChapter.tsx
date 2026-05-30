"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Chapter } from "@/data/story";
import type { ReactNode } from "react";

interface StoryChapterProps {
  chapter: Chapter;
  sectionBg?: "story" | "funny" | "romantic";
  children?: ReactNode;
}

export default function StoryChapter({
  chapter,
  sectionBg = "story",
  children,
}: StoryChapterProps) {
  const layout = chapter.layout || "center";
  const isRomantic = sectionBg === "romantic";

  // Choose text color based on section
  const textColor = isRomantic ? "text-text-dark" : "text-text-dark";
  const subtextColor = isRomantic ? "text-text-medium" : "text-text-medium";

  // Layout variants
  const containerClass =
    layout === "center"
      ? "flex flex-col items-center text-center gap-6 max-w-lg mx-auto"
      : "flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto";

  const imageOrder =
    layout === "left" ? "md:order-1" : layout === "right" ? "md:order-2" : "";
  const textOrder =
    layout === "left" ? "md:order-2" : layout === "right" ? "md:order-1" : "";

  return (
    <div className={containerClass}>
        {/* Photo with Polaroid style */}
        {chapter.imageSrc && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, rotate: layout === "left" ? -15 : 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: layout === "left" ? -3 : 3 }}
            transition={{ duration: 0.8, ease: "easeOut", type: "spring" }}
            viewport={{ once: true, amount: 0.3 }}
            className={`relative ${imageOrder} ${
              layout === "center" ? "w-52 sm:w-64" : "w-56 sm:w-72 md:w-80"
            } flex-shrink-0 z-10`}
          >
            {/* Washi tape at top */}
            <div className={`washi-tape ${layout === "left" ? "washi-tape-pink tilt-right top-[-10px] left-[10%]" : layout === "right" ? "washi-tape-gold tilt-left top-[-12px] right-[20%]" : "washi-tape-maroon tilt-left-sm top-[-10px] left-[50%] -translate-x-1/2"}`} />

            <div className="polaroid relative w-full">
              <div className="relative w-full overflow-hidden rounded-sm bg-white flex items-center justify-center">
                <Image
                  src={chapter.imageSrc}
                  alt={chapter.imageAlt || ""}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 224px, 320px"
                  style={{ width: "100%", height: "auto", maxHeight: "60vh" }}
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              
              {/* Optional handwriting on polaroid bottom */}
              {layout === "center" && (
                <div className="absolute bottom-2 left-0 right-0 text-center">
                 <span
                   className="handwriting text-text-medium text-lg rotate-[-2deg] inline-block opacity-80"
                   aria-hidden="true"
                 >
                     ✨
                   </span>
                </div>
              )}
            </div>

            {/* Push pin for center layout */}
            {layout === "center" && (
               <div className="push-pin bg-rose top-[-5px] left-1/2 -translate-x-1/2 z-20" />
            )}
            
          </motion.div>
        )}

        {/* Text content */}
        <div className={`flex flex-col gap-4 ${textOrder} ${layout !== "center" ? "md:flex-1" : ""} z-10`}>
          {chapter.title && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative inline-block self-start mx-auto md:mx-0"
            >
              <span className="text-xs font-bold tracking-widest uppercase text-maroon bg-rose-light/20 px-3 py-1 rounded-full">
                {chapter.title}
              </span>
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className={`text-xl sm:text-2xl md:text-3xl font-semibold leading-snug ${textColor}`}
          >
            {chapter.text}
          </motion.h2>

          {chapter.subtext && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: layout === "right" ? 1 : -1 }}
              transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="mt-2"
            >
              <div className="paper-note px-5 py-4 inline-block text-left transform transition-transform hover:scale-[1.02]">
                {/* Small tape for paper note */}
                <div className="washi-tape washi-tape-gold w-12 h-4 top-[-6px] left-[10px] opacity-60 tilt-left" />
                <p className={`handwriting text-xl sm:text-2xl leading-relaxed ${subtextColor}`}>
                  {chapter.subtext}
                </p>
              </div>
            </motion.div>
          )}

          {/* Optional children (e.g., FunnyButton) */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    );
  }
