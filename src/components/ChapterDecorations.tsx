"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type DecoType = "intro" | "story-1" | "story-2" | "funny" | "romantic" | "ending";

interface Props {
  type: DecoType;
}

/* ── Sparkle character that twinkles ── */
function Sparkle({
  char = "✦",
  className = "",
  style = {},
  delay = 0,
  duration = 3,
}: {
  char?: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.span
      className={`absolute pointer-events-none select-none ${className}`}
      style={style}
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      {char}
    </motion.span>
  );
}

/* ── Soft gradient orb (blurred circle) ── */
function GlowOrb({
  className = "",
  color = "rgba(128,0,32,0.08)",
  size = 120,
  style = {},
}: {
  className?: string;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(2px)",
        ...style,
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

/* ── Small decorative dot ── */
function Dot({
  className = "",
  color = "bg-maroon/10",
  size = "w-2 h-2",
}: {
  className?: string;
  color?: string;
  size?: string;
}) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${color} ${size} ${className}`}
      aria-hidden="true"
    />
  );
}

/* ── Curved doodle line (SVG) ── */
function DoodleLine({
  className = "",
  color = "rgba(128,0,32,0.1)",
  d = "M0,30 Q40,0 80,25 T160,20",
}: {
  className?: string;
  color?: string;
  d?: string;
}) {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      width="160"
      height="50"
      viewBox="0 0 160 50"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </svg>
  );
}

/* ── Lily Sticker ── */
function LilySticker({
  className = "",
  style = {},
  delay = 0,
  color = "pink",
  loading = "lazy",
}: {
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  color?: "pink" | "white" | "yellow" | "maroon";
  loading?: "eager" | "lazy";
}) {
  const src = color === "pink" ? "/images/lily.png" : `/images/lily_${color}.png`;
  
  return (
    <motion.div
      className={`absolute pointer-events-none select-none z-0 ${className}`}
      style={{ mixBlendMode: "multiply", ...style }}
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      whileInView={{ opacity: 0.85, scale: 1, rotate: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt=""
        width={180}
        height={180}
        loading={loading}
        className="object-contain opacity-80"
      />
    </motion.div>
  );
}

/* ── Auto-Scattered Lilies ── */
function ScatteredLilies({
  count = 6,
  seed = 1,
  loading = "lazy",
}: {
  count?: number;
  seed?: number;
  loading?: "eager" | "lazy";
}) {
  // Simple deterministic random generator based on a seed
  const random = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  const unit = (value: number, suffix: string) => `${value.toFixed(3)}${suffix}`;

  // Define 8 distinct safe zones around the edges to prevent overlapping
  // Ranges are [min%, max%] for top and left. 
  // Max left is kept <= 70 to prevent the 180px box from going completely off right edge.
  const safeZones = [
    { t: [2, 15], l: [0, 15] },     // Top-Left
    { t: [2, 15], l: [55, 70] },    // Top-Right
    { t: [35, 50], l: [-5, 5] },    // Mid-Left
    { t: [35, 50], l: [60, 75] },   // Mid-Right
    { t: [70, 85], l: [0, 15] },    // Bottom-Left
    { t: [70, 85], l: [55, 70] },   // Bottom-Right
    { t: [15, 25], l: [25, 50] },   // Top-Center
    { t: [80, 90], l: [25, 50] },   // Bottom-Center
  ];

  // Deterministically shuffle the safe zones so each chapter gets a unique combo
  const shuffledZones = [...safeZones].sort(
    (a, b) => random(seed + a.t[0]) - random(seed + b.t[0])
  );

  const lilies = [];
  const colors: ("pink" | "white" | "yellow" | "maroon")[] = ["pink", "white", "yellow", "maroon"];

  // Never use more flowers than we have distinct zones
  const safeCount = Math.min(count, shuffledZones.length);

  for (let i = 0; i < safeCount; i++) {
    const zone = shuffledZones[i];
    
    // Pick random position within the chosen zone's bounds
    const top = zone.t[0] + random(seed + i * 11) * (zone.t[1] - zone.t[0]);
    const left = zone.l[0] + random(seed + i * 22) * (zone.l[1] - zone.l[0]);
    
    const rotate = (random(seed + i * 33) - 0.5) * 120; // -60 to 60 deg
    const scale = 0.4 + random(seed + i * 44) * 0.35; // 0.4 to 0.75 (slightly smaller to not overcrowd)
    const colorIndex = Math.floor(random(seed + i * 55) * colors.length);
    const delay = random(seed + i * 66) * 1.5;

    lilies.push(
      <LilySticker
        key={i}
        color={colors[colorIndex]}
        delay={delay}
        loading={loading}
        style={{
          top: unit(top, "%"),
          left: unit(left, "%"),
          transform: `scale(${scale.toFixed(3)}) rotate(${rotate.toFixed(3)}deg)`,
        }}
      />
    );
  }

  return <>{lilies}</>;
}

/* ═══════════ Per-chapter decorations ═══════════ */

function IntroDecorations() {
  return (
    <>
      <ScatteredLilies count={5} seed={1} loading="eager" />
      <Sparkle char="✦" className="text-maroon/25 text-lg" style={{ top: "15%", left: "12%" }} delay={0} />
      <Sparkle char="⋆" className="text-rose/30 text-2xl" style={{ top: "20%", right: "15%" }} delay={1} />
      <Sparkle char="✧" className="text-gold/30 text-sm" style={{ bottom: "25%", left: "18%" }} delay={0.5} />
      <Sparkle char="✦" className="text-maroon/20 text-base" style={{ bottom: "30%", right: "10%" }} delay={1.5} />
      <Sparkle char="⋆" className="text-rose-light/40 text-xl" style={{ top: "40%", left: "6%" }} delay={2} />

      <GlowOrb color="rgba(201,112,125,0.1)" size={180} style={{ top: "-40px", right: "-40px" }} />
      <GlowOrb color="rgba(212,165,116,0.08)" size={140} style={{ bottom: "10%", left: "-30px" }} />

      <Dot className="top-[30%] right-[8%]" color="bg-rose-light/25" size="w-3 h-3" />
      <Dot className="bottom-[20%] right-[22%]" color="bg-champagne/40" size="w-2 h-2" />
    </>
  );
}

function Story1Decorations() {
  return (
    <>
      <ScatteredLilies count={7} seed={12} />
      
      <Sparkle char="✧" className="text-maroon/20 text-base" style={{ top: "10%", right: "8%" }} delay={0.3} />
      <Sparkle char="✦" className="text-rose/25 text-sm" style={{ bottom: "15%", left: "10%" }} delay={1} />
      <Sparkle char="⋆" className="text-gold/25 text-lg" style={{ top: "50%", left: "5%" }} delay={0.7} />

      <GlowOrb color="rgba(128,0,32,0.06)" size={200} style={{ top: "-60px", left: "-60px" }} />

      <DoodleLine className="bottom-[12%] right-[5%] opacity-60" />

      <Dot className="top-[18%] left-[15%]" color="bg-maroon/8" size="w-4 h-4" />
      <Dot className="bottom-[25%] right-[12%]" color="bg-rose-light/20" size="w-2.5 h-2.5" />
      <Dot className="top-[60%] right-[6%]" color="bg-champagne/30" size="w-2 h-2" />
    </>
  );
}

function Story2Decorations() {
  return (
    <>
      <ScatteredLilies count={6} seed={42} />
      <Sparkle char="♡" className="text-maroon/20 text-xl" style={{ top: "12%", left: "8%" }} delay={0} duration={4} />
      <Sparkle char="✦" className="text-rose/20 text-sm" style={{ top: "18%", right: "12%" }} delay={1.2} />
      <Sparkle char="⋆" className="text-gold/20 text-base" style={{ bottom: "20%", right: "8%" }} delay={0.8} />

      <GlowOrb color="rgba(250,218,221,0.15)" size={160} style={{ bottom: "-30px", right: "-30px" }} />
      <GlowOrb color="rgba(212,165,116,0.06)" size={120} style={{ top: "20%", left: "-40px" }} />

      <DoodleLine
        className="top-[8%] left-[3%] opacity-50 rotate-12"
        d="M0,20 Q30,0 60,15 T120,10"
        color="rgba(201,112,125,0.12)"
      />

      <Dot className="bottom-[30%] left-[12%]" color="bg-rose/10" size="w-3 h-3" />
      <Dot className="top-[40%] right-[5%]" color="bg-blush/30" size="w-2 h-2" />
    </>
  );
}

function FunnyDecorations() {
  return (
    <>
      <ScatteredLilies count={5} seed={99} />
      <Sparkle char="✿" className="text-maroon/15 text-2xl" style={{ top: "8%", left: "10%" }} delay={0} duration={5} />
      <Sparkle char="✦" className="text-gold/25 text-sm" style={{ top: "15%", right: "10%" }} delay={0.5} />
      <Sparkle char="⟡" className="text-rose/20 text-lg" style={{ bottom: "12%", left: "8%" }} delay={1} />
      <Sparkle char="✧" className="text-champagne/40 text-base" style={{ bottom: "18%", right: "15%" }} delay={1.5} />

      <GlowOrb color="rgba(245,230,204,0.15)" size={160} style={{ top: "-20px", right: "-40px" }} />

      <DoodleLine
        className="bottom-[6%] left-[8%] opacity-40"
        d="M0,25 Q20,5 50,20 Q80,35 110,15 T160,20"
        color="rgba(212,165,116,0.15)"
      />

      <Dot className="top-[35%] left-[4%]" color="bg-rose-light/15" size="w-5 h-5" />
      <Dot className="top-[22%] right-[20%]" color="bg-maroon/6" size="w-3 h-3" />
    </>
  );
}

function RomanticDecorations() {
  return (
    <>
      <ScatteredLilies count={7} seed={77} />
      
      <Sparkle char="✦" className="text-maroon/25 text-lg" style={{ top: "8%", right: "10%" }} delay={0} duration={4} />
      <Sparkle char="✧" className="text-white/20 text-xl" style={{ top: "15%", left: "8%" }} delay={0.8} duration={5} />
      <Sparkle char="⋆" className="text-rose/25 text-sm" style={{ bottom: "18%", right: "12%" }} delay={1.5} />
      <Sparkle char="♡" className="text-maroon/15 text-2xl" style={{ bottom: "12%", left: "6%" }} delay={0.3} duration={6} />
      <Sparkle char="✦" className="text-gold/20 text-xs" style={{ top: "45%", right: "4%" }} delay={2} />

      <GlowOrb color="rgba(128,0,32,0.08)" size={220} style={{ top: "-70px", left: "-70px" }} />
      <GlowOrb color="rgba(232,168,176,0.1)" size={180} style={{ bottom: "-50px", right: "-50px" }} />

      <Dot className="top-[28%] right-[6%]" color="bg-white/10" size="w-3 h-3" />
      <Dot className="bottom-[35%] left-[10%]" color="bg-rose-light/15" size="w-4 h-4" />
    </>
  );
}

function EndingDecorations() {
  return (
    <>
      <ScatteredLilies count={6} seed={55} />
      
      <Sparkle char="✦" className="text-blush/20 text-lg" style={{ top: "10%", left: "10%" }} delay={0} duration={3} />
      <Sparkle char="⋆" className="text-gold/25 text-2xl" style={{ top: "8%", right: "12%" }} delay={0.5} duration={4} />
      <Sparkle char="✧" className="text-rose-light/20 text-sm" style={{ bottom: "8%", left: "15%" }} delay={1} />
      <Sparkle char="✦" className="text-champagne/15 text-base" style={{ top: "40%", left: "4%" }} delay={1.8} duration={5} />
      <Sparkle char="⋆" className="text-blush/15 text-xl" style={{ bottom: "15%", right: "8%" }} delay={0.3} duration={4} />
      <Sparkle char="✧" className="text-gold/20 text-xs" style={{ top: "55%", right: "5%" }} delay={2.5} />

      <GlowOrb color="rgba(201,112,125,0.08)" size={200} style={{ top: "-60px", right: "-50px" }} />
      <GlowOrb color="rgba(212,165,116,0.06)" size={160} style={{ bottom: "-40px", left: "-40px" }} />

      <Dot className="top-[20%] left-[25%]" color="bg-blush/8" size="w-2 h-2" />
      <Dot className="bottom-[25%] right-[20%]" color="bg-gold/10" size="w-3 h-3" />
      <Dot className="top-[65%] left-[8%]" color="bg-rose-light/8" size="w-2 h-2" />
    </>
  );
}

/* ═══════════ Main export ═══════════ */

const DECO_MAP: Record<DecoType, React.FC> = {
  "intro": IntroDecorations,
  "story-1": Story1Decorations,
  "story-2": Story2Decorations,
  "funny": FunnyDecorations,
  "romantic": RomanticDecorations,
  "ending": EndingDecorations,
};

export default function ChapterDecorations({ type }: Props) {
  const Deco = DECO_MAP[type];
  return Deco ? <Deco /> : null;
}
