import type { TrekData } from "@/types";

interface Props {
  trek: TrekData;
}

const RECOMMENDED_GEAR = [
  { name: "Trekking poles (telescopic)", essential: false },
  { name: "Gaiters (snow treks)", essential: false },
  { name: "Hand warmers (winter treks)", essential: false },
  { name: "Power bank 10,000 mAh+", essential: false },
  { name: "Camera / GoPro", essential: false },
  { name: "Zip-lock bags for waterproofing", essential: false },
  { name: "Trekking umbrella (monsoon)", essential: false },
  { name: "Collapsible water filter", essential: false },
];

export default function TrekGearTab({ trek }: Props) {
  return (
    <div className="py-8 space-y-10">
      {/* Mandatory Gear */}
      <section>
        <h2 className="font-display text-2xl mb-5" style={{ color: "#1A2A1E" }}>
          Mandatory Gear
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {trek.gearList.mandatory.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-xl px-4 py-3 border"
              style={{
                background: "rgba(232,84,26,0.1)",
                borderColor: "#E8541A44",
              }}
            >
              <div>
                <div
                  className="text-sm font-medium"
                  style={{ color: "#1A2A1E" }}
                >
                  {item.name}
                </div>
                {item.weightNote && (
                  <div className="text-xs" style={{ color: "#4A5E52" }}>
                    {item.weightNote}
                  </div>
                )}
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full ml-3 flex-shrink-0"
                style={{
                  background: item.essential
                    ? "#E8541A"
                    : "rgba(255,255,255,0.9)",
                  color: item.essential ? "#1A2A1E" : "#4A5E52",
                }}
              >
                {item.essential ? "Essential" : "Optional"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Gear */}
      <section>
        <h2 className="font-display text-2xl mb-5" style={{ color: "#1A2A1E" }}>
          Recommended Gear
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {RECOMMENDED_GEAR.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-xl px-4 py-3 border"
              style={{
                background: "rgba(255,255,255,0.6)",
                borderColor: "#4A5E5222",
              }}
            >
              <span style={{ color: "#D4A843" }}>&#8226;</span>
              <div className="text-sm" style={{ color: "#1A2A1E" }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gear Rental */}
      <section>
        <h2 className="font-display text-2xl mb-5" style={{ color: "#1A2A1E" }}>
          Gear Rental at Base Camp
        </h2>
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "#4A5E5233" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(232,84,26,0.2)" }}>
                <th
                  className="px-5 py-3 text-left"
                  style={{ color: "#1A2A1E" }}
                >
                  Item
                </th>
                <th
                  className="px-5 py-3 text-right"
                  style={{ color: "#1A2A1E" }}
                >
                  Rate/Day
                </th>
              </tr>
            </thead>
            <tbody>
              {trek.gearList.rental.map((item) => (
                <tr
                  key={item.name}
                  style={{
                    background:
                      item.name === trek.gearList.rental[0]?.name ||
                      trek.gearList.rental.indexOf(item) % 2 === 0
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.9)",
                  }}
                >
                  <td className="px-5 py-3" style={{ color: "#1A2A1E" }}>
                    {item.name}
                  </td>
                  <td
                    className="px-5 py-3 text-right font-semibold"
                    style={{ color: "#D4A843" }}
                  >
                    Rs.{item.pricePerDay}/day
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <a
            href={`/book/${trek.slug}`}
            className="inline-block px-6 py-3 rounded-xl text-sm font-semibold"
            style={{
              background: "rgba(232,84,26,0.2)",
              color: "#E8541A",
              border: "1px solid #E8541A66",
            }}
          >
            Add Gear Rental to Booking
          </a>
        </div>
      </section>

      {/* Weight Guide */}
      <section>
        <h2 className="font-display text-2xl mb-5" style={{ color: "#1A2A1E" }}>
          Gear Weight Guide
        </h2>
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "rgba(255,255,255,0.9)",
            borderColor: "#4A5E5233",
          }}
        >
          <div
            className="text-lg font-semibold mb-2"
            style={{ color: "#1A2A1E" }}
          >
            Target Backpack Weight: 8-12 kg
          </div>
          <div className="text-sm mb-6" style={{ color: "#4A5E52" }}>
            Excluding water. Your physical comfort depends on keeping weight in
            this range.
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div
                className="font-semibold text-sm mb-3"
                style={{ color: "#1A2A1E" }}
              >
                Shail Hikers Carries
              </div>
              {[
                "Tents (shared): 3 kg",
                "Kitchen equipment: 8 kg",
                "First aid kit: 2 kg",
                "Common food stores: 5 kg",
              ].map((item) => (
                <div
                  key={item}
                  className="text-sm mb-2"
                  style={{ color: "#4A5E52" }}
                >
                  &#8226; {item}
                </div>
              ))}
            </div>
            <div>
              <div
                className="font-semibold text-sm mb-3"
                style={{ color: "#1A2A1E" }}
              >
                You Carry
              </div>
              {[
                "Personal clothing: 3-4 kg",
                "Personal food/snacks: 1-2 kg",
                "Camera/electronics: 1 kg",
                "Water (2L): 2 kg",
                "Misc personal: 1-2 kg",
              ].map((item) => (
                <div
                  key={item}
                  className="text-sm mb-2"
                  style={{ color: "#4A5E52" }}
                >
                  &#8226; {item}
                </div>
              ))}
            </div>
          </div>
          <div
            className="mt-4 text-xs px-4 py-3 rounded-xl"
            style={{
              background: "rgba(232,84,26,0.1)",
              color: "#1A2A1E",
              borderLeft: "3px solid #E8541A",
            }}
          >
            Weight Savings Tip: Choose merino wool over cotton. It weighs less,
            dries faster, and resists odour on multi-day treks.
          </div>
        </div>
      </section>
    </div>
  );
}
