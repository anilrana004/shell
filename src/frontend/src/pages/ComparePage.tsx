import type { Trek } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight as ArrowRightIcon,
  Calendar as CalendarIcon,
  Check as CheckIcon,
  ChevronDown as ChevronDownIcon,
  Map as MapIcon,
  Mountain as MountainIcon,
  Printer as PrinterIcon,
  Ruler as RulerIcon,
  Search as SearchIcon,
  Share2 as Share2Icon,
  ShieldCheck as ShieldCheckIcon,
  Snowflake as SnowflakeIcon,
  Star as StarIcon,
  Tent as TentIcon,
  Train as TrainIcon,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  X as XIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Layout } from "../components/Layout";
import { DIFFICULTY_COLORS, TREKS } from "../data/treks";

// ─── Types ─────────────────────────────────────────────────────────────────

type Slot = Trek | null;

interface Param {
  label: string;
  icon: React.ReactNode;
  render: (t: Trek) => React.ReactNode;
  highlight?: (treks: [Slot, Slot, Slot]) => boolean[];
}

// ─── Lookup tables ──────────────────────────────────────────────────────────

const FITNESS_MAP: Record<string, string> = {
  Easy: "Easy",
  Moderate: "Moderate",
  Difficult: "High",
  Extreme: "Expert",
};

const WILDLIFE: Record<string, string> = {
  kedarkantha: "Monal Pheasant, Snow Leopard",
  "har-ki-dun": "Musk Deer, Himalayan Tahr",
  "chandernahan-lake": "Snow Leopard, Ibex",
  "chaainsheel-bugyal": "Himalayan Langur, Monal",
  "buran-ghati": "Snow Leopard, Barking Deer",
  "ruinsara-tal": "Himalayan Tahr, Snow Cock",
  "rupin-pass": "Brown Bear, Himalayan Tahr",
  "bali-pass": "Snow Leopard, Barking Deer",
  "dayara-bugyal": "Monal Pheasant, Fox",
  "nag-tibba": "Langur, Barking Deer",
  "chopta-chandrashila": "Himalayan Tahr, Musk Deer",
  "phulara-ridge": "Brown Bear, Himalayan Tahr",
  "borasu-pass": "Snow Leopard, Tibetan Wolf",
  "valley-of-flowers": "Snow Leopard, Himalayan Marmot",
};

const UNESCO_SLUGS = new Set(["valley-of-flowers"]);

const CAMPING_NIGHTS: Record<string, number> = {
  kedarkantha: 4,
  "har-ki-dun": 5,
  "chandernahan-lake": 3,
  "chaainsheel-bugyal": 2,
  "buran-ghati": 5,
  "ruinsara-tal": 4,
  "rupin-pass": 6,
  "bali-pass": 7,
  "dayara-bugyal": 3,
  "nag-tibba": 1,
  "chopta-chandrashila": 2,
  "phulara-ridge": 3,
  "borasu-pass": 8,
  "valley-of-flowers": 4,
};

const MAX_DAILY: Record<string, number> = {
  kedarkantha: 8,
  "har-ki-dun": 12,
  "chandernahan-lake": 10,
  "chaainsheel-bugyal": 7,
  "buran-ghati": 12,
  "ruinsara-tal": 10,
  "rupin-pass": 14,
  "bali-pass": 16,
  "dayara-bugyal": 7,
  "nag-tibba": 10,
  "chopta-chandrashila": 9,
  "phulara-ridge": 10,
  "borasu-pass": 14,
  "valley-of-flowers": 9,
};

const AVAILABLE_MONTHS: Record<string, string> = {
  kedarkantha: "Dec–Apr",
  "har-ki-dun": "Apr–Jun, Sep–Nov",
  "chandernahan-lake": "Jun–Oct",
  "chaainsheel-bugyal": "May–Oct",
  "buran-ghati": "May–Jun, Sep–Oct",
  "ruinsara-tal": "May–Oct",
  "rupin-pass": "May–Jun, Sep–Oct",
  "bali-pass": "May–Jun",
  "dayara-bugyal": "Nov–Apr, Jun–Sep",
  "nag-tibba": "Jan–Dec",
  "chopta-chandrashila": "Feb–Jun, Sep–Nov",
  "phulara-ridge": "Apr–Jun, Sep–Nov",
  "borasu-pass": "May–Jun",
  "valley-of-flowers": "Jul–Sep",
};

const GUIDE_RATIO: Record<string, string> = {
  kedarkantha: "1:8",
  "har-ki-dun": "1:6",
  "chandernahan-lake": "1:6",
  "chaainsheel-bugyal": "1:10",
  "buran-ghati": "1:4",
  "ruinsara-tal": "1:8",
  "rupin-pass": "1:4",
  "bali-pass": "1:3",
  "dayara-bugyal": "1:10",
  "nag-tibba": "1:10",
  "chopta-chandrashila": "1:8",
  "phulara-ridge": "1:6",
  "borasu-pass": "1:3",
  "valley-of-flowers": "1:8",
};

const NEXT_BATCH: Record<string, string> = {
  kedarkantha: "15 Jan 2025",
  "har-ki-dun": "12 Apr 2025",
  "chandernahan-lake": "20 Jun 2025",
  "chaainsheel-bugyal": "18 May 2025",
  "buran-ghati": "22 May 2025",
  "ruinsara-tal": "10 May 2025",
  "rupin-pass": "8 May 2025",
  "bali-pass": "1 Jun 2025",
  "dayara-bugyal": "25 Jan 2025",
  "nag-tibba": "Every Weekend",
  "chopta-chandrashila": "14 Feb 2025",
  "phulara-ridge": "20 Apr 2025",
  "borasu-pass": "15 May 2025",
  "valley-of-flowers": "5 Jul 2025",
};

const PERMIT_REQUIRED = new Set([
  "buran-ghati",
  "rupin-pass",
  "bali-pass",
  "borasu-pass",
  "valley-of-flowers",
  "ruinsara-tal",
  "chopta-chandrashila",
  "har-ki-dun",
]);
const SNOW_SEASON = new Set([
  "kedarkantha",
  "dayara-bugyal",
  "buran-ghati",
  "rupin-pass",
  "bali-pass",
  "borasu-pass",
  "nag-tibba",
  "chopta-chandrashila",
  "phulara-ridge",
]);
const SOLO_FRIENDLY = new Set([
  "kedarkantha",
  "har-ki-dun",
  "dayara-bugyal",
  "nag-tibba",
  "chopta-chandrashila",
  "valley-of-flowers",
  "phulara-ridge",
  "chandernahan-lake",
  "ruinsara-tal",
]);
const FAMILY_FRIENDLY = new Set([
  "kedarkantha",
  "dayara-bugyal",
  "nag-tibba",
  "chopta-chandrashila",
  "chaainsheel-bugyal",
]);
const CORPORATE_POPULAR = new Set([
  "kedarkantha",
  "har-ki-dun",
  "nag-tibba",
  "chopta-chandrashila",
  "dayara-bugyal",
  "valley-of-flowers",
]);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function numericHighlight(
  vals: (number | null)[],
  mode: "low" | "high",
): boolean[] {
  const defined = vals.filter((v): v is number => v !== null);
  if (defined.length < 2) return vals.map(() => false);
  const best = mode === "high" ? Math.max(...defined) : Math.min(...defined);
  return vals.map((v) => v !== null && v === best);
}

function YesNo({ yes }: { yes: boolean }) {
  return yes ? (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold"
      style={{ color: "#2E7D4F" }}
    >
      <CheckIcon size={13} />
      Yes
    </span>
  ) : (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold"
      style={{ color: "#E8541A" }}
    >
      <XIcon size={13} />
      No
    </span>
  );
}

// ─── TrekDropdown ────────────────────────────────────────────────────────────

function TrekDropdown({
  slot,
  onSelect,
  otherSlugs,
  index,
}: {
  slot: Trek | null;
  onSelect: (t: Trek | null) => void;
  otherSlugs: Set<string>;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = TREKS.filter(
    (t) =>
      !otherSlugs.has(t.slug) &&
      t.name.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    function onClickOut(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onClickOut);
    return () => document.removeEventListener("mousedown", onClickOut);
  }, []);

  const placeholders = [
    "Trek 1: Select a trek…",
    "Trek 2: Select a trek…",
    "Trek 3: Select a trek…",
  ];

  return (
    <div
      ref={ref}
      className="relative"
      data-ocid={`compare.selector.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition-colors"
        style={{
          background: "rgba(212,237,224,0.07)",
          border: "1px solid rgba(212,237,224,0.3)",
          color: slot ? "#1A2A1E" : "#4A5E52",
        }}
      >
        <span className="flex items-center gap-2 min-w-0">
          <MountainIcon size={15} style={{ color: "#E8541A", flexShrink: 0 }} />
          {slot ? (
            <span className="truncate font-semibold">{slot.name}</span>
          ) : (
            <span className="truncate opacity-70">{placeholders[index]}</span>
          )}
        </span>
        <span className="flex items-center gap-1.5 flex-shrink-0">
          {slot && (
            <span
              className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
              style={{
                background: `${DIFFICULTY_COLORS[slot.difficulty]}22`,
                color: DIFFICULTY_COLORS[slot.difficulty],
              }}
            >
              {slot.difficulty}
            </span>
          )}
          <ChevronDownIcon
            size={15}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
            style={{ color: "#4A5E52" }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute top-full mt-2 left-0 right-0 z-50 rounded-xl overflow-hidden shadow-2xl"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(212,237,224,0.3)",
            }}
          >
            <div
              className="p-2"
              style={{ borderBottom: "1px solid rgba(212,237,224,0.15)" }}
            >
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: "rgba(212,237,224,0.07)" }}
              >
                <SearchIcon size={13} style={{ color: "#4A5E52" }} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search treks…"
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "#1A2A1E" }}
                  data-ocid={`compare.search_input.${index + 1}`}
                />
              </div>
            </div>
            {slot && (
              <button
                type="button"
                onClick={() => {
                  onSelect(null);
                  setOpen(false);
                  setQuery("");
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-white/5"
                style={{ color: "#4A5E52" }}
              >
                <XIcon size={12} /> Clear selection
              </button>
            )}
            <div className="max-h-60 overflow-y-auto">
              {filtered.length === 0 ? (
                <div
                  className="px-4 py-3 text-sm opacity-60"
                  style={{ color: "#4A5E52" }}
                >
                  No treks found
                </div>
              ) : (
                filtered.map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => {
                      onSelect(t);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/5"
                    style={{ color: "#1A2A1E" }}
                  >
                    <span className="flex flex-col min-w-0">
                      <span className="font-medium truncate">{t.name}</span>
                      <span className="text-xs opacity-50">
                        {t.maxAltitude.toLocaleString()} ft · {t.trekDistance}{" "}
                        km
                      </span>
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0"
                      style={{
                        background: `${DIFFICULTY_COLORS[t.difficulty]}22`,
                        color: DIFFICULTY_COLORS[t.difficulty],
                      }}
                    >
                      {t.difficulty}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function ComparePage() {
  const [s0, setS0] = useState<Trek | null>(null);
  const [s1, setS1] = useState<Trek | null>(null);
  const [s2, setS2] = useState<Trek | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t1 = p.get("t1");
    const t2 = p.get("t2");
    const t3 = p.get("t3");
    if (t1) setS0(TREKS.find((t) => t.slug === t1) ?? null);
    if (t2) setS1(TREKS.find((t) => t.slug === t2) ?? null);
    if (t3) setS2(TREKS.find((t) => t.slug === t3) ?? null);
  }, []);

  const selected: [Slot, Slot, Slot] = [s0, s1, s2];
  const activeTreks = selected.filter((t): t is Trek => t !== null);
  const activeCount = activeTreks.length;

  const otherSlugs0 = new Set([s1?.slug, s2?.slug].filter(Boolean) as string[]);
  const otherSlugs1 = new Set([s0?.slug, s2?.slug].filter(Boolean) as string[]);
  const otherSlugs2 = new Set([s0?.slug, s1?.slug].filter(Boolean) as string[]);

  function saveComparison() {
    const url = new URL(window.location.href);
    if (s0) url.searchParams.set("t1", s0.slug);
    else url.searchParams.delete("t1");
    if (s1) url.searchParams.set("t2", s1.slug);
    else url.searchParams.delete("t2");
    if (s2) url.searchParams.set("t3", s2.slug);
    else url.searchParams.delete("t3");
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const params: Param[] = [
    {
      label: "Price",
      icon: <span>₹</span>,
      render: (t) => (
        <span className="font-bold" style={{ color: "#D4A843" }}>
          ₹{t.basePrice.toLocaleString()}
        </span>
      ),
      highlight: (sel) =>
        numericHighlight(
          sel.map((t) => t?.basePrice ?? null),
          "low",
        ),
    },
    {
      label: "Duration",
      icon: <CalendarIcon size={13} />,
      render: (t) => `${t.durationDays} days / ${t.durationNights} nights`,
      highlight: (sel) =>
        numericHighlight(
          sel.map((t) => t?.durationDays ?? null),
          "high",
        ),
    },
    {
      label: "Max Altitude",
      icon: <MountainIcon size={13} />,
      render: (t) => `${t.maxAltitude.toLocaleString()} ft`,
      highlight: (sel) =>
        numericHighlight(
          sel.map((t) => t?.maxAltitude ?? null),
          "high",
        ),
    },
    {
      label: "Trek Distance",
      icon: <RulerIcon size={13} />,
      render: (t) => `${t.trekDistance} km`,
      highlight: (sel) =>
        numericHighlight(
          sel.map((t) => t?.trekDistance ?? null),
          "high",
        ),
    },
    {
      label: "Difficulty",
      icon: <TrendingUpIcon size={13} />,
      render: (t) => (
        <span
          className="px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{
            background: `${DIFFICULTY_COLORS[t.difficulty]}22`,
            color: DIFFICULTY_COLORS[t.difficulty],
            border: `1px solid ${DIFFICULTY_COLORS[t.difficulty]}44`,
          }}
        >
          {t.difficulty}
        </span>
      ),
    },
    {
      label: "Best Season",
      icon: <CalendarIcon size={13} />,
      render: (t) => t.bestTime,
    },
    {
      label: "Starting Point",
      icon: <MapIcon size={13} />,
      render: (t) => t.startingPoint,
    },
    {
      label: "Fitness Required",
      icon: <TrendingUpIcon size={13} />,
      render: (t) => FITNESS_MAP[t.difficulty] ?? t.difficulty,
    },
    {
      label: "Min Age",
      icon: <UsersIcon size={13} />,
      render: (t) =>
        t.difficulty === "Extreme"
          ? "18 yrs"
          : t.difficulty === "Difficult"
            ? "16 yrs"
            : t.difficulty === "Moderate"
              ? "14 yrs"
              : "12 yrs",
    },
    {
      label: "Permit Required",
      icon: <ShieldCheckIcon size={13} />,
      render: (t) => <YesNo yes={PERMIT_REQUIRED.has(t.slug)} />,
    },
    {
      label: "Snow Season",
      icon: <SnowflakeIcon size={13} />,
      render: (t) => <YesNo yes={SNOW_SEASON.has(t.slug)} />,
    },
    {
      label: "Camping Nights",
      icon: <TentIcon size={13} />,
      render: (t) => `${CAMPING_NIGHTS[t.slug] ?? "—"} nights`,
      highlight: (sel) =>
        numericHighlight(
          sel.map((t) => (t ? (CAMPING_NIGHTS[t.slug] ?? null) : null)),
          "high",
        ),
    },
    {
      label: "Max Daily Distance",
      icon: <RulerIcon size={13} />,
      render: (t) => `${MAX_DAILY[t.slug] ?? "—"} km`,
    },
    {
      label: "Wildlife Spotting",
      icon: <span>🐦</span>,
      render: (t) => (
        <span className="text-xs">{WILDLIFE[t.slug] ?? "Various"}</span>
      ),
    },
    {
      label: "UNESCO Status",
      icon: <span>🏛</span>,
      render: (t) =>
        UNESCO_SLUGS.has(t.slug) ? (
          <span
            className="px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: "#D4A84322", color: "#D4A843" }}
          >
            UNESCO Heritage
          </span>
        ) : (
          <span style={{ opacity: 0.4, color: "#4A5E52" }}>—</span>
        ),
    },
    {
      label: "Available Months",
      icon: <CalendarIcon size={13} />,
      render: (t) => (
        <span className="text-xs">{AVAILABLE_MONTHS[t.slug] ?? "—"}</span>
      ),
    },
    {
      label: "Solo Friendly",
      icon: <span>🧍</span>,
      render: (t) => <YesNo yes={SOLO_FRIENDLY.has(t.slug)} />,
    },
    {
      label: "Family Friendly",
      icon: <span>👨‍👩‍👧</span>,
      render: (t) => <YesNo yes={FAMILY_FRIENDLY.has(t.slug)} />,
    },
    {
      label: "Corporate Popular",
      icon: <UsersIcon size={13} />,
      render: (t) => <YesNo yes={CORPORATE_POPULAR.has(t.slug)} />,
    },
    {
      label: "Nearest Railhead",
      icon: <TrainIcon size={13} />,
      render: (t) => (
        <span className="text-xs">{t.nearestRailhead ?? "—"}</span>
      ),
    },
    {
      label: "Guide Ratio",
      icon: <UsersIcon size={13} />,
      render: (t) => GUIDE_RATIO[t.slug] ?? "1:8",
    },
    {
      label: "Reviews",
      icon: <StarIcon size={13} />,
      render: (t) => `${t.reviewCount} reviews`,
      highlight: (sel) =>
        numericHighlight(
          sel.map((t) => t?.reviewCount ?? null),
          "high",
        ),
    },
    {
      label: "Rating",
      icon: <StarIcon size={13} />,
      render: (t) => (
        <span className="flex items-center justify-center gap-1">
          <StarIcon size={11} fill="#D4A843" style={{ color: "#D4A843" }} />
          <span className="font-bold">{t.rating?.toFixed(1) ?? "—"}</span>
        </span>
      ),
      highlight: (sel) =>
        numericHighlight(
          sel.map((t) => t?.rating ?? null),
          "high",
        ),
    },
    {
      label: "Seats Available",
      icon: <UsersIcon size={13} />,
      render: (t) => (
        <span
          style={{
            color:
              (t.seatsAvailable ?? 0) <= 3
                ? "#E8541A"
                : (t.seatsAvailable ?? 0) <= 6
                  ? "#D4A843"
                  : "#2E7D4F",
          }}
        >
          {t.seatsAvailable ?? "—"} seats
        </span>
      ),
    },
    {
      label: "Next Batch",
      icon: <CalendarIcon size={13} />,
      render: (t) => (
        <span className="text-xs font-medium" style={{ color: "#1A2A1E" }}>
          {NEXT_BATCH[t.slug] ?? "TBD"}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      {/* Hero header */}
      <div
        className="py-16 px-4 text-center"
        style={{
          background: "linear-gradient(160deg, #EDF7F2 0%, #FFFFFF 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ color: "#E8541A" }}
          >
            Side-by-Side Analysis
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
          >
            Compare Treks
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#4A5E52" }}>
            Select up to 3 treks and compare across 25 parameters to find your
            perfect Himalayan adventure.
          </p>
        </motion.div>
      </div>

      {/* Selectors */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid rgba(212,237,224,0.15)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TrekDropdown
              slot={s0}
              onSelect={setS0}
              otherSlugs={otherSlugs0}
              index={0}
            />
            <TrekDropdown
              slot={s1}
              onSelect={setS1}
              otherSlugs={otherSlugs1}
              index={1}
            />
            <TrekDropdown
              slot={s2}
              onSelect={setS2}
              otherSlugs={otherSlugs2}
              index={2}
            />
          </div>
          {activeCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mt-4 flex-wrap"
            >
              <button
                type="button"
                onClick={saveComparison}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: copied
                    ? "rgba(45,80,22,0.3)"
                    : "rgba(212,237,224,0.1)",
                  border: "1px solid rgba(212,237,224,0.3)",
                  color: copied ? "#2E7D4F" : "#1A2A1E",
                }}
                data-ocid="compare.save_button"
              >
                {copied ? <CheckIcon size={13} /> : <Share2Icon size={13} />}
                {copied ? "Link copied!" : "Save Comparison"}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: "rgba(212,237,224,0.1)",
                  border: "1px solid rgba(212,237,224,0.3)",
                  color: "#1A2A1E",
                }}
                data-ocid="compare.print_button"
              >
                <PrinterIcon size={13} /> Print
              </button>
              <span className="text-sm ml-auto" style={{ color: "#4A5E52" }}>
                {activeCount} trek{activeCount !== 1 ? "s" : ""} selected
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ background: "#EDF7F2", minHeight: "60vh" }}>
        <div className="max-w-6xl mx-auto px-4 py-10">
          <AnimatePresence mode="wait">
            {activeCount === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
                data-ocid="compare.empty_state"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: "rgba(232,84,26,0.1)",
                    border: "1px solid rgba(232,84,26,0.25)",
                  }}
                >
                  <MountainIcon size={36} style={{ color: "#E8541A" }} />
                </div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#1A2A1E",
                  }}
                >
                  Select a trek above to start comparing
                </h2>
                <p
                  className="text-base mb-8 max-w-md mx-auto"
                  style={{ color: "#4A5E52" }}
                >
                  Choose up to 3 treks from the dropdowns above to see a
                  detailed comparison across 25 parameters.
                </p>
                <Link
                  to="/treks"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: "#E8541A", color: "#FFFFFF" }}
                  data-ocid="compare.browse_treks_link"
                >
                  Browse All Treks <ArrowRightIcon size={15} />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Trek header cards */}
                <div className="overflow-x-auto">
                  <div style={{ minWidth: `${200 + activeCount * 220}px` }}>
                    {/* Header row with trek cards */}
                    <div className="flex gap-px mb-1">
                      <div style={{ width: 200, flexShrink: 0 }} />
                      {selected.map((t, i) =>
                        t ? (
                          <motion.div
                            key={t.slug}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex-1 rounded-2xl overflow-hidden"
                            style={{
                              border: "1px solid rgba(212,237,224,0.2)",
                              minWidth: 200,
                            }}
                          >
                            <div className="relative h-32">
                              <img
                                src={t.heroImage}
                                alt={t.name}
                                className="w-full h-full object-cover"
                              />
                              <div
                                className="absolute inset-0"
                                style={{
                                  background:
                                    "linear-gradient(to top, #EDF7F2 0%, transparent 60%)",
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (i === 0) setS0(null);
                                  else if (i === 1) setS1(null);
                                  else setS2(null);
                                }}
                                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                                style={{
                                  background: "rgba(255,255,255,0.85)",
                                  border: "1px solid rgba(212,237,224,0.3)",
                                }}
                                aria-label={`Remove ${t.name}`}
                              >
                                <XIcon size={11} style={{ color: "#4A5E52" }} />
                              </button>
                            </div>
                            <div
                              className="p-3"
                              style={{ background: "#FFFFFF" }}
                            >
                              <h3
                                className="font-bold text-sm leading-snug mb-1.5"
                                style={{
                                  fontFamily: "var(--font-display)",
                                  color: "#1A2A1E",
                                }}
                              >
                                {t.name}
                              </h3>
                              <div className="flex items-center gap-2 flex-wrap mb-3">
                                <span
                                  className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                                  style={{
                                    background: `${DIFFICULTY_COLORS[t.difficulty]}22`,
                                    color: DIFFICULTY_COLORS[t.difficulty],
                                  }}
                                >
                                  {t.difficulty}
                                </span>
                                <span
                                  className="text-xs font-semibold"
                                  style={{ color: "#D4A843" }}
                                >
                                  ₹{t.basePrice.toLocaleString()}
                                </span>
                                <span
                                  className="flex items-center gap-0.5 text-xs"
                                  style={{ color: "#D4A843" }}
                                >
                                  <StarIcon size={10} fill="#D4A843" />{" "}
                                  {t.rating?.toFixed(1) ?? "—"}
                                </span>
                              </div>
                              <Link
                                to="/book/$slug"
                                params={{ slug: t.slug }}
                                className="block w-full text-center py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                                style={{
                                  background: "#E8541A", color: "#FFFFFF",
                                }}
                                data-ocid={`compare.book_button.${i + 1}`}
                              >
                                Book This Trek
                              </Link>
                            </div>
                          </motion.div>
                        ) : null,
                      )}
                    </div>

                    {/* Parameter rows */}
                    <div
                      className="rounded-2xl overflow-hidden mt-4"
                      style={{ border: "1px solid rgba(212,237,224,0.15)" }}
                      data-ocid="compare.table"
                    >
                      {params.map((param, rowIdx) => {
                        const hl = param.highlight
                          ? param.highlight(selected)
                          : [false, false, false];
                        return (
                          <div
                            key={`${param.label}-${rowIdx}`}
                            className="flex"
                            style={{
                              background:
                                rowIdx % 2 === 0
                                  ? "rgba(255,255,255,0.6)"
                                  : "rgba(255,255,255,0.8)",
                              borderBottom: "1px solid rgba(212,237,224,0.07)",
                            }}
                          >
                            <div
                              className="flex items-center gap-2 px-4 py-3 text-xs font-medium flex-shrink-0"
                              style={{
                                width: 200,
                                color: "#4A5E52",
                                borderRight: "1px solid rgba(212,237,224,0.1)",
                              }}
                            >
                              <span style={{ color: "#E8541A" }}>
                                {param.icon}
                              </span>
                              {param.label}
                            </div>
                            {selected.map((t, colIdx) =>
                              t ? (
                                <div
                                  key={`${t.slug}-${rowIdx}`}
                                  className="flex-1 flex items-center justify-center px-3 py-3 text-sm text-center"
                                  style={{
                                    minWidth: 200,
                                    background: hl[colIdx]
                                      ? "rgba(201,168,76,0.13)"
                                      : undefined,
                                    borderRight:
                                      colIdx < 2
                                        ? "1px solid rgba(212,237,224,0.07)"
                                        : undefined,
                                    color: "#1A2A1E",
                                  }}
                                >
                                  {hl[colIdx] && (
                                    <span
                                      className="mr-1 text-xs"
                                      style={{ color: "#D4A843" }}
                                    >
                                      ★
                                    </span>
                                  )}
                                  {param.render(t)}
                                </div>
                              ) : null,
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer CTA row */}
                    <div className="flex gap-px mt-4">
                      <div style={{ width: 200, flexShrink: 0 }} />
                      {selected.map((t, i) =>
                        t ? (
                          <div
                            key={t.slug}
                            className="flex-1 flex flex-col gap-2"
                            style={{ minWidth: 200 }}
                          >
                            <Link
                              to="/book/$slug"
                              params={{ slug: t.slug }}
                              className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                              style={{
                                background: "#E8541A", color: "#FFFFFF",
                              }}
                              data-ocid={`compare.book_bottom_button.${i + 1}`}
                            >
                              Book {t.name} <ArrowRightIcon size={13} />
                            </Link>
                            <Link
                              to="/treks/$slug"
                              params={{ slug: t.slug }}
                              className="flex items-center justify-center py-2 rounded-xl text-xs transition-all hover:opacity-80"
                              style={{
                                border: "1px solid rgba(212,237,224,0.3)",
                                color: "#4A5E52",
                              }}
                              data-ocid={`compare.view_details_link.${i + 1}`}
                            >
                              View Full Details
                            </Link>
                          </div>
                        ) : null,
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>
        {
          "@media print { header, footer { display: none !important; } body { background: white !important; color: black !important; } }"
        }
      </style>
    </Layout>
  );
}
