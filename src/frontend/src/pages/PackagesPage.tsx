import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Check, Users, X } from "lucide-react";
import { useState } from "react";

const PACKAGES = [
  {
    id: "explorer",
    name: "Explorer Pack",
    tagline: "Your First Himalayan Adventure",
    heroImage:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80",
    price: 9999,
    originalPrice: 12499,
    duration: "6 Days / 5 Nights",
    groupSize: "2–8",
    treks: ["Kedarkantha", "Nag Tibba"],
    badge: "Best for Beginners",
    badgeColor: "#2E7D4F",
    description:
      "The perfect entry point into the Himalayas. Combine two iconic beginner-friendly treks — the snow-draped summit of Kedarkantha and the panoramic Nag Tibba weekend escape — in one seamless, guided adventure. Pickup from Dehradun, all meals, premium gear, and certified guides included.",
    includes: [
      "Dehradun pickup & drop",
      "All meals (Day 1 dinner → last day breakfast)",
      "High-quality dome tents (2-person)",
      "-10°C sleeping bags & mats",
      "Certified Trek Leader",
      "First Aid + oxygen kit",
      "All forest permits",
      "₹10L group insurance",
      "Digital completion certificate",
      "Pre-trek briefing session",
    ],
    highlights: [
      "Summit Kedarkantha at 12,500 ft",
      "360° panoramic Himalayan views",
      "Snow trails Dec–Apr",
      "Nag Tibba sunrise special",
    ],
  },
  {
    id: "summit",
    name: "Summit Seeker",
    tagline: "Conquer Two High Passes in One Trip",
    heroImage:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    price: 18999,
    originalPrice: 24998,
    duration: "15 Days / 14 Nights",
    groupSize: "4–12",
    treks: ["Rupin Pass", "Buran Ghati"],
    badge: "Most Popular",
    badgeColor: "#E8541A",
    description:
      "Two of Uttarakhand's most dramatic high-altitude crossings back to back — Rupin Pass with its legendary waterfalls and snow bridges, followed by Buran Ghati's heart-stopping 200m rappel descent. This is not a trek; this is a transformation. Designed for experienced trekkers who demand the extraordinary.",
    includes: [
      "Dehradun pickup & drop (both treks)",
      "All meals throughout",
      "Premium dome tents",
      "-15°C sleeping bags",
      "Senior Trek Leader",
      "Technical safety gear (harness, crampons)",
      "Gamow bag + AED",
      "All permits (both regions)",
      "₹10L insurance per person",
      "Physical + digital certificate (both)",
      "Photo album (digital)",
      "Priority batch selection",
    ],
    highlights: [
      "Rupin Pass at 15,250 ft",
      "200m snow rappel on Buran Ghati",
      "Traverse two regions: Uttarkashi & Kinnaur",
      "Expert-guided technical sections",
    ],
  },
  {
    id: "grand",
    name: "Grand Himalaya Expedition",
    tagline: "The Ultimate 3-Trek Himalayan Experience",
    heroImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    price: 29999,
    originalPrice: 39997,
    duration: "21 Days / 20 Nights",
    groupSize: "4–10",
    treks: ["Valley of Flowers", "Har Ki Dun", "Chopta Chandrashila"],
    badge: "Premium",
    badgeColor: "#D4A843",
    description:
      "Three of Uttarakhand's most iconic and diverse trails woven into a single, immersive Himalayan odyssey. From the UNESCO wildflower paradise of Valley of Flowers to the mythology-laden Har Ki Dun Valley and the divine summit of Chandrashila above the world's highest Shiva temple — this expedition covers everything the Himalayas have to offer. Exclusively for those who want to experience it all.",
    includes: [
      "All transport (Dehradun → treks → Dehradun)",
      "All meals on all 3 treks",
      "Premium tents throughout",
      "Arctic-grade sleeping gear",
      "Dedicated Senior Guide per trek",
      "Cook + full support staff",
      "Complete medical kit",
      "All permits (3 regions + UNESCO entry)",
      "₹15L premium insurance",
      "3 physical certificates + frame",
      "Professional photo album",
      "Shail Hikers branded merchandise kit",
      "24/7 operations desk support",
    ],
    highlights: [
      "UNESCO World Heritage Valley of Flowers",
      "Mythological Har Ki Dun Valley",
      "Chandrashila summit at 13,123 ft",
      "Tungnath — world's highest Shiva temple",
    ],
  },
];

const COMPARISON_FEATURES = [
  { label: "Duration", keys: ["6D/5N", "15D/14N", "21D/20N"] },
  { label: "Number of Treks", keys: ["2 treks", "2 treks", "3 treks"] },
  { label: "Max Altitude", keys: ["12,500 ft", "15,328 ft", "14,100 ft"] },
  { label: "Difficulty", keys: ["Easy", "Difficult", "Easy–Moderate"] },
  { label: "Dehradun Transport", values: [true, true, true] },
  { label: "All Meals", values: [true, true, true] },
  { label: "Premium Tents", values: [true, true, true] },
  { label: "Technical Gear", values: [false, true, false] },
  { label: "Gamow Bag + AED", values: [true, true, true] },
  { label: "Insurance", keys: ["₹10L", "₹10L", "₹15L"] },
  { label: "Forest Permits", values: [true, true, true] },
  { label: "Physical Certificate", values: [false, true, true] },
  { label: "Photo Album", values: [false, true, true] },
  { label: "Merchandise Kit", values: [false, false, true] },
  { label: "Priority Batch", values: [false, true, true] },
  { label: "24/7 Ops Desk", values: [false, false, true] },
];

const FAQS = [
  {
    q: "Can I customise which treks are in my package?",
    a: "Yes! All packages can be customised. Contact us via WhatsApp or the inquiry form to mix and match treks based on your season, fitness level, and dates.",
  },
  {
    q: "Is there a gap between the treks in the multi-trek packages?",
    a: "We build in 1–2 rest days between treks in Dehradun or a nearby base. This ensures proper recovery and acclimatisation before the next trek.",
  },
  {
    q: "What if I need to cancel one trek in the package?",
    a: "Our standard cancellation policy applies per trek. If you cancel 30+ days before a trek, you receive a full refund for that trek's value. Within 30 days, partial refund as per policy.",
  },
  {
    q: "Are flights or train tickets included?",
    a: "No. Packages cover transport within Uttarakhand (from Dehradun). Flights or trains to Dehradun are not included and must be booked separately.",
  },
  {
    q: "Can solo trekkers book packages?",
    a: "Absolutely. Solo pricing is available with a small supplement. Contact us to get a personalised solo quote for any package.",
  },
  {
    q: "How much can I save vs booking treks individually?",
    a: "The Explorer Pack saves ₹2,500 (20%), Summit Seeker saves ₹5,999 (24%), and the Grand Expedition saves ₹9,998 (25%) compared to booking each trek separately.",
  },
];

export default function PackagesPage() {
  const [groupSize, setGroupSize] = useState(4);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function calcDiscount(size: number) {
    if (size >= 16) return 15;
    if (size >= 9) return 10;
    if (size >= 5) return 5;
    return 0;
  }

  const discount = calcDiscount(groupSize);

  return (
    <>
      <head>
        <title>
          Exclusive Trekking Packages — Shail Hikers | Multi-Trek Himalayan
          Combos
        </title>
        <meta
          name="description"
          content="Save up to 25% with Shail Hikers' exclusive multi-trek packages. Explorer, Summit Seeker, and Grand Himalaya Expedition bundles for all skill levels."
        />
      </head>

      <div className="min-h-screen" style={{ background: "#EDF7F2" }}>
        {/* Header */}
        <div
          className="py-16 px-6 text-center"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #EDF7F2 100%)",
          }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#4A5E52" }}
          >
            Best Value
          </p>
          <h1
            className="text-5xl md:text-7xl mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "#1A2A1E",
              letterSpacing: "-0.02em",
            }}
          >
            EXCLUSIVE PACKAGES
          </h1>
          <p className="text-base" style={{ color: "#4A5E52" }}>
            Handcrafted multi-trek bundles · Save up to 25% · Expert guides
            throughout
          </p>
        </div>

        {/* Package Cards */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => {
            const savings = pkg.originalPrice - pkg.price;
            return (
              <div
                key={pkg.id}
                data-ocid={`packages.item.${i + 1}`}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(212,237,224,0.15)",
                }}
              >
                {/* Hero */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={pkg.heroImage}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(255,255,255,0.9) 0%, transparent 60%)",
                    }}
                  />
                  <span
                    className="absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: pkg.badgeColor,
                      color: pkg.id === "grand" ? "#EDF7F2" : "#1A2A1E",
                    }}
                  >
                    {pkg.badge}
                  </span>
                  <span
                    className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "#D4A843", color: "#EDF7F2" }}
                  >
                    Save ₹{savings.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div>
                    <h2
                      className="text-2xl mb-0.5"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "#1A2A1E",
                      }}
                    >
                      {pkg.name}
                    </h2>
                    <p
                      className="text-xs"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        color: "#4A5E52",
                      }}
                    >
                      {pkg.tagline}
                    </p>
                  </div>

                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#4A5E52" }}
                  >
                    {pkg.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div
                      className="rounded-lg p-2"
                      style={{ background: "rgba(255,255,255,0.8)" }}
                    >
                      <p style={{ color: "#4A5E52" }}>Duration</p>
                      <p className="font-semibold" style={{ color: "#1A2A1E" }}>
                        {pkg.duration}
                      </p>
                    </div>
                    <div
                      className="rounded-lg p-2"
                      style={{ background: "rgba(255,255,255,0.8)" }}
                    >
                      <p style={{ color: "#4A5E52" }}>Group Size</p>
                      <p className="font-semibold" style={{ color: "#1A2A1E" }}>
                        {pkg.groupSize} persons
                      </p>
                    </div>
                    <div
                      className="col-span-2 rounded-lg p-2"
                      style={{ background: "rgba(255,255,255,0.8)" }}
                    >
                      <p style={{ color: "#4A5E52" }}>Treks Included</p>
                      <p className="font-semibold" style={{ color: "#1A2A1E" }}>
                        {pkg.treks.join(" + ")}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs">
                        <Check
                          size={12}
                          className="mt-0.5 shrink-0"
                          style={{ color: "#E8541A" }}
                        />
                        <span style={{ color: "#1A2A1E" }}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Includes */}
                  <details className="group">
                    <summary
                      className="text-xs font-medium cursor-pointer list-none flex items-center gap-1"
                      style={{ color: "#D4A843" }}
                    >
                      <span>What's included ({pkg.includes.length} items)</span>
                      <span className="ml-auto group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </summary>
                    <ul className="mt-2 space-y-1">
                      {pkg.includes.map((inc) => (
                        <li
                          key={inc}
                          className="flex items-start gap-2 text-xs"
                        >
                          <Check
                            size={11}
                            className="mt-0.5 shrink-0"
                            style={{ color: "#2E7D4F" }}
                          />
                          <span style={{ color: "#4A5E52" }}>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  {/* Price */}
                  <div
                    className="mt-auto pt-3"
                    style={{ borderTop: "1px solid rgba(212,237,224,0.1)" }}
                  >
                    <div className="flex items-baseline gap-2 mb-3">
                      <span
                        className="text-2xl font-bold"
                        style={{
                          color: "#D4A843",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <span
                        className="text-sm line-through"
                        style={{ color: "rgba(212,237,224,0.5)" }}
                      >
                        ₹{pkg.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs" style={{ color: "#4A5E52" }}>
                        per person
                      </span>
                    </div>
                    <Link
                      to="/book/$slug"
                      params={{
                        slug: pkg.treks[0].toLowerCase().replace(/ /g, "-"),
                      }}
                    >
                      <Button
                        className="w-full"
                        data-ocid={`packages.book_button.${i + 1}`}
                        style={{
                          background: "#E8541A", color: "#FFFFFF",
                          border: "none",
                        }}
                      >
                        Book This Package
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          <h2
            className="text-4xl text-center mb-10"
            style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
          >
            Compare Packages
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(212,237,224,0.15)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    style={{
                      background: "#FFFFFF",
                      borderBottom: "1px solid rgba(212,237,224,0.15)",
                    }}
                  >
                    <th
                      className="text-left px-5 py-4"
                      style={{ color: "#4A5E52", width: "35%" }}
                    >
                      Feature
                    </th>
                    {PACKAGES.map((pkg) => (
                      <th
                        key={pkg.id}
                        className="px-4 py-4 text-center"
                        style={{
                          color: "#1A2A1E",
                          fontFamily: "var(--font-display)",
                          fontSize: "1rem",
                        }}
                      >
                        {pkg.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((feat, i) => (
                    <tr
                      key={feat.label}
                      style={{
                        background:
                          i % 2 === 0 ? "#EDF7F2" : "rgba(255,255,255,0.7)",
                        borderBottom: "1px solid rgba(212,237,224,0.07)",
                      }}
                    >
                      <td className="px-5 py-3" style={{ color: "#4A5E52" }}>
                        {feat.label}
                      </td>
                      {feat.keys
                        ? feat.keys.map((k) => (
                            <td
                              key={k}
                              className="px-4 py-3 text-center text-xs font-medium"
                              style={{ color: "#1A2A1E" }}
                            >
                              {k}
                            </td>
                          ))
                        : feat.values?.map((v, vi) => (
                            <td
                              // biome-ignore lint/suspicious/noArrayIndexKey: static positional list
                              key={`val-${vi}`}
                              className="px-4 py-3 text-center"
                            >
                              {v ? (
                                <Check
                                  size={16}
                                  className="mx-auto"
                                  style={{ color: "#2E7D4F" }}
                                />
                              ) : (
                                <X
                                  size={16}
                                  className="mx-auto"
                                  style={{ color: "rgba(212,237,224,0.4)" }}
                                />
                              )}
                            </td>
                          ))}
                    </tr>
                  ))}
                  <tr style={{ background: "#FFFFFF" }}>
                    <td
                      className="px-5 py-4"
                      style={{ color: "#1A2A1E", fontWeight: 600 }}
                    >
                      Price per Person
                    </td>
                    {PACKAGES.map((pkg) => (
                      <td key={pkg.id} className="px-4 py-4 text-center">
                        <span
                          className="text-lg font-bold"
                          style={{
                            color: "#D4A843",
                            fontFamily: "var(--font-display)",
                          }}
                        >
                          ₹{pkg.price.toLocaleString()}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Group Discount Calculator */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <Users
              size={32}
              className="mx-auto mb-4"
              style={{ color: "#D4A843" }}
            />
            <h2
              className="text-3xl mb-2"
              style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
            >
              Group Discount Calculator
            </h2>
            <p className="text-sm mb-8" style={{ color: "#4A5E52" }}>
              The bigger your group, the more you save.
            </p>

            <div className="flex items-center gap-4 mb-6 justify-center">
              <label
                htmlFor="packages-group-size"
                className="text-sm"
                style={{ color: "#4A5E52" }}
              >
                Group Size:
              </label>
              <input
                id="packages-group-size"
                type="range"
                min={1}
                max={20}
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
                className="w-48 accent-rose-600"
                data-ocid="packages.group_size_slider"
              />
              <span
                className="text-2xl font-bold w-10 text-center"
                style={{ color: "#1A2A1E", fontFamily: "var(--font-display)" }}
              >
                {groupSize}
              </span>
            </div>

            {discount > 0 ? (
              <div className="space-y-3">
                <p
                  className="text-5xl font-bold"
                  style={{
                    color: "#D4A843",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {discount}% OFF
                </p>
                <p className="text-sm" style={{ color: "#1A2A1E" }}>
                  Group of {groupSize} qualifies for a{" "}
                  <strong>{discount}% group discount</strong> on any package.
                </p>
                {PACKAGES.map((pkg) => {
                  const disc = Math.round(pkg.price * (discount / 100));
                  return (
                    <div
                      key={pkg.id}
                      className="flex items-center justify-between rounded-lg px-4 py-2 text-sm"
                      style={{ background: "rgba(255,255,255,0.8)" }}
                    >
                      <span style={{ color: "#4A5E52" }}>{pkg.name}</span>
                      <span style={{ color: "#D4A843" }}>
                        ₹{(pkg.price - disc).toLocaleString()}
                        <span style={{ color: "rgba(212,237,224,0.5)" }}>
                          {" "}
                          /person
                        </span>
                      </span>
                    </div>
                  );
                })}
                <p className="text-xs pt-2" style={{ color: "#4A5E52" }}>
                  Contact us for groups of 16+ for custom pricing.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm" style={{ color: "#4A5E52" }}>
                  Travelling with{" "}
                  <strong style={{ color: "#1A2A1E" }}>5 or more?</strong>{" "}
                  Unlock group discounts. Currently no discount for {groupSize}{" "}
                  {groupSize === 1 ? "person" : "people"}.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-center">
                  {[
                    ["5–8 people", "5%"],
                    ["9–15 people", "10%"],
                    ["16+ people", "15%"],
                  ].map(([label, pct]) => (
                    <div
                      key={label}
                      className="rounded-lg p-3"
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        border: "1px solid rgba(201,168,76,0.2)",
                      }}
                    >
                      <p
                        className="font-bold text-base"
                        style={{ color: "#D4A843" }}
                      >
                        {pct}
                      </p>
                      <p style={{ color: "#4A5E52" }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link to="/contact">
              <Button
                className="mt-6"
                data-ocid="packages.get_quote_button"
                style={{
                  background: "#E8541A", color: "#FFFFFF",
                  border: "none",
                }}
              >
                Request Custom Group Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
          <h2
            className="text-4xl text-center mb-8"
            style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
          >
            Package FAQs
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={faq.q}
                data-ocid={`packages.faq.item.${i + 1}`}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(212,237,224,0.15)" }}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between text-left px-5 py-4 text-sm font-medium"
                  style={{
                    background: openFaq === i ? "#FFFFFF" : "#EDF7F2",
                    color: "#1A2A1E",
                  }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-ocid={`packages.faq.toggle.${i + 1}`}
                >
                  <span>{faq.q}</span>
                  <span
                    className="ml-4 shrink-0 transition-transform"
                    style={{
                      transform:
                        openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    ▾
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    className="px-5 py-4 text-sm"
                    style={{
                      background: "#FFFFFF",
                      color: "#4A5E52",
                      borderTop: "1px solid rgba(212,237,224,0.1)",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div
          className="py-16 px-6 text-center"
          style={{
            background: "#FFFFFF",
            borderTop: "1px solid rgba(212,237,224,0.1)",
          }}
        >
          <h3
            className="text-3xl mb-3"
            style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
          >
            Not sure which package fits you?
          </h3>
          <p className="text-sm mb-6" style={{ color: "#4A5E52" }}>
            Take our 2-minute Trek Finder quiz and we'll recommend the perfect
            package for you.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/trek-finder">
              <Button
                data-ocid="packages.trek_finder_button"
                variant="outline"
                style={{
                  borderColor: "#E8541A",
                  color: "#1A2A1E",
                  background: "transparent",
                }}
              >
                Take Trek Finder Quiz
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                data-ocid="packages.contact_button"
                style={{
                  background: "#E8541A", color: "#FFFFFF",
                  border: "none",
                }}
              >
                Talk to Our Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
