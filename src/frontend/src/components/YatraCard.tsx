import type { ComponentType, CSSProperties } from "react";
import type { Yatra } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bed,
  Bus,
  Calendar,
  Clock,
  Compass,
  MapPin,
  Star,
  Sun,
  Users,
  Utensils,
} from "lucide-react";
import { motion } from "motion/react";

const PILGRIMAGE_COLORS: Record<string, string> = {
  Easy: "#2E7D4F",
  Moderate: "#D4A843",
  Challenging: "#E8541A",
};

const INCLUSION_ICONS: Record<
  string,
  ComponentType<{ size?: number; style?: CSSProperties }>
> = {
  Hotel: Bed,
  Meals: Utensils,
  Transport: Bus,
  Darshan: Compass,
  Sightseeing: Compass,
  Guide: Users,
};

function getDaysUntil(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.max(
    0,
    Math.floor((d.getTime() - now.getTime()) / 86400000),
  );
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={11}
            fill={i < Math.round(rating) ? "#D4A843" : "transparent"}
            style={{
              color: i < Math.round(rating) ? "#D4A843" : "#C8E0D4",
            }}
          />
        ))}
      </div>
      <span className="text-xs font-semibold" style={{ color: "#1A2A1E" }}>
        {rating.toFixed(1)}
      </span>
      <span className="text-[10px]" style={{ color: "#7A8E80" }}>
        ({count} reviews)
      </span>
    </div>
  );
}

interface YatraCardProps {
  yatra: Yatra;
  index: number;
  layout?: "carousel" | "grid";
}

export function YatraCard({ yatra, index, layout = "grid" }: YatraCardProps) {
  const isCarousel = layout === "carousel";
  const pilgrimageColor =
    PILGRIMAGE_COLORS[yatra.pilgrimage as string] ?? "#D4A843";
  const daysUntil = yatra.nextDeparture
    ? getDaysUntil(yatra.nextDeparture)
    : null;
  const seatsLow = (yatra.seatsAvailable ?? 10) <= 5;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55 }}
      data-ocid={`yatras.card.${index + 1}`}
      className={`group flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 ${
        isCarousel ? "flex-shrink-0 w-[320px] min-w-[320px] h-full" : "h-full w-full"
      }`}
      style={{
        border: "1px solid rgba(232,84,26,0.18)",
        boxShadow: "0 4px 20px rgba(46,125,79,0.06)",
      }}
    >
      {/* Hero image */}
      <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
        <img
          src={yatra.heroImage}
          alt={`${yatra.name} — ${yatra.region}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,42,30,0.35) 0%, transparent 45%, transparent 70%, rgba(255,255,255,0.15) 100%)",
          }}
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm"
            style={{ background: "#E8541A", color: "#FFFFFF" }}
          >
            {yatra.pilgrimage as string}
          </span>
          {yatra.requiresAdvanceRegistration && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: "#E8541A",
                border: "1px solid rgba(232,84,26,0.35)",
              }}
            >
              Reg Required
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {yatra.helicopterOption && (
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid #D4A84366",
                color: "#9A7B2A",
              }}
            >
              🚁 Heli Option
            </span>
          )}
          {yatra.seatsAvailable != null && (
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{
                background: seatsLow
                  ? "rgba(232,84,26,0.92)"
                  : "rgba(255,255,255,0.92)",
                color: seatsLow ? "#FFFFFF" : "#1A2A1E",
              }}
            >
              <Users size={10} />
              {yatra.seatsAvailable} seats left
            </span>
          )}
        </div>

        {daysUntil != null && (
          <div className="absolute bottom-3 left-3">
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold"
              style={{
                background: "rgba(26,42,30,0.88)",
                color: "#FFFFFF",
              }}
            >
              <Calendar size={10} />
              {daysUntil > 0 ? `Next batch in ${daysUntil}d` : "Departing soon"}
            </span>
          </div>
        )}
      </div>

      {/* Body — standard travel agency layout */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <div className="flex items-center gap-1 text-[11px]" style={{ color: "#2E7D4F" }}>
          <MapPin size={11} className="flex-shrink-0" />
          <span className="truncate font-medium">{yatra.region}</span>
        </div>

        <StarRating rating={yatra.rating} count={yatra.reviewCount} />

        <div>
          <h3
            className="text-lg font-semibold leading-tight mb-0.5"
            style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
          >
            {yatra.name}
          </h3>
          <p className="text-xs leading-snug line-clamp-2" style={{ color: "#4A5E52" }}>
            {yatra.tagline}
          </p>
        </div>

        <p
          className="text-[10px] leading-relaxed line-clamp-2 px-2 py-1.5 rounded-lg"
          style={{ background: "#EDF7F2", color: "#4A5E52" }}
        >
          <span className="font-semibold" style={{ color: "#2E7D4F" }}>
            Route:{" "}
          </span>
          {yatra.route}
        </p>

        <ul className="space-y-1">
          {yatra.highlights.slice(0, 3).map((h) => (
            <li
              key={h}
              className="flex items-start gap-1.5 text-[11px] leading-snug"
              style={{ color: "#4A5E52" }}
            >
              <span
                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: pilgrimageColor }}
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px]" style={{ color: "#7A8E80" }}>
          <span className="flex items-center gap-1">
            <Clock size={10} style={{ color: "#2E7D4F" }} />
            {yatra.durationDays}D / {yatra.durationNights}N
          </span>
          <span className="flex items-center gap-1">
            <Sun size={10} style={{ color: "#E8541A" }} />
            {yatra.bestTime}
          </span>
          <span
            className="px-1.5 py-0.5 rounded font-medium"
            style={{ background: "rgba(46,125,79,0.1)", color: "#2E7D4F" }}
          >
            {yatra.groupType}
          </span>
        </div>

        <div
          className="flex flex-wrap gap-2 pt-1 pb-0.5"
          style={{ borderTop: "1px solid #E4F0EA" }}
        >
          {yatra.inclusions.map((inc) => {
            const Icon = INCLUSION_ICONS[inc] ?? Compass;
            return (
              <span
                key={inc}
                className="flex flex-col items-center gap-0.5 min-w-[44px]"
                title={inc}
              >
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "#EDF7F2", border: "1px solid #C8E0D4" }}
                >
                  <Icon size={12} style={{ color: "#2E7D4F" }} />
                </span>
                <span className="text-[9px] font-medium" style={{ color: "#7A8E80" }}>
                  {inc}
                </span>
              </span>
            );
          })}
        </div>

        <div
          className="flex items-end justify-between gap-2 mt-auto pt-2"
          style={{ borderTop: "1px solid #E4F0EA" }}
        >
          <div>
            <span
              className="text-[10px] uppercase tracking-wider font-medium"
              style={{ color: "#7A8E80" }}
            >
              From
            </span>
            <p
              className="text-xl font-bold leading-none"
              style={{ color: "#E8541A", fontFamily: "var(--font-display)" }}
            >
              ₹{yatra.basePrice.toLocaleString("en-IN")}
              <span className="text-[10px] font-normal ml-0.5" style={{ color: "#7A8E80" }}>
                / person
              </span>
            </p>
            <span className="text-[10px]" style={{ color: "#7A8E80" }}>
              Ex. {yatra.startingPoint}
            </span>
          </div>
          <Link
            to="/yatras/$slug"
            params={{ slug: yatra.slug }}
            data-ocid={`yatras.explore.${index + 1}`}
            className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all hover:gap-2 flex-shrink-0"
            style={{ background: "#E8541A", color: "#FFFFFF" }}
          >
            View Details <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
