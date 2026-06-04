import { TREKS } from "@/data/treks";
import { useScrollHeaderContext } from "@/context/scroll-header-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "@tanstack/react-router";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const MOBILE_HEADER_OFFSET =
  "calc(3.5rem + env(safe-area-inset-top, 0px))";

/** Desktop: announcement bar + main nav (matches Layout md:pt) */
const DESKTOP_HEADER_OFFSET = "calc(2rem + 5rem)";

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

const selectClassMobile =
  "w-full px-2.5 py-2 rounded-lg text-xs outline-none cursor-pointer";
const selectClassDesktop =
  "w-full min-w-0 px-0 py-0 text-xs leading-tight outline-none cursor-pointer bg-transparent border-0 appearance-none";
const selectStyleMobile = {
  background: "rgba(255,255,255,0.85)",
  border: "1px solid rgba(212,237,224,0.25)",
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
  const { visible: barVisible, pin, unpin } = useScrollHeaderContext();

  useEffect(() => {
    if (filtersOpen) {
      pin("search-filters");
      return () => unpin("search-filters");
    }
    unpin("search-filters");
  }, [filtersOpen, pin, unpin]);

  useEffect(() => {
    if (!filtersOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [filtersOpen]);

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
      className={mobile ? selectClassMobile : selectClassDesktop}
      style={{
        ...(mobile ? selectStyleMobile : {}),
        color: values[d.key] ? "#1A2A1E" : "#7A8E80",
      }}
    >
      <option value="">{d.label}</option>
      {d.options.map((o) => (
        <option key={o} value={o} style={{ background: "#EDF7F2", color: "#1A2A1E" }}>
          {o}
        </option>
      ))}
    </select>
  );

  const renderDesktopField = (d: (typeof DROPDOWNS)[number]) => (
    <div
      key={d.label}
      className="flex items-center flex-1 min-w-[72px] max-w-[100px] px-2 border-l border-[#E4F0EA]"
    >
      {renderDropdown(d)}
    </div>
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
        <Filter size={11} style={{ color: "#4A5E5260" }} className="flex-shrink-0" />
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
              : "px-2 py-0.5 rounded-full text-[10px]"
          }`}
          style={{
            background: activeFilters.includes(f)
              ? "#E8541A"
              : "rgba(255,255,255,0.8)",
            border: `1px solid ${activeFilters.includes(f) ? "#E8541A" : "rgba(212,237,224,0.2)"}`,
            color: activeFilters.includes(f) ? "#FFFFFF" : "#4A5E52",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile: fixed under header — hide on scroll down, show on scroll up (same as MobileNav) */}
      <div
        data-ocid="search.section"
        className={`md:hidden fixed left-0 right-0 z-40 transition-transform duration-300 ease-out will-change-transform ${
          barVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: MOBILE_HEADER_OFFSET }}
      >
        <div
          className="px-3 py-2"
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(232,84,26,0.25)",
            boxShadow: "0 2px 12px rgba(46,125,79,0.06)",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 relative min-w-0">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#2E7D4F" }}
              />
              <input
                type="text"
                data-ocid="search.search_input"
                placeholder="Search treks, regions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full h-9 pl-8 pr-2 rounded-xl text-sm outline-none placeholder:text-[#7A8E80]"
                style={{
                  background: "#EDF7F2",
                  border: "1px solid #E8541A33",
                  color: "#1A2A1E",
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="h-9 px-2.5 rounded-xl text-xs font-medium flex items-center gap-1 flex-shrink-0"
              style={{
                background: hasFilters
                  ? "rgba(232,84,26,0.15)"
                  : "rgba(255,255,255,0.9)",
                border: "1px solid rgba(232,84,26,0.4)",
                color: "#1A2A1E",
              }}
              aria-expanded={filtersOpen}
              aria-label="Open filters"
            >
              <SlidersHorizontal size={14} style={{ color: "#E8541A" }} />
              {activeCount > 0 && (
                <span
                  className="min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "#E8541A", color: "#FFFFFF" }}
                >
                  {activeCount}
                </span>
              )}
            </button>
            <button
              type="button"
              data-ocid="search.submit_button"
              onClick={handleSearch}
              className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#E8541A", color: "#FFFFFF" }}
              aria-label="Search treks"
            >
              <Search size={16} />
            </button>
          </div>

          {!filtersOpen && activeFilters.length > 0 && (
            <div className="mt-2 -mx-1 px-1">{renderPills(true)}</div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet — same pattern as nav drawer backdrop */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm"
              aria-label="Close filters"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="md:hidden fixed inset-x-0 z-[56] max-h-[75vh] flex flex-col rounded-t-2xl overflow-hidden"
              style={{
                bottom: "calc(4.5rem + env(safe-area-inset-bottom, 0px))",
                background: "#FFFFFF",
                borderTop: "1px solid #E8541A33",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Search filters"
            >
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "#E4F0EA" }}
              >
                <h2
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "#1A2A1E" }}
                >
                  Filters
                </h2>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="p-1.5 rounded-lg"
                  style={{ color: "#4A5E52" }}
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {DROPDOWNS.map((d) => renderDropdown(d, true))}
                </div>
                {renderPills(true)}
                <p className="text-[11px]" style={{ color: "#7A8E80" }}>
                  {results.length} trek{results.length !== 1 ? "s" : ""} match
                  your filters
                </p>
              </div>

              <div
                className="flex gap-2 px-4 pt-2 border-t"
                style={{ borderColor: "#E4F0EA" }}
              >
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="flex-1 py-3 rounded-xl text-sm font-medium border"
                    style={{
                      borderColor: "#E8541A44",
                      color: "#4A5E52",
                    }}
                  >
                    Clear all
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex-[2] py-3 rounded-xl text-sm font-bold uppercase tracking-wider"
                  style={{ background: "#E8541A", color: "#FFFFFF" }}
                >
                  Show {results.length} treks
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop: fixed under navbar — hides on scroll down, shows on scroll up */}
      {!compact && (
        <div className="hidden md:block h-[5.75rem] shrink-0" aria-hidden />
      )}
      <section
        data-ocid="search.section"
        className={`hidden md:block w-full transition-transform duration-300 ease-out will-change-transform ${
          compact
            ? "sticky z-30 top-[7.5rem]"
            : `fixed left-0 right-0 z-[35] ${
                barVisible ? "translate-y-0" : "-translate-y-full"
              }`
        }`}
        style={{
          ...(compact ? {} : { top: DESKTOP_HEADER_OFFSET }),
          background: "#FFFFFF",
          borderBottom: "1px solid rgba(212,237,224,0.2)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div
            className="flex items-stretch flex-nowrap rounded-lg overflow-x-auto mb-1.5 h-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              background: "#FFFFFF",
              border: "1px solid #C8E0D4",
              boxShadow: "0 2px 10px rgba(46,125,79,0.06)",
            }}
          >
            <div className="flex-[1.2] min-w-[140px] flex items-center gap-1.5 px-2.5">
              <Search
                size={14}
                className="flex-shrink-0"
                style={{ color: "#2E7D4F" }}
              />
              <input
                type="text"
                data-ocid="search.search_input_desktop"
                placeholder="Search treks, regions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full min-w-0 text-xs outline-none placeholder:text-[#7A8E80] bg-transparent"
                style={{ color: "#1A2A1E" }}
              />
            </div>

            {DROPDOWNS.map((d) => renderDesktopField(d))}

            <div className="flex items-stretch flex-shrink-0 border-l border-[#E4F0EA]">
              <button
                type="button"
                data-ocid="search.submit_button"
                onClick={handleSearch}
                className="h-full px-4 text-[11px] font-semibold uppercase tracking-wide transition-colors hover:opacity-95"
                style={{ background: "#E8541A", color: "#FFFFFF" }}
              >
                Search
              </button>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-2 transition-colors border-l border-[#E4F0EA] hover:bg-[#EDF7F2]"
                  style={{ color: "#4A5E52" }}
                  aria-label="Clear filters"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 items-center gap-y-1">
            {renderPills(false)}
            <span
              className="ml-auto text-[10px] font-medium whitespace-nowrap"
              style={{ color: "#7A8E80" }}
            >
              Showing {results.length} trek{results.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
