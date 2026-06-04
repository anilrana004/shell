import { Check, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const PREFS = [
  { id: "batches", label: "New Batches" },
  { id: "offers", label: "Offers & Deals" },
  { id: "blog", label: "Blog Posts" },
  { id: "weather", label: "Weather Alerts" },
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [prefs, setPrefs] = useState<string[]>(["batches", "offers"]);
  const [submitted, setSubmitted] = useState(false);

  const togglePref = (id: string) =>
    setPrefs((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      data-ocid="newsletter.section"
      style={{ background: "#E8541A" }}
      className="py-16"
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.4em] mb-3"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Stay Connected
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-semibold mb-2"
          style={{ fontFamily: "var(--font-display)", color: "#FFFFFF" }}
        >
          JOIN THE TRIBE
        </motion.h2>
        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
          Join 8,000+ trekkers — first dibs on new batches, seasonal offers &
          trail updates
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Preference checkboxes */}
            <div className="flex flex-wrap justify-center gap-3">
              {PREFS.map((p) => (
                <label
                  key={p.id}
                  className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl transition-all"
                  style={{
                    background: prefs.includes(p.id)
                      ? "rgba(26,42,30,0.35)"
                      : "rgba(26,42,30,0.15)",
                    border: `1px solid ${prefs.includes(p.id) ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"}`,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={prefs.includes(p.id)}
                    onChange={() => togglePref(p.id)}
                    data-ocid={`newsletter.pref.${p.id}`}
                    className="sr-only"
                  />
                  <span
                    className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                    style={{
                      background: prefs.includes(p.id)
                        ? "#1A2A1E"
                        : "transparent",
                      border: "1.5px solid rgba(255,255,255,0.6)",
                    }}
                  >
                    {prefs.includes(p.id) && (
                      <Check size={10} style={{ color: "#E8541A" }} />
                    )}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#FFFFFF" }}
                  >
                    {p.label}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                data-ocid="newsletter.input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#1A2A1E",
                }}
              />
              <button
                type="submit"
                data-ocid="newsletter.submit_button"
                className="px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 flex items-center gap-2"
                style={{ background: "#2E7D4F", color: "#FFFFFF" }}
              >
                <Send size={14} /> Subscribe
              </button>
            </div>
          </form>
        ) : (
          <div className="py-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(255,255,255,0.4)" }}
            >
              <Check size={24} style={{ color: "#1A2A1E" }} />
            </div>
            <p className="text-base font-semibold" style={{ color: "#1A2A1E" }}>
              You're subscribed!
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Welcome to the Shail Hikers tribe. 🏔️
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
