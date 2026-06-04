import { Award, CheckCircle, MapPin, Star } from "lucide-react";
import { motion } from "motion/react";
import { Layout } from "../components/Layout";

const guides = [
  {
    name: "Deepak Rawat",
    designation: "Lead Trek Leader",
    years: 12,
    favTrek: "Kedarkantha",
    certs: ["ITBP Certified", "WFR", "High Altitude Rescue"],
    funFact: "Has summited Kedarkantha 47 times in all seasons",
    available: true,
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Priya Sharma",
    designation: "Trek Leader",
    years: 7,
    favTrek: "Valley of Flowers",
    certs: ["Wilderness First Aid", "NOLS", "Rescue 3"],
    funFact: "Documented 120+ rare Himalayan wildflower species",
    available: true,
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Amit Negi",
    designation: "Mountain Guide",
    years: 9,
    favTrek: "Rupin Pass",
    certs: ["IMF Basic", "ITBP", "Rock Craft"],
    funFact: "Trained at Nehru Institute of Mountaineering, Uttarkashi",
    available: false,
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Sunita Bisht",
    designation: "Safety Officer",
    years: 6,
    favTrek: "Har Ki Dun",
    certs: ["WFR", "AED Certified", "Crisis Management"],
    funFact: "Led emergency evacuation of 12 trekkers in a blizzard — all safe",
    available: true,
    photo:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Rajan Thakur",
    designation: "Base Camp Manager",
    years: 11,
    favTrek: "Buran Ghati",
    certs: ["Food Safety", "Logistics", "High Altitude"],
    funFact: "Once cooked a 3-course dinner at 14,000 ft in a snowstorm",
    available: false,
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Kavita Rana",
    designation: "Trek Coordinator",
    years: 5,
    favTrek: "Dayara Bugyal",
    certs: ["Tourism Mgmt", "First Aid", "Hospitality"],
    funFact:
      "Fluent in 4 languages — coordinates international trekkers seamlessly",
    available: true,
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Vikram Singh",
    designation: "Mountain Guide",
    years: 8,
    favTrek: "Bali Pass",
    certs: ["IMF Basic", "Rock Climbing", "Navigation"],
    funFact:
      "Expert in technical glacier crossings — trained over 200 trekkers",
    available: true,
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Anjali Dobhal",
    designation: "Junior Guide",
    years: 3,
    favTrek: "Nag Tibba",
    certs: ["WFR", "Trekking Leader", "Nature Interpretation"],
    funFact: "Youngest female certified trek leader in Uttarakhand at age 24",
    available: true,
    photo:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&q=80",
  },
];

const stats = [
  { label: "Expert Guides", value: "15" },
  { label: "Batches Led", value: "200+" },
  { label: "Avg Rating", value: "4.9", icon: true },
  { label: "Safety Record", value: "100%" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function TeamPage() {
  return (
    <Layout>
      <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        {/* Hero Heading */}
        <section className="pt-24 pb-8 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
              color: "#1A2A1E",
              fontWeight: 700,
              letterSpacing: "0.04em",
              lineHeight: 1.1,
            }}
          >
            THE PEOPLE BEHIND THE PEAKS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              color: "#4A5E52",
              fontFamily: "var(--font-body)",
              marginTop: "1rem",
              fontSize: "1.125rem",
            }}
          >
            Certified mountain professionals who have spent thousands of hours
            on Himalayan trails
          </motion.p>
        </section>

        {/* Stats Bar */}
        <section style={{ background: "#E8541A" }} className="py-5">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    color: "#1A2A1E",
                    fontWeight: 700,
                  }}
                >
                  {s.value}
                  {s.icon && (
                    <Star
                      className="inline w-5 h-5 ml-1 mb-1"
                      style={{ color: "#D4A843" }}
                    />
                  )}
                </div>
                <div
                  style={{
                    color: "#1A2A1E",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    opacity: 0.85,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guide Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {guides.map((guide) => (
              <motion.div
                key={guide.name}
                variants={cardVariants}
                className="group relative rounded-2xl overflow-hidden"
                style={{
                  background: "#EDF7F2",
                  border: "1px solid rgba(212,237,224,0.15)",
                }}
              >
                {/* Availability dot */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: guide.available ? "#4ade80" : "#D4A843",
                    }}
                  />
                  <span
                    style={{
                      color: guide.available ? "#4ade80" : "#D4A843",
                      fontSize: "0.7rem",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {guide.available ? "Available" : "On Trek"}
                  </span>
                </div>

                <div className="p-6 flex flex-col items-center text-center">
                  {/* Photo */}
                  <div className="relative mb-4">
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        border: "3px solid #E8541A",
                        overflow: "hidden",
                        boxShadow: "0 0 0 4px rgba(232,84,26,0.2)",
                      }}
                    >
                      <img
                        src={guide.photo}
                        alt={guide.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Name & Designation */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.375rem",
                      color: "#1A2A1E",
                      fontWeight: 700,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {guide.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "#4A5E52",
                      fontSize: "0.875rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {guide.designation}
                  </p>

                  {/* Years badge */}
                  <span
                    style={{
                      background: "rgba(232,84,26,0.18)",
                      border: "1px solid rgba(232,84,26,0.35)",
                      color: "#1A2A1E",
                      borderRadius: 999,
                      padding: "2px 12px",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-body)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {guide.years} yrs experience
                  </span>

                  {/* Favorite Trek */}
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin
                      className="w-3.5 h-3.5"
                      style={{ color: "#D4A843" }}
                    />
                    <span
                      style={{
                        color: "#D4A843",
                        fontSize: "0.78rem",
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                      }}
                    >
                      Fav: {guide.favTrek}
                    </span>
                  </div>

                  {/* Certs */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {guide.certs.map((c) => (
                      <span
                        key={c}
                        style={{
                          background: "#EDF7F2",
                          border: "1px solid rgba(212,237,224,0.3)",
                          color: "#4A5E52",
                          borderRadius: 999,
                          padding: "2px 10px",
                          fontSize: "0.7rem",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <CheckCircle
                          className="inline w-3 h-3 mr-1"
                          style={{ color: "#E8541A" }}
                        />
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Fun fact — revealed on hover */}
                  <div
                    className="absolute inset-0 flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(26,42,30,0.97) 60%, transparent)",
                    }}
                  >
                    <div className="text-center">
                      <Award
                        className="w-5 h-5 mx-auto mb-2"
                        style={{ color: "#D4A843" }}
                      />
                      <p
                        style={{
                          color: "#1A2A1E",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.85rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {guide.funFact}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Join CTA */}
        <section className="text-center pb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "#EDF7F2",
              border: "1px solid rgba(232,84,26,0.3)",
              borderRadius: 16,
              padding: "2.5rem",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.875rem",
                color: "#1A2A1E",
                marginBottom: "0.75rem",
              }}
            >
              Trek with Our Certified Experts
            </h2>
            <p
              style={{
                color: "#4A5E52",
                fontFamily: "var(--font-body)",
                marginBottom: "1.5rem",
                fontSize: "0.95rem",
              }}
            >
              Every Shail Hikers batch is led by ITBP-certified professionals
              with years of high-altitude experience.
            </p>
            <a
              href="/treks"
              style={{
                display: "inline-block",
                background: "#E8541A", color: "#FFFFFF",
                padding: "0.75rem 2rem",
                borderRadius: 999,
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              data-ocid="team.explore_treks_button"
            >
              Explore Our Treks
            </a>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}
