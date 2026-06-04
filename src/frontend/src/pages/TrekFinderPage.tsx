import { TREKS } from "@/data/treks";
import type { Trek } from "@/types";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Share2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Quiz data ──────────────────────────────────────────────────
const FITNESS_OPTIONS = [
  {
    value: 1,
    label: "Couch Potato",
    desc: "I rarely exercise and get winded climbing stairs",
    emoji: "🛌",
  },
  {
    value: 2,
    label: "Weekend Walker",
    desc: "I walk 30 min a few times per week",
    emoji: "🚶",
  },
  {
    value: 3,
    label: "Regular Jogger",
    desc: "I exercise 3–4 days/week, can walk 10km comfortably",
    emoji: "🏃",
  },
  {
    value: 4,
    label: "Active Hiker",
    desc: "I hike/run regularly and have reasonable stamina",
    emoji: "🏄",
  },
  {
    value: 5,
    label: "Athletic",
    desc: "I train daily and can sustain high exertion for hours",
    emoji: "💪",
  },
];

const EXPERIENCE_OPTIONS = [
  "Snow",
  "Flowers",
  "Forests",
  "Summit",
  "River",
  "Meadows",
  "Temple",
  "Wildlife",
];

const GROUP_OPTIONS = [
  { value: "Solo", emoji: "🧗", desc: "Just me — my pace, my rules" },
  { value: "Partner", emoji: "👫", desc: "Me and my partner" },
  { value: "Friends", emoji: "👯", desc: "A group of friends" },
  { value: "Family", emoji: "👨‍👩‍👦", desc: "Family with kids" },
  { value: "Corporate", emoji: "🏢", desc: "Corporate team outing" },
];

const CAMPING_OPTIONS = [
  {
    value: "love",
    label: "Love it!",
    desc: "Give me the stars and campfire",
    emoji: "⛺",
  },
  {
    value: "okay",
    label: "It's okay",
    desc: "I can manage camping",
    emoji: "🌿",
  },
  {
    value: "prefer_gh",
    label: "Prefer guesthouse",
    desc: "I like a real bed and shower",
    emoji: "🏡",
  },
];

const ALTITUDE_OPTIONS = [
  { value: "yes", label: "Yes", desc: "Been above 12,000 ft before" },
  {
    value: "no",
    label: "No",
    desc: "This will be my first high altitude experience",
  },
  {
    value: "somewhat",
    label: "Somewhat",
    desc: "I've done some moderate altitude",
  },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Answers {
  fitness: number;
  days: number;
  budget: number;
  months: string[];
  experiences: string[];
  group: string;
  altitude: string;
  camping: string;
}

const defaultAnswers = (): Answers => ({
  fitness: 3,
  days: 6,
  budget: 10000,
  months: [],
  experiences: [],
  group: "",
  altitude: "",
  camping: "",
});

// ─── Scoring algorithm ──────────────────────────────────────────────────
const DIFF_SCORE: Record<string, number> = {
  Easy: 1,
  Moderate: 2,
  Difficult: 3,
  Extreme: 4,
};

function scoreTrek(trek: Trek, a: Answers): number {
  let score = 0;
  // Fitness vs difficulty
  const diffScore = DIFF_SCORE[trek.difficulty] ?? 2;
  const fitDiff = Math.abs(a.fitness - diffScore);
  score += Math.max(0, 30 - fitDiff * 8);

  // Duration
  const daysDiff = Math.abs(trek.durationDays - a.days);
  score += Math.max(0, 25 - daysDiff * 3);

  // Budget
  if (trek.basePrice <= a.budget) score += 25;
  else if (trek.basePrice <= a.budget * 1.2) score += 15;

  // Months (rough match on bestTime)
  if (a.months.length > 0) {
    const matchesMonth = a.months.some((m) =>
      trek.bestTime.toLowerCase().includes(m.toLowerCase()),
    );
    if (matchesMonth) score += 20;
  } else {
    score += 10;
  }

  return Math.min(100, score);
}

function computeReasons(trek: Trek, a: Answers): string[] {
  const reasons: string[] = [];
  if (DIFF_SCORE[trek.difficulty] <= a.fitness)
    reasons.push(
      `Difficulty perfectly matches your fitness level (${trek.difficulty})`,
    );
  if (trek.durationDays <= a.days)
    reasons.push(`Fits your ${a.days}-day window at ${trek.durationDays} days`);
  if (trek.basePrice <= a.budget)
    reasons.push(
      `Within your budget at ₹${trek.basePrice.toLocaleString("en-IN")}/person`,
    );
  if (trek.difficulty === "Easy" && a.altitude === "no")
    reasons.push("Great first high-altitude experience");
  if (a.experiences.includes("Snow") && trek.bestTime.includes("Dec"))
    reasons.push("Snow-covered trail in season");
  if (a.experiences.includes("Flowers") && trek.slug === "valley-of-flowers")
    reasons.push("World-famous flower valley");
  if (a.group === "Family" && trek.difficulty === "Easy")
    reasons.push("Family-friendly difficulty");
  if (!reasons.length)
    reasons.push(`Highly rated at ${trek.rating ?? 4.7}/5 stars`);
  return reasons.slice(0, 3);
}

// ─── Question components ──────────────────────────────────────────────────
function SliderInput({
  value,
  min,
  max,
  step,
  onChange,
  formatLabel,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  formatLabel: (v: number) => string;
}) {
  return (
    <div>
      <div className="text-center mb-3">
        <span className="font-display text-3xl" style={{ color: "#D4A843" }}>
          {formatLabel(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#E8541A] h-2"
        style={{ accentColor: "#E8541A" }}
      />
      <div
        className="flex justify-between text-xs mt-1"
        style={{ color: "#4A5E52" }}
      >
        <span>{formatLabel(min)}</span>
        <span>{formatLabel(max)}</span>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────
export default function TrekFinderPage() {
  const [step, setStep] = useState(0); // 0-7 = questions, 8 = results
  const [answers, setAnswers] = useState<Answers>(defaultAnswers());
  const [results, setResults] = useState<
    { trek: Trek; score: number; reasons: string[] }[]
  >([]);

  const totalSteps = 8;
  const progress = step < totalSteps ? (step / totalSteps) * 100 : 100;

  const computeResults = () => {
    const scored = TREKS.map((trek) => ({
      trek,
      score: scoreTrek(trek, answers),
      reasons: computeReasons(trek, answers),
    }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    setResults(scored);
    setStep(8);
  };

  const goNext = () => {
    if (step === totalSteps - 1) computeResults();
    else setStep((s) => s + 1);
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const update = <K extends keyof Answers>(key: K, val: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: val }));

  const QUESTIONS = [
    {
      q: "How would you describe your current fitness level?",
      hint: "Be honest — this determines trek difficulty match",
      content: (
        <div className="grid gap-3">
          {FITNESS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update("fitness", opt.value)}
              data-ocid={`trekfinder.fitness.${opt.value}`}
              className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200"
              style={{
                background:
                  answers.fitness === opt.value
                    ? "rgba(232,84,26,0.2)"
                    : "rgba(255,255,255,0.9)",
                border:
                  answers.fitness === opt.value
                    ? "2px solid #E8541A"
                    : "2px solid rgba(232,84,26,0.2)",
              }}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "#1A2A1E" }}
                >
                  {opt.label}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#4A5E52" }}>
                  {opt.desc}
                </div>
              </div>
              {answers.fitness === opt.value && (
                <Check
                  size={16}
                  className="ml-auto"
                  style={{ color: "#E8541A" }}
                />
              )}
            </button>
          ))}
        </div>
      ),
    },
    {
      q: "How many days can you spare for this trek?",
      hint: "Including travel days",
      content: (
        <SliderInput
          value={answers.days}
          min={2}
          max={14}
          step={1}
          onChange={(v) => update("days", v)}
          formatLabel={(v) => `${v} days`}
        />
      ),
    },
    {
      q: "What's your budget per person?",
      hint: "All-inclusive trek cost",
      content: (
        <SliderInput
          value={answers.budget}
          min={2000}
          max={30000}
          step={500}
          onChange={(v) => update("budget", v)}
          formatLabel={(v) => `₹${v.toLocaleString("en-IN")}`}
        />
      ),
    },
    {
      q: "When are you planning to go?",
      hint: "Select all months that work for you",
      content: (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {MONTHS.map((m) => {
            const sel = answers.months.includes(m);
            return (
              <button
                key={m}
                type="button"
                onClick={() =>
                  update(
                    "months",
                    sel
                      ? answers.months.filter((x) => x !== m)
                      : [...answers.months, m],
                  )
                }
                data-ocid={`trekfinder.month.${m}`}
                className="py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: sel
                    ? "rgba(232,84,26,0.2)"
                    : "rgba(255,255,255,0.9)",
                  border: sel
                    ? "2px solid #E8541A"
                    : "2px solid rgba(232,84,26,0.2)",
                  color: sel ? "#1A2A1E" : "#4A5E52",
                }}
              >
                {m}
              </button>
            );
          })}
        </div>
      ),
    },
    {
      q: "What experiences excite you most?",
      hint: "Select all that apply",
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EXPERIENCE_OPTIONS.map((ex) => {
            const sel = answers.experiences.includes(ex);
            const emojis: Record<string, string> = {
              Snow: "❄️",
              Flowers: "🌸",
              Forests: "🌳",
              Summit: "⛰️",
              River: "🚣",
              Meadows: "🌿",
              Temple: "🛕",
              Wildlife: "𞰆",
            };
            return (
              <button
                key={ex}
                type="button"
                onClick={() =>
                  update(
                    "experiences",
                    sel
                      ? answers.experiences.filter((x) => x !== ex)
                      : [...answers.experiences, ex],
                  )
                }
                data-ocid={`trekfinder.experience.${ex.toLowerCase()}`}
                className="p-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-200"
                style={{
                  background: sel
                    ? "rgba(232,84,26,0.2)"
                    : "rgba(255,255,255,0.9)",
                  border: sel
                    ? "2px solid #E8541A"
                    : "2px solid rgba(232,84,26,0.2)",
                }}
              >
                <span className="text-2xl">{emojis[ex]}</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: sel ? "#1A2A1E" : "#4A5E52" }}
                >
                  {ex}
                </span>
              </button>
            );
          })}
        </div>
      ),
    },
    {
      q: "Who are you going with?",
      hint: "This helps us recommend the right group dynamic",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {GROUP_OPTIONS.map((g) => {
            const sel = answers.group === g.value;
            return (
              <button
                key={g.value}
                type="button"
                onClick={() => update("group", g.value)}
                data-ocid={`trekfinder.group.${g.value.toLowerCase()}`}
                className="p-4 rounded-xl flex flex-col items-center gap-2 text-center transition-all duration-200"
                style={{
                  background: sel
                    ? "rgba(232,84,26,0.2)"
                    : "rgba(255,255,255,0.9)",
                  border: sel
                    ? "2px solid #E8541A"
                    : "2px solid rgba(232,84,26,0.2)",
                }}
              >
                <span className="text-2xl">{g.emoji}</span>
                <div
                  className="font-semibold text-sm"
                  style={{ color: sel ? "#1A2A1E" : "#4A5E52" }}
                >
                  {g.value}
                </div>
                <div className="text-xs" style={{ color: "#4A5E52" }}>
                  {g.desc}
                </div>
              </button>
            );
          })}
        </div>
      ),
    },
    {
      q: "Have you trekked at high altitude before?",
      hint: "High altitude = above 10,000 ft",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ALTITUDE_OPTIONS.map((o) => {
            const sel = answers.altitude === o.value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => update("altitude", o.value)}
                data-ocid={`trekfinder.altitude.${o.value}`}
                className="p-5 rounded-xl text-center transition-all duration-200"
                style={{
                  background: sel
                    ? "rgba(232,84,26,0.2)"
                    : "rgba(255,255,255,0.9)",
                  border: sel
                    ? "2px solid #E8541A"
                    : "2px solid rgba(232,84,26,0.2)",
                }}
              >
                <div
                  className="font-semibold text-base mb-1"
                  style={{ color: sel ? "#1A2A1E" : "#4A5E52" }}
                >
                  {o.label}
                </div>
                <div className="text-xs" style={{ color: "#4A5E52" }}>
                  {o.desc}
                </div>
                {sel && (
                  <Check
                    size={16}
                    className="mx-auto mt-2"
                    style={{ color: "#E8541A" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      ),
    },
    {
      q: "How do you feel about camping?",
      hint: "Most high-altitude treks require camping",
      content: (
        <div className="grid gap-4">
          {CAMPING_OPTIONS.map((o) => {
            const sel = answers.camping === o.value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => update("camping", o.value)}
                data-ocid={`trekfinder.camping.${o.value}`}
                className="flex items-center gap-4 p-5 rounded-xl text-left transition-all duration-200"
                style={{
                  background: sel
                    ? "rgba(232,84,26,0.2)"
                    : "rgba(255,255,255,0.9)",
                  border: sel
                    ? "2px solid #E8541A"
                    : "2px solid rgba(232,84,26,0.2)",
                }}
              >
                <span className="text-3xl">{o.emoji}</span>
                <div className="flex-1">
                  <div
                    className="font-semibold"
                    style={{ color: sel ? "#1A2A1E" : "#4A5E52" }}
                  >
                    {o.label}
                  </div>
                  <div className="text-sm" style={{ color: "#4A5E52" }}>
                    {o.desc}
                  </div>
                </div>
                {sel && <Check size={18} style={{ color: "#E8541A" }} />}
              </button>
            );
          })}
        </div>
      ),
    },
  ];

  // Results screen
  if (step === 8) {
    return (
      <div className="min-h-screen" style={{ background: "#EDF7F2" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-10">
              <div
                className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-3"
                style={{
                  background: "rgba(232,84,26,0.15)",
                  color: "#E8541A",
                }}
              >
                Your Results
              </div>
              <h1
                className="font-display text-4xl mb-2"
                style={{ color: "#1A2A1E" }}
              >
                Your Perfect Treks
              </h1>
              <p className="text-sm" style={{ color: "#4A5E52" }}>
                Based on your preferences, here are our top recommendations
              </p>
            </div>
            <div className="grid gap-6">
              {results.map((r, i) => (
                <motion.div
                  key={r.trek.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    border:
                      i === 0
                        ? "2px solid #E8541A"
                        : "1px solid rgba(232,84,26,0.25)",
                  }}
                >
                  {i === 0 && (
                    <div
                      className="px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5"
                      style={{ background: "#E8541A", color: "#FFFFFF" }}
                    >
                      ⭐ Best Match
                    </div>
                  )}
                  <div className="p-5 flex gap-5">
                    <img
                      src={r.trek.heroImage}
                      alt={r.trek.name}
                      className="w-28 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h2
                          className="font-display text-xl"
                          style={{ color: "#1A2A1E" }}
                        >
                          {r.trek.name}
                        </h2>
                        <div
                          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{
                            background: "rgba(201,168,76,0.2)",
                            color: "#D4A843",
                          }}
                        >
                          {r.score}% match
                        </div>
                      </div>
                      <div
                        className="text-xs mb-2"
                        style={{ color: "#4A5E52" }}
                      >
                        {r.trek.durationDays} days · {r.trek.difficulty} · ₹
                        {r.trek.basePrice.toLocaleString("en-IN")} ·{" "}
                        {r.trek.maxAltitude.toLocaleString()} ft
                      </div>
                      <div className="mb-3">
                        {r.reasons.map((reason) => (
                          <div
                            key={reason}
                            className="flex items-start gap-1.5 text-xs mb-1"
                          >
                            <Check
                              size={11}
                              className="mt-0.5 flex-shrink-0"
                              style={{ color: "#E8541A" }}
                            />
                            <span style={{ color: "#4A5E52" }}>{reason}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={`/book/${r.trek.slug}`}
                          className="px-4 py-2 rounded-xl text-xs font-semibold"
                          style={{ background: "#E8541A", color: "#FFFFFF" }}
                          data-ocid={`trekfinder.result.book.${i + 1}`}
                        >
                          Book Now
                        </a>
                        <a
                          href={`/treks/${r.trek.slug}`}
                          className="px-4 py-2 rounded-xl text-xs font-semibold"
                          style={{
                            background: "rgba(232,84,26,0.15)",
                            color: "#4A5E52",
                            border: "1px solid rgba(232,84,26,0.3)",
                          }}
                          data-ocid={`trekfinder.result.view.${i + 1}`}
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mini comparison */}
            <div
              className="mt-8 p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(232,84,26,0.25)",
              }}
            >
              <h3
                className="font-display text-lg mb-4"
                style={{ color: "#1A2A1E" }}
              >
                Quick Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <td className="pb-2 pr-4" style={{ color: "#4A5E52" }}>
                        Metric
                      </td>
                      {results.map((r) => (
                        <td
                          key={r.trek.slug}
                          className="pb-2 pr-4 font-semibold"
                          style={{ color: "#1A2A1E" }}
                        >
                          {r.trek.name}
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        label: "Days",
                        fn: (t: Trek) => `${t.durationDays} days`,
                      },
                      {
                        label: "Altitude",
                        fn: (t: Trek) => `${t.maxAltitude.toLocaleString()} ft`,
                      },
                      { label: "Difficulty", fn: (t: Trek) => t.difficulty },
                      {
                        label: "Price",
                        fn: (t: Trek) =>
                          `₹${t.basePrice.toLocaleString("en-IN")}`,
                      },
                      { label: "Best Time", fn: (t: Trek) => t.bestTime },
                    ].map((row) => (
                      <tr key={row.label}>
                        <td className="py-2 pr-4" style={{ color: "#4A5E52" }}>
                          {row.label}
                        </td>
                        {results.map((r) => (
                          <td
                            key={r.trek.slug}
                            className="py-2 pr-4"
                            style={{ color: "#1A2A1E" }}
                          >
                            {row.fn(r.trek)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex gap-3 justify-center mt-8">
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setAnswers(defaultAnswers());
                  setResults([]);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
                data-ocid="trekfinder.retake_button"
                style={{
                  background: "rgba(232,84,26,0.15)",
                  color: "#4A5E52",
                  border: "1px solid rgba(232,84,26,0.3)",
                }}
              >
                <RefreshCw size={14} /> Retake Quiz
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(232,84,26,0.15)",
                  color: "#4A5E52",
                  border: "1px solid rgba(232,84,26,0.3)",
                }}
              >
                <Share2 size={14} /> Share Results
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="min-h-screen" style={{ background: "#EDF7F2" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-3"
            style={{ background: "rgba(232,84,26,0.15)", color: "#E8541A" }}
          >
            Trek Finder Quiz
          </div>
          <h1
            className="font-display text-4xl mb-2"
            style={{ color: "#1A2A1E" }}
          >
            Find Your Perfect Himalayan Trek
          </h1>
          <p className="text-sm" style={{ color: "#4A5E52" }}>
            Answer 8 quick questions and we'll match you with the best trek
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div
            className="flex justify-between text-xs mb-2"
            style={{ color: "#4A5E52" }}
          >
            <span>
              Question {step + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% done</span>
          </div>
          <div
            className="h-2 rounded-full"
            style={{ background: "rgba(232,84,26,0.2)" }}
          >
            <motion.div
              className="h-2 rounded-full"
              style={{
                background: "linear-gradient(to right, #E8541A, #4A5E52)",
              }}
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-2xl mb-6"
            style={{
              background: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(232,84,26,0.25)",
            }}
          >
            <h2
              className="font-display text-2xl mb-1"
              style={{ color: "#1A2A1E" }}
            >
              {q.q}
            </h2>
            {q.hint && (
              <p className="text-sm mb-6" style={{ color: "#4A5E52" }}>
                {q.hint}
              </p>
            )}
            {q.content}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            data-ocid="trekfinder.back_button"
            style={{
              background:
                step === 0
                  ? "rgba(232,84,26,0.05)"
                  : "rgba(232,84,26,0.15)",
              color: step === 0 ? "rgba(212,237,224,0.3)" : "#4A5E52",
              border: "1px solid rgba(232,84,26,0.2)",
              cursor: step === 0 ? "not-allowed" : "pointer",
            }}
          >
            <ChevronLeft size={16} /> Back
          </button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goNext}
            data-ocid="trekfinder.next_button"
            className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold"
            style={{ background: "#E8541A", color: "#FFFFFF" }}
          >
            {step === totalSteps - 1 ? "See My Treks" : "Next"}{" "}
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
