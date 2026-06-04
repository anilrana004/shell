import type { AddOn, MealPreference } from "@/backend";
import { TREKS } from "@/data/treks";
import { useBatchesByTrek, useCreateBooking } from "@/hooks/useBookings";
import type { Batch, Trek } from "@/types";
import { useParams } from "@tanstack/react-router";
import {
  Calendar,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Gift,
  Mail,
  MapPin,
  Mountain,
  Package,
  Phone,
  Share2,
  Shield,
  Star,
  Tent,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";

const FALLBACK_BATCHES: Batch[] = [
  {
    id: "b1",
    trekSlug: "",
    startDate: "2026-01-15",
    endDate: "2026-01-20",
    seatsTotal: 12,
    seatsBooked: 8,
    price: 0,
    guideName: "Deepak Negi",
    guideId: "g1",
    status: "filling_fast",
  },
  {
    id: "b2",
    trekSlug: "",
    startDate: "2026-02-01",
    endDate: "2026-02-06",
    seatsTotal: 12,
    seatsBooked: 4,
    price: 0,
    guideName: "Rohit Sharma",
    guideId: "g2",
    status: "open",
  },
  {
    id: "b3",
    trekSlug: "",
    startDate: "2026-02-15",
    endDate: "2026-02-20",
    seatsTotal: 12,
    seatsBooked: 12,
    price: 0,
    guideName: "Arun Kumar",
    guideId: "g3",
    status: "full",
  },
  {
    id: "b4",
    trekSlug: "",
    startDate: "2026-03-01",
    endDate: "2026-03-06",
    seatsTotal: 12,
    seatsBooked: 2,
    price: 0,
    guideName: "Deepak Negi",
    guideId: "g1",
    status: "open",
  },
  {
    id: "b5",
    trekSlug: "",
    startDate: "2026-03-15",
    endDate: "2026-03-20",
    seatsTotal: 12,
    seatsBooked: 9,
    price: 0,
    guideName: "Rohit Sharma",
    guideId: "g2",
    status: "filling_fast",
  },
];

function mapBatchStatus(status: string): Batch["status"] {
  switch (status) {
    case "Open":
      return "open";
    case "Full":
      return "full";
    case "Cancelled":
      return "cancelled";
    case "Completed":
      return "completed";
    default:
      return "filling_fast";
  }
}

const ADD_ONS = [
  {
    id: "porter",
    name: "Porter Hire",
    description: "Personal porter for luggage (4kg limit)",
    price: 800,
    perDay: true,
    icon: Mountain,
  },
  {
    id: "private_tent",
    name: "Private Tent",
    description: "Exclusive tent for solo occupancy",
    price: 500,
    perDay: false,
    icon: Tent,
  },
  {
    id: "meal_upgrade",
    name: "Meal Plan Upgrade",
    description: "Premium meals: fruit, snacks, evening soup",
    price: 999,
    perDay: false,
    icon: Star,
  },
  {
    id: "photography",
    name: "Photography Package",
    description: "Drone + photographer for the trek",
    price: 3999,
    perDay: false,
    icon: Camera,
  },
  {
    id: "pre_trek_stay",
    name: "Pre-trek Stay (Day 0)",
    description: "Guesthouse in Dehradun night before",
    price: 699,
    perDay: false,
    icon: MapPin,
  },
  {
    id: "post_trek_stay",
    name: "Post-trek Stay",
    description: "Guesthouse in Dehradun last day",
    price: 699,
    perDay: false,
    icon: MapPin,
  },
  {
    id: "merchandise",
    name: "Merchandise Kit",
    description: "T-shirt + Cap + Badge + Sticker pack",
    price: 499,
    perDay: false,
    icon: Gift,
  },
  {
    id: "insurance",
    name: "Insurance Upgrade",
    description: "Medical evacuation up to ₹5L",
    price: 299,
    perDay: false,
    icon: Shield,
  },
  {
    id: "airport_pickup",
    name: "Airport/Railway Pickup",
    description: "Dehradun airport/station to hotel",
    price: 399,
    perDay: false,
    icon: MapPin,
  },
  {
    id: "certificate",
    name: "Physical Certificate + Frame",
    description: "Framed completion certificate by courier",
    price: 199,
    perDay: false,
    icon: Star,
  },
  {
    id: "guidebook",
    name: "Trek Guide Book",
    description: "Physical trek-specific guide book",
    price: 149,
    perDay: false,
    icon: Package,
  },
];

const STEPS = [
  { num: 1, label: "Select Batch", icon: Calendar },
  { num: 2, label: "Traveler Details", icon: User },
  { num: 3, label: "Add-ons", icon: Package },
  { num: 4, label: "Review & Pay", icon: CreditCard },
];

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const statusConfig = {
  open: {
    label: "Available",
    color: "#2E7D4F",
    bg: "rgba(45,80,22,0.2)",
    dot: "#4ade80",
  },
  filling_fast: {
    label: "Limited",
    color: "#D4A843",
    bg: "rgba(201,168,76,0.15)",
    dot: "#D4A843",
  },
  full: {
    label: "Full",
    color: "#E8541A",
    bg: "rgba(232,84,26,0.15)",
    dot: "#E8541A",
  },
  cancelled: {
    label: "Cancelled",
    color: "#666",
    bg: "rgba(0,0,0,0.1)",
    dot: "#666",
  },
  completed: {
    label: "Completed",
    color: "#888",
    bg: "rgba(0,0,0,0.1)",
    dot: "#888",
  },
};

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
              style={{
                background:
                  current >= step.num ? "#E8541A" : "rgba(232,84,26,0.15)",
                color: current >= step.num ? "#1A2A1E" : "#4A5E52",
                border:
                  current === step.num
                    ? "2px solid #4A5E52"
                    : "2px solid transparent",
                boxShadow:
                  current === step.num
                    ? "0 0 16px rgba(232,84,26,0.4)"
                    : "none",
              }}
            >
              {current > step.num ? <Check size={16} /> : step.num}
            </div>
            <span
              className="text-xs hidden sm:block"
              style={{
                color: current === step.num ? "#1A2A1E" : "#4A5E52",
                opacity: current === step.num ? 1 : 0.6,
              }}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="w-16 sm:w-24 h-px mx-2 mb-4"
              style={{
                background:
                  current > step.num ? "#E8541A" : "rgba(232,84,26,0.25)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Step1BatchSelector({
  trek,
  batches,
  selected,
  onSelect,
  onNext,
}: {
  trek: Trek;
  batches: Batch[];
  selected: Batch | null;
  onSelect: (b: Batch) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl mb-2" style={{ color: "#1A2A1E" }}>
        Select Your Batch
      </h2>
      <p className="mb-8 text-sm" style={{ color: "#4A5E52" }}>
        Choose from available departure dates for {trek.name}
      </p>
      <div className="grid gap-4">
        {batches.map((b) => {
          const sc = statusConfig[b.status];
          const seatsLeft = b.seatsTotal - b.seatsBooked;
          const isSelected = selected?.id === b.id;
          const isDisabled = b.status === "full" || b.status === "cancelled";
          return (
            <motion.button
              key={b.id}
              type="button"
              whileHover={isDisabled ? {} : { y: -2 }}
              onClick={() => !isDisabled && onSelect(b)}
              data-ocid={`batch.item.${b.id}`}
              className="w-full text-left p-4 rounded-xl transition-all duration-200"
              style={{
                background: isSelected
                  ? "rgba(232,84,26,0.15)"
                  : "rgba(255,255,255,0.9)",
                border: isSelected
                  ? "2px solid #E8541A"
                  : "2px solid rgba(232,84,26,0.25)",
                opacity: isDisabled ? 0.55 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-display text-xl"
                      style={{ color: "#1A2A1E" }}
                    >
                      {formatDate(b.startDate)}
                    </span>
                    <span className="text-sm" style={{ color: "#4A5E52" }}>
                      → {formatDate(b.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span style={{ color: "#4A5E52" }}>
                      🧭 Guide:{" "}
                      <strong style={{ color: "#1A2A1E" }}>
                        {b.guideName}
                      </strong>
                    </span>
                    <span style={{ color: "#4A5E52" }}>
                      👥 {seatsLeft} seats left
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                    style={{ background: sc.bg, color: sc.color }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                      style={{ background: sc.dot }}
                    />
                    {sc.label}
                  </div>
                  <span
                    className="font-display text-lg"
                    style={{ color: "#D4A843" }}
                  >
                    ₹{trek.basePrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t"
                  style={{ borderColor: "rgba(232,84,26,0.3)" }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div style={{ color: "#4A5E52" }}>
                      🌤️ Forecast:{" "}
                      <span style={{ color: "#1A2A1E" }}>
                        Clear skies, -8°C nights
                      </span>
                    </div>
                    <div style={{ color: "#4A5E52" }}>
                      👫 Group:{" "}
                      <span style={{ color: "#1A2A1E" }}>
                        Mix of 4M+3F, avg age 27
                      </span>
                    </div>
                    <div style={{ color: "#4A5E52" }}>
                      📊 Experience:{" "}
                      <span style={{ color: "#1A2A1E" }}>70% intermediate</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
      <div className="mt-8 flex justify-end">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!selected}
          data-ocid="book.next_button"
          className="px-8 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-200"
          style={{
            background: selected ? "#E8541A" : "rgba(232,84,26,0.3)",
            color: selected ? "#1A2A1E" : "rgba(212,237,224,0.4)",
            cursor: selected ? "pointer" : "not-allowed",
          }}
        >
          Continue to Traveler Details <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}

interface TravelerFormData {
  name: string;
  age: string;
  gender: string;
  emergencyContact: string;
  medicalConditions: string;
  mealPreference: string;
  height: string;
  weight: string;
  isFirstHimalayanTrek: boolean;
  tshirtSize: string;
}

const defaultTraveler = (): TravelerFormData => ({
  name: "",
  age: "",
  gender: "male",
  emergencyContact: "",
  medicalConditions: "",
  mealPreference: "veg",
  height: "",
  weight: "",
  isFirstHimalayanTrek: false,
  tshirtSize: "M",
});

function TravelerFormCard({
  idx,
  data,
  onChange,
  extreme,
}: {
  idx: number;
  data: TravelerFormData;
  onChange: (f: keyof TravelerFormData, v: string | boolean) => void;
  extreme: boolean;
}) {
  const inputClass =
    "w-full px-3 py-2 rounded-lg text-sm bg-transparent border outline-none transition-all duration-200";
  const inputStyle = {
    borderColor: "rgba(232,84,26,0.4)",
    color: "#1A2A1E",
    background: "rgba(255,255,255,0.8)",
  };
  const labelStyle = { color: "#4A5E52" };

  return (
    <div
      className="p-5 rounded-xl mb-4"
      style={{
        background: "rgba(255,255,255,0.85)",
        border: "1px solid rgba(232,84,26,0.25)",
      }}
    >
      <h3
        className="font-display text-lg mb-4 flex items-center gap-2"
        style={{ color: "#1A2A1E" }}
      >
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: "#E8541A", color: "#FFFFFF" }}
        >
          {idx + 1}
        </span>
        {idx === 0 ? "Lead Traveler" : `Traveler ${idx + 1}`}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`t-${idx}-name`}
            className="block text-xs mb-1.5"
            style={labelStyle}
          >
            Full Name *
          </label>
          <input
            id={`t-${idx}-name`}
            className={inputClass}
            style={inputStyle}
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="As on Aadhaar"
          />
        </div>
        <div>
          <label
            htmlFor={`t-${idx}-age`}
            className="block text-xs mb-1.5"
            style={labelStyle}
          >
            Age *
          </label>
          <input
            id={`t-${idx}-age`}
            type="number"
            className={inputClass}
            style={inputStyle}
            value={data.age}
            onChange={(e) => onChange("age", e.target.value)}
            placeholder="18"
            min="12"
            max="70"
          />
        </div>
        <div>
          <label
            htmlFor={`t-${idx}-gender`}
            className="block text-xs mb-1.5"
            style={labelStyle}
          >
            Gender *
          </label>
          <select
            id={`t-${idx}-gender`}
            className={inputClass}
            style={inputStyle}
            value={data.gender}
            onChange={(e) => onChange("gender", e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor={`t-${idx}-shirt`}
            className="block text-xs mb-1.5"
            style={labelStyle}
          >
            T-Shirt Size
          </label>
          <select
            id={`t-${idx}-shirt`}
            className={inputClass}
            style={inputStyle}
            value={data.tshirtSize}
            onChange={(e) => onChange("tshirtSize", e.target.value)}
          >
            {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor={`t-${idx}-emerg`}
            className="block text-xs mb-1.5"
            style={labelStyle}
          >
            Emergency Contact *
          </label>
          <input
            id={`t-${idx}-emerg`}
            className={inputClass}
            style={inputStyle}
            value={data.emergencyContact}
            onChange={(e) => onChange("emergencyContact", e.target.value)}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div>
          <label
            htmlFor={`t-${idx}-meal`}
            className="block text-xs mb-1.5"
            style={labelStyle}
          >
            Meal Preference
          </label>
          <select
            id={`t-${idx}-meal`}
            className={inputClass}
            style={inputStyle}
            value={data.mealPreference}
            onChange={(e) => onChange("mealPreference", e.target.value)}
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>
        {extreme && (
          <>
            <div>
              <label
                htmlFor={`t-${idx}-height`}
                className="block text-xs mb-1.5"
                style={labelStyle}
              >
                Height (cm)
              </label>
              <input
                id={`t-${idx}-height`}
                type="number"
                className={inputClass}
                style={inputStyle}
                value={data.height}
                onChange={(e) => onChange("height", e.target.value)}
                placeholder="170"
              />
            </div>
            <div>
              <label
                htmlFor={`t-${idx}-weight`}
                className="block text-xs mb-1.5"
                style={labelStyle}
              >
                Weight (kg)
              </label>
              <input
                id={`t-${idx}-weight`}
                type="number"
                className={inputClass}
                style={inputStyle}
                value={data.weight}
                onChange={(e) => onChange("weight", e.target.value)}
                placeholder="65"
              />
            </div>
          </>
        )}
        <div className="sm:col-span-2">
          <label
            htmlFor={`medical_${idx}`}
            className="block text-xs mb-1.5"
            style={labelStyle}
          >
            Medical Conditions (if any)
          </label>
          <input
            id={`medical_${idx}`}
            className={inputClass}
            style={inputStyle}
            value={data.medicalConditions}
            onChange={(e) => onChange("medicalConditions", e.target.value)}
            placeholder="e.g. Asthma, BP — leave blank if none"
          />
        </div>
        <div className="sm:col-span-2 flex items-center gap-3">
          <input
            type="checkbox"
            id={`first_trek_${idx}`}
            checked={data.isFirstHimalayanTrek}
            onChange={(e) => onChange("isFirstHimalayanTrek", e.target.checked)}
            className="w-4 h-4 accent-[#E8541A]"
          />
          <label
            htmlFor={`first_trek_${idx}`}
            className="text-sm"
            style={{ color: "#4A5E52" }}
          >
            This is my first Himalayan trek
          </label>
        </div>
      </div>
    </div>
  );
}

interface LeadContactData {
  phone: string;
  email: string;
  city: string;
  source: string;
}

function Step2TravelerDetails({
  trek,
  travelers,
  lead,
  trekkerCount,
  onTravelerChange,
  onLeadChange,
  onCountChange,
  onNext,
  onBack,
}: {
  trek: Trek;
  travelers: TravelerFormData[];
  lead: LeadContactData;
  trekkerCount: number;
  onTravelerChange: (
    idx: number,
    field: keyof TravelerFormData,
    val: string | boolean,
  ) => void;
  onLeadChange: (field: keyof LeadContactData, val: string) => void;
  onCountChange: (n: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const isExtreme =
    trek.difficulty === "Extreme" || trek.difficulty === "Difficult";
  const inputStyle = {
    borderColor: "rgba(232,84,26,0.4)",
    color: "#1A2A1E",
    background: "rgba(255,255,255,0.8)",
  };
  const inputClass =
    "w-full px-3 py-2 rounded-lg text-sm bg-transparent border outline-none";

  return (
    <div>
      <h2 className="font-display text-3xl mb-2" style={{ color: "#1A2A1E" }}>
        Traveler Details
      </h2>
      <p className="mb-6 text-sm" style={{ color: "#4A5E52" }}>
        Tell us who's going on this incredible journey
      </p>
      <div
        className="mb-6 p-4 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(232,84,26,0.25)",
        }}
      >
        <h3 className="font-display text-lg mb-4" style={{ color: "#1A2A1E" }}>
          Lead Contact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="lead_phone"
              className="block text-xs mb-1.5"
              style={{ color: "#4A5E52" }}
            >
              Phone *
            </label>
            <div className="flex items-center gap-2">
              <Phone size={14} style={{ color: "#E8541A" }} />
              <input
                id="lead_phone"
                className={inputClass}
                style={inputStyle}
                value={lead.phone}
                onChange={(e) => onLeadChange("phone", e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lead_email"
              className="block text-xs mb-1.5"
              style={{ color: "#4A5E52" }}
            >
              Email *
            </label>
            <div className="flex items-center gap-2">
              <Mail size={14} style={{ color: "#E8541A" }} />
              <input
                id="lead_email"
                className={inputClass}
                style={inputStyle}
                value={lead.email}
                onChange={(e) => onLeadChange("email", e.target.value)}
                placeholder="you@email.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lead_city"
              className="block text-xs mb-1.5"
              style={{ color: "#4A5E52" }}
            >
              City *
            </label>
            <input
              id="lead_city"
              className={inputClass}
              style={inputStyle}
              value={lead.city}
              onChange={(e) => onLeadChange("city", e.target.value)}
              placeholder="Delhi"
            />
          </div>
          <div>
            <label
              htmlFor="lead_source"
              className="block text-xs mb-1.5"
              style={{ color: "#4A5E52" }}
            >
              How did you hear about us?
            </label>
            <select
              id="lead_source"
              className={inputClass}
              style={inputStyle}
              value={lead.source}
              onChange={(e) => onLeadChange("source", e.target.value)}
            >
              <option value="">Select...</option>
              <option value="instagram">Instagram</option>
              <option value="google">Google</option>
              <option value="friend">Friend Referral</option>
              <option value="youtube">YouTube</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm" style={{ color: "#4A5E52" }}>
          Number of trekkers:
        </span>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onCountChange(n)}
              className="w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                background:
                  trekkerCount === n ? "#E8541A" : "rgba(232,84,26,0.15)",
                color: trekkerCount === n ? "#1A2A1E" : "#4A5E52",
                border: "none",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      {travelers.map((t, i) => (
        <TravelerFormCard
          key={`tf-${i}-${travelers[i]?.name || i}`}
          idx={i}
          data={t}
          onChange={(f, v) => onTravelerChange(i, f, v)}
          extreme={isExtreme}
        />
      ))}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: "rgba(232,84,26,0.15)",
            color: "#4A5E52",
            border: "1px solid rgba(232,84,26,0.3)",
          }}
        >
          <ChevronLeft size={16} /> Back
        </button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          data-ocid="book.traveler_next_button"
          className="px-8 py-3 rounded-xl font-semibold text-sm flex items-center gap-2"
          style={{ background: "#E8541A", color: "#FFFFFF" }}
        >
          Continue to Add-ons <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}

function Step3AddOns({
  selectedAddOns,
  trekkerCount,
  batchDays,
  onToggle,
  totalBase,
  onNext,
  onBack,
}: {
  selectedAddOns: string[];
  trekkerCount: number;
  batchDays: number;
  onToggle: (id: string) => void;
  totalBase: number;
  onNext: () => void;
  onBack: () => void;
}) {
  const perPersonIds = ["porter", "meal_upgrade", "private_tent", "insurance"];
  const addOnTotal = ADD_ONS.filter((a) =>
    selectedAddOns.includes(a.id),
  ).reduce(
    (sum, a) =>
      sum +
      (a.perDay ? a.price * batchDays : a.price) *
        (perPersonIds.includes(a.id) ? trekkerCount : 1),
    0,
  );
  const grandTotal = totalBase + addOnTotal;

  return (
    <div>
      <h2 className="font-display text-3xl mb-2" style={{ color: "#1A2A1E" }}>
        Enhance Your Trek
      </h2>
      <p className="mb-8 text-sm" style={{ color: "#4A5E52" }}>
        Optional add-ons to make your experience extraordinary
      </p>
      <div className="grid gap-3 mb-8">
        {ADD_ONS.map((addon) => {
          const Icon = addon.icon;
          const isSelected = selectedAddOns.includes(addon.id);
          const costPerUnit = addon.perDay
            ? addon.price * batchDays
            : addon.price;
          return (
            <motion.button
              key={addon.id}
              type="button"
              whileHover={{ y: -1 }}
              onClick={() => onToggle(addon.id)}
              data-ocid={`addon.toggle.${addon.id}`}
              className="w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all duration-200"
              style={{
                background: isSelected
                  ? "rgba(232,84,26,0.15)"
                  : "rgba(255,255,255,0.9)",
                border: isSelected
                  ? "2px solid #E8541A"
                  : "2px solid rgba(232,84,26,0.2)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: isSelected ? "#E8541A" : "rgba(232,84,26,0.2)",
                }}
              >
                <Icon
                  size={18}
                  style={{ color: isSelected ? "#1A2A1E" : "#E8541A" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold text-sm"
                  style={{ color: "#1A2A1E" }}
                >
                  {addon.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#4A5E52" }}>
                  {addon.description}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className="font-display text-base"
                  style={{ color: "#D4A843" }}
                >
                  ₹{costPerUnit.toLocaleString("en-IN")}
                </span>
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{
                    background: isSelected
                      ? "#E8541A"
                      : "rgba(232,84,26,0.2)",
                  }}
                >
                  {isSelected ? (
                    <Check size={14} style={{ color: "#1A2A1E" }} />
                  ) : (
                    <span style={{ color: "#4A5E52", fontSize: 18 }}>+</span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      <div
        className="p-4 rounded-xl mb-6"
        style={{
          background: "rgba(201,168,76,0.1)",
          border: "1px solid rgba(201,168,76,0.3)",
        }}
      >
        <div className="flex justify-between items-center">
          <span style={{ color: "#4A5E52" }}>
            Trek cost ({trekkerCount} person{trekkerCount > 1 ? "s" : ""})
          </span>
          <span style={{ color: "#1A2A1E" }}>
            ₹{totalBase.toLocaleString("en-IN")}
          </span>
        </div>
        {addOnTotal > 0 && (
          <div className="flex justify-between items-center mt-2">
            <span style={{ color: "#4A5E52" }}>Add-ons total</span>
            <span style={{ color: "#1A2A1E" }}>
              ₹{addOnTotal.toLocaleString("en-IN")}
            </span>
          </div>
        )}
        <div
          className="flex justify-between items-center mt-3 pt-3 border-t"
          style={{ borderColor: "rgba(201,168,76,0.3)" }}
        >
          <span className="font-semibold" style={{ color: "#D4A843" }}>
            Total (before discount)
          </span>
          <span className="font-display text-xl" style={{ color: "#D4A843" }}>
            ₹{grandTotal.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          style={{
            background: "rgba(232,84,26,0.15)",
            color: "#4A5E52",
            border: "1px solid rgba(232,84,26,0.3)",
          }}
        >
          <ChevronLeft size={16} /> Back
        </button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          data-ocid="book.addons_next_button"
          className="px-8 py-3 rounded-xl font-semibold text-sm flex items-center gap-2"
          style={{ background: "#E8541A", color: "#FFFFFF" }}
        >
          Review & Pay <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}

function SuccessScreen({
  trek,
  batch,
  confetti,
}: { trek: Trek; batch: Batch; confetti: boolean }) {
  const NEXT_STEPS = [
    "Upload your Aadhaar to your dashboard",
    "Receive trek briefing document via email",
    "Join the WhatsApp group for your batch",
    "Download the offline trail map",
    "Check packing list and begin preparation",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-10"
      data-ocid="book.success_state"
    >
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 30 }, (_, idx) => idx).map((petIdx) => (
            <motion.div
              key={`petal-${petIdx + 1}`}
              initial={{
                y: -20,
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 800),
                opacity: 1,
              }}
              animate={{
                y:
                  (typeof window !== "undefined" ? window.innerHeight : 600) +
                  20,
                rotate: Math.random() * 720,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                background:
                  petIdx % 3 === 0
                    ? "#E8541A"
                    : petIdx % 3 === 1
                      ? "#1A2A1E"
                      : "#D4A843",
              }}
            />
          ))}
        </div>
      )}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{
          background: "rgba(232,84,26,0.2)",
          border: "3px solid #E8541A",
        }}
      >
        <Check size={40} style={{ color: "#E8541A" }} />
      </div>
      <h2 className="font-display text-4xl mb-3" style={{ color: "#1A2A1E" }}>
        Booking Confirmed!
      </h2>
      <p className="text-lg mb-2" style={{ color: "#4A5E52" }}>
        You're going on {trek.name}! 🏔
      </p>
      <p className="text-sm mb-8" style={{ color: "#4A5E52" }}>
        Batch starts {formatDate(batch.startDate)} · Guide: {batch.guideName}
      </p>
      <div
        className="p-5 rounded-xl text-left max-w-md mx-auto mb-8"
        style={{
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(232,84,26,0.25)",
        }}
      >
        <h3 className="font-display text-lg mb-4" style={{ color: "#1A2A1E" }}>
          Next Steps
        </h3>
        {NEXT_STEPS.map((s, stepIdx) => (
          <div key={s} className="flex items-start gap-3 mb-3 text-sm">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: "rgba(232,84,26,0.2)",
                border: "1px solid #E8541A",
              }}
            >
              <span style={{ color: "#E8541A", fontSize: 11 }}>
                {stepIdx + 1}
              </span>
            </div>
            <span style={{ color: "#4A5E52" }}>{s}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3 justify-center">
        <a
          href="/dashboard"
          className="px-6 py-3 rounded-xl text-sm font-semibold"
          style={{ background: "#E8541A", color: "#FFFFFF" }}
        >
          Go to Dashboard
        </a>
        <button
          type="button"
          className="px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
          style={{
            background: "rgba(232,84,26,0.15)",
            color: "#4A5E52",
            border: "1px solid rgba(232,84,26,0.3)",
          }}
        >
          <Share2 size={14} /> Share
        </button>
      </div>
    </motion.div>
  );
}

function Step4ReviewPay({
  trek,
  batch,
  travelers,
  selectedAddOns,
  trekkerCount,
  batchDays,
  onBack,
  onGoToStep,
}: {
  trek: Trek;
  batch: Batch;
  travelers: TravelerFormData[];
  selectedAddOns: string[];
  trekkerCount: number;
  batchDays: number;
  onBack: () => void;
  onGoToStep: (s: 1 | 2 | 3 | 4) => void;
}) {
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [payMode, setPayMode] = useState<"full" | "partial" | "emi3" | "emi6">(
    "full",
  );
  const [whatsapp, setWhatsapp] = useState(true);
  const [gcal, setGcal] = useState(false);
  const [paid, setPaid] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const createBooking = useCreateBooking();

  const perPersonIds = ["porter", "meal_upgrade", "private_tent", "insurance"];
  const baseTotal = trek.basePrice * trekkerCount;
  const addOnTotal = ADD_ONS.filter((a) =>
    selectedAddOns.includes(a.id),
  ).reduce(
    (sum, a) =>
      sum +
      (a.perDay ? a.price * batchDays : a.price) *
        (perPersonIds.includes(a.id) ? trekkerCount : 1),
    0,
  );
  const subtotal = baseTotal + addOnTotal;
  const discount = couponApplied ? Math.round(subtotal * 0.05) : 0;
  const fullDiscount = Math.round(subtotal * 0.05);
  const totalFull = subtotal - fullDiscount;
  const totalNormal = subtotal - discount;

  const payAmounts = useMemo(
    () => ({
      full: totalFull,
      partial: 2000 * trekkerCount,
      emi3: Math.ceil(totalNormal / 3),
      emi6: Math.ceil(totalNormal / 6),
    }),
    [totalFull, trekkerCount, totalNormal],
  );

  const handlePay = useCallback(async () => {
    setPayError(null);
    try {
      const backendAddOns: AddOn[] = ADD_ONS.filter((a) =>
        selectedAddOns.includes(a.id),
      ).map((a) => ({
        name: a.name,
        pricePerPerson: BigInt(a.perDay ? a.price * batchDays : a.price),
      }));

      const backendTravelers = travelers.map((t) => ({
        name: t.name || "Unnamed",
        age: BigInt(Number(t.age) || 18),
        gender: t.gender,
        emergencyContact: t.emergencyContact,
        medicalConditions: t.medicalConditions,
        tshirtSize: t.tshirtSize,
        mealPreference: (t.mealPreference === "veg"
          ? "Veg"
          : "NonVeg") as MealPreference,
      }));

      const totalAmount = BigInt(Math.round(totalFull));
      const result = await createBooking.mutateAsync({
        trekSlug: trek.slug,
        batchId: BigInt(batch.id),
        travelers: backendTravelers,
        addOns: backendAddOns,
        totalAmount,
      });

      if (
        result &&
        "checkoutUrl" in result &&
        typeof result.checkoutUrl === "string"
      ) {
        window.location.href = result.checkoutUrl;
      } else {
        setPaid(true);
        setConfetti(true);
      }
    } catch (err) {
      setPayError(
        err instanceof Error
          ? err.message
          : "Payment failed. Please try again.",
      );
    }
  }, [
    createBooking,
    batch,
    batchDays,
    travelers,
    selectedAddOns,
    totalFull,
    trek.slug,
  ]);

  if (paid)
    return <SuccessScreen trek={trek} batch={batch} confetti={confetti} />;

  return (
    <div>
      <h2 className="font-display text-3xl mb-2" style={{ color: "#1A2A1E" }}>
        Review & Pay
      </h2>
      <p className="mb-6 text-sm" style={{ color: "#4A5E52" }}>
        Almost there! Review your booking before payment.
      </p>
      <div
        className="p-5 rounded-xl mb-5"
        style={{
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(232,84,26,0.25)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg" style={{ color: "#1A2A1E" }}>
            Booking Summary
          </h3>
          <button
            type="button"
            onClick={() => onGoToStep(1)}
            className="text-xs underline"
            style={{ color: "#E8541A" }}
          >
            Edit batch
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div style={{ color: "#4A5E52" }}>Trek</div>
          <div style={{ color: "#1A2A1E", fontWeight: 600 }}>{trek.name}</div>
          <div style={{ color: "#4A5E52" }}>Batch Date</div>
          <div style={{ color: "#1A2A1E" }}>{formatDate(batch.startDate)}</div>
          <div style={{ color: "#4A5E52" }}>Guide</div>
          <div style={{ color: "#1A2A1E" }}>{batch.guideName}</div>
          <div style={{ color: "#4A5E52" }}>Trekkers</div>
          <div style={{ color: "#1A2A1E" }}>{trekkerCount}</div>
        </div>
      </div>
      <div
        className="p-5 rounded-xl mb-5"
        style={{
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(232,84,26,0.25)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg" style={{ color: "#1A2A1E" }}>
            Travelers
          </h3>
          <button
            type="button"
            onClick={() => onGoToStep(2)}
            className="text-xs underline"
            style={{ color: "#E8541A" }}
          >
            Edit
          </button>
        </div>
        {travelers.map((t, i) => (
          <div
            key={`ts-${i}-${travelers[i]?.name || i}`}
            className="flex items-center gap-3 py-2 text-sm border-b last:border-0"
            style={{ borderColor: "rgba(232,84,26,0.15)" }}
          >
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
              style={{ background: "#E8541A", color: "#FFFFFF" }}
            >
              {i + 1}
            </span>
            <span style={{ color: "#1A2A1E" }}>
              {t.name || `Traveler ${i + 1}`}
            </span>
            <span style={{ color: "#4A5E52" }}>Age {t.age}</span>
            <span style={{ color: "#4A5E52" }}>
              {t.mealPreference === "veg" ? "🥗 Veg" : "🍗 Non-veg"}
            </span>
          </div>
        ))}
      </div>
      {selectedAddOns.length > 0 && (
        <div
          className="p-5 rounded-xl mb-5"
          style={{
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(232,84,26,0.25)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-lg" style={{ color: "#1A2A1E" }}>
              Add-ons
            </h3>
            <button
              type="button"
              onClick={() => onGoToStep(3)}
              className="text-xs underline"
              style={{ color: "#E8541A" }}
            >
              Edit
            </button>
          </div>
          {ADD_ONS.filter((a) => selectedAddOns.includes(a.id)).map((a) => (
            <div
              key={a.id}
              className="flex justify-between text-sm py-1.5"
              style={{ color: "#4A5E52" }}
            >
              <span>{a.name}</span>
              <span style={{ color: "#1A2A1E" }}>
                ₹
                {(a.perDay ? a.price * batchDays : a.price).toLocaleString(
                  "en-IN",
                )}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="mb-5">
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-lg text-sm border outline-none"
            style={{
              borderColor: "rgba(232,84,26,0.4)",
              color: "#1A2A1E",
              background: "rgba(255,255,255,0.8)",
            }}
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Have a coupon code?"
            data-ocid="book.coupon_input"
          />
          <button
            type="button"
            onClick={() => {
              if (coupon.toLowerCase() === "shail10") setCouponApplied(true);
            }}
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{
              background: "rgba(232,84,26,0.3)",
              color: "#1A2A1E",
              border: "1px solid rgba(232,84,26,0.4)",
            }}
          >
            Apply
          </button>
        </div>
        {couponApplied && (
          <p className="text-xs mt-1" style={{ color: "#4ade80" }}>
            ✓ Coupon SHAIL10 applied — 5% off!
          </p>
        )}
      </div>
      <div className="mb-6">
        <h3 className="font-display text-lg mb-3" style={{ color: "#1A2A1E" }}>
          Choose Payment Plan
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              {
                id: "full",
                label: "Pay Full",
                sub: `Save ₹${fullDiscount.toLocaleString("en-IN")} (5%)`,
                amount: totalFull,
              },
              {
                id: "partial",
                label: "Pay ₹2,000 Now",
                sub: "Balance due 7 days before trek",
                amount: 2000 * trekkerCount,
              },
              {
                id: "emi3",
                label: "EMI — 3 Months",
                sub: "via Razorpay",
                amount: payAmounts.emi3,
              },
              {
                id: "emi6",
                label: "EMI — 6 Months",
                sub: "via Razorpay",
                amount: payAmounts.emi6,
              },
            ] as const
          ).map((pm) => (
            <button
              key={pm.id}
              type="button"
              onClick={() => setPayMode(pm.id as typeof payMode)}
              data-ocid={`book.payment_mode.${pm.id}`}
              className="p-4 rounded-xl text-left transition-all duration-200"
              style={{
                background:
                  payMode === pm.id
                    ? "rgba(232,84,26,0.2)"
                    : "rgba(255,255,255,0.9)",
                border:
                  payMode === pm.id
                    ? "2px solid #E8541A"
                    : "2px solid rgba(232,84,26,0.2)",
              }}
            >
              <div
                className="font-semibold text-sm mb-0.5"
                style={{ color: "#1A2A1E" }}
              >
                {pm.label}
              </div>
              <div className="text-xs mb-1" style={{ color: "#4A5E52" }}>
                {pm.sub}
              </div>
              <div
                className="font-display text-base"
                style={{ color: "#D4A843" }}
              >
                ₹{pm.amount.toLocaleString("en-IN")}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 accent-[#E8541A]"
          />
          <span className="text-sm" style={{ color: "#4A5E52" }}>
            I agree to the Terms & Conditions and Cancellation Policy
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={whatsapp}
            onChange={(e) => setWhatsapp(e.target.checked)}
            className="w-4 h-4 accent-[#E8541A]"
          />
          <span className="text-sm" style={{ color: "#4A5E52" }}>
            📱 Send booking confirmation on WhatsApp
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={gcal}
            onChange={(e) => setGcal(e.target.checked)}
            className="w-4 h-4 accent-[#E8541A]"
          />
          <span className="text-sm" style={{ color: "#4A5E52" }}>
            📅 Add trek dates to Google Calendar
          </span>
        </label>
      </div>
      {payError && (
        <div
          className="mb-4 p-3 rounded-lg text-sm"
          style={{
            background: "rgba(232,84,26,0.15)",
            color: "#E8541A",
            border: "1px solid rgba(232,84,26,0.3)",
          }}
        >
          {payError}
        </div>
      )}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          style={{
            background: "rgba(232,84,26,0.15)",
            color: "#4A5E52",
            border: "1px solid rgba(232,84,26,0.3)",
          }}
        >
          <ChevronLeft size={16} /> Back
        </button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePay}
          disabled={!termsAccepted || createBooking.isPending}
          data-ocid="book.pay_button"
          className="px-10 py-3 rounded-xl font-semibold text-base flex items-center gap-2"
          style={{
            background:
              termsAccepted && !createBooking.isPending
                ? "#E8541A"
                : "rgba(232,84,26,0.3)",
            color: "#1A2A1E",
            boxShadow:
              termsAccepted && !createBooking.isPending
                ? "0 4px 20px rgba(232,84,26,0.4)"
                : "none",
            cursor:
              termsAccepted && !createBooking.isPending
                ? "pointer"
                : "not-allowed",
          }}
        >
          <CreditCard size={18} />
          {createBooking.isPending
            ? "Redirecting to Stripe..."
            : `Pay ₹${payAmounts[payMode].toLocaleString("en-IN")}`}
        </motion.button>
      </div>
    </div>
  );
}

export default function BookPage() {
  const { slug } = useParams({ from: "/book/$slug" });
  const trek = TREKS.find((t) => t.slug === slug) ?? TREKS[0];
  const { data: remoteBatches } = useBatchesByTrek(slug || "");

  const batches: Batch[] =
    remoteBatches && remoteBatches.length > 0
      ? remoteBatches.map((b) => ({
          id: String(b.id),
          trekSlug: b.trekSlug,
          startDate: b.startDate,
          endDate: b.endDate,
          seatsTotal: Number(b.totalSeats),
          seatsBooked: Number(b.bookedSeats),
          price: Number(b.pricePerPerson),
          guideName: "Guide",
          guideId: b.guideId,
          status: mapBatchStatus(b.status),
        }))
      : FALLBACK_BATCHES.map((b) => ({
          ...b,
          trekSlug: slug || "",
          price: trek.basePrice,
        }));

  const batchDays = trek.durationDays;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [trekkerCount, setTrekkerCount] = useState(1);
  const [travelers, setTravelers] = useState<TravelerFormData[]>([
    defaultTraveler(),
  ]);
  const [lead, setLead] = useState<LeadContactData>({
    phone: "",
    email: "",
    city: "",
    source: "",
  });
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const handleCountChange = (n: number) => {
    setTrekkerCount(n);
    setTravelers((prev) =>
      Array.from({ length: n }, (_, i) => prev[i] ?? defaultTraveler()),
    );
  };

  const handleTravelerChange = (
    idx: number,
    field: keyof TravelerFormData,
    val: string | boolean,
  ) => {
    setTravelers((prev) =>
      prev.map((t, i) => (i === idx ? { ...t, [field]: val } : t)),
    );
  };

  const handleLeadChange = (field: keyof LeadContactData, val: string) => {
    setLead((prev) => ({ ...prev, [field]: val }));
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const baseTotal = trek.basePrice * trekkerCount;

  return (
    <div className="min-h-screen" style={{ background: "#EDF7F2" }}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={trek.heroImage}
          alt={trek.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.95))",
          }}
        />
        <div className="absolute inset-0 flex items-end px-6 pb-6">
          <div>
            <p className="text-xs mb-1" style={{ color: "#4A5E52" }}>
              Booking for
            </p>
            <h1 className="font-display text-3xl" style={{ color: "#1A2A1E" }}>
              {trek.name}
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#4A5E52" }}>
              {trek.durationDays} Days · {trek.difficulty} · ₹
              {trek.basePrice.toLocaleString("en-IN")} per person
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <StepIndicator current={step} />
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && (
              <Step1BatchSelector
                trek={trek}
                batches={batches}
                selected={selectedBatch}
                onSelect={setSelectedBatch}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step2TravelerDetails
                trek={trek}
                travelers={travelers}
                lead={lead}
                trekkerCount={trekkerCount}
                onTravelerChange={handleTravelerChange}
                onLeadChange={handleLeadChange}
                onCountChange={handleCountChange}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <Step3AddOns
                selectedAddOns={selectedAddOns}
                trekkerCount={trekkerCount}
                batchDays={batchDays}
                onToggle={toggleAddOn}
                totalBase={baseTotal}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && selectedBatch && (
              <Step4ReviewPay
                trek={trek}
                batch={selectedBatch}
                travelers={travelers}
                selectedAddOns={selectedAddOns}
                trekkerCount={trekkerCount}
                batchDays={batchDays}
                onBack={() => setStep(3)}
                onGoToStep={setStep}
              />
            )}
            {step === 4 && !selectedBatch && (
              <div className="text-center py-12">
                <p style={{ color: "#4A5E52" }}>
                  Please go back and select a batch first.
                </p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-4 px-6 py-2 rounded-xl text-sm"
                  style={{ background: "#E8541A", color: "#FFFFFF" }}
                >
                  Select Batch
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
