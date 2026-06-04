import { useJoinWaitlist, useWaitlistPosition } from "@/hooks/useWaitlist";
import type { TrekData } from "@/types";
import { useState } from "react";

interface Props {
  trek: TrekData;
}

const BATCHES = [
  { date: "2025-01-15", guide: "Deepak Singh", seats: 8, booked: 6 },
  { date: "2025-01-29", guide: "Rahul Negi", seats: 10, booked: 10 },
  { date: "2025-02-05", guide: "Priya Rawat", seats: 10, booked: 3 },
  { date: "2025-02-19", guide: "Amit Kumar", seats: 8, booked: 8 },
  { date: "2025-03-05", guide: "Deepak Singh", seats: 10, booked: 1 },
  { date: "2025-03-19", guide: "Rahul Negi", seats: 10, booked: 7 },
];

const PRICE_BREAKDOWN = [
  { label: "Expert Guides", pct: 30, color: "#E8541A" },
  { label: "Permits & Fees", pct: 10, color: "#D4A843" },
  { label: "Meals", pct: 25, color: "#2E7D4F" },
  { label: "Transport", pct: 20, color: "#2E7D4F" },
  { label: "Gear & Equipment", pct: 15, color: "#4A5E52" },
];

export default function TrekPricingTab({ trek }: Props) {
  const [groupSize, setGroupSize] = useState(2);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);

  // Waitlist inline form state
  const [wlName, setWlName] = useState("");
  const [wlEmail, setWlEmail] = useState("");
  const [wlPhone, setWlPhone] = useState("");
  const [wlSubmitted, setWlSubmitted] = useState(false);
  const [wlError, setWlError] = useState("");

  const joinWaitlistMutation = useJoinWaitlist();
  const [submittedBatchId, setSubmittedBatchId] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const { data: waitlistPosition } = useWaitlistPosition(
    submittedBatchId ?? "",
    submittedEmail ?? "",
  );

  const getDiscount = () => {
    if (groupSize === 1) return -0.15;
    if (groupSize <= 4) return 0;
    if (groupSize <= 8) return 0.05;
    if (groupSize <= 15) return 0.1;
    return 0.15;
  };
  const discount = getDiscount();
  const adjustedPrice = Math.round(trek.basePrice * 1.15);
  const discountedPrice =
    groupSize > 4
      ? Math.round(trek.basePrice * (1 - discount))
      : trek.basePrice;
  const pricePerPerson = groupSize === 1 ? adjustedPrice : discountedPrice;
  const totalPrice = pricePerPerson * groupSize;

  const getBatchStatus = (booked: number, seats: number) => {
    const pct = booked / seats;
    if (booked >= seats)
      return { label: "Sold Out", color: "#E8541A", dot: "#E8541A" };
    if (pct >= 0.7)
      return { label: "Filling Fast", color: "#D4A843", dot: "#D4A843" };
    return { label: "Available", color: "#4A7C2F", dot: "#4A7C2F" };
  };

  const isBatchFull = (booked: number, seats: number) => booked >= seats;

  const seatsLeft = (booked: number, seats: number) => seats - booked;

  const handleJoinWaitlist = async (batchId: string) => {
    setWlError("");
    if (!wlName.trim() || !wlEmail.trim() || !wlPhone.trim()) {
      setWlError("Please fill in all fields.");
      return;
    }
    try {
      await joinWaitlistMutation.mutateAsync({
        batchId,
        name: wlName.trim(),
        email: wlEmail.trim(),
        phone: wlPhone.trim(),
      });
      setWlSubmitted(true);
      setSubmittedBatchId(batchId);
      setSubmittedEmail(wlEmail.trim());
      setWlName("");
      setWlEmail("");
      setWlPhone("");
    } catch (e) {
      setWlError(
        e instanceof Error
          ? e.message
          : "Failed to join waitlist. Please try again.",
      );
    }
  };

  return (
    <div className="py-8 space-y-10">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-3xl" style={{ color: "#1A2A1E" }}>
            Pricing
          </h2>
          <span
            className="text-sm px-3 py-1.5 rounded-full border"
            style={{ borderColor: "#D4A843", color: "#D4A843" }}
          >
            Price Match Guarantee
          </span>
        </div>
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
                  Group Size
                </th>
                <th
                  className="px-5 py-3 text-right"
                  style={{ color: "#1A2A1E" }}
                >
                  Price/Person
                </th>
                <th
                  className="px-5 py-3 text-right"
                  style={{ color: "#1A2A1E" }}
                >
                  Savings
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Solo (1 person)",
                  price: Math.round(trek.basePrice * 1.15),
                  save: "--",
                },
                {
                  label: "2-4 persons",
                  price: trek.basePrice,
                  save: "Base Price",
                },
                {
                  label: "5-8 persons",
                  price: Math.round(trek.basePrice * 0.95),
                  save: `Save Rs.${Math.round(trek.basePrice * 0.05).toLocaleString()}`,
                },
                {
                  label: "9-15 persons",
                  price: Math.round(trek.basePrice * 0.9),
                  save: `Save Rs.${Math.round(trek.basePrice * 0.1).toLocaleString()}`,
                },
                {
                  label: "16+ persons",
                  price: Math.round(trek.basePrice * 0.85),
                  save: "Contact Us",
                },
              ].map((row) => (
                <tr
                  key={row.label}
                  style={{
                    background:
                      row.label.startsWith("2") || row.label.startsWith("9")
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.9)",
                  }}
                >
                  <td className="px-5 py-3" style={{ color: "#1A2A1E" }}>
                    {row.label}
                  </td>
                  <td
                    className="px-5 py-3 text-right font-semibold"
                    style={{ color: "#D4A843" }}
                  >
                    Rs.{row.price.toLocaleString()}
                  </td>
                  <td
                    className="px-5 py-3 text-right text-xs"
                    style={{ color: "#4A7C2F" }}
                  >
                    {row.save}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs" style={{ color: "#4A5E52" }}>
          All prices include 5% GST. Early bird: 10% off if booked 60+ days
          ahead.
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl mb-5" style={{ color: "#1A2A1E" }}>
          Group Price Calculator
        </h2>
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "rgba(255,255,255,0.9)",
            borderColor: "#4A5E5233",
          }}
        >
          <div className="flex items-center gap-4 mb-5">
            <label
              htmlFor="group-size-range"
              className="text-sm"
              style={{ color: "#4A5E52" }}
            >
              Group Size:
            </label>
            <input
              type="range"
              id="group-size-range"
              min={1}
              max={20}
              value={groupSize}
              onChange={(e) => setGroupSize(Number(e.target.value))}
              className="flex-1 accent-[#E8541A]"
            />
            <span
              className="font-bold text-lg w-12 text-center"
              style={{ color: "#1A2A1E" }}
            >
              {groupSize}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div
              className="text-center rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.9)" }}
            >
              <div className="text-xs mb-1" style={{ color: "#4A5E52" }}>
                Per Person
              </div>
              <div className="font-bold text-xl" style={{ color: "#D4A843" }}>
                Rs.{pricePerPerson.toLocaleString()}
              </div>
            </div>
            <div
              className="text-center rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.9)" }}
            >
              <div className="text-xs mb-1" style={{ color: "#4A5E52" }}>
                Group Discount
              </div>
              <div
                className="font-bold text-xl"
                style={{ color: discount > 0 ? "#4A7C2F" : "#4A5E52" }}
              >
                {discount > 0 ? `${(discount * 100).toFixed(0)}%` : "--"}
              </div>
            </div>
            <div
              className="text-center rounded-xl p-4"
              style={{ background: "rgba(232,84,26,0.15)" }}
            >
              <div className="text-xs mb-1" style={{ color: "#4A5E52" }}>
                Total
              </div>
              <div className="font-bold text-xl" style={{ color: "#E8541A" }}>
                Rs.{totalPrice.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <button
          type="button"
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-sm underline mb-4"
          style={{ color: "#4A5E52" }}
        >
          {showBreakdown ? "Hide" : "Show"} where your money goes
        </button>
        {showBreakdown && (
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "rgba(255,255,255,0.9)",
              borderColor: "#4A5E5233",
            }}
          >
            {PRICE_BREAKDOWN.map((item) => (
              <div key={item.label} className="flex items-center gap-4 mb-3">
                <div className="w-32 text-sm" style={{ color: "#1A2A1E" }}>
                  {item.label}
                </div>
                <div
                  className="flex-1 h-3 rounded-full"
                  style={{ background: "rgba(255,255,255,0.9)" }}
                >
                  <div
                    className="h-3 rounded-full"
                    style={{ background: item.color, width: `${item.pct}%` }}
                  />
                </div>
                <div
                  className="text-sm font-semibold w-10 text-right"
                  style={{ color: item.color }}
                >
                  {item.pct}%
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl mb-5" style={{ color: "#1A2A1E" }}>
          Upcoming Batches
        </h2>
        <div className="space-y-3">
          {BATCHES.map((batch, i) => {
            const status = getBatchStatus(batch.booked, batch.seats);
            const date = new Date(batch.date);
            return (
              <button
                type="button"
                key={batch.date}
                className="rounded-xl border cursor-pointer transition-all w-full text-left"
                style={{
                  background:
                    selectedBatch === i
                      ? "rgba(232,84,26,0.15)"
                      : "rgba(255,255,255,0.9)",
                  borderColor: selectedBatch === i ? "#E8541A" : "#4A5E5222",
                }}
                onClick={() => setSelectedBatch(selectedBatch === i ? null : i)}
              >
                <div className="flex items-center gap-4 px-5 py-4">
                  <div
                    className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(232,84,26,0.2)" }}
                  >
                    <div className="text-xs" style={{ color: "#4A5E52" }}>
                      {date.toLocaleString("default", { month: "short" })}
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{ color: "#1A2A1E" }}
                    >
                      {date.getDate()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "#1A2A1E" }}
                    >
                      Guide: {batch.guide}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "#4A5E52" }}>
                      {isBatchFull(batch.booked, batch.seats) ? (
                        <span
                          className="inline-flex items-center gap-1"
                          style={{ color: "#E8541A" }}
                        >
                          <span
                            className="w-2 h-2 rounded-full inline-block animate-pulse"
                            style={{ background: "#E8541A" }}
                          />
                          Sold Out
                        </span>
                      ) : seatsLeft(batch.booked, batch.seats) <= 3 ? (
                        <span style={{ color: "#E8541A" }}>
                          Only {seatsLeft(batch.booked, batch.seats)} seats
                          left!
                        </span>
                      ) : (
                        <span>
                          {seatsLeft(batch.booked, batch.seats)} of{" "}
                          {batch.seats} seats left
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold" style={{ color: "#D4A843" }}>
                      Rs.{trek.basePrice.toLocaleString()}
                    </div>
                    <div className="text-xs mt-1 flex items-center gap-1 justify-end">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: status.dot }}
                      />
                      <span style={{ color: status.color }}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                </div>
                {selectedBatch === i && (
                  <div
                    className="border-t px-5 py-4 space-y-3"
                    style={{ borderColor: "#4A5E5222" }}
                  >
                    <div className="text-sm" style={{ color: "#4A5E52" }}>
                      Trek duration: {trek.durationDays} days /{" "}
                      {trek.durationNights} nights
                    </div>
                    <div className="flex gap-3">
                      {batch.booked < batch.seats ? (
                        <a
                          href={`/book/${trek.slug}`}
                          className="px-5 py-2 rounded-lg text-sm font-semibold"
                          style={{ background: "#E8541A", color: "#FFFFFF" }}
                          data-ocid="trek.reserve_batch_button"
                        >
                          Reserve This Batch
                        </a>
                      ) : (
                        <div className="w-full space-y-3">
                          {!wlSubmitted ? (
                            <>
                              <button
                                type="button"
                                className="px-5 py-2 rounded-lg text-sm font-semibold border-2"
                                style={{
                                  borderColor: "#E8541A",
                                  color: "#E8541A",
                                  background: "transparent",
                                }}
                                data-ocid="trek.join_waitlist_button"
                              >
                                Join Waitlist
                              </button>
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  placeholder="Full Name"
                                  value={wlName}
                                  onChange={(e) => setWlName(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg text-sm border bg-transparent"
                                  style={{
                                    borderColor: "#4A5E5244",
                                    color: "#1A2A1E",
                                  }}
                                  data-ocid="trek.waitlist_name_input"
                                />
                                <input
                                  type="email"
                                  placeholder="Email"
                                  value={wlEmail}
                                  onChange={(e) => setWlEmail(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg text-sm border bg-transparent"
                                  style={{
                                    borderColor: "#4A5E5244",
                                    color: "#1A2A1E",
                                  }}
                                  data-ocid="trek.waitlist_email_input"
                                />
                                <input
                                  type="tel"
                                  placeholder="Phone"
                                  value={wlPhone}
                                  onChange={(e) => setWlPhone(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg text-sm border bg-transparent"
                                  style={{
                                    borderColor: "#4A5E5244",
                                    color: "#1A2A1E",
                                  }}
                                  data-ocid="trek.waitlist_phone_input"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleJoinWaitlist(batch.date)}
                                  disabled={joinWaitlistMutation.isPending}
                                  className="w-full px-5 py-2 rounded-lg text-sm font-semibold"
                                  style={{
                                    background: "#E8541A", color: "#FFFFFF",
                                  }}
                                  data-ocid="trek.waitlist_submit_button"
                                >
                                  {joinWaitlistMutation.isPending
                                    ? "Joining..."
                                    : "Join Waitlist"}
                                </button>
                                {wlError && (
                                  <div
                                    className="text-sm px-3 py-2 rounded-lg"
                                    style={{
                                      background: "rgba(232,84,26,0.15)",
                                      color: "#C94210",
                                    }}
                                    data-ocid="trek.waitlist_error"
                                  >
                                    {wlError}
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <div
                              className="rounded-xl p-4 border"
                              style={{
                                background: "#EDF7F2",
                                borderColor: "#D4EDE0",
                              }}
                              data-ocid="trek.waitlist_success_card"
                            >
                              <div
                                className="font-semibold text-sm mb-1"
                                style={{ color: "#1A2A1E" }}
                              >
                                You are on the waitlist!
                              </div>
                              <div
                                className="text-sm"
                                style={{ color: "#4A5E52" }}
                              >
                                We will email you at{" "}
                                <span
                                  className="font-semibold"
                                  style={{ color: "#1A2A1E" }}
                                >
                                  {submittedEmail}
                                </span>{" "}
                                if a seat opens.
                                {waitlistPosition != null && (
                                  <span className="block mt-1">
                                    Your position: #{Number(waitlistPosition)}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl mb-5" style={{ color: "#1A2A1E" }}>
          Payment Options
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Pay Full",
              badge: "Save 5%",
              desc: `Rs.${Math.round(trek.basePrice * 0.95).toLocaleString()}/person`,
              cta: "Book & Save",
            },
            {
              title: "Pay Rs.2,000 Now",
              badge: "Balance before trek",
              desc: "Rs.2,000 now, rest due 7 days before trek",
              cta: "Reserve Spot",
            },
            {
              title: "EMI",
              badge: "0% Interest",
              desc: "3 or 6 month EMI via Razorpay",
              cta: "Choose EMI",
            },
          ].map((opt) => (
            <div
              key={opt.title}
              className="rounded-2xl p-5 border flex flex-col"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: opt.title === "Pay Full" ? "#D4A843" : "#4A5E5233",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold" style={{ color: "#1A2A1E" }}>
                  {opt.title}
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(201,168,76,0.2)",
                    color: "#D4A843",
                    border: "1px solid #D4A84366",
                  }}
                >
                  {opt.badge}
                </span>
              </div>
              <div className="text-sm flex-1 mb-4" style={{ color: "#4A5E52" }}>
                {opt.desc}
              </div>
              <button
                type="button"
                className="w-full py-2.5 rounded-xl text-sm font-semibold"
                style={{
                  background:
                    opt.title === "Pay Full"
                      ? "#E8541A"
                      : "rgba(232,84,26,0.2)",
                  color: "#1A2A1E",
                  border:
                    opt.title !== "Pay Full"
                      ? "1px solid #E8541A66"
                      : undefined,
                }}
              >
                {opt.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <div
        className="rounded-2xl p-5 border"
        style={{ background: "rgba(201,168,76,0.1)", borderColor: "#D4A84366" }}
      >
        <div className="font-semibold mb-2" style={{ color: "#D4A843" }}>
          Early Bird - 10% Off
        </div>
        <div className="text-sm" style={{ color: "#1A2A1E" }}>
          Book 60+ days ahead to unlock 10% savings. Refer a friend and both get
          Rs.500 off your next trek.
        </div>
      </div>
    </div>
  );
}
