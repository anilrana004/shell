import { YATRAS } from "@/data/treks";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const PILGRIMAGE_COLORS: Record<string, string> = {
  Easy: "#2E7D4F",
  Moderate: "#D4A843",
  Challenging: "#E8541A",
};

function getDaysUntil(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.max(
    0,
    Math.floor((d.getTime() - now.getTime()) / 86400000),
  );
  return diff;
}

export function YatraSection() {
  return (
    <section
      data-ocid="yatras.section"
      style={{ background: "#EDF7F2" }}
      className="py-20"
    >
      {/* Om watermark */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            opacity: 0.04,
            fontSize: "24rem",
            fontFamily: "serif",
            color: "#1A2A1E",
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          ॐ
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.4em] mb-3"
              style={{ color: "#E8541A" }}
            >
              Sacred Journeys
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
            >
              YATRAS & SACRED TOURS
            </motion.h2>
            <p className="mt-4 text-sm" style={{ color: "#4A5E52" }}>
              Experience the divine — Uttarakhand's most revered pilgrimages
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {YATRAS.map((yatra, i) => {
              const daysUntil = getDaysUntil(yatra.nextDeparture);
              const pilgrimageColor =
                PILGRIMAGE_COLORS[yatra.pilgrimage as string] ?? "#D4A843";
              return (
                <motion.div
                  key={yatra.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  data-ocid={`yatras.card.${i + 1}`}
                  className="group rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(232,84,26,0.2)" }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={yatra.heroImage}
                      alt={`${yatra.name} - sacred pilgrimage journey`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(26,42,30,0) 40%, rgba(255,255,255,0.95) 100%)",
                      }}
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                        style={{
                          background: `${pilgrimageColor}33`,
                          border: `1px solid ${pilgrimageColor}66`,
                          color: pilgrimageColor,
                        }}
                      >
                        {yatra.pilgrimage as string}
                      </span>
                      {yatra.requiresAdvanceRegistration && (
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                          style={{
                            background: "rgba(232,84,26,0.35)",
                            color: "#1A2A1E",
                          }}
                        >
                          Reg Required
                        </span>
                      )}
                    </div>
                    {yatra.helicopterOption && (
                      <div className="absolute top-3 right-3">
                        <span
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                          style={{
                            background: "rgba(201,168,76,0.3)",
                            border: "1px solid #D4A84366",
                            color: "#D4A843",
                          }}
                        >
                          🚁 Heli
                        </span>
                      </div>
                    )}
                    {/* Departure countdown */}
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                        style={{
                          background: "rgba(26,42,30,0.85)",
                          border: "1px solid rgba(212,237,224,0.3)",
                          color: "#4A5E52",
                        }}
                      >
                        <Calendar size={10} />
                        {daysUntil > 0
                          ? `In ${daysUntil} days`
                          : "Departing soon"}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4" style={{ background: "#FFFFFF" }}>
                    <h3
                      className="text-base font-semibold mb-1 leading-tight"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "#1A2A1E",
                      }}
                    >
                      {yatra.name}
                    </h3>
                    <p
                      className="text-xs mb-3 line-clamp-2"
                      style={{ color: "#4A5E52" }}
                    >
                      {yatra.tagline}
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "#4A5E5280" }}
                      >
                        <Clock size={11} /> {yatra.durationDays}D/
                        {yatra.durationNights}N
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className="text-[10px] uppercase"
                          style={{ color: "#4A5E5250" }}
                        >
                          From
                        </span>
                        <p
                          className="text-base font-bold"
                          style={{
                            color: "#D4A843",
                            fontFamily: "var(--font-display)",
                          }}
                        >
                          ₹{yatra.basePrice.toLocaleString()}
                        </p>
                      </div>
                      <Link
                        to="/yatras/$slug"
                        params={{ slug: yatra.slug }}
                        data-ocid={`yatras.explore.${i + 1}`}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                        style={{
                          background: "rgba(232,84,26,0.2)",
                          border: "1px solid rgba(232,84,26,0.35)",
                          color: "#E8541A",
                        }}
                      >
                        Explore →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
