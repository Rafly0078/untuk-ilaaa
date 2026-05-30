"use client";

const HEART_CHARS = ["\u2665", "\u2764", "\u{1F495}", "\u{1F497}"];

interface HeartData {
  id: number;
  char: string;
  left: string;
  size: string;
  duration: string;
  delay: string;
  drift: string;
  spin: string;
}

const seeded = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const unit = (value: number, suffix: string) => `${value.toFixed(3)}${suffix}`;

const hearts: HeartData[] = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  char: HEART_CHARS[i % HEART_CHARS.length],
  left: unit(10 + seeded(i + 1) * 80, "%"),
  size: unit(0.8 + seeded(i + 11) * 0.8, "rem"),
  duration: unit(5 + seeded(i + 21) * 4, "s"),
  delay: unit(seeded(i + 31) * 5, "s"),
  drift: unit(-30 + seeded(i + 41) * 60, "px"),
  spin: unit(-45 + seeded(i + 51) * 90, "deg"),
}));

export default function FloatingHearts() {
  return (
    <>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-particle text-maroon/40"
          style={{
            left: h.left,
            ["--size" as string]: h.size,
            ["--duration" as string]: h.duration,
            ["--delay" as string]: h.delay,
            ["--drift" as string]: h.drift,
            ["--spin" as string]: h.spin,
            fontSize: h.size,
          }}
          aria-hidden="true"
        >
          {h.char}
        </span>
      ))}
    </>
  );
}
