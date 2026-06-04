import {
  AlertTriangle,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Layout } from "../components/Layout";

const interests = [
  "Kedarkantha",
  "Har Ki Dun",
  "Valley of Flowers",
  "Rupin Pass",
  "Buran Ghati",
  "Dayara Bugyal",
  "All Treks",
  "Corporate Booking",
  "Chardham Yatra",
  "Do Dham Yatra",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    dates: "",
    groupSize: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: "#FFFFFF",
    border: "1px solid rgba(212,237,224,0.25)",
    color: "#1A2A1E",
    borderRadius: 8,
    padding: "0.65rem 0.875rem",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
  };

  const labelStyle: React.CSSProperties = {
    color: "#4A5E52",
    fontFamily: "var(--font-body)",
    fontSize: "0.8rem",
    display: "block",
    marginBottom: 6,
  };

  return (
    <Layout>
      <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        {/* Page Header */}
        <section
          className="pt-24 pb-8 text-center px-4"
          style={{ background: "#EDF7F2" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
              color: "#1A2A1E",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            GET IN TOUCH
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              color: "#4A5E52",
              fontFamily: "var(--font-body)",
              marginTop: "0.75rem",
              fontSize: "1rem",
            }}
          >
            We’re available Mon–Sun, 7AM to 10PM. Questions, bookings, or just
            curious — we love hearing from trekkers.
          </motion.p>
        </section>

        {/* Response Badge */}
        <div
          style={{
            background: "#2E7D4F",
            textAlign: "center",
            padding: "0.6rem",
          }}
        >
          <span
            style={{
              color: "#1A2A1E",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
            }}
          >
            ⚡ Expected response time: <strong>&lt; 4 hours avg</strong> ·
            Mon–Sun 7AM–10PM
          </span>
        </div>

        {/* Main Split Layout */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
            {/* LEFT — Form (60%) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-[60%]"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center p-12 rounded-2xl text-center"
                  style={{
                    background: "#EDF7F2",
                    border: "1px solid rgba(232,84,26,0.3)",
                    minHeight: 400,
                  }}
                  data-ocid="contact.success_state"
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    🏔️
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      color: "#1A2A1E",
                      fontWeight: 700,
                      marginBottom: "0.75rem",
                    }}
                  >
                    Thanks! Message Received.
                  </h2>
                  <p
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      lineHeight: 1.7,
                      maxWidth: 380,
                    }}
                  >
                    We’ll reply within 4 hours. Meanwhile, feel free to WhatsApp
                    us directly at{" "}
                    <strong style={{ color: "#1A2A1E" }}>+91-8279888470</strong>{" "}
                    for instant support.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-8 flex flex-col gap-5"
                  style={{
                    background: "#EDF7F2",
                    border: "1px solid rgba(212,237,224,0.12)",
                  }}
                  data-ocid="contact.form"
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      color: "#1A2A1E",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Send Us a Message
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" style={labelStyle}>
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        required
                        type="text"
                        placeholder="Full name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, name: e.target.value }))
                        }
                        style={fieldStyle}
                        data-ocid="contact.name_input"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" style={labelStyle}>
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        required
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, email: e.target.value }))
                        }
                        style={fieldStyle}
                        data-ocid="contact.email_input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-phone" style={labelStyle}>
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, phone: e.target.value }))
                        }
                        style={fieldStyle}
                        data-ocid="contact.phone_input"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-interest" style={labelStyle}>
                        Interested In
                      </label>
                      <select
                        id="contact-interest"
                        value={form.interest}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, interest: e.target.value }))
                        }
                        style={fieldStyle}
                        data-ocid="contact.interest_select"
                      >
                        <option value="">Select a trek / package</option>
                        {interests.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-dates" style={labelStyle}>
                        Preferred Dates
                      </label>
                      <input
                        id="contact-dates"
                        type="text"
                        placeholder="e.g. January 2025"
                        value={form.dates}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, dates: e.target.value }))
                        }
                        style={fieldStyle}
                        data-ocid="contact.dates_input"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-groupSize" style={labelStyle}>
                        Group Size
                      </label>
                      <input
                        id="contact-groupSize"
                        type="number"
                        placeholder="Number of people"
                        min="1"
                        value={form.groupSize}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, groupSize: e.target.value }))
                        }
                        style={fieldStyle}
                        data-ocid="contact.group_size_input"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" style={labelStyle}>
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Tell us about your dream trek, group, fitness level, or any questions..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, message: e.target.value }))
                      }
                      style={{ ...fieldStyle, resize: "vertical" }}
                      data-ocid="contact.message_textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    data-ocid="contact.submit_button"
                    style={{
                      background: "#E8541A", color: "#FFFFFF",
                      border: "none",
                      padding: "0.875rem 2.5rem",
                      borderRadius: 999,
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "1rem",
                      cursor: "pointer",
                      alignSelf: "flex-start",
                    }}
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </motion.div>

            {/* RIGHT — Info + Map (40%) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-[40%] flex flex-col gap-6"
            >
              {/* Contact Info Card */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "#EDF7F2",
                  border: "1px solid rgba(212,237,224,0.12)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.375rem",
                    color: "#1A2A1E",
                    fontWeight: 700,
                    marginBottom: "1.25rem",
                  }}
                >
                  Contact Information
                </h3>
                {[
                  {
                    icon: MapPin,
                    text: "Rajpur Road, Dehradun, Uttarakhand — 248001",
                    label: "Address",
                  },
                  { icon: Mail, text: "Shailhikers@gmail.com", label: "Email" },
                  { icon: Phone, text: "+91-8279888470", label: "Phone" },
                  {
                    icon: Clock,
                    text: "Monday – Sunday, 7:00 AM – 10:00 PM",
                    label: "Hours",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 mb-4">
                    <item.icon
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: "#E8541A" }}
                    />
                    <div>
                      <div
                        style={{
                          color: "#4A5E52",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.75rem",
                          marginBottom: 2,
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          color: "#1A2A1E",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Social Links */}
                <div
                  className="flex gap-3 mt-5 pt-5"
                  style={{ borderTop: "1px solid rgba(212,237,224,0.12)" }}
                >
                  {[
                    {
                      icon: Instagram,
                      label: "Instagram",
                      href: "#",
                      color: "#4A5E52",
                    },
                    {
                      icon: Facebook,
                      label: "Facebook",
                      href: "#",
                      color: "#2E7D4F",
                    },
                    {
                      icon: Youtube,
                      label: "YouTube",
                      href: "#",
                      color: "#E8541A",
                    },
                    {
                      icon: MessageCircle,
                      label: "WhatsApp",
                      href: "https://wa.me/918279888470",
                      color: "#2E7D4F",
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      data-ocid={`contact.social_${s.label.toLowerCase()}_link`}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#FFFFFF",
                        border: "1px solid rgba(212,237,224,0.2)",
                        color: s.color,
                        transition: "background 0.2s",
                      }}
                    >
                      <s.icon className="w-4.5 h-4.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Static Map */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(212,237,224,0.12)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=400&fit=crop&q=80"
                  alt="Aerial view of Uttarakhand mountains — Shail Hikers base location"
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    background: "#EDF7F2",
                    padding: "0.75rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <MapPin className="w-4 h-4" style={{ color: "#E8541A" }} />
                  <span
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                    }}
                  >
                    Dehradun, Uttarakhand, India — Gateway to the Himalayas
                  </span>
                </div>
              </div>

              {/* WhatsApp Chat Card */}
              <div
                className="rounded-2xl p-5 flex items-center gap-4"
                style={{
                  background: "#EDF7F2",
                  border: "1px solid rgba(45,80,22,0.5)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#2E7D4F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MessageCircle
                    className="w-5 h-5"
                    style={{ color: "#1A2A1E" }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      color: "#1A2A1E",
                      fontWeight: 700,
                    }}
                  >
                    Chat with us on WhatsApp
                  </div>
                  <div
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      marginTop: 2,
                    }}
                  >
                    Typically replies in under 2 hours
                  </div>
                </div>
                <a
                  href="https://wa.me/918279888470"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.whatsapp_chat_button"
                  style={{
                    marginLeft: "auto",
                    background: "#2E7D4F",
                    color: "#1A2A1E",
                    padding: "0.5rem 1.25rem",
                    borderRadius: 999,
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                >
                  Chat Now
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Emergency Box */}
        <section className="px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl mx-auto rounded-2xl overflow-hidden"
            style={{
              border: "2px solid #E8541A",
              boxShadow: "0 0 40px rgba(232,84,26,0.15)",
            }}
            data-ocid="contact.emergency_box"
          >
            <div
              style={{
                background: "rgba(232,84,26,0.12)",
                padding: "1.5rem 2rem",
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <AlertTriangle
                className="w-7 h-7 mt-0.5 flex-shrink-0"
                style={{ color: "#E8541A" }}
              />
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    color: "#1A2A1E",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                  }}
                >
                  Emergency Trekking Helpline
                </h2>
                <p
                  style={{
                    color: "#4A5E52",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    marginBottom: "1rem",
                  }}
                >
                  For active trek emergencies, injuries, evacuations, or safety
                  concerns during a Shail Hikers batch.
                </p>
                <a
                  href="tel:+918279888470"
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    color: "#1A2A1E",
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                  data-ocid="contact.emergency_phone_link"
                >
                  +91-8279888470
                </a>
                <div
                  style={{
                    marginTop: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#4ade80",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      color: "#4A5E52",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                    }}
                  >
                    Available 24/7 during active batches
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}
