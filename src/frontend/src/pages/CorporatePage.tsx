import {
  Award,
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Layout } from "../components/Layout";

const benefits = [
  {
    icon: TrendingUp,
    title: "Leadership Development",
    desc: "Trail challenges expose natural leaders and build confident decision-making under pressure in your team.",
  },
  {
    icon: Shield,
    title: "Trust Building",
    desc: "Shared hardship builds deep inter-team trust that no boardroom exercise can replicate.",
  },
  {
    icon: Award,
    title: "Resilience Training",
    desc: "The Himalayas teach teams to push through fatigue and uncertainty. That resilience transfers to the workplace.",
  },
  {
    icon: Users,
    title: "Shared Achievement",
    desc: "Standing together on a Himalayan summit creates a shared memory that drives long-term cohesion.",
  },
];

const packages = [
  {
    name: "Team Spark",
    people: "15-25 people",
    duration: "2 Days",
    trek: "Nag Tibba",
    price: "Rs 8,999",
    color: "#4A5E52",
    includes: [
      "Expert guide",
      "All meals",
      "Camping gear",
      "Completion certificate",
    ],
    highlight: false,
  },
  {
    name: "Team Summit",
    people: "25-50 people",
    duration: "4 Days",
    trek: "Kedarkantha",
    price: "Rs 14,999",
    color: "#E8541A",
    includes: [
      "Expert guide",
      "All meals",
      "Camping gear",
      "Certificate",
      "Professional photography",
      "Drone footage",
    ],
    highlight: true,
  },
  {
    name: "Leadership Expedition",
    people: "10-30 people",
    duration: "6 Days",
    trek: "Har Ki Dun",
    price: "Rs 24,999",
    color: "#D4A843",
    includes: [
      "Senior guide + co-guide",
      "Premium meals",
      "Private tents",
      "Certificate",
      "Photo album",
      "Team performance report",
    ],
    highlight: false,
  },
  {
    name: "Custom Enterprise",
    people: "Any team size",
    duration: "Custom",
    trek: "Your choice",
    price: "Contact us",
    color: "#2E7D4F",
    includes: [
      "Fully tailored itinerary",
      "Custom branding on gear",
      "Dedicated relationship manager",
      "Executive-grade logistics",
      "Full post-trek report",
      "Social media content pack",
    ],
    highlight: false,
  },
];

const deliverables = [
  {
    icon: "\u{1F4F8}",
    title: "Group Photo Album",
    desc: "High-resolution digital album with 100+ curated photos from the trek, delivered within 10 working days.",
  },
  {
    icon: "\u{1F4DC}",
    title: "Individual Certificates",
    desc: "Personalised Himalayan achievement certificates for every team member, framed and ready to display.",
  },
  {
    icon: "\u{1F4CA}",
    title: "Team Performance Report",
    desc: "An HR-ready report mapping trek observations to leadership behaviours and resilience indicators.",
  },
  {
    icon: "\u{1F4F1}",
    title: "Social Media Content Pack",
    desc: "30 edited reels, 60 photos, and copy templates for LinkedIn and Instagram.",
  },
];

const clients = ["Infosys", "Wipro", "TCS", "Deloitte", "KPMG", "Google"];

const insuranceItems = [
  { label: "Medical Evacuation", value: "Rs 10,00,000 per person" },
  {
    label: "Group Liability",
    value: "Covered for all terrain and weather incidents",
  },
  {
    label: "Adventure Sports Cover",
    value: "Trekking, camping, river crossings included",
  },
  {
    label: "Emergency Hospitalisation",
    value: "Direct billing at network hospitals",
  },
  {
    label: "Repatriation",
    value: "Full cover for medical repatriation to home city",
  },
];

export default function CorporatePage() {
  const [headcount, setHeadcount] = useState("");
  const [budget, setBudget] = useState("");
  const [month, setMonth] = useState("");
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    headcount: "",
    dates: "",
    trek: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function calculatePackage() {
    const count = Number.parseInt(headcount || "0");
    const b = Number.parseInt(budget || "0");
    if (count >= 25 && b >= 14999)
      setRecommendation(
        "Team Summit - Kedarkantha, 4 days. Perfect for 25-50 people at Rs 14,999/person.",
      );
    else if (count >= 10 && b >= 24999)
      setRecommendation(
        "Leadership Expedition - Har Ki Dun, 6 days. Ideal for leadership teams at Rs 24,999/person.",
      );
    else if (count >= 15 && b >= 8999)
      setRecommendation(
        "Team Spark - Nag Tibba, 2 days. Great starter for 15-25 people at Rs 8,999/person.",
      );
    else
      setRecommendation(
        "Custom Enterprise package recommended. Contact us for a tailored quote.",
      );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#EDF7F2",
    border: "1px solid rgba(212,237,224,0.25)",
    color: "#1A2A1E",
    borderRadius: 8,
    padding: "0.6rem 0.75rem",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
  };

  return (
    <Layout>
      <div style={{ background: "#EDF7F2", minHeight: "100vh" }}>
        {/* Hero */}
        <section className="relative h-[75vh] min-h-[520px] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&h=900&fit=crop&q=80"
            alt="Corporate trekking team in Himalayas"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.35)" }}
          />
          <div className="relative text-center px-4 z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(212,237,224,0.4)",
                color: "#4A5E52",
                padding: "4px 16px",
                borderRadius: 999,
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                marginBottom: "1.25rem",
                textTransform: "uppercase" as const,
              }}
            >
              <Building2 className="w-3.5 h-3.5" /> Corporate and Group
              Experiences
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem, 7vw, 4.5rem)",
                color: "#1A2A1E",
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: "1.25rem",
              }}
            >
              FORGE YOUR TEAM IN THE HIMALAYAS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{
                color: "#4A5E52",
                fontFamily: "var(--font-body)",
                fontSize: "1.1rem",
                maxWidth: 500,
                margin: "0 auto 2rem",
              }}
            >
              50+ corporate groups have discovered that the most powerful
              team-building happens at 12,000 feet.
            </motion.p>
            <a
              href="#quote"
              data-ocid="corporate.hero_cta_button"
              style={{
                display: "inline-block",
                background: "#E8541A", color: "#FFFFFF",
                padding: "0.875rem 2.25rem",
                borderRadius: 999,
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Request a Corporate Quote
            </a>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4" style={{ background: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                color: "#1A2A1E",
                textAlign: "center",
                marginBottom: "3rem",
                fontWeight: 700,
              }}
            >
              Why Companies Choose the Mountains
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-6 rounded-2xl text-center"
                  style={{
                    background: "#EDF7F2",
                    border: "1px solid rgba(212,237,224,0.12)",
                  }}
                >
                  <b.icon
                    className="w-8 h-8 mx-auto mb-3"
                    style={{ color: "#E8541A" }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      color: "#1A2A1E",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {b.title}
                  </h3>
                  <p
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {b.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20 px-4" style={{ background: "#EDF7F2" }}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                color: "#1A2A1E",
                textAlign: "center",
                marginBottom: "3rem",
                fontWeight: 700,
              }}
            >
              Corporate Packages
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: "#FFFFFF",
                    border: `2px solid ${pkg.highlight ? "#E8541A" : "rgba(212,237,224,0.15)"}`,
                    boxShadow: pkg.highlight
                      ? "0 0 30px rgba(232,84,26,0.2)"
                      : "none",
                  }}
                >
                  {pkg.highlight && (
                    <div
                      style={{
                        background: "#E8541A",
                        textAlign: "center",
                        padding: "4px",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        color: "#1A2A1E",
                        letterSpacing: "0.1em",
                      }}
                    >
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div
                      style={{
                        color: pkg.color,
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {pkg.trek}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.5rem",
                        color: "#1A2A1E",
                        fontWeight: 700,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {pkg.name}
                    </h3>
                    <div
                      style={{
                        color: "#4A5E52",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {pkg.people} - {pkg.duration}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.875rem",
                        color: "#D4A843",
                        fontWeight: 700,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {pkg.price}
                      <span
                        style={{
                          fontSize: "0.875rem",
                          color: "#4A5E52",
                          fontFamily: "var(--font-body)",
                          fontWeight: 400,
                        }}
                      >
                        /person
                      </span>
                    </div>
                    <ul className="flex-1 space-y-2 mb-5">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            style={{ color: pkg.color }}
                          />
                          <span
                            style={{
                              color: "#4A5E52",
                              fontFamily: "var(--font-body)",
                              fontSize: "0.85rem",
                            }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#quote"
                      data-ocid={`corporate.package_${i + 1}_button`}
                      style={{
                        display: "block",
                        textAlign: "center",
                        background: pkg.highlight ? "#E8541A" : "transparent",
                        border: `1px solid ${pkg.color}`,
                        color: pkg.highlight ? "#1A2A1E" : pkg.color,
                        padding: "0.625rem",
                        borderRadius: 999,
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        textDecoration: "none",
                      }}
                    >
                      Get Quote
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Planner */}
        <section className="py-20 px-4" style={{ background: "#FFFFFF" }}>
          <div className="max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                color: "#1A2A1E",
                textAlign: "center",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              Corporate Trek Planner
            </motion.h2>
            <p
              style={{
                textAlign: "center",
                color: "#4A5E52",
                fontFamily: "var(--font-body)",
                marginBottom: "2rem",
                fontSize: "0.9rem",
              }}
            >
              Answer 3 quick questions and we will recommend your ideal package.
            </p>
            <div
              className="rounded-2xl p-7 flex flex-col gap-4"
              style={{
                background: "#EDF7F2",
                border: "1px solid rgba(232,84,26,0.25)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="corp-headcount"
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Team Headcount
                  </label>
                  <input
                    id="corp-headcount"
                    type="number"
                    placeholder="e.g. 30"
                    value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                    data-ocid="corporate.planner_headcount_input"
                    style={{ ...inputStyle, background: "#FFFFFF" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="corp-budget"
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Budget per Person (Rs)
                  </label>
                  <input
                    id="corp-budget"
                    type="number"
                    placeholder="e.g. 15000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    data-ocid="corporate.planner_budget_input"
                    style={{ ...inputStyle, background: "#FFFFFF" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="corp-month"
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Preferred Month
                  </label>
                  <select
                    id="corp-month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    data-ocid="corporate.planner_month_select"
                    style={{ ...inputStyle, background: "#FFFFFF" }}
                  >
                    <option value="">Select month</option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={calculatePackage}
                data-ocid="corporate.planner_calculate_button"
                style={{
                  background: "#E8541A", color: "#FFFFFF",
                  border: "none",
                  padding: "0.75rem 2rem",
                  borderRadius: 999,
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  fontSize: "0.95rem",
                }}
              >
                Calculate Ideal Package
              </button>
              <AnimatePresence>
                {recommendation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: "rgba(232,84,26,0.12)",
                      border: "1px solid rgba(232,84,26,0.35)",
                      borderRadius: 12,
                      padding: "1rem 1.25rem",
                      color: "#1A2A1E",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                    }}
                    data-ocid="corporate.planner_result"
                  >
                    <strong style={{ color: "#D4A843" }}>Recommended: </strong>
                    {recommendation}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Post-Trek Deliverables */}
        <section className="py-20 px-4" style={{ background: "#EDF7F2" }}>
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.25rem",
                color: "#1A2A1E",
                textAlign: "center",
                marginBottom: "3rem",
                fontWeight: 700,
              }}
            >
              What You Take Home
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliverables.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(212,237,224,0.12)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2.25rem", marginBottom: "0.75rem" }}>
                    {d.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.125rem",
                      color: "#1A2A1E",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {d.title}
                  </h3>
                  <p
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {d.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Logos */}
        <section className="py-16 px-4" style={{ background: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto text-center">
            <p
              style={{
                color: "#4A5E52",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              Trusted by India leading Companies
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {clients.map((c) => (
                <div
                  key={c}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    color: "#1A2A1E",
                    opacity: 0.55,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    padding: "0.5rem 1.25rem",
                    border: "1px solid rgba(212,237,224,0.12)",
                    borderRadius: 8,
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-16 px-4" style={{ background: "#EDF7F2" }}>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <div
                style={{
                  background: "#FFFFFF",
                  padding: "0.75rem 1.5rem",
                  borderBottom: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                <span
                  style={{
                    color: "#D4A843",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Case Study
                </span>
              </div>
              <div style={{ background: "#FFFFFF", padding: "2rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    color: "#1A2A1E",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                  }}
                >
                  Infosys Hyderabad - Kedarkantha 2023
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[
                    ["45", "Team Members"],
                    ["98%", "Satisfaction"],
                    ["+40%", "Cohesion Score"],
                  ].map(([val, lbl]) => (
                    <div key={lbl} className="text-center">
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.75rem",
                          color: "#D4A843",
                          fontWeight: 700,
                        }}
                      >
                        {val}
                      </div>
                      <div
                        style={{
                          color: "#4A5E52",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {lbl}
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  style={{
                    color: "#4A5E52",
                    fontFamily: "var(--font-body)",
                    lineHeight: 1.75,
                    fontSize: "0.9rem",
                  }}
                >
                  The Kedarkantha trek with Shail Hikers transformed how our
                  45-member engineering team works together. The post-trek
                  survey showed a 40% increase in team cohesion scores and 98%
                  of participants rated the experience 5/5.
                  <span
                    style={{
                      display: "block",
                      marginTop: "0.75rem",
                      color: "#1A2A1E",
                      fontWeight: 600,
                    }}
                  >
                    HR Director, Infosys Hyderabad
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Insurance Accordion */}
        <section className="py-16 px-4" style={{ background: "#FFFFFF" }}>
          <div className="max-w-3xl mx-auto">
            <button
              type="button"
              onClick={() => setInsuranceOpen((o) => !o)}
              data-ocid="corporate.insurance_accordion_toggle"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#EDF7F2",
                border: "1px solid rgba(232,84,26,0.3)",
                color: "#1A2A1E",
                padding: "1.25rem 1.5rem",
                borderRadius: insuranceOpen ? "12px 12px 0 0" : 12,
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <span>Group Insurance Coverage</span>
              {insuranceOpen ? (
                <ChevronUp className="w-5 h-5" style={{ color: "#E8541A" }} />
              ) : (
                <ChevronDown className="w-5 h-5" style={{ color: "#E8541A" }} />
              )}
            </button>
            <AnimatePresence>
              {insuranceOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      background: "#EDF7F2",
                      border: "1px solid rgba(232,84,26,0.3)",
                      borderTop: "none",
                      borderRadius: "0 0 12px 12px",
                      padding: "1.5rem",
                    }}
                  >
                    {insuranceItems.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-3 mb-3"
                      >
                        <CheckCircle
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: "#E8541A" }}
                        />
                        <div>
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              color: "#1A2A1E",
                              fontWeight: 600,
                              fontSize: "0.9rem",
                            }}
                          >
                            {item.label}:{" "}
                          </span>
                          <span
                            style={{
                              color: "#4A5E52",
                              fontFamily: "var(--font-body)",
                              fontSize: "0.9rem",
                            }}
                          >
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Quote Form */}
        <section
          id="quote"
          className="py-20 px-4"
          style={{ background: "#EDF7F2" }}
        >
          <div className="max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.25rem",
                color: "#1A2A1E",
                textAlign: "center",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              Request a Corporate Quote
            </motion.h2>
            <p
              style={{
                textAlign: "center",
                color: "#4A5E52",
                fontFamily: "var(--font-body)",
                marginBottom: "2.5rem",
                fontSize: "0.9rem",
              }}
            >
              We will respond within 4 business hours with a tailored proposal.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-10 rounded-2xl"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(232,84,26,0.3)",
                }}
                data-ocid="corporate.quote_success_state"
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    color: "#1A2A1E",
                    marginBottom: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  Quote Request Received!
                </h3>
                <p style={{ color: "#4A5E52", fontFamily: "var(--font-body)" }}>
                  Our corporate team will reach out within 4 hours with a
                  customised proposal for your team.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-7 flex flex-col gap-4"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(212,237,224,0.12)",
                }}
                data-ocid="corporate.quote_form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      id: "name",
                      label: "Your Name",
                      placeholder: "Full name",
                      type: "text",
                    },
                    {
                      id: "company",
                      label: "Company",
                      placeholder: "Company name",
                      type: "text",
                    },
                    {
                      id: "headcount",
                      label: "Team Size",
                      placeholder: "Number of people",
                      type: "number",
                    },
                    {
                      id: "dates",
                      label: "Preferred Dates",
                      placeholder: "e.g. March 2025",
                      type: "text",
                    },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={`corp-${field.id}`}
                        style={{
                          color: "#4A5E52",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.8rem",
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        id={`corp-${field.id}`}
                        required
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formState[field.id as keyof typeof formState]}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            [field.id]: e.target.value,
                          }))
                        }
                        data-ocid={`corporate.quote_${field.id}_input`}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label
                    htmlFor="corp-trek"
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Trek Preference
                  </label>
                  <select
                    id="corp-trek"
                    value={formState.trek}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, trek: e.target.value }))
                    }
                    data-ocid="corporate.quote_trek_select"
                    style={inputStyle}
                  >
                    <option value="">Select a trek</option>
                    {[
                      "Kedarkantha",
                      "Nag Tibba",
                      "Har Ki Dun",
                      "Dayara Bugyal",
                      "Custom",
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="corp-message"
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="corp-message"
                    rows={3}
                    placeholder="Tell us about your team, goals, and any special requirements..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    data-ocid="corporate.quote_message_textarea"
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                <button
                  type="submit"
                  data-ocid="corporate.quote_submit_button"
                  style={{
                    background: "#E8541A", color: "#FFFFFF",
                    border: "none",
                    padding: "0.875rem",
                    borderRadius: 999,
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  Submit Quote Request
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
