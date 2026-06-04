import { TESTIMONIALS } from "@/data/treks";
import { Filter, Play, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const VIDEO_TESTIMONIALS = [
  {
    id: "v1",
    name: "Rohit Verma",
    city: "Pune",
    trek: "Rupin Pass",
    thumbnail:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    duration: "2:34",
    views: 12400,
    slug: "rupin-pass",
  },
  {
    id: "v2",
    name: "Ananya Krishnan",
    city: "Chennai",
    trek: "Valley of Flowers",
    thumbnail:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
    duration: "3:12",
    views: 8700,
    slug: "valley-of-flowers",
  },
  {
    id: "v3",
    name: "Dev Sharma",
    city: "Jaipur",
    trek: "Kedarkantha",
    thumbnail:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&q=80",
    duration: "1:58",
    views: 21300,
    slug: "kedarkantha",
  },
];

const TREK_FILTERS = [
  "All",
  "Kedarkantha",
  "Rupin Pass",
  "Valley of Flowers",
  "Har Ki Dun",
  "Chopta Chandrashila",
];

export function TestimonialsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered =
    activeFilter === "All"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.trek === activeFilter);

  return (
    <section
      data-ocid="testimonials.section"
      style={{ background: "#FFFFFF" }}
      className="py-20 relative overflow-hidden"
    >
      {/* Cherry blossom pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: decorative static positions
            key={i}
            className="absolute text-[120px]"
            style={{
              left: `${(i * 13 + 5) % 90}%`,
              top: `${(i * 17 + 8) % 80}%`,
              opacity: 0.03,
              color: "#1A2A1E",
              fontFamily: "serif",
              transform: `rotate(${i * 45}deg)`,
            }}
          >
            ✿
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "#E8541A" }}
          >
            Real Trekkers, Real Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
          >
            VOICES FROM THE MOUNTAINS
          </motion.h2>
        </div>

        {/* Video testimonials */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {VIDEO_TESTIMONIALS.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-ocid={`testimonials.video.${i + 1}`}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={v.thumbnail}
                alt={`${v.name} testimonial video thumbnail`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.95) 100%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    background: "rgba(232,84,26,0.8)",
                    border: "2px solid rgba(212,237,224,0.4)",
                  }}
                >
                  <Play
                    size={18}
                    fill="#1A2A1E"
                    style={{ color: "#1A2A1E", marginLeft: "2px" }}
                  />
                </div>
              </div>
              <div className="absolute bottom-3 left-3">
                <p
                  className="text-xs font-semibold"
                  style={{ color: "#1A2A1E" }}
                >
                  {v.name} — {v.trek}
                </p>
                <p className="text-[10px]" style={{ color: "#4A5E52" }}>
                  {v.duration} · {v.views.toLocaleString()} views
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trek filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Filter
            size={13}
            style={{ color: "#4A5E5260" }}
            className="self-center"
          />
          {TREK_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              data-ocid={`testimonials.filter.${f.toLowerCase().replace(/ /g, "_")}`}
              onClick={() => setActiveFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background:
                  activeFilter === f ? "#E8541A" : "rgba(255,255,255,0.8)",
                border: `1px solid ${activeFilter === f ? "#E8541A" : "rgba(232,84,26,0.3)"}`,
                color: activeFilter === f ? "#1A2A1E" : "#4A5E52",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Text testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(filtered.length > 0 ? filtered : TESTIMONIALS).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-ocid={`testimonials.card.${i + 1}`}
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(232,84,26,0.2)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    // biome-ignore lint/suspicious/noArrayIndexKey: star icons are positional
                    key={j}
                    size={13}
                    fill="#D4A843"
                    style={{ color: "#D4A843" }}
                  />
                ))}
              </div>

              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "#4A5E52" }}
              >
                “{t.text}”
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={`${t.name} profile`}
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: "2px solid rgba(212,237,224,0.4)" }}
                />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#1A2A1E" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: "#4A5E5270" }}>
                    {t.city} · {t.trek} · {t.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <p
              className="col-span-full text-center text-sm"
              style={{ color: "#4A5E5260" }}
            >
              No reviews for this trek yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
