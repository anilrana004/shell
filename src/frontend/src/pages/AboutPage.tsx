import {
  Eye,
  Globe,
  Heart,
  Leaf,
  Mountain,
  Trash2,
  TreePine,
  Users,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Layout } from "../components/Layout";

const milestones = [
  {
    year: "2015",
    title: "Founded in Dehradun",
    desc: "Shail Hikers was born from a shared dream of two passionate mountaineers to make Himalayan trekking safe and accessible.",
  },
  {
    year: "2016",
    title: "First Batch — 50 Trekkers",
    desc: "Our inaugural Kedarkantha batch of 50 trekkers completed the summit successfully — all smiles, zero incidents.",
  },
  {
    year: "2017",
    title: "Expanded to 8 Routes",
    desc: "Added Har Ki Dun, Rupin Pass, Dayara Bugyal and five more legendary trails to our portfolio.",
  },
  {
    year: "2018",
    title: "Yatra Packages Launched",
    desc: "Introduced Chardham, Do Dham, Mussoorie and Rishikesh tour packages for pilgrims and families.",
  },
  {
    year: "2019",
    title: "1,000th Trekker Milestone",
    desc: "A landmark moment — our 1000th trekker summited Kedarkantha. We planted 1000 trees in celebration.",
  },
  {
    year: "2020",
    title: "COVID — Virtual Treks",
    desc: "Through the pandemic we kept spirits alive with virtual trek sessions, trail documentaries, and online mountain fitness programs.",
  },
  {
    year: "2021",
    title: "Corporate Packages Launched",
    desc: "Partnered with Infosys, Wipro, and TCS to deliver transformative corporate team-building expeditions.",
  },
  {
    year: "2022",
    title: "5,000 Trekkers Reached",
    desc: "Five thousand happy adventurers and counting — with a 100% safety record maintained throughout.",
  },
  {
    year: "2023",
    title: "Outlook Traveller Award",
    desc: "Recognised as Uttarakhand's Best Trek Operator by Outlook Traveller — a proud validation of our commitment.",
  },
  {
    year: "2024",
    title: "10,000+ Trekkers Strong",
    desc: "Over ten thousand Himalayan journeys completed. Still guided by the same passion that lit the spark in 2015.",
  },
];

const impacts = [
  { icon: TreePine, value: "2,500+", label: "Trees Planted" },
  { icon: Trash2, value: "850 kg", label: "Plastic Removed" },
  { icon: Users, value: "45", label: "Local Guides Employed" },
  { icon: Globe, value: "12", label: "Communities Supported" },
  { icon: Mountain, value: "10,000+", label: "Trekkers" },
  { icon: Mountain, value: "200+", label: "Batches Completed" },
];

const envCommitments = [
  {
    icon: Leaf,
    title: "Leave No Trace",
    desc: "All our batches follow the seven Leave No Trace principles — every campsite left cleaner than we found it.",
  },
  {
    icon: Trash2,
    title: "Zero Single-Use Plastic",
    desc: "Shail Hikers has been plastic-free since 2019. Refillable bottles, compostable packaging, and biodegradable toiletries only.",
  },
  {
    icon: Users,
    title: "Local Employment First",
    desc: "We employ exclusively from local Uttarakhand communities — porters, cooks, guides, and logistics staff are all local.",
  },
  {
    icon: TreePine,
    title: "Reforestation Partner",
    desc: "In partnership with Uttarakhand Forest Department, we plant one tree per trekker per season on every trek.",
  },
];

const certifications = [
  "Ministry of Tourism Registered",
  "AATO Member",
  "Uttarakhand Tourism Licensed",
  "Leave No Trace Certified",
  "ISO 9001:2015",
  "TripAdvisor Certificate of Excellence",
];

const awards = [
  {
    outlet: "Outlook Traveller",
    mention: "Best Trek Operator — Uttarakhand 2023",
    logo: "🏆",
  },
  {
    outlet: "Times of India",
    mention: "Top 5 Himalayan Trek Agencies in India",
    logo: "📰",
  },
  {
    outlet: "Hindustan Times",
    mention: "Hidden Gem — Uttarakhand Adventure Tourism",
    logo: "📋",
  },
];

function CounterItem({
  icon: Icon,
  value,
  label,
}: { icon: React.ElementType; value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center p-6"
    >
      <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: "#E8541A" }} />
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.25rem",
          color: "#1A2A1E",
          fontWeight: 700,
        }}
      >
        {value}
      </div>
      <div
        style={{
          color: "#4A5E52",
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <Layout>
      {/* Section 1 Hero */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop&q=80"
          alt="Himalayan mountains at dawn"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.45)" }}
        />
        <div className="relative text-center px-4 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-block",
              border: "1px solid rgba(212,237,224,0.4)",
              color: "#4A5E52",
              padding: "4px 16px",
              borderRadius: 999,
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            Est. 2015 · Dehradun, Uttarakhand
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: "#1A2A1E",
              fontWeight: 700,
              lineHeight: 1.0,
            }}
          >
            OUR STORY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              color: "#4A5E52",
              fontFamily: "var(--font-body)",
              fontSize: "1.125rem",
              marginTop: "1rem",
              maxWidth: 500,
              margin: "1rem auto 0",
            }}
          >
            From two passionate mountaineers to Uttarakhand's most trusted trek
            company
          </motion.p>
        </div>
      </section>

      {/* Section 2 Story */}
      <section style={{ background: "#FFFFFF" }} className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                color: "#1A2A1E",
                marginBottom: "2rem",
                fontWeight: 700,
              }}
            >
              From a Dream to the Peaks
            </h2>
            {[
              "Shail Hikers was founded in 2015 by two lifelong mountaineers — Shailendra Rawat and Kaveri Singh — who shared a single conviction: that the Himalayas should not be a privilege reserved for the few. Working out of a small office in Dehradun's Rajpur Road, they led their first batch of 12 trekkers up Kedarkantha on a bitterly cold January morning. Every one of them reached the summit. That day changed everything.",
              "Over the next decade, that team of two grew into a family of 15 certified guides, safety officers, and trek coordinators. We expanded from a single route to 14 legendary Himalayan trails and 4 sacred yatra circuits. But through every expansion, one thing never changed — our obsession with safety, our respect for the mountains, and our commitment to making the Himalayan experience genuinely affordable for every Indian adventurer.",
              "Today, with over 10,000 trekkers, 200+ successful batches, and a 100% safety record, Shail Hikers stands as a testament to what passion, preparation, and purpose can build. We are not just a trek company. We are your gateway to the greatest adventure your life has to offer — and we take that responsibility with profound seriousness.",
            ].map((para, i) => (
              <motion.p
                key={para.slice(0, 30)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                style={{
                  color: "#4A5E52",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.85,
                  fontSize: "1.05rem",
                  marginBottom: "1.5rem",
                }}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3 Mission/Vision/Values */}
      <section style={{ background: "#EDF7F2" }} className="py-20 px-4">
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
            What We Stand For
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Mountain,
                color: "#E8541A",
                label: "Mission",
                title: "Make the Himalayas Accessible",
                desc: "We believe every Indian deserves the chance to stand on a Himalayan summit. We make it safe, affordable, and unforgettable.",
              },
              {
                icon: Eye,
                color: "#4A5E52",
                label: "Vision",
                title: "India's Most Trusted Trek Company",
                desc: "To be the benchmark for safety, authenticity, and environmental responsibility in Himalayan adventure tourism.",
              },
              {
                icon: Heart,
                color: "#D4A843",
                label: "Values",
                title: "Safety · Sustainability · Community",
                desc: "Every decision we make is filtered through three lenses: Is it safe? Is it sustainable? Does it benefit the local community?",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                className="p-7 rounded-2xl"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(212,237,224,0.12)",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <span
                    style={{
                      color: item.color,
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-body)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                <item.icon
                  className="w-8 h-8 mb-3"
                  style={{ color: item.color }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.375rem",
                    color: "#1A2A1E",
                    marginBottom: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "#4A5E52",
                    fontFamily: "var(--font-body)",
                    lineHeight: 1.7,
                    fontSize: "0.9rem",
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 Timeline */}
      <section style={{ background: "#FFFFFF" }} className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              color: "#1A2A1E",
              textAlign: "center",
              marginBottom: "4rem",
              fontWeight: 700,
            }}
          >
            Our Journey
          </motion.h2>
          <div className="relative">
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 2,
                background:
                  "linear-gradient(to bottom, #E8541A, rgba(232,84,26,0.1))",
                transform: "translateX(-50%)",
              }}
            />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className={`relative flex items-start mb-10 ${
                  i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-1/2 ${i % 2 === 0 ? "pr-10 text-right" : "pl-10 text-left"}`}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      color: "#E8541A",
                      fontWeight: 700,
                    }}
                  >
                    {m.year}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      color: "#1A2A1E",
                      fontWeight: 600,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {m.title}
                  </div>
                  <div
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {m.desc}
                  </div>
                </div>
                {/* Center dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 6,
                    transform: "translateX(-50%)",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#E8541A",
                    border: "3px solid #FFFFFF",
                    zIndex: 2,
                  }}
                />
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 Impact */}
      <section style={{ background: "#EDF7F2" }} className="py-20 px-4">
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
            Our Impact
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {impacts.map((item) => (
              <CounterItem
                key={item.label}
                icon={item.icon}
                value={item.value}
                label={item.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 Environmental Commitments */}
      <section style={{ background: "#FFFFFF" }} className="py-20 px-4">
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
            Our Environmental Promise
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {envCommitments.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex gap-4 p-6 rounded-xl"
                style={{
                  background: "#EDF7F2",
                  border: "1px solid rgba(45,80,22,0.4)",
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <c.icon className="w-7 h-7" style={{ color: "#2E7D4F" }} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      color: "#1A2A1E",
                      fontWeight: 700,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 Certifications */}
      <section style={{ background: "#EDF7F2" }} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              color: "#1A2A1E",
              textAlign: "center",
              marginBottom: "2.5rem",
              fontWeight: 700,
            }}
          >
            Certifications & Memberships
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(232,84,26,0.3)",
                  color: "#1A2A1E",
                  padding: "0.6rem 1.25rem",
                  borderRadius: 999,
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                }}
              >
                ✓ {cert}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8 Awards */}
      <section style={{ background: "#FFFFFF" }} className="py-20 px-4">
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
            Awards & Media Recognition
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((a, i) => (
              <motion.div
                key={a.outlet}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="p-7 rounded-2xl text-center"
                style={{
                  background: "#EDF7F2",
                  border: "1px solid rgba(201,168,76,0.25)",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                  {a.logo}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    color: "#D4A843",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  {a.outlet}
                </div>
                <p
                  style={{
                    color: "#4A5E52",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                >
                  {a.mention}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
