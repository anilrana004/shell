import { Calendar, MapPin, Thermometer, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const BATCHES = [
  {
    date: "2025-01-15",
    trek: "Kedarkantha",
    slug: "kedarkantha",
    guide: "Deepak Rawat",
    seats: 4,
    total: 15,
    weather: "Clear, -5°C",
  },
  {
    date: "2025-01-22",
    trek: "Nag Tibba",
    slug: "nag-tibba",
    guide: "Rajan Singh",
    seats: 8,
    total: 12,
    weather: "Sunny, 8°C",
  },
  {
    date: "2025-02-05",
    trek: "Chopta Chandrashila",
    slug: "chopta-chandrashila",
    guide: "Sanjay Kumar",
    seats: 6,
    total: 15,
    weather: "Snow, -8°C",
  },
  {
    date: "2025-02-10",
    trek: "Har Ki Dun",
    slug: "har-ki-dun",
    guide: "Anil Negi",
    seats: 3,
    total: 15,
    weather: "Cold, -2°C",
  },
  {
    date: "2025-02-18",
    trek: "Dayara Bugyal",
    slug: "dayara-bugyal",
    guide: "Deepak Rawat",
    seats: 12,
    total: 15,
    weather: "Snow, -6°C",
  },
  {
    date: "2025-03-08",
    trek: "Kedarkantha",
    slug: "kedarkantha",
    guide: "Sanjay Kumar",
    seats: 5,
    total: 15,
    weather: "Clear, 0°C",
  },
  {
    date: "2025-03-15",
    trek: "Rupin Pass",
    slug: "rupin-pass",
    guide: "Rajan Singh",
    seats: 7,
    total: 12,
    weather: "Mild, 5°C",
  },
  {
    date: "2025-03-22",
    trek: "Valley of Flowers",
    slug: "valley-of-flowers",
    guide: "Anil Negi",
    seats: 6,
    total: 15,
    weather: "Spring, 12°C",
  },
];

function getMonths() {
  const now = new Date(2025, 0, 1);
  return [0, 1, 2].map((offset) => {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      label: d.toLocaleString("default", { month: "long", year: "numeric" }),
    };
  });
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function BatchCalendarSection() {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const months = getMonths();

  const batchByDate = new Map(BATCHES.map((b) => [b.date, b]));

  return (
    <section
      data-ocid="batch_calendar.section"
      style={{ background: "#EDF7F2" }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "#E8541A" }}
          >
            Upcoming Departures
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
          >
            BATCH CALENDAR
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {months.map(({ year, month, label }) => {
            const days = getDaysInMonth(year, month);
            const firstDay = new Date(year, month, 1).getDay();
            return (
              <div
                key={label}
                className="rounded-2xl p-5"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(232,84,26,0.2)",
                }}
              >
                <h3
                  className="text-sm font-bold mb-4 text-center uppercase tracking-widest"
                  style={{ color: "#1A2A1E" }}
                >
                  {label}
                </h3>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div
                      key={d}
                      className="text-center text-[10px] font-semibold uppercase"
                      style={{ color: "#4A5E5250" }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: decorative empty cells with no data
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: days }, (_, d) => {
                    const dayNum = d + 1;
                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                    const batch = batchByDate.get(dateStr);
                    const seatsColor = batch
                      ? batch.seats <= 3
                        ? "#E8541A"
                        : batch.seats <= 7
                          ? "#D4A843"
                          : "#2E7D4F"
                      : null;
                    return (
                      <div
                        key={dayNum}
                        className="relative group"
                        onMouseEnter={() => batch && setHoveredDate(dateStr)}
                        onMouseLeave={() => setHoveredDate(null)}
                      >
                        <div
                          className="w-full aspect-square flex items-center justify-center rounded text-xs font-medium transition-all cursor-default"
                          style={{
                            color: batch ? "#1A2A1E" : "#4A5E5260",
                            background: batch
                              ? `${seatsColor}22`
                              : "transparent",
                            border: batch
                              ? `1px solid ${seatsColor}55`
                              : "1px solid transparent",
                          }}
                        >
                          {dayNum}
                          {batch && (
                            <span
                              className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                              style={{ background: seatsColor ?? "#E8541A" }}
                            />
                          )}
                        </div>

                        {/* Hover tooltip */}
                        {hoveredDate === dateStr && batch && (
                          <div
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-44 p-3 rounded-xl text-xs shadow-2xl"
                            style={{
                              background: "#EDF7F2",
                              border: "1px solid rgba(232,84,26,0.4)",
                              color: "#4A5E52",
                            }}
                          >
                            <p
                              className="font-bold mb-1"
                              style={{ color: "#1A2A1E" }}
                            >
                              {batch.trek}
                            </p>
                            <p className="flex items-center gap-1">
                              <Users size={10} /> Guide: {batch.guide}
                            </p>
                            <p className="flex items-center gap-1">
                              <Thermometer size={10} /> {batch.weather}
                            </p>
                            <p className="flex items-center gap-1">
                              <Calendar size={10} /> {batch.seats}/{batch.total}{" "}
                              seats left
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {[
            { color: "#2E7D4F", label: "Available" },
            { color: "#D4A843", label: "Filling Fast" },
            { color: "#E8541A", label: "Almost Full" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: item.color }}
              />
              <span className="text-xs" style={{ color: "#4A5E52" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
