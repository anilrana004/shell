import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DIFFICULTY_COLORS, TREKS } from "@/data/treks";
import type { Trek } from "@/types";
import { Link } from "@tanstack/react-router";
import { Heart, SlidersHorizontal, Star, X } from "lucide-react";
import { useMemo, useState } from "react";

const QUICK_FILTERS = [
  { label: "Beginner Friendly", key: "beginner" },
  { label: "Snow Trek", key: "snow" },
  { label: "High Altitude", key: "highAlt" },
  { label: "Camping", key: "camping" },
  { label: "Winter", key: "winter" },
  { label: "Monsoon", key: "monsoon" },
  { label: "Family", key: "family" },
  { label: "Weekend Trek", key: "weekend" },
  { label: "Under ₹5,000", key: "budget" },
  { label: "UNESCO Site", key: "unesco" },
];

const SORT_OPTIONS = [
  { label: "Best Rated", value: "rating" },
  { label: "Lowest Price", value: "price_asc" },
  { label: "Highest Altitude", value: "altitude" },
  { label: "Duration (Short to Long)", value: "duration" },
];

const DIFFICULTIES = ["Easy", "Moderate", "Difficult", "Extreme"] as const;
const SEASONS = [
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
const GROUP_TYPES = ["Solo", "Couple", "Group", "Family", "Corporate"];

function applyQuickFilter(trek: Trek, key: string): boolean {
  switch (key) {
    case "beginner":
      return trek.difficulty === "Easy";
    case "snow":
      return (
        trek.bestTime.toLowerCase().includes("jan") ||
        trek.bestTime.toLowerCase().includes("dec") ||
        trek.bestTime.toLowerCase().includes("feb")
      );
    case "highAlt":
      return trek.maxAltitude >= 14000;
    case "camping":
      return true;
    case "winter":
      return (
        trek.bestTime.toLowerCase().includes("dec") ||
        trek.bestTime.toLowerCase().includes("jan")
      );
    case "monsoon":
      return (
        trek.bestTime.toLowerCase().includes("jul") ||
        trek.bestTime.toLowerCase().includes("aug")
      );
    case "family":
      return trek.difficulty === "Easy" || trek.difficulty === "Moderate";
    case "weekend":
      return trek.durationDays <= 3;
    case "budget":
      return trek.basePrice < 5000;
    case "unesco":
      return trek.slug === "valley-of-flowers";
    default:
      return true;
  }
}

function TrekCard({ trek }: { trek: Trek }) {
  const [wishlisted, setWishlisted] = useState(false);
  const diffColor = DIFFICULTY_COLORS[trek.difficulty] ?? "#E8541A";
  const seatsLow = (trek.seatsAvailable ?? 10) <= 3;

  return (
    <div
      data-ocid={`treks.item.${trek.id}`}
      className="relative rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "#EDF7F2",
        border: "1px solid rgba(212,237,224,0.15)",
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={trek.heroImage}
          alt={trek.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <button
          type="button"
          data-ocid={`treks.wishlist.${trek.id}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setWishlisted((w) => !w)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.85)" }}
        >
          <Heart
            size={16}
            fill={wishlisted ? "#E8541A" : "none"}
            stroke={wishlisted ? "#E8541A" : "#1A2A1E"}
          />
        </button>
        <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "#E8541A", color: "#FFFFFF" }}
          >
            {trek.difficulty}
          </span>
          {trek.slug === "valley-of-flowers" && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "#D4A843", color: "#EDF7F2" }}
            >
              UNESCO
            </span>
          )}
        </div>
        {seatsLow && (
          <div
            className="absolute bottom-3 left-3 text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: "#E8541A", color: "#FFFFFF" }}
          >
            Only {trek.seatsAvailable} seats left!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3
          className="text-lg leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
        >
          {trek.name}
        </h3>
        <p className="text-xs line-clamp-2" style={{ color: "#4A5E52" }}>
          {trek.shortDescription}
        </p>

        <div
          className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-1"
          style={{ color: "#4A5E52" }}
        >
          <span>
            ⏱ {trek.durationDays}D/{trek.durationNights}N
          </span>
          <span>📍 {trek.maxAltitude.toLocaleString()} ft</span>
          <span>📅 {trek.bestTime}</span>
        </div>

        {trek.rating && (
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "#D4A843" }}
          >
            <Star size={12} fill="#D4A843" />
            <span>{trek.rating}</span>
            <span style={{ color: "#4A5E52" }}>
              ({trek.reviewCount} reviews)
            </span>
          </div>
        )}

        <div
          className="flex items-center justify-between mt-auto pt-2"
          style={{ borderTop: "1px solid rgba(212,237,224,0.1)" }}
        >
          <div>
            <span className="text-xs" style={{ color: "#4A5E52" }}>
              From{" "}
            </span>
            <span
              className="text-base font-bold"
              style={{ color: "#D4A843", fontFamily: "var(--font-display)" }}
            >
              ₹{trek.basePrice.toLocaleString()}
            </span>
          </div>
          <Link to="/book/$slug" params={{ slug: trek.slug }}>
            <Button
              size="sm"
              data-ocid={`treks.book_button.${trek.id}`}
              className="text-xs px-3"
              style={{
                background: "#E8541A", color: "#FFFFFF",
                border: "none",
              }}
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function FilterPanel({
  difficulties,
  setDifficulties,
  maxDuration,
  setMaxDuration,
  maxAlt,
  setMaxAlt,
  season,
  setSeason,
  maxBudget,
  setMaxBudget,
  groupType,
  setGroupType,
}: {
  difficulties: string[];
  setDifficulties: (v: string[]) => void;
  maxDuration: number;
  setMaxDuration: (v: number) => void;
  maxAlt: number;
  setMaxAlt: (v: number) => void;
  season: string;
  setSeason: (v: string) => void;
  maxBudget: number;
  setMaxBudget: (v: number) => void;
  groupType: string;
  setGroupType: (v: string) => void;
}) {
  function toggleDiff(d: string) {
    setDifficulties(
      difficulties.includes(d)
        ? difficulties.filter((x) => x !== d)
        : [...difficulties, d],
    );
  }

  return (
    <div className="space-y-6 text-sm" style={{ color: "#1A2A1E" }}>
      {/* Difficulty */}
      <div>
        <p className="font-semibold mb-2" style={{ color: "#4A5E52" }}>
          Difficulty
        </p>
        {DIFFICULTIES.map((d) => (
          <div key={d} className="flex items-center gap-2 mb-1.5">
            <Checkbox
              id={`diff-${d}`}
              checked={difficulties.includes(d)}
              onCheckedChange={() => toggleDiff(d)}
              data-ocid={`treks.filter.diff.${d.toLowerCase()}`}
            />
            <Label htmlFor={`diff-${d}`} style={{ color: "#1A2A1E" }}>
              {d}
            </Label>
          </div>
        ))}
      </div>

      {/* Duration */}
      <div>
        <p className="font-semibold mb-2" style={{ color: "#4A5E52" }}>
          Max Duration: {maxDuration} days
        </p>
        <input
          type="range"
          min={2}
          max={12}
          value={maxDuration}
          onChange={(e) => setMaxDuration(Number(e.target.value))}
          className="w-full accent-rose-600"
          data-ocid="treks.filter.duration"
        />
        <div
          className="flex justify-between text-xs"
          style={{ color: "#4A5E52" }}
        >
          <span>2 days</span>
          <span>12 days</span>
        </div>
      </div>

      {/* Altitude */}
      <div>
        <p className="font-semibold mb-2" style={{ color: "#4A5E52" }}>
          Max Altitude: {maxAlt.toLocaleString()} ft
        </p>
        <input
          type="range"
          min={9000}
          max={18000}
          step={500}
          value={maxAlt}
          onChange={(e) => setMaxAlt(Number(e.target.value))}
          className="w-full accent-rose-600"
          data-ocid="treks.filter.altitude"
        />
        <div
          className="flex justify-between text-xs"
          style={{ color: "#4A5E52" }}
        >
          <span>9,000 ft</span>
          <span>18,000 ft</span>
        </div>
      </div>

      {/* Budget */}
      <div>
        <p className="font-semibold mb-2" style={{ color: "#4A5E52" }}>
          Max Budget: ₹{maxBudget.toLocaleString()}
        </p>
        <input
          type="range"
          min={2000}
          max={20000}
          step={500}
          value={maxBudget}
          onChange={(e) => setMaxBudget(Number(e.target.value))}
          className="w-full accent-rose-600"
          data-ocid="treks.filter.budget"
        />
        <div
          className="flex justify-between text-xs"
          style={{ color: "#4A5E52" }}
        >
          <span>₹2,000</span>
          <span>₹20,000+</span>
        </div>
      </div>

      {/* Season */}
      <div>
        <p className="font-semibold mb-2" style={{ color: "#4A5E52" }}>
          Best Season
        </p>
        <div className="flex flex-wrap gap-1">
          {SEASONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeason(season === s ? "" : s)}
              className="text-xs px-2 py-1 rounded-full border transition-colors"
              style={{
                borderColor: season === s ? "#E8541A" : "rgba(212,237,224,0.3)",
                background: season === s ? "#E8541A" : "transparent",
                color: season === s ? "#FFFFFF" : "#1A2A1E",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Group Type */}
      <div>
        <p className="font-semibold mb-2" style={{ color: "#4A5E52" }}>
          Group Type
        </p>
        <div className="flex flex-wrap gap-1">
          {GROUP_TYPES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroupType(groupType === g ? "" : g)}
              className="text-xs px-2 py-1 rounded-full border transition-colors"
              style={{
                borderColor:
                  groupType === g ? "#E8541A" : "rgba(212,237,224,0.3)",
                background: groupType === g ? "#E8541A" : "transparent",
                color: groupType === g ? "#FFFFFF" : "#1A2A1E",
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TreksPage() {
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [maxDuration, setMaxDuration] = useState(12);
  const [maxAlt, setMaxAlt] = useState(18000);
  const [season, setSeason] = useState("");
  const [maxBudget, setMaxBudget] = useState(20000);
  const [groupType, setGroupType] = useState("");
  const [activeQuick, setActiveQuick] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");

  function toggleQuick(key: string) {
    setActiveQuick((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }

  const filtered = useMemo(() => {
    let list = [...TREKS];
    if (difficulties.length > 0) {
      list = list.filter((t) => difficulties.includes(t.difficulty));
    }
    list = list.filter(
      (t) =>
        t.durationDays <= maxDuration &&
        t.maxAltitude <= maxAlt &&
        t.basePrice <= maxBudget,
    );
    if (season) {
      list = list.filter((t) =>
        t.bestTime.toLowerCase().includes(season.toLowerCase()),
      );
    }
    for (const qk of activeQuick) {
      list = list.filter((t) => applyQuickFilter(t, qk));
    }
    switch (sortBy) {
      case "rating":
        list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "price_asc":
        list.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "altitude":
        list.sort((a, b) => b.maxAltitude - a.maxAltitude);
        break;
      case "duration":
        list.sort((a, b) => a.durationDays - b.durationDays);
        break;
    }
    return list;
  }, [
    difficulties,
    maxDuration,
    maxAlt,
    season,
    maxBudget,
    activeQuick,
    sortBy,
  ]);

  const activeFilterCount =
    difficulties.length +
    (maxDuration < 12 ? 1 : 0) +
    (maxAlt < 18000 ? 1 : 0) +
    (maxBudget < 20000 ? 1 : 0) +
    (season ? 1 : 0) +
    (groupType ? 1 : 0) +
    activeQuick.length;

  function clearAll() {
    setDifficulties([]);
    setMaxDuration(12);
    setMaxAlt(18000);
    setSeason("");
    setMaxBudget(20000);
    setGroupType("");
    setActiveQuick([]);
  }

  const filterProps = {
    difficulties,
    setDifficulties,
    maxDuration,
    setMaxDuration,
    maxAlt,
    setMaxAlt,
    season,
    setSeason,
    maxBudget,
    setMaxBudget,
    groupType,
    setGroupType,
  };

  return (
    <>
      <head>
        <title>All Treks — Shail Hikers | Himalayan Trekking Uttarakhand</title>
        <meta
          name="description"
          content="Explore 14 legendary Himalayan treks with Shail Hikers. Filter by difficulty, season, altitude, budget. Book your perfect trek today."
        />
      </head>

      <div className="min-h-screen" style={{ background: "#FFFFFF" }}>
        {/* Page Header */}
        <div
          className="py-16 px-6 text-center"
          style={{
            background: "linear-gradient(180deg, #EDF7F2 0%, #FFFFFF 100%)",
          }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#4A5E52" }}
          >
            Uttarakhand's Finest
          </p>
          <h1
            className="text-5xl md:text-7xl mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "#1A2A1E",
              letterSpacing: "-0.02em",
            }}
          >
            ALL TREKS
          </h1>
          <p className="text-base" style={{ color: "#4A5E52" }}>
            14 legendary trails · handpicked routes · expert guides
          </p>
        </div>

        {/* Quick Filter Pills */}
        <div
          className="px-6 py-4 overflow-x-auto"
          style={{
            background: "#EDF7F2",
            borderBottom: "1px solid rgba(212,237,224,0.15)",
          }}
        >
          <div className="flex gap-2 min-w-max mx-auto max-w-6xl">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                data-ocid={`treks.quickfilter.${f.key}`}
                onClick={() => toggleQuick(f.key)}
                className="text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors"
                style={{
                  borderColor: activeQuick.includes(f.key)
                    ? "#E8541A"
                    : "rgba(212,237,224,0.3)",
                  background: activeQuick.includes(f.key)
                    ? "#E8541A"
                    : "transparent",
                  color: "#1A2A1E",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex gap-8">
          {/* Desktop Sidebar */}
          <aside
            className="hidden lg:block w-64 shrink-0 rounded-xl p-5 self-start sticky top-24"
            style={{
              background: "#EDF7F2",
              border: "1px solid rgba(212,237,224,0.15)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <span
                className="font-semibold"
                style={{ color: "#1A2A1E", fontFamily: "var(--font-display)" }}
              >
                Filters
              </span>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs"
                  style={{ color: "#4A5E52" }}
                >
                  Clear all
                </button>
              )}
            </div>
            <FilterPanel {...filterProps} />
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden gap-2"
                      data-ocid="treks.filter_sheet_open"
                      style={{
                        borderColor: "rgba(212,237,224,0.3)",
                        color: "#1A2A1E",
                        background: "transparent",
                      }}
                    >
                      <SlidersHorizontal size={14} />
                      Filters{" "}
                      {activeFilterCount > 0 && `(${activeFilterCount})`}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="overflow-y-auto"
                    style={{
                      background: "#EDF7F2",
                      border: "none",
                      color: "#1A2A1E",
                    }}
                  >
                    <SheetHeader className="mb-6">
                      <SheetTitle
                        style={{
                          color: "#1A2A1E",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        Filter Treks
                      </SheetTitle>
                    </SheetHeader>
                    <FilterPanel {...filterProps} />
                  </SheetContent>
                </Sheet>

                <span className="text-sm" style={{ color: "#4A5E52" }}>
                  Showing{" "}
                  <strong style={{ color: "#1A2A1E" }}>
                    {filtered.length}
                  </strong>{" "}
                  treks
                </span>
              </div>

              {/* Active filter chips */}
              <div className="flex flex-wrap gap-1">
                {difficulties.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(232,84,26,0.2)",
                      color: "#1A2A1E",
                      border: "1px solid #E8541A",
                    }}
                  >
                    {d}
                    <button
                      type="button"
                      onClick={() =>
                        setDifficulties(difficulties.filter((x) => x !== d))
                      }
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
                {season && (
                  <span
                    className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(232,84,26,0.2)",
                      color: "#1A2A1E",
                      border: "1px solid #E8541A",
                    }}
                  >
                    {season}
                    <button type="button" onClick={() => setSeason("")}>
                      <X size={10} />
                    </button>
                  </span>
                )}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                data-ocid="treks.sort_select"
                className="text-sm rounded-lg px-3 py-1.5 border"
                style={{
                  background: "#EDF7F2",
                  color: "#1A2A1E",
                  borderColor: "rgba(212,237,224,0.3)",
                }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Trek Grid */}
            {filtered.length === 0 ? (
              <div
                data-ocid="treks.empty_state"
                className="py-20 text-center rounded-xl"
                style={{
                  background: "#EDF7F2",
                  border: "1px solid rgba(212,237,224,0.15)",
                }}
              >
                <p className="text-4xl mb-4">🏔</p>
                <p
                  className="text-lg mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#1A2A1E",
                  }}
                >
                  No treks match your filters
                </p>
                <p className="text-sm mb-5" style={{ color: "#4A5E52" }}>
                  Try broadening your search criteria
                </p>
                <Button
                  onClick={clearAll}
                  data-ocid="treks.clear_filters_button"
                  style={{ background: "#E8541A", color: "#FFFFFF" }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((trek) => (
                  <Link
                    key={trek.id}
                    to="/treks/$slug"
                    params={{ slug: trek.slug }}
                    className="block"
                  >
                    <TrekCard trek={trek} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
