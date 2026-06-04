import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Cherry blossom petal shapes
const PETALS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 3.7 + (i % 5) * 7) % 100}%`,
  delay: `${(i * 0.7) % 12}s`,
  duration: `${12 + (i % 6) * 2}s`,
  size: 6 + (i % 4) * 3,
  color: i % 3 === 0 ? "#1A2A1E" : i % 3 === 1 ? "#4A5E52" : "#E8541A",
  type: i % 2 === 0 ? "float-petal" : "float-petal-2",
}));

const HERO_BADGES = [
  { text: "Kedarkantha Winter · Jan 15 · 4 Seats Left", urgent: true },
  { text: "Valley of Flowers 2025 · Registrations Open", urgent: false },
  { text: "Winter Special — From ₹5,999", urgent: false },
];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeBadge, setActiveBadge] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBadge((prev) => (prev + 1) % HERO_BADGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.25 + 0.4,
        duration: 0.9,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section
      ref={ref}
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img
          src="/assets/generated/hero-himalaya.dim_1920x1080.jpg"
          alt="Himalayan mountain range at dusk with cherry blossom alpenglow"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55) saturate(1.2)" }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(232,84,26,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Cherry blossom petals */}
      {PETALS.map((petal) => (
        <div
          key={petal.id}
          className={`absolute pointer-events-none animate-${petal.type}`}
          style={{
            left: petal.left,
            top: `-${petal.size * 2}px`,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            opacity: 0.2,
          }}
        >
          <svg viewBox="0 0 20 20" fill={petal.color}>
            <title>Cherry blossom petal decoration</title>
            <ellipse
              cx="10"
              cy="10"
              rx="6"
              ry="9"
              transform="rotate(20 10 10)"
            />
            <ellipse
              cx="10"
              cy="10"
              rx="6"
              ry="9"
              transform="rotate(80 10 10)"
            />
            <ellipse
              cx="10"
              cy="10"
              rx="6"
              ry="9"
              transform="rotate(140 10 10)"
            />
          </svg>
        </div>
      ))}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: "rgba(232,84,26,0.2)",
            border: "1px solid rgba(232,84,26,0.4)",
            color: "#4A5E52",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
            style={{ background: "#E8541A" }}
          />
          Uttarakhand's Finest Himalayan Experiences
        </motion.div>

        {/* Main headline */}
        <div className="leading-none mb-6">
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="block text-6xl md:text-8xl lg:text-9xl tracking-widest mb-2"
            style={{
              fontFamily: "Italiana, serif",
              color: "#1A2A1E",
              letterSpacing: "0.15em",
            }}
          >
            WHERE THE
          </motion.div>
          <motion.div
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="block text-7xl md:text-9xl lg:text-[10rem] italic leading-none"
            style={{
              fontFamily: "var(--font-display)",
              color: "#E8541A",
              fontWeight: 600,
            }}
          >
            HIMALAYAS
          </motion.div>
          <motion.div
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="block text-5xl md:text-7xl lg:text-8xl tracking-widest mt-2"
            style={{
              fontFamily: "Italiana, serif",
              color: "#1A2A1E",
              letterSpacing: "0.12em",
            }}
          >
            CALL YOUR NAME
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-base md:text-xl tracking-wider mb-10"
          style={{ color: "#4A5E52", fontFamily: "var(--font-body)" }}
        >
          14 Legendary Treks · 4 Sacred Yatras · Uttarakhand's Finest
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/treks"
            data-ocid="hero.primary_button"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold tracking-wider uppercase text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: "#E8541A", color: "#FFFFFF",
              boxShadow: "0 8px 32px rgba(232,84,26,0.4)",
            }}
          >
            Explore Treks
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={() => setVideoOpen(true)}
            className="group flex items-center gap-3 px-6 py-4 rounded-xl font-medium tracking-wide text-sm transition-all hover:scale-[1.02]"
            style={{
              background: "rgba(212,237,224,0.08)",
              border: "1px solid rgba(212,237,224,0.25)",
              color: "#1A2A1E",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(232,84,26,0.4)" }}
            >
              <Play
                size={12}
                fill="#1A2A1E"
                style={{ color: "#1A2A1E" }}
                className="ml-0.5"
              />
            </span>
            Watch Our Story
          </button>
        </motion.div>

        {/* Floating batch badges */}
        <motion.div
          custom={5}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 flex justify-center"
        >
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-xl"
            style={{
              background: "rgba(26,42,30,0.75)",
              border: "1px solid rgba(232,84,26,0.3)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: HERO_BADGES[activeBadge].urgent
                  ? "#E8541A"
                  : "#2E7D4F",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            <span className="text-sm" style={{ color: "#4A5E52" }}>
              {HERO_BADGES[activeBadge].text}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "#4A5E5280" }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">
          Scroll
        </span>
        <div
          className="w-px h-10 relative overflow-hidden"
          style={{ background: "rgba(212,237,224,0.2)" }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-4"
            style={{
              background: "linear-gradient(to bottom, #4A5E52, transparent)",
            }}
            animate={{ y: [0, 40] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>

      {/* Video modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,42,30,0.92)" }}
          onClick={() => setVideoOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setVideoOpen(false);
          }}
          // biome-ignore lint/a11y/useSemanticElements: custom dialog
          role="dialog"
          aria-label="Watch Our Story video"
          tabIndex={-1}
        >
          <div
            className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(232,84,26,0.4)" }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Shail Hikers Story"
              className="w-full h-full"
              allow="autoplay"
            />
          </div>
          <button
            type="button"
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(232,84,26,0.3)", color: "#1A2A1E" }}
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
