import type { TrekData } from "@/types";
import { useState } from "react";

interface Props {
  trek: TrekData;
}

const MOCK_REVIEWS = [
  {
    name: "Anjali Sharma",
    city: "Delhi",
    date: "Jan 2025",
    group: "Friends",
    overall: 5,
    guide: 5,
    trail: 4,
    food: 5,
    camping: 5,
    value: 4,
    safety: 5,
    body: "The trek was absolutely transformative. Deepak Sir's expertise made us feel safe even in the most challenging sections. The camps were cosy, food was delicious, and the summit views blew our minds. Shail Hikers is a class apart.",
    helpful: 34,
    verified: true,
  },
  {
    name: "Rahul Mehta",
    city: "Mumbai",
    date: "Dec 2024",
    group: "Solo",
    overall: 5,
    guide: 5,
    trail: 5,
    food: 4,
    camping: 5,
    value: 5,
    safety: 5,
    body: "First Himalayan trek at 34 and I couldn't have chosen a better operator. The team handled everything professionally. The guide noticed I was struggling with altitude on Day 3 and personally monitored my oxygen levels. That level of care is rare.",
    helpful: 28,
    verified: true,
  },
  {
    name: "Priya Kapoor",
    city: "Bangalore",
    date: "Feb 2025",
    group: "Couple",
    overall: 4,
    guide: 5,
    trail: 4,
    food: 4,
    camping: 4,
    value: 4,
    safety: 5,
    body: "Wonderful experience overall. The trek was well-organized and the team was responsive to all our concerns. Food quality was good with generous portions. Would have liked slightly warmer sleeping bags though.",
    helpful: 12,
    verified: true,
  },
  {
    name: "Vikram Singh",
    city: "Chandigarh",
    date: "Nov 2024",
    group: "Group",
    overall: 5,
    guide: 5,
    trail: 5,
    food: 5,
    camping: 5,
    value: 5,
    safety: 5,
    body: "Did this with 8 friends and it was the best group trip we have ever done. The logistics were flawless, campfire evenings were magical, and the guides were entertaining and knowledgeable.",
    helpful: 45,
    verified: true,
  },
  {
    name: "Meera Nair",
    city: "Kochi",
    date: "Oct 2024",
    group: "Family",
    overall: 4,
    guide: 5,
    trail: 3,
    food: 5,
    camping: 4,
    value: 4,
    safety: 5,
    body: "Trekked with my teenage son. The guides were patient and accommodating. Trail on Day 4 was trickier than we expected but guide managed it expertly. The meals were outstanding - best dal makhani I have had in years!",
    helpful: 19,
    verified: false,
  },
];

const CATEGORY_RATINGS = [
  "Guide Quality",
  "Trail Conditions",
  "Food Quality",
  "Camping Setup",
  "Value for Money",
  "Safety",
];

export default function TrekReviewsTab({ trek }: Props) {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [helpful, setHelpful] = useState<Set<number>>(new Set());
  const [showWriteReview, setShowWriteReview] = useState(false);

  const _overallAvg =
    MOCK_REVIEWS.reduce((a, r) => a + r.overall, 0) / MOCK_REVIEWS.length;
  const starCounts = [5, 4, 3, 2, 1].map(
    (star) => MOCK_REVIEWS.filter((r) => r.overall === star).length,
  );
  const categoryAvgs = [
    "guide",
    "trail",
    "food",
    "camping",
    "value",
    "safety",
  ].map((key) =>
    (
      MOCK_REVIEWS.reduce(
        (a, r) => a + (r[key as keyof typeof r] as number),
        0,
      ) / MOCK_REVIEWS.length
    ).toFixed(1),
  );

  const toggleExpand = (i: number) =>
    setExpanded((prev) => {
      const s = new Set(prev);
      s.has(i) ? s.delete(i) : s.add(i);
      return s;
    });
  const toggleHelpful = (i: number) =>
    setHelpful((prev) => {
      const s = new Set(prev);
      s.has(i) ? s.delete(i) : s.add(i);
      return s;
    });

  return (
    <div className="py-8 space-y-10">
      {/* Summary */}
      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-end gap-4 mb-4">
            <div className="text-6xl font-bold" style={{ color: "#D4A843" }}>
              {trek.rating?.toFixed(1)}
            </div>
            <div>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    style={{
                      color:
                        s <= Math.round(trek.rating || 0)
                          ? "#D4A843"
                          : "#4A5E5244",
                    }}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <div className="text-sm" style={{ color: "#4A5E52" }}>
                {trek.reviewCount} verified reviews
              </div>
            </div>
          </div>
          {[5, 4, 3, 2, 1].map((star, i) => (
            <div key={star} className="flex items-center gap-3 mb-2">
              <div
                className="text-sm w-6 text-right"
                style={{ color: "#4A5E52" }}
              >
                {star}
              </div>
              <span style={{ color: "#D4A843" }}>&#9733;</span>
              <div
                className="flex-1 h-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.9)" }}
              >
                <div
                  className="h-2 rounded-full"
                  style={{
                    background: "#D4A843",
                    width: `${(starCounts[i] / MOCK_REVIEWS.length) * 100}%`,
                  }}
                />
              </div>
              <div className="text-xs w-6" style={{ color: "#4A5E52" }}>
                {starCounts[i]}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="font-semibold mb-4" style={{ color: "#1A2A1E" }}>
            Category Ratings
          </div>
          {CATEGORY_RATINGS.map((cat, i) => (
            <div key={cat} className="flex items-center gap-3 mb-2">
              <div
                className="text-xs w-28 flex-shrink-0"
                style={{ color: "#4A5E52" }}
              >
                {cat}
              </div>
              <div
                className="flex-1 h-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.9)" }}
              >
                <div
                  className="h-2 rounded-full"
                  style={{
                    background: "#E8541A",
                    width: `${(Number(categoryAvgs[i]) / 5) * 100}%`,
                  }}
                />
              </div>
              <div
                className="text-xs w-8 text-right font-semibold"
                style={{ color: "#1A2A1E" }}
              >
                {categoryAvgs[i]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {["All", "5 Stars", "4 Stars", "Solo", "Family", "Group"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className="text-xs px-3 py-1.5 rounded-full"
            style={{
              background: filter === f ? "#E8541A" : "rgba(255,255,255,0.9)",
              color: "#1A2A1E",
              border: `1px solid ${filter === f ? "#E8541A" : "#4A5E5233"}`,
            }}
          >
            {f}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowWriteReview(true)}
          className="ml-auto text-xs px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(232,84,26,0.2)",
            color: "#E8541A",
            border: "1px solid #E8541A66",
          }}
        >
          Write a Review
        </button>
      </div>

      {/* Review Cards */}
      <div className="space-y-6">
        {MOCK_REVIEWS.map((review, i) => (
          <div
            key={review.name}
            className="rounded-2xl p-6 border"
            style={{
              background: "rgba(255,255,255,0.9)",
              borderColor: "#4A5E5222",
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold"
                style={{ background: "#E8541A", color: "#FFFFFF" }}
              >
                {review.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold" style={{ color: "#1A2A1E" }}>
                    {review.name}
                  </div>
                  {review.verified && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(45,80,22,0.3)",
                        color: "#4A7C2F",
                      }}
                    >
                      Verified Trekker
                    </span>
                  )}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#4A5E52" }}>
                  {review.city} / {review.date} / {review.group}
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    style={{
                      color: s <= review.overall ? "#D4A843" : "#4A5E5244",
                    }}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <div
              className="text-sm leading-relaxed mb-4"
              style={{ color: "#1A2A1E" }}
            >
              {expanded.has(i) || review.body.length <= 200
                ? review.body
                : `${review.body.slice(0, 200)}...`}
              {review.body.length > 200 && (
                <button
                  type="button"
                  onClick={() => toggleExpand(i)}
                  className="ml-2 text-xs underline"
                  style={{ color: "#4A5E52" }}
                >
                  {expanded.has(i) ? "Show less" : "Read more"}
                </button>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => toggleHelpful(i)}
                className="text-xs flex items-center gap-1"
                style={{ color: helpful.has(i) ? "#E8541A" : "#4A5E52" }}
              >
                &#128077; Helpful ({review.helpful + (helpful.has(i) ? 1 : 0)})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(255,255,255,0.95)" }}
        >
          <div
            className="rounded-2xl p-8 w-full max-w-lg"
            style={{ background: "#FFFFFF" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className="font-display text-2xl"
                style={{ color: "#1A2A1E" }}
              >
                Write a Review
              </h3>
              <button
                type="button"
                onClick={() => setShowWriteReview(false)}
                style={{ color: "#4A5E52" }}
              >
                &#10005;
              </button>
            </div>
            <div
              className="text-sm mb-4 px-4 py-3 rounded-xl"
              style={{ background: "rgba(232,84,26,0.1)", color: "#4A5E52" }}
            >
              Please log in to write a review. Your experience helps future
              trekkers!
            </div>
            <a
              href="/auth/login"
              className="block w-full text-center py-3 rounded-xl font-semibold"
              style={{ background: "#E8541A", color: "#FFFFFF" }}
            >
              Log In to Write Review
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
