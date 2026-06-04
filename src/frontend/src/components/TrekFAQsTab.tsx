import type { TrekData } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Props {
  trek: TrekData;
}

const FAQ_CATEGORIES = [
  "All",
  "Logistics",
  "Fitness",
  "Gear",
  "Weather",
  "Safety",
  "Booking",
];

export default function TrekFAQsTab({ trek }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [helpful, setHelpful] = useState<Record<number, boolean | null>>({});
  const [showAskModal, setShowAskModal] = useState(false);
  const [askQuestion, setAskQuestion] = useState("");

  const filtered = trek.faqs.filter((faq) => {
    const matchesCat = catFilter === "All" || faq.category === catFilter;
    const matchesSearch =
      search === "" ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl" style={{ color: "#1A2A1E" }}>
          Frequently Asked Questions
        </h2>
        <button
          type="button"
          onClick={() => setShowAskModal(true)}
          className="text-sm px-4 py-2 rounded-xl border"
          style={{ borderColor: "#4A5E5244", color: "#4A5E52" }}
        >
          Ask a Question
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border bg-transparent text-sm"
          style={{ borderColor: "#4A5E5244", color: "#1A2A1E" }}
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCatFilter(cat)}
            className="text-xs px-3 py-1.5 rounded-full"
            style={{
              background:
                catFilter === cat ? "#E8541A" : "rgba(255,255,255,0.9)",
              color: "#1A2A1E",
              border: `1px solid ${catFilter === cat ? "#E8541A" : "#4A5E5233"}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filtered.map((faq, i) => (
          <div
            key={faq.question}
            className="rounded-xl border"
            style={{ borderColor: open === i ? "#E8541A66" : "#4A5E5222" }}
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left"
              style={{
                background:
                  open === i
                    ? "rgba(232,84,26,0.08)"
                    : "rgba(255,255,255,0.9)",
              }}
            >
              <div className="flex-1">
                <div
                  className="font-medium text-sm"
                  style={{ color: "#1A2A1E" }}
                >
                  {faq.question}
                </div>
                <div
                  className="text-xs mt-0.5 px-2 py-0.5 rounded-full inline-block"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    color: "#4A5E52",
                    border: "1px solid #4A5E5233",
                  }}
                >
                  {faq.category}
                </div>
              </div>
              <span className="text-sm" style={{ color: "#E8541A" }}>
                {open === i ? "-" : "+"}
              </span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-5 py-4"
                    style={{ background: "rgba(255,255,255,0.8)" }}
                  >
                    <div
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: "#1A2A1E" }}
                    >
                      {faq.answer}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs" style={{ color: "#4A5E52" }}>
                        Was this helpful?
                      </span>
                      <button
                        type="button"
                        onClick={() => setHelpful((h) => ({ ...h, [i]: true }))}
                        className="text-lg"
                        style={{
                          color: helpful[i] === true ? "#2E7D4F" : "#4A5E52",
                        }}
                      >
                        &#128077;
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setHelpful((h) => ({ ...h, [i]: false }))
                        }
                        className="text-lg"
                        style={{
                          color: helpful[i] === false ? "#E8541A" : "#4A5E52",
                        }}
                      >
                        &#128078;
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: "#4A5E52" }}>
            No FAQs found matching your search.
          </div>
        )}
      </div>

      {/* Ask Modal */}
      {showAskModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(255,255,255,0.95)" }}
        >
          <div
            className="rounded-2xl p-8 w-full max-w-lg"
            style={{ background: "#FFFFFF" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className="font-display text-2xl"
                style={{ color: "#1A2A1E" }}
              >
                Ask a Question
              </h3>
              <button
                type="button"
                onClick={() => setShowAskModal(false)}
                style={{ color: "#4A5E52" }}
              >
                &#10005;
              </button>
            </div>
            <textarea
              value={askQuestion}
              onChange={(e) => setAskQuestion(e.target.value)}
              placeholder="What would you like to know about this trek?"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm mb-4 resize-none"
              style={{ borderColor: "#4A5E5244", color: "#1A2A1E" }}
            />
            <button
              type="button"
              className="w-full py-3 rounded-xl font-semibold text-sm"
              style={{ background: "#E8541A", color: "#FFFFFF" }}
              onClick={() => {
                setShowAskModal(false);
                setAskQuestion("");
              }}
            >
              Submit Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
