import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import { motion } from "motion/react";

const PACKAGES = [
  {
    name: "Kedarkantha + Har Ki Dun",
    subtitle: "The Ultimate Govind Sanctuary Experience",
    price: 11999,
    originalPrice: 14498,
    duration: "13 Days / 12 Nights",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80",
    badge: "Most Popular",
    highlights: [
      "Winter Snow + Valley Trek",
      "Full Govind Wildlife Sanctuary",
      "2 different ecosystems",
    ],
    includes: [
      "Both trek fees",
      "Transport for both",
      "All meals",
      "Guide for entire trip",
      "Group insurance",
    ],
    excludes: ["Personal porter", "Merchandise kit"],
    tag: "COMBO SAVER",
    slug: "packages",
  },
  {
    name: "Chardham Yatra Deluxe",
    subtitle: "India's Most Sacred Pilgrimage, Elevated",
    price: 24999,
    originalPrice: 29999,
    duration: "11 Days / 10 Nights",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
    badge: "⭐ Premium",
    highlights: [
      "Deluxe hotel accommodation",
      "VIP Darshan priority",
      "Helicopter option included",
    ],
    includes: [
      "All 4 dhams access",
      "Premium transport",
      "All meals",
      "Dedicated guide",
      "Travel insurance",
    ],
    excludes: ["Personal helicopter upgrade", "Extra excursions"],
    tag: "BEST VALUE",
    slug: "yatras/chardham-yatra",
  },
  {
    name: "Uttarakhand Winter Special",
    subtitle: "3 Snow Treks — One Epic Winter Journey",
    price: 15999,
    originalPrice: 19497,
    duration: "15 Days / 14 Nights",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    badge: "Winter 2025",
    highlights: [
      "Kedarkantha + Dayara + Nag Tibba",
      "3 snow summits in 15 days",
      "Progressive altitude training",
    ],
    includes: [
      "All 3 trek fees",
      "Transport + logistics",
      "All meals",
      "Specialist guide team",
      "Full insurance",
    ],
    excludes: ["Personal gear", "Extra accommodation"],
    tag: "SEASONAL",
    slug: "packages",
  },
];

export function PackagesSection() {
  return (
    <section
      data-ocid="packages.section"
      style={{ background: "#EDF7F2" }}
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
            Bundle & Save
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
          >
            EXCLUSIVE PACKAGES
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              data-ocid={`packages.card.${i + 1}`}
              className="rounded-2xl overflow-hidden group"
              style={{ border: "1px solid rgba(232,84,26,0.25)" }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={`${pkg.name} package`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(255,255,255,0.95) 100%)",
                  }}
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
                    style={{ background: "#E8541A", color: "#FFFFFF" }}
                  >
                    {pkg.tag}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                    style={{
                      background: "rgba(201,168,76,0.3)",
                      border: "1px solid #D4A84355",
                      color: "#D4A843",
                    }}
                  >
                    {pkg.badge}
                  </span>
                </div>
                {/* Savings badge */}
                <div className="absolute bottom-3 right-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style={{
                      background: "rgba(201,168,76,0.25)",
                      border: "1px solid #D4A84344",
                      color: "#D4A843",
                    }}
                  >
                    Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-5" style={{ background: "#FFFFFF" }}>
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#1A2A1E",
                  }}
                >
                  {pkg.name}
                </h3>
                <p className="text-xs mb-4" style={{ color: "#4A5E52" }}>
                  {pkg.subtitle}
                </p>

                {/* Mini comparison table */}
                <div
                  className="rounded-lg p-3 mb-4 space-y-1"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(232,84,26,0.15)",
                  }}
                >
                  {pkg.includes.slice(0, 3).map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: "#4A5E52" }}
                    >
                      <Check
                        size={12}
                        style={{ color: "#2E7D4F", flexShrink: 0 }}
                      />
                      {item}
                    </div>
                  ))}
                  {pkg.excludes.slice(0, 1).map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: "#4A5E5270" }}
                    >
                      <X
                        size={12}
                        style={{ color: "#E8541A70", flexShrink: 0 }}
                      />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-xs line-through"
                      style={{ color: "#4A5E5250" }}
                    >
                      ₹{pkg.originalPrice.toLocaleString()}
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color: "#D4A843",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      ₹{pkg.price.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    to={`/${pkg.slug}` as "/"}
                    data-ocid={`packages.book.${i + 1}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: "#E8541A", color: "#FFFFFF" }}
                  >
                    Book <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
