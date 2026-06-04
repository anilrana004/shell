import type { TrekData } from "@/types";
import { motion } from "motion/react";
import { useState } from "react";

const NEARBY_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
  "https://images.unsplash.com/photo-1540202403-b7abd6747a18?w=400&q=80",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
];

interface Props {
  trek: TrekData;
}

const QUIZ_QUESTIONS = [
  {
    q: "Can you walk 15+ km per day on flat terrain?",
    options: ["Yes, easily", "With effort", "No"],
  },
  {
    q: "Have you trekked at altitudes above 10,000 ft?",
    options: ["Yes, multiple times", "Once or twice", "Never"],
  },
  {
    q: "Can you carry a 10 kg backpack for 6 hours?",
    options: ["Yes", "Maybe", "No"],
  },
  {
    q: "Do you exercise regularly (3+ days/week)?",
    options: ["Yes", "Occasionally", "Rarely"],
  },
  {
    q: "Any medical conditions (heart, asthma, BP)?",
    options: ["None", "Minor/controlled", "Yes"],
  },
];

export default function TrekOverviewTab({ trek }: Props) {
  const [openPack, setOpenPack] = useState<string | null>(null);
  const [packed, setPacked] = useState<Record<string, boolean>>({});
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  type PackItem = { name: string; essential: boolean };
  const packingCategories: Record<string, PackItem[]> = {
    Clothing: [
      { name: "Moisture-wicking base layer (3 sets)", essential: true },
      { name: "Fleece jacket", essential: true },
      { name: "Down/insulated jacket", essential: true },
      { name: "Waterproof shell jacket", essential: true },
      { name: "Trekking pants (2 pairs)", essential: true },
      { name: "Thermal leggings", essential: true },
      { name: "Woollen cap & balaclava", essential: true },
      { name: "Trekking gloves", essential: true },
      { name: "Woollen socks (3 pairs)", essential: true },
      { name: "Sun hat / buff", essential: false },
    ],
    Footwear: [
      { name: "Ankle-support trekking shoes (Vibram sole)", essential: true },
      { name: "Camp sandals / slippers", essential: false },
      {
        name: "Gaiters (snow treks)",
        essential:
          trek.difficulty === "Difficult" || trek.difficulty === "Extreme",
      },
    ],
    Equipment: [
      { name: "40-50L backpack with rain cover", essential: true },
      { name: "Sleeping bag (-10°C rated)", essential: true },
      { name: "Trekking poles (pair)", essential: false },
      { name: "Headlamp + extra batteries", essential: true },
      { name: "Water bottles (2L total)", essential: true },
      { name: "Sunscreen SPF 50+", essential: true },
      { name: "Sunglasses UV400", essential: true },
      { name: "Camera / GoPro", essential: false },
      { name: "Power bank 10,000 mAh+", essential: false },
    ],
    Personal: [
      { name: "Personal first aid kit", essential: true },
      { name: "ORS sachets (6+)", essential: true },
      { name: "Personal medication", essential: true },
      { name: "Toilet paper / wet wipes", essential: true },
      { name: "Hand sanitizer", essential: true },
      { name: "Lip balm", essential: false },
    ],
    Documents: [
      { name: "Aadhaar card / Government ID", essential: true },
      { name: "Medical fitness certificate", essential: true },
      { name: "Booking confirmation printout", essential: true },
      { name: "Travel insurance policy", essential: false },
      { name: "Emergency contact card", essential: true },
    ],
  };

  const togglePacked = (key: string) => {
    setPacked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = Object.values(packingCategories).flat().length;
  const packedCount = Object.values(packed).filter(Boolean).length;

  const handleQuizAnswer = (idx: number) => {
    const newAnswers = [...quizAnswers, idx];
    if (quizStep + 1 >= QUIZ_QUESTIONS.length) {
      setQuizAnswers(newAnswers);
      setQuizDone(true);
    } else {
      setQuizAnswers(newAnswers);
      setQuizStep((s) => s + 1);
    }
  };

  const quizScore = quizAnswers.reduce((acc, a) => acc + (2 - a), 0);
  const fitnessResult =
    quizScore >= 8 ? "ready" : quizScore >= 5 ? "almost" : "training";

  const refTable = [
    ["Trek Grade", trek.difficulty],
    [
      "Max Elevation",
      `${trek.maxAltitude.toLocaleString()} ft (${trek.maxAltitudeM.toLocaleString()} m)`,
    ],
    ["Trek Distance", `${trek.trekDistance} km`],
    ["Duration", `${trek.durationDays} Days / ${trek.durationNights} Nights`],
    ["Best Time", trek.bestTime],
    ["Starting Point", trek.startingPoint],
    ["Nearest Railhead", trek.nearestRailhead],
    ["Nearest Airport", trek.nearestAirport],
    ["Accommodation", "High-quality dome tents (2-person)"],
    ["Meals", "All meals from Day 1 dinner"],
    ["Water Sources", "Natural streams + purified water at camps"],
    ["Mobile Network", "Available until base camp only"],
    ["ATM Access", "Last ATM at nearest town"],
    [
      "Permit Required",
      trek.permits.length > 0 ? "Yes - arranged by Shail Hikers" : "No",
    ],
    ["Forest Dept. Entry", "Yes - included in package"],
  ];

  return (
    <div className="space-y-12 py-8">
      {/* Story */}
      <section>
        <h2 className="font-display text-3xl mb-6" style={{ color: "#1A2A1E" }}>
          About This Trek
        </h2>
        <div className="space-y-4 leading-relaxed" style={{ color: "#4A5E52" }}>
          <p>
            Nestled in the heart of {trek.region}, the {trek.name} trek is one
            of Uttarakhand's most treasured Himalayan journeys. Starting from{" "}
            {trek.startingPoint}, the trail weaves through dense deodar and oak
            forests before opening into sweeping alpine meadows that seem to
            touch the sky.
          </p>
          <p>
            At its peak elevation of {trek.maxAltitude.toLocaleString()} feet,
            the panoramic views encompass an unbroken chain of snow-capped
            Himalayan giants — a spectacle that rewards every step of the
            ascent. The landscape shifts dramatically with each day: rushing
            glacial streams give way to silent snowfields, and rhododendron
            canopies yield to the stark, beautiful barrenness of high altitude.
          </p>
          <p>
            The cultural tapestry of this region adds profound depth to the
            physical journey. Ancient shepherds' trails, centuries-old temples
            perched on impossible ridges, and the warm hospitality of Garhwali
            villages along the route create an experience that transcends mere
            adventure. Every campfire story from your Shail Hikers guides
            connects you to generations of mountain people who have walked these
            same paths.
          </p>
          <p>
            What sets {trek.name} apart is its accessibility to the trekker's
            soul — challenging enough to demand your best, yet forgiving enough
            to let you absorb the grandeur. The {trek.durationDays}-day
            itinerary is crafted to build altitude gradually, ensuring
            acclimatisation happens naturally as the drama of the landscape
            unfolds day by day.
          </p>
          <p>
            Shail Hikers has guided over 500 groups on this trail since 2015,
            refining every campsite selection, every meal plan, and every safety
            protocol. When you trek with us, you're not just on a guided trip —
            you're part of a community of explorers who return transformed.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section>
        <h2 className="font-display text-3xl mb-6" style={{ color: "#1A2A1E" }}>
          Trek Highlights
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trek.highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl p-4 border"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "#4A5E5233",
              }}
            >
              <div className="text-2xl mb-2">{h.icon}</div>
              <div
                className="font-semibold text-sm mb-1"
                style={{ color: "#1A2A1E" }}
              >
                {h.title}
              </div>
              <div className="text-xs" style={{ color: "#4A5E52" }}>
                {h.description}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reference Table */}
      <section>
        <h2 className="font-display text-3xl mb-6" style={{ color: "#1A2A1E" }}>
          Trek at a Glance
        </h2>
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "#4A5E5233" }}
        >
          <table className="w-full">
            <tbody>
              {refTable.map(([label, value], i) => (
                <tr
                  key={label}
                  style={{
                    background:
                      i % 2 === 0
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.9)",
                  }}
                >
                  <td
                    className="px-5 py-3 text-sm font-semibold w-1/2"
                    style={{ color: "#4A5E52" }}
                  >
                    {label}
                  </td>
                  <td
                    className="px-5 py-3 text-sm"
                    style={{ color: "#1A2A1E" }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fitness */}
      <section>
        <h2 className="font-display text-3xl mb-6" style={{ color: "#1A2A1E" }}>
          Fitness & Training
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="mb-2 text-sm" style={{ color: "#4A5E52" }}>
              Fitness Level Required
            </div>
            <div
              className="rounded-full h-4 mb-4"
              style={{ background: "#FFFFFF" }}
            >
              <motion.div
                className="h-4 rounded-full"
                style={{ background: "#E8541A" }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(trek.fitnessLevel / 10) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="text-xs" style={{ color: "#4A5E52" }}>
              {trek.fitnessLevel}/10 —{" "}
              {trek.fitnessLevel <= 3
                ? "Beginner friendly"
                : trek.fitnessLevel <= 6
                  ? "Moderate fitness needed"
                  : "High fitness required"}
            </div>
            <div
              className="mt-4 space-y-2 text-sm"
              style={{ color: "#1A2A1E" }}
            >
              <div>
                Min age: <b>{trek.minAge} years</b>
              </div>
              <div>
                Max recommended: <b>{trek.maxAge} years</b>
              </div>
              <div className="text-xs" style={{ color: "#4A5E52" }}>
                Medical conditions that disqualify: heart disease, severe
                asthma, recent surgeries, uncontrolled hypertension
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-3" style={{ color: "#1A2A1E" }}>
              Am I Fit Enough?
            </div>
            {!quizDone ? (
              <div
                className="rounded-xl p-5 border"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderColor: "#4A5E5233",
                }}
              >
                <div className="text-xs mb-3" style={{ color: "#4A5E52" }}>
                  Question {quizStep + 1} of {QUIZ_QUESTIONS.length}
                </div>
                <div
                  className="text-sm font-medium mb-4"
                  style={{ color: "#1A2A1E" }}
                >
                  {QUIZ_QUESTIONS[quizStep].q}
                </div>
                <div className="space-y-2">
                  {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleQuizAnswer(i)}
                      className="w-full text-left px-4 py-2 rounded-lg text-sm transition-colors"
                      style={{
                        background: "rgba(232,84,26,0.15)",
                        color: "#1A2A1E",
                        border: "1px solid #E8541A66",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="rounded-xl p-5 border"
                style={{
                  background:
                    fitnessResult === "ready"
                      ? "rgba(45,80,22,0.3)"
                      : fitnessResult === "almost"
                        ? "rgba(201,168,76,0.2)"
                        : "rgba(232,84,26,0.2)",
                  borderColor:
                    fitnessResult === "ready"
                      ? "#2E7D4F"
                      : fitnessResult === "almost"
                        ? "#D4A843"
                        : "#E8541A",
                }}
              >
                <div
                  className="font-bold text-lg mb-2"
                  style={{
                    color:
                      fitnessResult === "ready"
                        ? "#90EE90"
                        : fitnessResult === "almost"
                          ? "#D4A843"
                          : "#1A2A1E",
                  }}
                >
                  {fitnessResult === "ready"
                    ? "You're Trek-Ready!"
                    : fitnessResult === "almost"
                      ? "Almost There"
                      : "More Training Needed"}
                </div>
                <div className="text-sm" style={{ color: "#4A5E52" }}>
                  {fitnessResult === "ready"
                    ? "Great fitness level! Book your spot with confidence."
                    : fitnessResult === "almost"
                      ? "4-6 weeks of focused training and you'll be set."
                      : "We recommend 10+ weeks of cardio and strength training before this trek."}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuizStep(0);
                    setQuizAnswers([]);
                    setQuizDone(false);
                  }}
                  className="mt-3 text-xs underline"
                  style={{ color: "#4A5E52" }}
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section>
        <h2 className="font-display text-3xl mb-6" style={{ color: "#1A2A1E" }}>
          What Makes This Trek Unique
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {trek.uniqueFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-xl p-6 border"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "#E8541A66",
              }}
            >
              <div
                className="font-display text-lg font-semibold mb-2"
                style={{ color: "#E8541A" }}
              >
                Only on this trek
              </div>
              <div className="font-semibold mb-1" style={{ color: "#1A2A1E" }}>
                {f.title}
              </div>
              <div className="text-sm" style={{ color: "#4A5E52" }}>
                {f.description}
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-6 rounded-xl p-5 border-l-4"
          style={{
            background: "rgba(255,255,255,0.9)",
            borderLeftColor: "#D4A843",
          }}
        >
          <div className="font-semibold mb-1" style={{ color: "#D4A843" }}>
            Did You Know?
          </div>
          <div className="text-sm" style={{ color: "#1A2A1E" }}>
            {trek.didYouKnow}
          </div>
        </div>
      </section>

      {/* Flora & Fauna */}
      <section>
        <h2 className="font-display text-3xl mb-6" style={{ color: "#1A2A1E" }}>
          Flora & Fauna
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...trek.flora, ...trek.fauna].map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-3 rounded-xl p-4 border"
              style={{
                background: "rgba(255,255,255,0.6)",
                borderColor: "#4A5E5222",
              }}
            >
              <div className="text-2xl">{s.type === "flora" ? "🌿" : "🦅"}</div>
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "#1A2A1E" }}
                >
                  {s.name}
                </div>
                <div className="text-xs" style={{ color: "#4A5E52" }}>
                  {s.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packing Checklist */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-3xl" style={{ color: "#1A2A1E" }}>
            Packing Checklist
          </h2>
          <div className="text-sm" style={{ color: "#4A5E52" }}>
            {packedCount}/{totalItems} packed
          </div>
        </div>
        <div
          className="rounded-full h-2 mb-6"
          style={{ background: "#FFFFFF" }}
        >
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              background: "#E8541A",
              width: `${totalItems > 0 ? (packedCount / totalItems) * 100 : 0}%`,
            }}
          />
        </div>
        <div className="space-y-3">
          {Object.entries(packingCategories).map(([cat, items]) => (
            <div
              key={cat}
              className="rounded-xl border"
              style={{ borderColor: "#4A5E5222" }}
            >
              <button
                type="button"
                onClick={() => setOpenPack(openPack === cat ? null : cat)}
                className="w-full flex items-center justify-between px-5 py-4"
                style={{ color: "#1A2A1E" }}
              >
                <span className="font-semibold">
                  {cat} ({items.length})
                </span>
                <span className="text-sm">{openPack === cat ? "▲" : "▼"}</span>
              </button>
              {openPack === cat && (
                <div className="px-5 pb-4 space-y-2">
                  {items.map((item: PackItem) => {
                    const key = `${cat}-${item.name}`;
                    const badgeBg = item.essential
                      ? "rgba(232,84,26,0.2)"
                      : "rgba(255,255,255,0.6)";
                    const badgeColor = item.essential ? "#E8541A" : "#4A5E52";
                    return (
                      <label
                        key={key}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={!!packed[key]}
                          onChange={() => togglePacked(key)}
                          className="accent-[#E8541A] w-4 h-4"
                        />
                        <span
                          className="text-sm flex-1"
                          style={{ color: packed[key] ? "#2E7D4F" : "#1A2A1E" }}
                        >
                          {item.name}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: badgeBg,
                            color: badgeColor,
                            border: `1px solid ${badgeColor}44`,
                          }}
                        >
                          {item.essential ? "Essential" : "Optional"}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Attractions */}
      <section>
        <h2 className="font-display text-3xl mb-6" style={{ color: "#1A2A1E" }}>
          Nearby Attractions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trek.nearestAttractions.map((a, i) => (
            <div
              key={a.name}
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: "#4A5E5222" }}
            >
              <img
                src={NEARBY_IMAGES[i % NEARBY_IMAGES.length]}
                alt={a.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <div
                  className="text-sm font-semibold mb-1"
                  style={{ color: "#1A2A1E" }}
                >
                  {a.name}
                </div>
                <div className="text-xs" style={{ color: "#4A5E52" }}>
                  {a.distance} km · {a.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
