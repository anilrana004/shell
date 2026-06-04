import { CheckCircle, ChevronDown, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const BENEFITS = [
  {
    title: "Dedicated Relationship Manager",
    detail:
      "A single point of contact from enquiry to post-trek delivery. Your RM handles all coordination, documentation, and on-ground requirements.",
  },
  {
    title: "₹10L Group Insurance Coverage",
    detail:
      "All corporate group participants are covered under our group insurance for medical emergencies, helicopter evacuation, and personal accidents during the trek.",
  },
  {
    title: "Custom Branding on Certificates",
    detail:
      "Completion certificates carry your company's logo alongside Shail Hikers branding — a keepsake your team will cherish.",
  },
  {
    title: "Post-Trek Deliverables",
    detail:
      "HR-ready team performance report, individual certificates, professional group photo album, and a curated social media content pack.",
  },
  {
    title: "Team Insurance & Safety Protocol",
    detail:
      "Dedicated safety briefing for corporate groups, GPS tracking with real-time family updates, and evacuation drill before trek departure.",
  },
];

export function CorporateCTASection() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    headcount: "",
    dates: "",
    trek: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      data-ocid="corporate.section"
      style={{ background: "#EDF7F2" }}
      className="py-20 relative overflow-hidden"
    >
      {/* Topographic SVG pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          width="100%"
          height="100%"
          className="opacity-[0.03]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="topo"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#1A2A1E"
                strokeWidth="1"
              />
              <circle
                cx="60"
                cy="60"
                r="35"
                fill="none"
                stroke="#1A2A1E"
                strokeWidth="1"
              />
              <circle
                cx="60"
                cy="60"
                r="20"
                fill="none"
                stroke="#1A2A1E"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>
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
            Team Experiences
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
          >
            FORGE YOUR TEAM
            <br />
            <span style={{ color: "#E8541A", fontStyle: "italic" }}>
              IN THE HIMALAYAS
            </span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Benefits + Case study */}
          <div>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "#4A5E52" }}
            >
              50+ corporate groups have transformed their team dynamics through
              our curated Himalayan experiences. From 10-person startup retreats
              to 200-person enterprise offsites — we customize every detail.
            </p>

            <div className="space-y-2 mb-8">
              {BENEFITS.map((b, i) => (
                <div
                  key={b.title}
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(232,84,26,0.2)" }}
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    data-ocid={`corporate.benefit.${i + 1}`}
                    className="w-full flex items-center justify-between p-4 text-left"
                    style={{
                      background:
                        expanded === i
                          ? "rgba(232,84,26,0.1)"
                          : "rgba(255,255,255,0.7)",
                    }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#1A2A1E" }}
                    >
                      {b.title}
                    </span>
                    <ChevronDown
                      size={14}
                      style={{
                        color: "#4A5E52",
                        transform: expanded === i ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                  {expanded === i && (
                    <p
                      className="px-4 py-3 text-xs leading-relaxed"
                      style={{
                        color: "#4A5E52",
                        background: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {b.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Case study */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(232,84,26,0.1)",
                border: "1px solid rgba(232,84,26,0.3)",
              }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "#E8541A" }}
              >
                Case Study
              </p>
              <p
                className="text-sm font-semibold mb-2"
                style={{ color: "#1A2A1E" }}
              >
                How Infosys Hyderabad (45 people) transformed team dynamics on
                Kedarkantha
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#4A5E52" }}
              >
                "The Shail Hikers team created a private batch exclusively for
                us. By Day 3, our entire team — across 5 departments that barely
                spoke to each other — were helping each other through the snow.
                Best team-building investment we've ever made."
                <br />
                <span className="font-medium" style={{ color: "#D4A843" }}>
                  — HR Director, Infosys Hyderabad
                </span>
              </p>
            </div>
          </div>

          {/* Right — Quote form */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(232,84,26,0.25)",
            }}
          >
            {!submitted ? (
              <>
                <h3
                  className="text-xl font-semibold mb-5"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#1A2A1E",
                  }}
                >
                  Get a Custom Quote
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    {
                      label: "Your Name",
                      key: "name" as const,
                      type: "text",
                      placeholder: "Rajesh Kumar",
                      id: "corporate.name_input",
                    },
                    {
                      label: "Company Name",
                      key: "company" as const,
                      type: "text",
                      placeholder: "Infosys Ltd.",
                      id: "corporate.company_input",
                    },
                    {
                      label: "Headcount",
                      key: "headcount" as const,
                      type: "number",
                      placeholder: "15 employees",
                      id: "corporate.headcount_input",
                    },
                    {
                      label: "Preferred Dates",
                      key: "dates" as const,
                      type: "text",
                      placeholder: "Feb 15–20, 2025",
                      id: "corporate.dates_input",
                    },
                    {
                      label: "Trek Preference",
                      key: "trek" as const,
                      type: "text",
                      placeholder: "Kedarkantha, Har Ki Dun...",
                      id: "corporate.trek_input",
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label
                        htmlFor={field.id}
                        className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
                        style={{ color: "#4A5E52" }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        data-ocid={field.id}
                        required
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.9)",
                          border: "1px solid rgba(212,237,224,0.2)",
                          color: "#1A2A1E",
                        }}
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    data-ocid="corporate.submit_button"
                    className="w-full py-3.5 rounded-xl font-semibold tracking-wide text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                    style={{ background: "#E8541A", color: "#FFFFFF" }}
                  >
                    <Send size={15} />
                    Send Quote Request
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <CheckCircle
                  size={48}
                  style={{ color: "#2E7D4F" }}
                  className="mx-auto mb-4"
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#1A2A1E",
                  }}
                >
                  Quote Request Sent!
                </h3>
                <p className="text-sm" style={{ color: "#4A5E52" }}>
                  Our corporate team will contact you within 4 hours with a
                  custom proposal.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
