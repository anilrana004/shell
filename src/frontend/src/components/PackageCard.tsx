import type { HomepagePackage } from "@/data/packages";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bed,
  Bus,
  Clock,
  Compass,
  MapPin,
  Mountain,
  Percent,
  Shield,
  Star,
  Sun,
  Tent,
  Users,
  Utensils,
} from "lucide-react";
import type { ComponentType, CSSProperties } from "react";
import { motion } from "motion/react";

const INCLUSION_ICONS: Record<
  string,
  ComponentType<{ size?: number; style?: CSSProperties }>
> = {
  Camping: Tent,
  Meals: Utensils,
  Guide: Users,
  Transport: Bus,
  Insurance: Shield,
  Hotel: Bed,
  Darshan: Compass,
};

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
      <span className="text-xs font-semibold text-sh-ink">{rating.toFixed(1)}</span>
      <span className="text-[10px] text-sh-ash">({count} reviews)</span>
    </div>
  );
}

interface PackageCardProps {
  pkg: HomepagePackage;
  index: number;
}

export function PackageCard({ pkg, index }: PackageCardProps) {
  const savings = pkg.originalPrice - pkg.price;
  const savingsPct = Math.round((savings / pkg.originalPrice) * 100);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55 }}
      data-ocid={`packages.card.${index + 1}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 border border-sh-orange/25 shadow-[0_4px_20px_rgba(46,125,79,0.06)]"
    >
      <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
        <img
          src={pkg.image}
          alt={`${pkg.name} — exclusive package`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,42,30,0.25) 0%, transparent 45%, transparent 70%, rgba(255,255,255,0.12) 100%)",
          }}
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-sh-orange text-white shadow-sm">
            {pkg.tag}
          </span>
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(212,168,67,0.45)",
              color: "#9A7B2A",
            }}
          >
            {pkg.badge}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sh-gold/90 text-sh-ink">
            <Percent size={10} />
            Save {savingsPct}%
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{
              background: "rgba(26,42,30,0.88)",
              color: "#FFFFFF",
            }}
          >
            −₹{savings.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <div className="flex items-center gap-1 text-[11px] text-sh-green font-medium">
          <MapPin size={11} className="flex-shrink-0" />
          <span className="truncate">{pkg.region}</span>
        </div>

        <StarRating rating={pkg.rating} count={pkg.reviewCount} />

        <div>
          <h3
            className="text-lg font-semibold leading-tight mb-0.5 text-sh-ink"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {pkg.name}
          </h3>
          <p className="text-xs leading-snug line-clamp-2 text-sh-graphite">
            {pkg.tagline}
          </p>
        </div>

        <p className="text-[10px] leading-relaxed line-clamp-2 px-2 py-1.5 rounded-lg bg-sh-green-ultra text-sh-graphite">
          <span className="font-semibold text-sh-green">Itinerary: </span>
          {pkg.route}
        </p>

        <div className="flex flex-wrap gap-1">
          {pkg.treksIncluded.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-sh-green/10 text-sh-green"
            >
              <Mountain size={9} />
              {t}
            </span>
          ))}
        </div>

        <ul className="space-y-1">
          {pkg.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-1.5 text-[11px] leading-snug text-sh-graphite"
            >
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-sh-orange" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-sh-ash">
          <span className="flex items-center gap-1">
            <Clock size={10} className="text-sh-green" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <Sun size={10} className="text-sh-orange" />
            {pkg.bestTime}
          </span>
          <span className="px-1.5 py-0.5 rounded font-medium bg-sh-green/10 text-sh-green">
            {pkg.groupType}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 border-t border-sh-divider">
          {pkg.inclusionIcons.map((inc) => {
            const Icon = INCLUSION_ICONS[inc] ?? Shield;
            return (
              <span
                key={inc}
                className="flex flex-col items-center gap-0.5 min-w-[44px]"
                title={inc}
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-sh-green-ultra border border-sh-border">
                  <Icon size={12} className="text-sh-green" />
                </span>
                <span className="text-[9px] font-medium text-sh-ash">{inc}</span>
              </span>
            );
          })}
        </div>

        <div className="rounded-lg px-2.5 py-2 bg-sh-orange-ultra border border-sh-orange/15 space-y-1">
          {pkg.includes.slice(0, 3).map((item) => (
            <p key={item} className="text-[10px] text-sh-graphite leading-snug">
              ✓ {item}
            </p>
          ))}
        </div>

        <div className="flex items-end justify-between gap-2 mt-auto pt-2 border-t border-sh-divider">
          <div>
            <p className="text-xs line-through text-sh-ash">
              ₹{pkg.originalPrice.toLocaleString("en-IN")}
            </p>
            <span className="text-[10px] uppercase tracking-wider font-medium text-sh-ash">
              Bundle from
            </span>
            <p
              className="text-xl font-bold leading-none text-sh-orange"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ₹{pkg.price.toLocaleString("en-IN")}
              <span className="text-[10px] font-normal ml-0.5 text-sh-ash">
                / person
              </span>
            </p>
          </div>
          <Link
            to={pkg.linkTo}
            data-ocid={`packages.book.${index + 1}`}
            className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide bg-sh-orange text-white transition-all hover:gap-2 flex-shrink-0"
          >
            View Package <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
