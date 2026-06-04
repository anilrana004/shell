import { YatraCard } from "@/components/YatraCard";
import { YATRAS } from "@/data/treks";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useRef } from "react";

export function YatraSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      data-ocid="yatras.section"
      className="py-20 bg-sh-green-ultra border-t-4 border-sh-orange"
      style={{
        background:
          "linear-gradient(180deg, var(--sh-green-ultra) 0%, var(--sh-green-pale) 55%, var(--sh-green-ultra) 100%)",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Brand watermark — orange ॐ (matches logo accent) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-sh-orange"
          style={{
            opacity: 0.09,
            fontSize: "clamp(12rem, 28vw, 24rem)",
            fontFamily: "serif",
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          ॐ
        </div>

        <div className="relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs uppercase tracking-[0.3em] mb-3 text-sh-green font-semibold"
              >
                Sacred Journeys
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-semibold text-sh-ink"
                style={{ fontFamily: "var(--font-display)" }}
              >
                YATRAS & SACRED TOURS
              </motion.h2>
              <p className="mt-3 text-sm max-w-lg text-sh-graphite">
                Curated pilgrimage packages with hotels, meals, transport & guided
                darshan — book like any premium travel agency
              </p>
            </div>
            <Link
              to="/yatras/$slug"
              params={{ slug: "chardham-yatra" }}
              data-ocid="yatras.view_all"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-sh-green transition-colors hover:text-sh-orange"
            >
              View All Sacred Tours →
            </Link>
          </div>

          <div
            ref={scrollRef}
            className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <div
              className="flex gap-5 items-stretch"
              style={{ width: "max-content" }}
            >
              {YATRAS.map((yatra, i) => (
                <YatraCard
                  key={yatra.id}
                  yatra={yatra}
                  index={i}
                  layout="carousel"
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center md:hidden">
            <Link
              to="/yatras/$slug"
              params={{ slug: "chardham-yatra" }}
              data-ocid="yatras.view_all_mobile"
              className="px-6 py-3 rounded-xl text-sm font-semibold tracking-wide border border-sh-orange/40 text-sh-orange hover:bg-sh-orange-pale transition-colors"
            >
              View All Sacred Tours →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
