import type { Yatra } from "@/types";

interface Props {
  yatra: Yatra;
}

const HELI_DATA = {
  kedarHelipads: [
    {
      name: "Phata",
      distance: "11 km from Kedarnath",
      flightTime: "7 min",
      oneWay: 4999,
      returnTrip: 8999,
    },
    {
      name: "Sersi",
      distance: "12 km from Kedarnath",
      flightTime: "8 min",
      oneWay: 4999,
      returnTrip: 8999,
    },
    {
      name: "Guptkashi",
      distance: "28 km from Kedarnath",
      flightTime: "12 min",
      oneWay: 5999,
      returnTrip: 9999,
    },
  ],
  bookingSteps: [
    "Select your preferred helipad (Phata/Sersi/Guptkashi) during booking",
    "Pay helicopter surcharge online (non-refundable if cancelled <48 hrs)",
    "Receive confirmed slot with report time (typically 5–6 AM)",
    "Carry only a day pack (5 kg limit) — porters carry remaining luggage by road",
    "Check-in at helipad 1 hr before departure for safety briefing",
    "Flight operates only in good weather — road transport arranged if cancelled",
  ],
};

export default function YatraHelicopterTab({ yatra }: Props) {
  const hasHeli = yatra.helicopterOption;

  if (!hasHeli) {
    return (
      <div
        className="p-8 rounded-xl text-center"
        style={{
          background: "rgba(212,237,224,0.04)",
          border: "1px solid rgba(212,237,224,0.15)",
        }}
      >
        <div className="text-5xl mb-4">🚁</div>
        <h3 className="text-xl font-bold mb-2" style={{ color: "#1A2A1E" }}>
          Helicopter Not Required
        </h3>
        <p style={{ color: "#4A5E52" }}>
          This yatra is fully accessible by road or trekking path. No helicopter
          service is available or needed for {yatra.name}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div
        className="p-6 rounded-xl flex items-start gap-4"
        style={{
          background: "rgba(201,168,76,0.08)",
          border: "1px solid rgba(201,168,76,0.3)",
        }}
      >
        <span className="text-4xl">🚁</span>
        <div>
          <h3 className="font-bold text-lg mb-1" style={{ color: "#D4A843" }}>
            Helicopter to Kedarnath — Save 5+ Hours of Trekking
          </h3>
          <p style={{ color: "#4A5E52", lineHeight: 1.7 }}>
            Skip the grueling 16 km Kedarnath trek and fly directly to the
            temple helipad in under 12 minutes. Perfect for elderly pilgrims,
            those with health constraints, or anyone wanting to maximize darshan
            time. Shail Hikers handles all helicopter bookings with
            DGCA-approved operators.
          </p>
        </div>
      </div>

      {/* Helipad Comparison Table */}
      <div>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1A2A1E" }}>
          Helipad Options & Pricing
        </h3>
        <div
          className="overflow-x-auto rounded-xl"
          style={{ border: "1px solid rgba(212,237,224,0.2)" }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ background: "rgba(232,84,26,0.2)" }}>
                {[
                  "Helipad",
                  "Distance from Kedarnath",
                  "Flight Time",
                  "One-Way",
                  "Return Trip",
                ].map((h) => (
                  <th
                    key={h}
                    className="p-4 text-left text-sm font-bold"
                    style={{ color: "#1A2A1E" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HELI_DATA.kedarHelipads.map((pad, i) => (
                <tr
                  key={pad.name}
                  style={{
                    background:
                      i % 2 === 0 ? "rgba(212,237,224,0.02)" : "transparent",
                    borderTop: "1px solid rgba(212,237,224,0.1)",
                  }}
                >
                  <td className="p-4 font-bold" style={{ color: "#4A5E52" }}>
                    {pad.name}
                  </td>
                  <td className="p-4" style={{ color: "#4A5E52" }}>
                    {pad.distance}
                  </td>
                  <td className="p-4" style={{ color: "#4A5E52" }}>
                    {pad.flightTime}
                  </td>
                  <td className="p-4 font-bold" style={{ color: "#D4A843" }}>
                    ₹{pad.oneWay.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4 font-bold" style={{ color: "#D4A843" }}>
                    ₹{pad.returnTrip.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Heli vs Road Comparison */}
      <div>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1A2A1E" }}>
          Helicopter vs Road — Full Comparison
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div
            className="p-5 rounded-xl"
            style={{
              background: "rgba(232,84,26,0.08)",
              border: "1px solid rgba(232,84,26,0.3)",
            }}
          >
            <h4
              className="font-bold mb-3 flex items-center gap-2"
              style={{ color: "#E8541A" }}
            >
              🚁 By Helicopter
            </h4>
            <ul className="space-y-2">
              {[
                "Flight time: 7–12 minutes",
                "No trekking required",
                "Cost: ₹4,999–₹9,999 per person",
                "Suitable for all ages and fitness levels",
                "Subject to weather cancellation",
                "Morning slots most reliable (6–10 AM)",
                "Best for senior citizens and health concerns",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2"
                  style={{ color: "#4A5E52", fontSize: "0.875rem" }}
                >
                  <span style={{ color: "#D4A843" }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="p-5 rounded-xl"
            style={{
              background: "rgba(45,80,22,0.12)",
              border: "1px solid rgba(45,80,22,0.4)",
            }}
          >
            <h4
              className="font-bold mb-3 flex items-center gap-2"
              style={{ color: "#2E7D4F" }}
            >
              🥾 By Trekking (Road to Gaurikund)
            </h4>
            <ul className="space-y-2">
              {[
                "Trek time: 6–8 hours (16 km)",
                "Spiritual experience of the full yatra",
                "Cost: Included in package",
                "Suitable for moderate-fit pilgrims",
                "Always available (weather-independent)",
                "Scenic: waterfalls, Mandakini valley views",
                "Pontine/pony/palkee available at extra cost",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2"
                  style={{ color: "#4A5E52", fontSize: "0.875rem" }}
                >
                  <span style={{ color: "#2E7D4F" }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Booking Process */}
      <div>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1A2A1E" }}>
          How to Book Helicopter
        </h3>
        <div className="space-y-3">
          {HELI_DATA.bookingSteps.map((step, i) => (
            <div
              key={step}
              className="flex items-start gap-4 p-4 rounded-lg"
              style={{
                background: "rgba(212,237,224,0.04)",
                border: "1px solid rgba(212,237,224,0.1)",
              }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: "#E8541A", color: "#FFFFFF" }}
              >
                {i + 1}
              </span>
              <p style={{ color: "#4A5E52", lineHeight: 1.6 }}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Warning */}
      <div
        className="p-5 rounded-xl flex items-start gap-3"
        style={{
          background: "rgba(201,168,76,0.06)",
          border: "1px solid rgba(201,168,76,0.25)",
        }}
      >
        <span className="text-2xl">⚠️</span>
        <div>
          <p className="font-bold mb-1" style={{ color: "#D4A843" }}>
            Weather Dependency Notice
          </p>
          <p
            style={{ color: "#4A5E52", fontSize: "0.875rem", lineHeight: 1.6 }}
          >
            Helicopter operations are entirely subject to weather clearance.
            Kedarnath receives sudden weather changes — morning fog, cloud
            cover, and afternoon thunderstorms can ground flights. In case of
            cancellation, Shail Hikers arranges road/trek transport at no extra
            cost. No refund on helicopter surcharge for weather cancellations —
            this is a DGCA regulation.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="tel:+918279888470"
          data-ocid="helicopter.book_button"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg"
          style={{ background: "#E8541A", color: "#FFFFFF" }}
        >
          🚁 Book Helicopter Add-On — Call Us
        </a>
        <p className="mt-2 text-sm" style={{ color: "#4A5E52" }}>
          +91-8279888470 · Available 7 AM–10 PM, Mon–Sun
        </p>
      </div>
    </div>
  );
}
