import type { TrekData } from "@/types";

interface Props {
  trek: TrekData;
}

const INCLUSIONS = [
  "Transport: Pickup from Dehradun ISBT & drop back",
  "Accommodation: High-quality dome tents (2-person per tent)",
  "Sleeping bag rated to -10C + sleeping mat",
  "All meals from Day 1 dinner to last day breakfast",
  "Purified drinking water at all camps",
  "Experienced Trek Leader (1 per group)",
  "Certified Mountain Guide (1 per 8 trekkers)",
  "Cook + Kitchen Staff",
  "Support Staff & porters for common kitchen equipment",
  "First Aid Kit: Gamow bag, pulse oximeter, oxygen cylinder",
  "Trekking poles (on request)",
  "All forest/wildlife sanctuary entry permits & fees",
  "Camping fees and zone permits",
  "Safety equipment: rope, harness, crampons where required",
  "Group insurance: Rs.10L per person medical + evacuation",
  "Certificate of completion (digital + physical)",
  "Trek briefing session evening before Day 1",
  "GPS tracking device (location shared with base team)",
  "Emergency evacuation support",
  "24/7 on-trail emergency helpline",
];

const EXCLUSIONS = [
  "Personal travel insurance (strongly recommended)",
  "Personal expenses: tips, laundry, phone charging",
  "Porter charges for personal luggage (add-on Rs.800/day)",
  "Costs from medical emergency beyond base camp evacuation",
  "Meals on Day 1 lunch / last day lunch",
  "Accommodation before Day 1 and after last day",
  "Extra nights due to weather or personal reasons",
  "Alcoholic beverages",
  "Personal medication",
  "Helicopter evacuation (covered only under upgraded insurance)",
  "Any activity not mentioned in the itinerary",
];

const SHAIL_PROVIDES = [
  "Dome tents (2-person)",
  "Sleeping bag (-10C)",
  "Sleeping mat",
  "Trekking poles (on request)",
  "Kitchen equipment",
  "First aid & oxygen kit",
  "Gamow bag",
  "Rope & safety gear",
];

const YOU_BRING = [
  "Personal trekking clothing",
  "Trekking shoes (ankle support)",
  "Personal backpack (40-50L)",
  "Personal toiletries",
  "Personal snacks",
  "Personal medication",
  "Identity proof",
  "Camera / phone",
];

export default function TrekInclusionsTab({ trek: _trek }: Props) {
  return (
    <div className="py-8 space-y-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2
            className="font-display text-2xl mb-5"
            style={{ color: "#1A2A1E" }}
          >
            What's Included
          </h2>
          <div className="space-y-2">
            {INCLUSIONS.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl px-4 py-3"
                style={{ background: "rgba(45,80,22,0.15)" }}
              >
                <span className="text-green-400 flex-shrink-0">&#10003;</span>
                <span className="text-sm" style={{ color: "#1A2A1E" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2
            className="font-display text-2xl mb-5"
            style={{ color: "#1A2A1E" }}
          >
            What's Excluded
          </h2>
          <div className="space-y-2">
            {EXCLUSIONS.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl px-4 py-3"
                style={{ background: "rgba(232,84,26,0.1)" }}
              >
                <span className="text-red-400 flex-shrink-0">&#10007;</span>
                <span className="text-sm" style={{ color: "#1A2A1E" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl mb-5" style={{ color: "#1A2A1E" }}>
          Gear: What We Provide vs What You Carry
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "#2E7D4F" }}
          >
            <div
              className="px-5 py-3"
              style={{ background: "rgba(45,80,22,0.3)" }}
            >
              <div className="font-semibold" style={{ color: "#1A2A1E" }}>
                Shail Hikers Provides
              </div>
            </div>
            {SHAIL_PROVIDES.map((item, idx) => (
              <div
                key={item}
                className="flex items-center gap-2 px-5 py-2 text-sm"
                style={{
                  background:
                    idx % 2 === 0 ? "rgba(45,80,22,0.1)" : "transparent",
                  color: "#1A2A1E",
                }}
              >
                <span style={{ color: "#2E7D4F" }}>&#10003;</span> {item}
              </div>
            ))}
          </div>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "#4A5E5233" }}
          >
            <div
              className="px-5 py-3"
              style={{ background: "rgba(255,255,255,0.9)" }}
            >
              <div className="font-semibold" style={{ color: "#1A2A1E" }}>
                You Must Bring
              </div>
            </div>
            {YOU_BRING.map((item, idx) => (
              <div
                key={item}
                className="flex items-center gap-2 px-5 py-2 text-sm"
                style={{
                  background:
                    idx % 2 === 0 ? "rgba(255,255,255,0.4)" : "transparent",
                  color: "#1A2A1E",
                }}
              >
                <span style={{ color: "#D4A843" }}>&#8594;</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
