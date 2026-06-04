import { TrekCard } from "@/components/TrekCard";
import { TREKS } from "@/data/treks";
import { Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function FeaturedTreksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const _inView = useInView(ref, { once: true });
  const featured = TREKS.slice(0, 6);

  return (
    <section
      data-ocid="featured_treks.section"
      className="py-20 bg-sh-green-ultra"
      style={{
        background:
          "linear-gradient(180deg, var(--sh-green-ultra) 0%, var(--sh-green-pale) 55%, var(--sh-green-ultra) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] mb-3 text-sh-green font-semibold"
            >
              Handpicked for You
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-semibold text-sh-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              LEGENDARY TRAILS
            </motion.h2>
            <p className="mt-3 text-sm max-w-lg text-sh-graphite">
              Full trek details — route, altitude, inclusions & certified guides,
              like a premium adventure agency
            </p>
          </div>
          <Link
            to="/treks"
            data-ocid="featured_treks.view_all"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-sh-green transition-colors hover:text-sh-orange"
          >
            View All 14 Treks →
          </Link>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          ref={ref}
          className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-5 items-stretch" style={{ width: "max-content" }}>
            {featured.map((trek, i) => (
              <TrekCard key={trek.id} trek={trek} index={i} layout="carousel" />
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center md:hidden">
          <Link
            to="/treks"
            data-ocid="featured_treks.view_all_mobile"
            className="px-6 py-3 rounded-xl text-sm font-semibold tracking-wide border border-sh-orange/40 text-sh-orange hover:bg-sh-orange-pale transition-colors"
          >
            View All 14 Treks →
          </Link>
        </div>
      </div>
    </section>
  );
}
