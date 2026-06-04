import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  ChevronDown,
  Headphones,
  Map as MapIcon,
  Package,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const FEATURES = [
  {
    icon: Shield,
    title: "Certified Guides",
    shortDesc: "ITBP-certified, wilderness first-aid trained",
    detail:
      "All our guides hold certifications from ITBP (Indo-Tibetan Border Police) and the National Institute of Mountaineering. Each guide has 5–15 years of Himalayan trekking experience, speaks English fluently, and is trained in wilderness first aid, pulse oximetry, and emergency evacuation protocols.",
  },
  {
    icon: Package,
    title: "Premium Gear",
    shortDesc: "-10°C rated sleeping bags, dome tents, GPS",
    detail:
      "We invest in the finest mountain equipment: Quechua and North Face high-altitude tents, sleeping bags rated to -10°C, Thermarest sleeping pads, trekking poles for all, and a dedicated Gamow bag for high-altitude pulmonary emergencies. Every batch carries a pulse oximeter and supplemental oxygen.",
  },
  {
    icon: Star,
    title: "All-Inclusive",
    shortDesc: "Transport, meals, camping, permits — all covered",
    detail:
      "Your trek price covers everything: pickup and drop from Dehradun ISBT, all meals from Day 1 dinner, purified drinking water at all camps, all forest permits and camping fees, medical kit, and group travel insurance of ₹10L per person. No hidden charges, ever.",
  },
  {
    icon: Users,
    title: "Small Groups",
    shortDesc: "Max 15 trekkers per batch for intimate experience",
    detail:
      "We deliberately cap all batches at 15 trekkers to ensure personalized attention, faster-moving groups, minimal environmental impact, and the intimate mountain experience that large operators simply cannot provide. Guide ratio: 1 guide per 8 trekkers minimum.",
  },
  {
    icon: MapIcon,
    title: "Expert Planning",
    shortDesc: "Acclimatization-optimized itineraries since 2015",
    detail:
      "Our itineraries aren't copied from other operators — they've been refined over 9 years and 200+ batches. Every itinerary is designed around altitude acclimatization science, weather windows, and campsite quality. We've walked these trails hundreds of times.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    shortDesc: "Real-time GPS tracking, emergency response",
    detail:
      "Our Dehradun operations center monitors every batch via GPS tracker in real time. Family members can request a location update anytime. Our emergency response team can dispatch rescue within 2 hours for any evacuation need. Phone: +91-8279888470, available Mon–Sun 7AM–10PM.",
  },
];

export function WhyUsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      data-ocid="why_us.section"
      style={{ background: "#FFFFFF" }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Heading & text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.4em] mb-4"
              style={{ color: "#E8541A" }}
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
            >
              NOT JUST A TREK.
              <br />
              <span style={{ color: "#E8541A", fontStyle: "italic" }}>
                AN EXPERIENCE.
              </span>
            </motion.h2>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "#4A5E52" }}
            >
              Shail Hikers was born from a deep love for the Himalayas — not
              from a business plan. Every decision we make is guided by the
              question: "What would we want if this were our trek?" That
              philosophy has earned us 4.9 stars across 342 reviews and 10,000+
              completed expeditions.
            </p>
            <Link
              to="/about"
              data-ocid="why_us.learn_more"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: "#E8541A" }}
            >
              Our full story →
            </Link>
          </div>

          {/* Right — Feature cards */}
          <div className="space-y-3">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon as LucideIcon;
              const isOpen = expanded === i;
              return (
                <div
                  key={feat.title}
                  data-ocid={`why_us.feature.${i + 1}`}
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(232,84,26,0.2)" }}
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 p-4 text-left transition-all"
                    style={{
                      background: isOpen
                        ? "rgba(232,84,26,0.12)"
                        : "rgba(255,255,255,0.7)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(232,84,26,0.2)" }}
                    >
                      <Icon size={18} style={{ color: "#E8541A" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "#1A2A1E" }}
                      >
                        {feat.title}
                      </p>
                      <p className="text-xs" style={{ color: "#4A5E52" }}>
                        {feat.shortDesc}
                      </p>
                    </div>
                    <ChevronDown
                      size={15}
                      style={{
                        color: "#4A5E52",
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.25s",
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p
                          className="px-5 py-4 text-xs leading-relaxed"
                          style={{
                            color: "#4A5E52",
                            background: "rgba(255,255,255,0.5)",
                          }}
                        >
                          {feat.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
