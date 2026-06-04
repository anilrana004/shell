import type { Trek } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Heart,
  MapPin,
  Mountain,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

// Sample elevation sparkline data per trek
function getElevationData(maxAlt: number): { alt: number }[] {
  const peak = maxAlt;
  return [
    { alt: maxAlt * 0.3 },
    { alt: maxAlt * 0.42 },
    { alt: maxAlt * 0.55 },
    { alt: maxAlt * 0.67 },
    { alt: maxAlt * 0.8 },
    { alt: peak * 0.92 },
    { alt: peak },
    { alt: peak * 0.85 },
    { alt: peak * 0.6 },
    { alt: peak * 0.35 },
  ];
}

interface TrekCardProps {
  trek: Trek;
  index: number;
}

export function TrekCard({ trek, index }: TrekCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const elevData = getElevationData(trek.maxAltitude);
  const diffBadge = { bg: "#E8541A", text: "#FFFFFF" };

  const seatsLow = (trek.seatsAvailable ?? 10) <= 3;
  const seatsMid = (trek.seatsAvailable ?? 10) <= 7 && !seatsLow;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-ocid={`treks.card.${index + 1}`}
      className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        width: "300px",
        minWidth: "300px",
        height: "420px",
        border: "1px solid #C8E0D4",
        boxShadow: hovered
          ? "0 8px 32px rgba(46,125,79,0.15)"
          : "0 4px 16px rgba(46,125,79,0.1)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={trek.heroImage}
          alt={`${trek.name} Himalayan trek landscape`}
          className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out"
          style={{ transform: hovered ? "scale(1.12)" : "scale(1.0)" }}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,42,30,0) 0%, rgba(26,42,30,0.15) 40%, rgba(26,42,30,0.75) 72%, rgba(26,42,30,0.95) 100%)",
          }}
        />
      </div>

      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm"
            style={{
              background: diffBadge.bg,
              color: diffBadge.text,
            }}
          >
            {trek.difficulty}
          </span>
          {trek.slug === "valley-of-flowers" && (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm"
              style={{
                background: "#D4A843",
                color: "#1A2A1E",
              }}
            >
              UNESCO
            </span>
          )}
        </div>
        <button
          type="button"
          data-ocid={`treks.wishlist.${index + 1}`}
          onClick={(e) => {
            e.preventDefault();
            setWishlisted(!wishlisted);
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(232,84,26,0.3)",
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={14}
            style={{
              color: wishlisted ? "#E8541A" : "#1A2A1E80",
              fill: wishlisted ? "#E8541A" : "transparent",
            }}
          />
        </button>
      </div>

      {/* Availability */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2">
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-sm"
          style={{
            background: seatsLow
              ? "rgba(232,84,26,0.15)"
              : "rgba(255,255,255,0.95)",
            border: seatsLow
              ? "1px solid #E8541A"
              : "1px solid #C8E0D4",
          }}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${seatsLow ? "animate-pulse-dot" : ""}`}
            style={{
              background: seatsLow
                ? "#E8541A"
                : seatsMid
                  ? "#D4A843"
                  : "#1A5C3A",
            }}
          />
          <span
            className="text-[10px] font-semibold"
            style={{
              color: seatsLow ? "#E8541A" : "#1A2A1E",
            }}
          >
            {trek.seatsAvailable} seats
          </span>
        </div>
      </div>

      {/* Bottom content — light text on dark gradient (standard travel card) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pt-10">
        <div className="mb-2 h-10 opacity-90">
          <ResponsiveContainer width="100%" height={40}>
            <AreaChart
              data={elevData}
              margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
            >
              <Area
                type="monotone"
                dataKey="alt"
                stroke="#F4784A"
                strokeWidth={1.5}
                fill="rgba(232,84,26,0.25)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <h3
          className="text-xl font-semibold mb-1.5 leading-tight drop-shadow-sm"
          style={{ fontFamily: "var(--font-display)", color: "#FFFFFF" }}
        >
          {trek.name}
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
          <span
            className="flex items-center gap-1 text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            <Clock size={11} style={{ color: "#3D9E65" }} /> {trek.durationDays}D/
            {trek.durationNights}N
          </span>
          <span
            className="flex items-center gap-1 text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            <Mountain size={11} style={{ color: "#3D9E65" }} />{" "}
            {trek.maxAltitude.toLocaleString()} ft
          </span>
          <span
            className="flex items-center gap-1 text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            <MapPin size={11} style={{ color: "#3D9E65" }} />{" "}
            {trek.startingPoint.split(",")[0]}
          </span>
        </div>

        {trek.completedThisMonth && (
          <p
            className="text-[10px] mb-2 font-medium"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            <Users size={9} className="inline mr-1" />
            {trek.completedThisMonth} trekkers this month
          </p>
        )}

        <div className="flex items-end justify-between gap-2 pt-1 border-t border-white/15">
          <div>
            <span
              className="text-[10px] uppercase tracking-wider font-medium"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              From
            </span>
            <p
              className="text-xl font-bold leading-none mt-0.5"
              style={{ color: "#D4A843", fontFamily: "var(--font-display)" }}
            >
              ₹{trek.basePrice.toLocaleString()}
            </p>
          </div>

          <div
            className="flex items-center gap-2 transition-all duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{ background: "#2E7D4F", color: "#FFFFFF" }}
            >
              D
            </div>
            <span
              className="text-[10px] font-medium"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Guide: Deepak
            </span>
          </div>

          <Link
            to="/treks/$slug"
            params={{ slug: trek.slug }}
            data-ocid={`treks.explore.${index + 1}`}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:gap-2 flex-shrink-0"
            style={{ background: "#E8541A", color: "#FFFFFF" }}
            onClick={(e) => e.stopPropagation()}
          >
            Explore <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
