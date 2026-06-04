import { TREKS } from "@/data/treks";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function MapSection() {
  const [activeTrek, setActiveTrek] = useState<string | null>(null);

  return (
    <section
      data-ocid="map.section"
      style={{ background: "#FFFFFF" }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "#E8541A" }}
          >
            All 14 Trails
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
          >
            OUR TREKKING UNIVERSE
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "4/3",
                border: "1px solid rgba(232,84,26,0.3)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
                alt="Satellite view of Uttarakhand Himalayan trekking region"
                className="w-full h-full object-cover"
                style={{ filter: "saturate(0.8) brightness(0.7)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,42,30,0) 60%, rgba(255,255,255,0.85) 100%)",
                }}
              />

              {/* Trek pins */}
              {[
                {
                  name: "Kedarkantha",
                  x: "30%",
                  y: "35%",
                  slug: "kedarkantha",
                },
                { name: "Har Ki Dun", x: "22%", y: "28%", slug: "har-ki-dun" },
                { name: "Rupin Pass", x: "18%", y: "40%", slug: "rupin-pass" },
                {
                  name: "Valley of Flowers",
                  x: "55%",
                  y: "45%",
                  slug: "valley-of-flowers",
                },
                {
                  name: "Chopta",
                  x: "48%",
                  y: "60%",
                  slug: "chopta-chandrashila",
                },
                {
                  name: "Buran Ghati",
                  x: "12%",
                  y: "55%",
                  slug: "buran-ghati",
                },
              ].map((pin) => (
                <button
                  key={pin.slug}
                  type="button"
                  data-ocid={`map.pin.${pin.slug}`}
                  onClick={() =>
                    setActiveTrek(pin.slug === activeTrek ? null : pin.slug)
                  }
                  className="absolute group flex flex-col items-center gap-0.5 cursor-pointer"
                  style={{
                    left: pin.x,
                    top: pin.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full transition-all group-hover:scale-150"
                    style={{
                      background:
                        activeTrek === pin.slug ? "#1A2A1E" : "#E8541A",
                      border: "2px solid #1A2A1E",
                      boxShadow: "0 0 8px rgba(232,84,26,0.6)",
                    }}
                  />
                  <span
                    className="text-[10px] font-semibold whitespace-nowrap px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: "rgba(26,42,30,0.85)",
                      color: "#1A2A1E",
                      border: "1px solid rgba(232,84,26,0.4)",
                    }}
                  >
                    {pin.name}
                  </span>
                </button>
              ))}

              <div className="absolute bottom-4 left-4">
                <p className="text-xs" style={{ color: "#4A5E5280" }}>
                  Hover pins to explore routes
                </p>
              </div>
            </div>
          </div>

          {/* Trek list sidebar */}
          <div
            className="rounded-2xl p-4 overflow-y-auto"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(232,84,26,0.2)",
              maxHeight: "480px",
            }}
          >
            <h3
              className="text-xs uppercase tracking-widest mb-4 font-bold"
              style={{ color: "#1A2A1E" }}
            >
              All Treks
            </h3>
            <div className="space-y-1">
              {TREKS.map((t) => (
                <button
                  key={t.slug}
                  type="button"
                  data-ocid={`map.trek_list.${t.slug}`}
                  onClick={() =>
                    setActiveTrek(activeTrek === t.slug ? null : t.slug)
                  }
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all"
                  style={{
                    background:
                      activeTrek === t.slug
                        ? "rgba(232,84,26,0.2)"
                        : "transparent",
                    border: `1px solid ${activeTrek === t.slug ? "rgba(232,84,26,0.4)" : "transparent"}`,
                  }}
                >
                  <MapPin
                    size={12}
                    style={{ color: "#E8541A", flexShrink: 0 }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-medium truncate"
                      style={{ color: "#1A2A1E" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-[10px]" style={{ color: "#4A5E5260" }}>
                      {t.maxAltitude.toLocaleString()} ft · {t.durationDays}D
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: "#D4A843", flexShrink: 0 }}
                  >
                    ₹{t.basePrice.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
