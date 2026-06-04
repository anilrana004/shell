import type { TrekData } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Props {
  trek: TrekData;
}

export default function TrekItineraryTab({ trek }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<"accordion" | "timeline">(
    "accordion",
  );

  const TRAIL_COLORS: Record<string, string> = {
    Forest: "#2E7D4F",
    Meadow: "#4A7C2F",
    Snow: "#2E7D4F",
    Rocky: "#8B7355",
    "River Crossing": "#4A9ECC",
    Village: "#D4A843",
  };

  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl" style={{ color: "#1A2A1E" }}>
          Day-by-Day Itinerary
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setOpenDay(0)}
            className="text-xs px-3 py-1.5 rounded-lg border"
            style={{ borderColor: "#4A5E5244", color: "#4A5E52" }}
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={() => setOpenDay(null)}
            className="text-xs px-3 py-1.5 rounded-lg border"
            style={{ borderColor: "#4A5E5244", color: "#4A5E52" }}
          >
            Collapse All
          </button>
          <button
            type="button"
            onClick={() =>
              setViewMode(viewMode === "accordion" ? "timeline" : "accordion")
            }
            className="text-xs px-3 py-1.5 rounded-lg"
            style={{ background: "#E8541A", color: "#FFFFFF" }}
          >
            {viewMode === "accordion" ? "Timeline View" : "Accordion View"}
          </button>
        </div>
      </div>

      {viewMode === "accordion" ? (
        <div className="space-y-3">
          {trek.itinerary.map((day, i) => (
            <div
              key={day.dayNum}
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: openDay === i ? "#E8541A66" : "#4A5E5222" }}
            >
              <button
                type="button"
                onClick={() => setOpenDay(openDay === i ? null : i)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left"
                style={{
                  background:
                    openDay === i
                      ? "rgba(232,84,26,0.12)"
                      : "rgba(255,255,255,0.9)",
                }}
              >
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#E8541A", color: "#FFFFFF" }}
                >
                  Day {day.dayNum}
                </span>
                <div className="flex-1">
                  <div className="font-semibold" style={{ color: "#1A2A1E" }}>
                    {day.title}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#4A5E52" }}>
                    {day.distance} km / {day.walkingHours}h /{" "}
                    {day.altitudeStart.toLocaleString()}-
                    {day.altitudeEnd.toLocaleString()} ft
                  </div>
                </div>
                <span className="text-sm" style={{ color: "#E8541A" }}>
                  {openDay === i ? "^" : "v"}
                </span>
              </button>

              <AnimatePresence>
                {openDay === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-6 py-6 space-y-5"
                      style={{ background: "rgba(255,255,255,0.95)" }}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {(
                          [
                            ["Distance", `${day.distance} km`],
                            ["Walking Time", `${day.walkingHours}h`],
                            [
                              "Altitude",
                              `${day.altitudeStart.toLocaleString()}-${day.altitudeEnd.toLocaleString()} ft`,
                            ],
                            [
                              "Net Change",
                              `${day.altitudeEnd > day.altitudeStart ? "+" : ""}${(day.altitudeEnd - day.altitudeStart).toLocaleString()} ft`,
                            ],
                          ] as [string, string][]
                        ).map(([label, val]) => (
                          <div
                            key={label}
                            className="rounded-lg p-3 text-center"
                            style={{ background: "rgba(255,255,255,0.9)" }}
                          >
                            <div
                              className="text-xs mb-1"
                              style={{ color: "#4A5E52" }}
                            >
                              {label}
                            </div>
                            <div
                              className="text-sm font-semibold"
                              style={{ color: "#1A2A1E" }}
                            >
                              {val}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div
                          className="text-xs mb-2"
                          style={{ color: "#4A5E52" }}
                        >
                          Altitude Change
                        </div>
                        <div className="flex gap-2 items-center">
                          <div
                            className="flex-1 h-3 rounded-full"
                            style={{ background: "rgba(255,255,255,0.9)" }}
                          >
                            <div
                              className="h-3 rounded-full"
                              style={{
                                background:
                                  day.altitudeEnd >= day.altitudeStart
                                    ? "#E8541A"
                                    : "#2E7D4F",
                                width: `${Math.min(100, Math.abs(day.altitudeEnd - day.altitudeStart) / 100)}%`,
                              }}
                            />
                          </div>
                          <span
                            className="text-xs"
                            style={{
                              color:
                                day.altitudeEnd >= day.altitudeStart
                                  ? "#E8541A"
                                  : "#2E7D4F",
                            }}
                          >
                            {day.altitudeEnd >= day.altitudeStart
                              ? "Ascent"
                              : "Descent"}
                          </span>
                        </div>
                      </div>

                      <div
                        className="text-sm leading-relaxed"
                        style={{ color: "#4A5E52" }}
                      >
                        {day.description}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {day.trailTypes.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1 rounded-full"
                            style={{
                              background: `${TRAIL_COLORS[t] || "#555"}33`,
                              color: TRAIL_COLORS[t] || "#1A2A1E",
                              border: `1px solid ${TRAIL_COLORS[t] || "#555"}66`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                        {day.difficultyPill && (
                          <span
                            className="text-xs px-3 py-1 rounded-full"
                            style={{
                              background: "rgba(232,84,26,0.2)",
                              color: "#E8541A",
                              border: "1px solid #E8541A66",
                            }}
                          >
                            {day.difficultyPill}
                          </span>
                        )}
                      </div>

                      {day.waypoints && day.waypoints.length > 0 && (
                        <div>
                          <div
                            className="text-xs font-semibold mb-2"
                            style={{ color: "#4A5E52" }}
                          >
                            Trail Waypoints
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {day.waypoints.map((w) => (
                              <span
                                key={w}
                                className="text-xs px-2 py-1 rounded"
                                style={{
                                  background: "rgba(255,255,255,0.9)",
                                  color: "#1A2A1E",
                                }}
                              >
                                pin {w}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {day.campsiteInfo && (
                        <div
                          className="rounded-xl p-4"
                          style={{ background: "rgba(255,255,255,0.6)" }}
                        >
                          <div
                            className="text-xs font-semibold mb-1"
                            style={{ color: "#D4A843" }}
                          >
                            Camp Info
                          </div>
                          <div className="text-sm" style={{ color: "#1A2A1E" }}>
                            {day.campsiteInfo}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-3">
                        {(
                          [
                            ["Breakfast", day.meals.breakfast],
                            ["Lunch", day.meals.lunch],
                            ["Dinner", day.meals.dinner],
                          ] as [string, string][]
                        ).map(([label, meal]) => (
                          <div
                            key={label}
                            className="rounded-lg p-3"
                            style={{ background: "rgba(255,255,255,0.9)" }}
                          >
                            <div
                              className="text-xs font-semibold mb-1"
                              style={{ color: "#D4A843" }}
                            >
                              {label}
                            </div>
                            <div
                              className="text-xs"
                              style={{ color: "#1A2A1E" }}
                            >
                              {meal}
                            </div>
                          </div>
                        ))}
                      </div>

                      {day.weatherNote && (
                        <div
                          className="text-sm px-4 py-3 rounded-xl"
                          style={{
                            background: "rgba(168,197,218,0.1)",
                            color: "#2E7D4F",
                            borderLeft: "3px solid #2E7D4F",
                          }}
                        >
                          {day.weatherNote}
                        </div>
                      )}

                      <div
                        className="px-4 py-3 rounded-xl"
                        style={{
                          borderLeft: "4px solid #E8541A",
                          background: "rgba(232,84,26,0.08)",
                        }}
                      >
                        <div
                          className="text-xs font-bold mb-1"
                          style={{ color: "#E8541A" }}
                        >
                          PRO TIP
                        </div>
                        <div className="text-sm" style={{ color: "#1A2A1E" }}>
                          {day.proTip}
                        </div>
                      </div>

                      <div
                        className="px-4 py-3 rounded-xl flex items-start gap-3"
                        style={{ background: "rgba(201,168,76,0.1)" }}
                      >
                        <div>
                          <div
                            className="text-xs font-bold mb-1"
                            style={{ color: "#D4A843" }}
                          >
                            BEST PHOTO SPOT
                          </div>
                          <div className="text-sm" style={{ color: "#1A2A1E" }}>
                            {day.photoSpot}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative pl-8">
          <div
            className="absolute left-3 top-0 bottom-0 w-0.5"
            style={{ background: "#E8541A44" }}
          />
          {trek.itinerary.map((day) => (
            <div key={day.dayNum} className="relative mb-8">
              <div
                className="absolute -left-5 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                style={{ background: "#EDF7F2", borderColor: "#E8541A" }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#E8541A" }}
                />
              </div>
              <div
                className="rounded-2xl p-5 border"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderColor: "#4A5E5222",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ background: "#E8541A", color: "#FFFFFF" }}
                  >
                    Day {day.dayNum}
                  </span>
                  <span className="font-semibold" style={{ color: "#1A2A1E" }}>
                    {day.title}
                  </span>
                </div>
                <div className="text-xs mb-2" style={{ color: "#4A5E52" }}>
                  {day.altitudeStart.toLocaleString()} ft to{" "}
                  {day.altitudeEnd.toLocaleString()} ft / {day.distance} km
                </div>
                <div className="text-sm" style={{ color: "#4A5E52" }}>
                  {day.description.slice(0, 120)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
