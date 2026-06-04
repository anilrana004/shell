import { TREKS } from "@/data/treks";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "@tanstack/react-router";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

const QUICK_FILTERS = [
  "Beginner Friendly",
  "Snow Trek",
  "High Altitude",
  "Camping",
  "Winter",
  "Monsoon",
  "Family",
  "Weekend Trek",
  "Under ₹5,000",
  "UNESCO Site",
];

const MONTHS = [
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
];
const DIFFICULTIES = ["Easy", "Moderate", "Difficult", "Extreme"];
const DURATIONS = ["1–3 days", "4–6 days", "7–10 days", "10+ days"];
const BUDGETS = ["Under ₹3,000", "₹3,000–₹7,000", "₹7,000–₹12,000", "₹12,000+"];
const GROUP_TYPES = ["Solo", "Couple", "Friends", "Family", "Corporate"];

const DROPDOWNS = [
  {
    label: "Month",
    key: "month" as const,
    options: MONTHS,
    id: "search.month",
  },
  {
    label: "Difficulty",
    key: "difficulty" as const,
    options: DIFFICULTIES,
    id: "search.difficulty",
  },
  {
    label: "Duration",
    key: "duration" as const,
    options: DURATIONS,
    id: "search.duration",
  },
  {
    label: "Budget",
    key: "budget" as const,
    options: BUDGETS,
    id: "search.budget",
  },
  {
    label: "Group",
    key: "groupType" as const,
    options: GROUP_TYPES,
    id: "search.group",
  },
];

const selectClass =
  "w-full px-2.5 py-2 rounded-lg text-xs md:text-sm outline-none cursor-pointer";
const selectStyle = {
  background: "rgba(255,255,255,0.85)",
  border: "1px solid rgba(232,160,170,0.25)",
};

interface SearchBarProps {
  compact?: boolean;
}

export function SearchBar({ compact }: SearchBarProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [month, setMonth] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [groupType, setGroupType] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const values = { month, difficulty, duration, budget, groupType };
  const setters = {
    month: setMonth,
    difficulty: setDifficulty,
    duration: setDuration,
    budget: setBudget,
    groupType: setGroupType,
  };

  const results = useMemo(() => {
    let filtered = TREKS;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q) ||
          t.startingPoint.toLowerCase().includes(q),
      );
    }
    if (difficulty)
      filtered = filtered.filter((t) => t.difficulty === difficulty);
    if (month)
      filtered = filtered.filter((t) =>
        t.bestTime.toLowerCase().includes(month.slice(0, 3).toLowerCase()),
      );
    if (duration) {
      if (duration === "1–3 days")
        filtered = filtered.filter((t) => t.durationDays <= 3);
      else if (duration === "4–6 days")
        filtered = filtered.filter(
          (t) => t.durationDays >= 4 && t.durationDays <= 6,
        );
      else if (duration === "7–10 days")
        filtered = filtered.filter(
          (t) => t.durationDays >= 7 && t.durationDays <= 10,
        );
      else if (duration === "10+ days")
        filtered = filtered.filter((t) => t.durationDays > 10);
    }
    if (budget) {
      if (budget === "Under ₹3,000")
        filtered = filtered.filter((t) => t.basePrice < 3000);
      else if (budget === "₹3,000–₹7,000")
        filtered = filtered.filter(
          (t) => t.basePrice >= 3000 && t.basePrice <= 7000,
        );
      else if (budget === "₹7,000–₹12,000")
        filtered = filtered.filter(
          (t) => t.basePrice > 7000 && t.basePrice <= 12000,
        );
      else if (budget === "₹12,000+")
        filtered = filtered.filter((t) => t.basePrice > 12000);
    }
    if (activeFilters.includes("Under ₹5,000"))
      filtered = filtered.filter((t) => t.basePrice < 5000);
    if (activeFilters.includes("Beginner Friendly"))
      filtered = filtered.filter((t) => t.difficulty === "Easy");
    if (activeFilters.includes("High Altitude"))
      filtered = filtered.filter((t) => t.maxAltitude > 14000);
    if (activeFilters.includes("Weekend Trek"))
      filtered = filtered.filter((t) => t.durationDays <= 3);
    if (activeFilters.includes("UNESCO Site"))
      filtered = filtered.filter((t) => t.name.includes("Valley of Flowers"));
    return filtered;
  }, [query, difficulty, month, duration, budget, activeFilters]);

  const activeCount =
    (query ? 1 : 0) +
    (difficulty ? 1 : 0) +
    (month ? 1 : 0) +
    (duration ? 1 : 0) +
    (budget ? 1 : 0) +
    (groupType ? 1 : 0) +
    activeFilters.length;

  const hasFilters = activeCount > 0;

  const toggleFilter = (f: string) =>
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );

  const clearAll = () => {
    setQuery("");
    setDifficulty("");
    setMonth("");
    setDuration("");
    setBudget("");
    setGroupType("");
    setActiveFilters([]);
  };

  const handleSearch = () => {
    navigate({ to: "/treks" });
    if (isMobile) setFiltersOpen(false);
  };

  const renderDropdown = (
    d: (typeof DROPDOWNS)[number],
    mobile = false,
  ) => (
    <select
      key={d.label}
      data-ocid={d.id}
      value={values[d.key]}
      onChange={(e) => setters[d.key](e.target.value)}
      className={`${selectClass} ${mobile ? "min-w-0" : "min-w-[110px] md:py-2.5"}`}
      style={{
        ...selectStyle,
        color: values[d.key] ? "#1A1A1A" : "#4A4A4A88",
      }}
    >
      <option value="">{d.label}</option>
      {d.options.map((o) => (
        <option key={o} value={o} style={{ background: "#E6D8C4", color: "#1A1A1A" }}>
          {o}
        </option>
      ))}
    </select>
  );

  const renderPills = (scrollable = false) => (
    <div
      className={
        scrollable
          ? "flex gap-1.5 overflow-x-auto pb-0.5 -mx-1 px-1"
          : "flex flex-wrap gap-2 items-center"
      }
      style={scrollable ? { scrollbarWidth: "none" } : undefined}
    >
      {!scrollable && (
        <Filter size={13} style={{ color: "#4A4A4A60" }} className="flex-shrink-0" />
      )}
      {QUICK_FILTERS.map((f) => (
        <button
          key={f}
          type="button"
          data-ocid={`search.filter.${f.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
          onClick={() => toggleFilter(f)}
          className={`font-medium transition-all flex-shrink-0 ${
            scrollable
              ? "px-2.5 py-1 rounded-full text-[11px]"
              : "px-3 py-1 rounded-full text-xs"
          }`}
          style={{
            background: activeFilters.includes(f)
              ? "#F88379"
              : "rgba(255,255,255,0.8)",
            border: `1px solid ${activeFilters.includes(f) ? "#F88379" : "rgba(232,160,170,0.2)"}`,
            color: activeFilters.includes(f) ? "#1A1A1A" : "#4A4A4A",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );

  return (
    <section
      data-ocid="search.section"
      className={`w-full ${compact ? "" : "md:sticky md:z-30 md:top-[7.5rem]"}`}
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid rgba(232,160,170,0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-3 py-2 md:px-4 md:py-4">
        {/* Mobile: compact search row */}
        <div className="md:hidden space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative min-w-0">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#4A4A4A80" }}
              />
              <input
                type="text"
                data-ocid="search.search_input"
                placeholder="Search treks, regions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full h-9 pl-8 pr-2 rounded-lg text-sm outline-none placeholder:opacity-50"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(232,160,170,0.25)",
                  color: "#1A1A1A",
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              className="h-9 px-2.5 rounded-lg text-xs font-medium flex items-center gap-1 flex-shrink-0"
              style={{
                background: filtersOpen ? "rgba(248,131,121,0.15)" : "rgba(255,255,255,0.85)",
                border: "1px solid rgba(232,160,170,0.35)",
                color: "#1A1A1A",
              }}
              aria-expanded={filtersOpen}
              aria-label="Toggle filters"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {activeCount > 0 && (
                <span
                  className="min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "#F88379", color: "#1A1A1A" }}
                >
                  {activeCount}
                </span>
              )}
            </button>
            <button
              type="button"
              data-ocid="search.submit_button"
              onClick={handleSearch}
              className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "#F88379", color: "#1A1A1A" }}
              aria-label="Search treks"
            >
              <Search size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 text-[11px]" style={{ color: "#4A4A4A" }}>
            <span>
              {results.length} trek{results.length !== 1 ? "s" : ""} found
            </span>
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="underline underline-offset-2"
                style={{ color: "#F88379" }}
              >
                Clear all
              </button>
            )}
          </div>

          {filtersOpen && (
            <div className="space-y-2 pt-1 pb-0.5 border-t border-[#F8837922]">
              <div className="grid grid-cols-2 gap-2">
                {DROPDOWNS.map((d) => renderDropdown(d, true))}
              </div>
              {renderPills(true)}
            </div>
          )}

          {!filtersOpen && activeFilters.length > 0 && (
            <div className="-mt-1">{renderPills(true)}</div>
          )}
        </div>

        {/* Desktop: full search bar */}
        <div className="hidden md:block">
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex-1 min-w-48 relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#4A4A4A80" }}
              />
              <input
                type="text"
                data-ocid="search.search_input_desktop"
                placeholder="Search treks, regions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none placeholder:opacity-50"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(232,160,170,0.25)",
                  color: "#1A1A1A",
                }}
              />
            </div>
            {DROPDOWNS.map((d) => renderDropdown(d))}
            <button
              type="button"
              data-ocid="search.submit_button"
              onClick={handleSearch}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
              style={{ background: "#F88379", color: "#1A1A1A" }}
            >
              Search
            </button>
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="p-2.5 rounded-lg transition-colors"
                style={{
                  border: "1px solid rgba(232,160,170,0.25)",
                  color: "#4A4A4A",
                }}
                aria-label="Clear filters"
              >
                <X size={15} />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {renderPills(false)}
            <span className="ml-auto text-xs" style={{ color: "#4A4A4A60" }}>
              Showing {results.length} trek{results.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
