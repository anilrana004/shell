import YatraTabs from "@/components/YatraTabs";
import { YATRAS } from "@/data/treks";
import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";

const TRUST_ITEMS = [
  {
    icon: "🏛",
    label: "GMVN Registered",
    detail:
      "Licensed by Garhwal Mandal Vikas Nigam — Uttarakhand's premier tourism body",
  },
  {
    icon: "🍱",
    label: "All Meals",
    detail:
      "Breakfast and dinner included daily. Quality home-style vegetarian meals.",
  },
  {
    icon: "🚐",
    label: "AC Transport",
    detail:
      "Air-conditioned vehicles throughout. Premium sedan/SUV for all road journeys.",
  },
  {
    icon: "🏨",
    label: "Hotel Accommodation",
    detail:
      "Comfortable hotel stay every night. No camping — proper beds and hot showers.",
  },
  {
    icon: "👨‍🏫",
    label: "Certified Guides",
    detail:
      "All guides hold GMVN certification with 5+ years experience on Chardham routes.",
  },
  {
    icon: "🏥",
    label: "Medical Kit",
    detail:
      "Gamow bag, pulse oximeter, AMS medication, and first aid kit on every trip.",
  },
  {
    icon: "📋",
    label: "All Permits",
    detail:
      "Government registration, Chardham portals, biometric — all handled by us.",
  },
  {
    icon: "📞",
    label: "24/7 Support",
    detail:
      "Shail Hikers operations center monitors every active group round the clock.",
  },
];

export default function YatraDetailPage() {
  const { slug } = useParams({ from: "/yatras/$slug" });
  const yatra = YATRAS.find((y) => y.slug === slug);
  const [groupSize, setGroupSize] = useState(2);
  const [activeTrust, setActiveTrust] = useState<number | null>(null);

  if (!yatra) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#EDF7F2" }}
      >
        <div className="text-center">
          <p className="text-6xl mb-4">🛕</p>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A2A1E" }}>
            Yatra Not Found
          </h2>
          <Link to="/" style={{ color: "#E8541A" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const priceForGroup =
    groupSize >= 9
      ? yatra.basePrice * 0.9
      : groupSize >= 5
        ? yatra.basePrice * 0.95
        : groupSize === 1
          ? yatra.basePrice * 1.15
          : yatra.basePrice;
  const totalPrice = Math.round(priceForGroup * groupSize);

  const difficultyColor =
    yatra.difficulty === "Easy"
      ? "#2E7D4F"
      : yatra.difficulty === "Moderate"
        ? "#D4A843"
        : "#E8541A";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: yatra.name,
    description: yatra.shortDescription,
    url: `https://shailhikers.com/yatras/${yatra.slug}`,
    image: yatra.heroImage,
    touristType: "Religious",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    offers: {
      "@type": "Offer",
      price: yatra.basePrice,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div style={{ background: "#EDF7F2", minHeight: "100vh" }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <div className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img
          src={yatra.heroImage}
          alt={yatra.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.45)" }}
        />
        {/* Om symbol watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="text-[18rem] font-bold select-none"
            style={{ color: "rgba(232,84,26,0.06)", lineHeight: 1 }}
          >
            ॐ
          </span>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #EDF7F2 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-sm mb-4"
            style={{ color: "rgba(212,237,224,0.7)" }}
          >
            <Link to="/" style={{ color: "rgba(212,237,224,0.7)" }}>
              Home
            </Link>
            <span>›</span>
            <Link to="/" style={{ color: "rgba(212,237,224,0.7)" }}>
              Yatras
            </Link>
            <span>›</span>
            <span style={{ color: "#1A2A1E" }}>{yatra.name}</span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-3"
            style={{ color: "#1A2A1E", fontFamily: "var(--font-display)" }}
          >
            {yatra.name}
          </h1>
          <p
            className="text-xl mb-6"
            style={{
              color: "#4A5E52",
              fontFamily: "var(--font-accent, var(--font-display))",
            }}
          >
            {yatra.tagline}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              {
                label: "Duration",
                value: `${yatra.durationDays}D / ${yatra.durationNights}N`,
              },
              { label: "Best Time", value: yatra.bestTime },
              {
                label: "Difficulty",
                value: yatra.difficulty,
                color: difficultyColor,
              },
              { label: "From", value: yatra.startingPoint },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-2 rounded-full text-sm"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  border: "1px solid rgba(212,237,224,0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span style={{ color: "#E8541A" }}>{stat.label}: </span>
                <span
                  style={{ color: stat.color ?? "#1A2A1E", fontWeight: 600 }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
            {yatra.requiresAdvanceRegistration && (
              <div
                className="px-4 py-2 rounded-full text-sm"
                style={{
                  background: "rgba(201,168,76,0.15)",
                  border: "1px solid rgba(201,168,76,0.4)",
                }}
              >
                <span style={{ color: "#D4A843" }}>
                  ⚠ Advance Registration Required
                </span>
              </div>
            )}
            {yatra.helicopterOption && (
              <div
                className="px-4 py-2 rounded-full text-sm"
                style={{
                  background: "rgba(168,197,218,0.1)",
                  border: "1px solid rgba(168,197,218,0.35)",
                }}
              >
                <span style={{ color: "#2E7D4F" }}>
                  🚁 Helicopter Available
                </span>
              </div>
            )}
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/book/$slug"
              params={{ slug: yatra.slug }}
              data-ocid="yatra.hero.book_button"
              className="px-8 py-3 rounded-full font-bold"
              style={{ background: "#E8541A", color: "#FFFFFF" }}
            >
              Book This Yatra — ₹{yatra.basePrice.toLocaleString("en-IN")}
            </Link>
            <button
              type="button"
              data-ocid="yatra.hero.share_button"
              className="px-6 py-3 rounded-full font-bold"
              style={{
                border: "1px solid rgba(212,237,224,0.5)",
                color: "#1A2A1E",
                background: "rgba(255,255,255,0.6)",
              }}
              onClick={() => {
                if (navigator.share)
                  navigator.share({
                    title: yatra.name,
                    url: window.location.href,
                  });
                else navigator.clipboard.writeText(window.location.href);
              }}
            >
              Share Yatra
            </button>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid rgba(212,237,224,0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {TRUST_ITEMS.map((item, i) => (
              <button
                key={item.label}
                type="button"
                data-ocid={`yatra.trust.item.${i + 1}`}
                onClick={() => setActiveTrust(activeTrust === i ? null : i)}
                className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors text-center"
                style={{
                  background:
                    activeTrust === i
                      ? "rgba(232,84,26,0.15)"
                      : "transparent",
                }}
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className="text-xs font-medium leading-tight"
                  style={{ color: "#4A5E52" }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          {activeTrust !== null && (
            <div
              className="mt-3 p-4 rounded-lg"
              style={{
                background: "rgba(232,84,26,0.1)",
                border: "1px solid rgba(232,84,26,0.25)",
              }}
            >
              <p className="text-sm" style={{ color: "#1A2A1E" }}>
                <span className="font-bold">
                  {TRUST_ITEMS[activeTrust].icon}{" "}
                  {TRUST_ITEMS[activeTrust].label}:
                </span>{" "}
                {TRUST_ITEMS[activeTrust].detail}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT + SIDEBAR */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">
          {/* TABS — main content */}
          <div
            className="flex-1 min-w-0 rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(212,237,224,0.15)" }}
          >
            <YatraTabs yatra={yatra} />
          </div>

          {/* STICKY SIDEBAR */}
          <div className="hidden lg:block w-80 flex-shrink-0 sticky top-20">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(212,237,224,0.2)",
              }}
            >
              <div
                className="p-5"
                style={{ borderBottom: "1px solid rgba(212,237,224,0.15)" }}
              >
                <p className="text-sm" style={{ color: "#4A5E52" }}>
                  Starting from
                </p>
                <p
                  className="text-3xl font-bold"
                  style={{
                    color: "#D4A843",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  ₹{yatra.basePrice.toLocaleString("en-IN")}
                </p>
                <p className="text-xs" style={{ color: "#4A5E52" }}>
                  per person · {yatra.durationDays} days
                </p>
              </div>

              <div className="p-5 space-y-4">
                {/* Group Size Calculator */}
                <div>
                  <label
                    htmlFor="group-size-yatra"
                    className="block text-sm font-bold mb-2"
                    style={{ color: "#1A2A1E" }}
                  >
                    Group Size
                  </label>
                  <div
                    className="flex items-center gap-3"
                    id="group-size-yatra"
                  >
                    <button
                      type="button"
                      data-ocid="yatra.sidebar.group_decrease"
                      onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                      className="w-8 h-8 rounded-full font-bold"
                      style={{
                        background: "rgba(232,84,26,0.2)",
                        color: "#1A2A1E",
                      }}
                    >
                      −
                    </button>
                    <span
                      className="font-bold text-lg"
                      style={{ color: "#1A2A1E" }}
                    >
                      {groupSize}
                    </span>
                    <button
                      type="button"
                      data-ocid="yatra.sidebar.group_increase"
                      onClick={() => setGroupSize(Math.min(20, groupSize + 1))}
                      className="w-8 h-8 rounded-full font-bold"
                      style={{
                        background: "rgba(232,84,26,0.2)",
                        color: "#1A2A1E",
                      }}
                    >
                      +
                    </button>
                    <span className="text-sm" style={{ color: "#4A5E52" }}>
                      persons
                    </span>
                  </div>
                  {groupSize >= 5 && (
                    <p className="text-xs mt-1" style={{ color: "#2E7D4F" }}>
                      🎉 Group discount applied: {groupSize >= 9 ? "10%" : "5%"}{" "}
                      off
                    </p>
                  )}
                </div>

                {/* Price Summary */}
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: "#4A5E52" }}>Per person</span>
                    <span style={{ color: "#D4A843" }}>
                      ₹{Math.round(priceForGroup).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: "#4A5E52" }}>
                      Group of {groupSize}
                    </span>
                    <span style={{ color: "#D4A843" }}>
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div
                    className="pt-2"
                    style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}
                  >
                    <div className="flex justify-between">
                      <span className="font-bold" style={{ color: "#1A2A1E" }}>
                        Total
                      </span>
                      <span
                        className="font-bold text-lg"
                        style={{ color: "#D4A843" }}
                      >
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/book/$slug"
                  params={{ slug: yatra.slug }}
                  data-ocid="yatra.sidebar.book_button"
                  className="block text-center py-4 rounded-xl font-bold transition-opacity hover:opacity-90"
                  style={{ background: "#E8541A", color: "#FFFFFF" }}
                >
                  Book Now
                </Link>

                <a
                  href="https://wa.me/918279888470"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="yatra.sidebar.whatsapp_button"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium"
                  style={{
                    border: "1px solid rgba(212,237,224,0.3)",
                    color: "#4A5E52",
                  }}
                >
                  <span>💬</span> WhatsApp Us
                </a>

                {/* Guide Card */}
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(212,237,224,0.03)",
                    border: "1px solid rgba(212,237,224,0.1)",
                  }}
                >
                  <p className="text-xs mb-2" style={{ color: "#E8541A" }}>
                    YOUR POTENTIAL GUIDE
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80"
                      alt="Guide"
                      className="w-10 h-10 rounded-full object-cover"
                      style={{ border: "2px solid #E8541A" }}
                    />
                    <div>
                      <p
                        className="font-bold text-sm"
                        style={{ color: "#1A2A1E" }}
                      >
                        Sanjay Kumar
                      </p>
                      <p className="text-xs" style={{ color: "#4A5E52" }}>
                        9 yrs · ⭐ 4.9/5
                      </p>
                    </div>
                  </div>
                </div>

                {/* Next Departure */}
                {yatra.nextDeparture && (
                  <div
                    className="p-3 rounded-lg text-center"
                    style={{
                      background: "rgba(232,84,26,0.1)",
                      border: "1px solid rgba(232,84,26,0.25)",
                    }}
                  >
                    <p className="text-xs" style={{ color: "#4A5E52" }}>
                      Next Departure
                    </p>
                    <p className="font-bold" style={{ color: "#1A2A1E" }}>
                      {new Date(yatra.nextDeparture).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "long", year: "numeric" },
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Book Bar */}
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderTop: "1px solid rgba(212,237,224,0.2)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs" style={{ color: "#4A5E52" }}>
                from
              </p>
              <p className="font-bold text-lg" style={{ color: "#D4A843" }}>
                ₹{yatra.basePrice.toLocaleString("en-IN")}
              </p>
            </div>
            <Link
              to="/book/$slug"
              params={{ slug: yatra.slug }}
              data-ocid="yatra.mobile.book_button"
              className="flex-1 text-center py-3 rounded-full font-bold"
              style={{ background: "#E8541A", color: "#FFFFFF" }}
            >
              Book This Yatra
            </Link>
          </div>
        </div>
        <div className="lg:hidden h-24" />
      </div>
    </div>
  );
}
