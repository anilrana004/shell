import { motion } from "motion/react";

const AWARDS = [
  {
    name: "Ministry of Tourism",
    detail: "Registered Tour Operator",
    emoji: "🇻🇦",
  },
  {
    name: "AATO Member",
    detail: "Adventure Tour Operators Assoc.",
    emoji: "🏦",
  },
  { name: "Uttarakhand Tourism", detail: "Licensed Operator", emoji: "🏔️" },
  { name: "Leave No Trace", detail: "LNT Certified", emoji: "🌿" },
  {
    name: "ISO 9001:2015",
    detail: "Quality Management Certified",
    emoji: "🏆",
  },
  {
    name: "TripAdvisor",
    detail: "Certificate of Excellence 2024",
    emoji: "⭐",
  },
  {
    name: "Outlook Traveller",
    detail: "Top 10 Trek Operators 2024",
    emoji: "📰",
  },
];

export function AwardsStripSection() {
  return (
    <section
      data-ocid="awards.section"
      style={{ background: "#EDF7F2" }}
      className="py-14"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <p
            className="text-xs uppercase tracking-[0.4em]"
            style={{ color: "#4A5E5250" }}
          >
            Certifications & Recognition
          </p>
        </div>
        <div
          className="overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-4 min-w-max mx-auto justify-center flex-wrap md:flex-nowrap">
            {AWARDS.map((award, i) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`awards.badge.${i + 1}`}
                className="flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(232,84,26,0.2)",
                  minWidth: "120px",
                }}
              >
                <span className="text-2xl">{award.emoji}</span>
                <p
                  className="text-xs font-bold text-center"
                  style={{ color: "#1A2A1E" }}
                >
                  {award.name}
                </p>
                <p
                  className="text-[10px] text-center"
                  style={{ color: "#4A5E5280" }}
                >
                  {award.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
