import type { Yatra } from "@/types";
import { useState } from "react";
import YatraAccommodationTab from "./YatraAccommodationTab";
import YatraDarshanTab from "./YatraDarshanTab";
import YatraHelicopterTab from "./YatraHelicopterTab";
import YatraSpiritualTab from "./YatraSpiritualTab";

type TabId =
  | "overview"
  | "itinerary"
  | "inclusions"
  | "pricing"
  | "photos"
  | "spiritual"
  | "helicopter"
  | "accommodation"
  | "darshan"
  | "reviews"
  | "faqs"
  | "permits";

interface Tab {
  id: TabId;
  label: string;
  heliOnly?: boolean;
}

const ALL_TABS: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "pricing", label: "Batch & Pricing" },
  { id: "photos", label: "Photos" },
  { id: "spiritual", label: "Spiritual Significance" },
  { id: "helicopter", label: "Helicopter Options", heliOnly: true },
  { id: "accommodation", label: "Accommodation" },
  { id: "darshan", label: "Darshan Timings" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
  { id: "permits", label: "Permits" },
];

const YATRA_ITINERARIES: Record<
  string,
  {
    day: number;
    title: string;
    locations: string;
    driving: string;
    hotel: string;
    description: string;
  }[]
> = {
  "chardham-yatra": [
    {
      day: 1,
      title: "Arrival in Haridwar",
      locations: "Haridwar",
      driving: "—",
      hotel: "Hotel in Haridwar",
      description:
        "Arrive at Haridwar, check in and attend the mesmerizing Ganga Aarti at Har Ki Pauri. Meet your Shail Hikers guide for trek briefing. Overnight at hotel.",
    },
    {
      day: 2,
      title: "Haridwar → Barkot (Yamunotri base)",
      locations: "Haridwar → Barkot (220 km)",
      driving: "7 hrs",
      hotel: "Hotel in Barkot",
      description:
        "Early morning drive through Mussoorie and Naugaon to Barkot, the base village for Yamunotri. En route visit Kempty Falls. Evening preparation for next day's trek.",
    },
    {
      day: 3,
      title: "Yamunotri Trek & Darshan",
      locations: "Barkot → Janki Chatti → Yamunotri → Barkot",
      driving: "30 km drive + 6 km trek",
      hotel: "Hotel in Barkot",
      description:
        "Drive to Janki Chatti (30 km) then trek 6 km to Yamunotri temple (3,291 m). Cook rice/potatoes in Surya Kund hot spring as prasad. Darshan at Goddess Yamuna's shrine. Return to Barkot.",
    },
    {
      day: 4,
      title: "Barkot → Uttarkashi (Gangotri base)",
      locations: "Barkot → Uttarkashi (100 km)",
      driving: "4 hrs",
      hotel: "Hotel in Uttarkashi",
      description:
        "Drive along the Bhagirathi valley to Uttarkashi, the 'Kashi of the Himalayas.' Visit Vishwanath temple in the evening. Uttarkashi is the last major town before Gangotri.",
    },
    {
      day: 5,
      title: "Gangotri Darshan",
      locations: "Uttarkashi → Gangotri → Uttarkashi (100 km)",
      driving: "5 hrs round trip",
      hotel: "Hotel in Uttarkashi",
      description:
        "Drive to Gangotri (3,048 m), origin of the sacred Bhagirathi river. Attend sunrise aarti, perform Ganga puja, and take darshan at the Goddess Ganga temple. Return to Uttarkashi.",
    },
    {
      day: 6,
      title: "Uttarkashi → Guptkashi",
      locations: "Uttarkashi → Guptkashi (220 km)",
      driving: "8 hrs",
      hotel: "Hotel in Guptkashi",
      description:
        "Long drive through spectacular mountain landscapes via Tehri and Rudraprayag to Guptkashi, the gateway to Kedarnath. Visit Ardhnareshwar temple in Guptkashi evening.",
    },
    {
      day: 7,
      title: "Kedarnath Trek & Darshan",
      locations: "Guptkashi → Gaurikund → Kedarnath",
      driving: "30 km + 16 km trek",
      hotel: "Camp at Kedarnath base",
      description:
        "Drive to Gaurikund, then trek or helicopter to Kedarnath (3,584 m). Attend evening Bhog Aarti at the Jyotirlinga temple. Overnight at Kedarnath base camp.",
    },
    {
      day: 8,
      title: "Kedarnath → Badrinath",
      locations: "Kedarnath → Gaurikund → Badrinath (220 km)",
      driving: "Trek + 8 hr drive",
      hotel: "Hotel in Badrinath",
      description:
        "Early morning Abhishek darshan at Kedarnath (4 AM). Descend to Gaurikund, then drive via Rudraprayag and Joshimath to Badrinath. Evening aarti at Badrinath temple.",
    },
    {
      day: 9,
      title: "Badrinath Darshan",
      locations: "Badrinath (3,133 m)",
      driving: "Local sightseeing",
      hotel: "Hotel in Badrinath",
      description:
        "Pre-dawn Mahabhishek puja (book in advance). Darshan at Badrinarayan temple. Visit Tapt Kund, Brahma Kapal, Mana village (last village before Tibet border), Vasudhara Falls, Bheem Pul.",
    },
    {
      day: 10,
      title: "Badrinath → Rudraprayag",
      locations: "Badrinath → Rudraprayag (160 km)",
      driving: "6 hrs",
      hotel: "Hotel in Rudraprayag",
      description:
        "Descend from Badrinath. Visit Joshimath and the 1,200-year-old Adi Shankaracharya-established Narsingh temple en route. Overnight at the sacred Rudraprayag confluence.",
    },
    {
      day: 11,
      title: "Rudraprayag → Haridwar → Departure",
      locations: "Rudraprayag → Haridwar (170 km)",
      driving: "6 hrs",
      hotel: "Drop at Haridwar",
      description:
        "Drive back to Haridwar with stops at Devprayag (Bhagirathi + Alakananda confluence) for a final Ganga dip. Arrive Haridwar for onward journey. Yatra complete.",
    },
  ],
  "do-dham-yatra": [
    {
      day: 1,
      title: "Arrival in Haridwar",
      locations: "Haridwar",
      driving: "—",
      hotel: "Hotel in Haridwar",
      description:
        "Arrive Haridwar, attend Ganga Aarti at Har Ki Pauri. Meet guide for yatra briefing. Dinner included.",
    },
    {
      day: 2,
      title: "Haridwar → Guptkashi",
      locations: "Haridwar → Guptkashi (240 km)",
      driving: "9 hrs",
      hotel: "Hotel in Guptkashi",
      description:
        "Drive via Rishikesh, Devprayag, Rudraprayag to Guptkashi. Stop at Devprayag to witness the sacred confluence. Evening visit to Ardhnareshwar temple.",
    },
    {
      day: 3,
      title: "Kedarnath Trek & Darshan",
      locations: "Guptkashi → Gaurikund → Kedarnath",
      driving: "30 km + 16 km trek or 12 min heli",
      hotel: "Camp/guesthouse at Kedarnath",
      description:
        "Pre-dawn start to Gaurikund. Trek or helicopter to Kedarnath. Evening Bhog Aarti at the Jyotirlinga.",
    },
    {
      day: 4,
      title: "Kedarnath → Badrinath",
      locations: "Kedarnath → Badrinath (220 km)",
      driving: "Trek + 8 hrs",
      hotel: "Hotel in Badrinath",
      description:
        "Early 4 AM Abhishek darshan. Descend and drive via Rudraprayag, Nandprayag, Joshimath to Badrinath. Evening darshan at Badrinarayan.",
    },
    {
      day: 5,
      title: "Badrinath Darshan",
      locations: "Badrinath",
      driving: "Local",
      hotel: "Hotel in Badrinath",
      description:
        "Morning Mahabhishek puja (pre-booked). Full day at Badrinath — Tapt Kund, Brahma Kapal, Mana village, Vasudhara Falls. Evening Shayan Aarti.",
    },
    {
      day: 6,
      title: "Badrinath → Rudraprayag",
      locations: "Badrinath → Rudraprayag (160 km)",
      driving: "6 hrs",
      hotel: "Hotel in Rudraprayag",
      description:
        "Descend through Joshimath and Chamoli. Visit Karnprayag and Rudraprayag confluences.",
    },
    {
      day: 7,
      title: "Rudraprayag → Haridwar → Departure",
      locations: "Rudraprayag → Haridwar (170 km)",
      driving: "6 hrs",
      hotel: "Drop at Haridwar",
      description:
        "Final drive back. Stop at Devprayag for darshan. Arrive Haridwar for onward journey.",
    },
  ],
  "rishikesh-tour": [
    {
      day: 1,
      title: "Arrival in Dehradun → Rishikesh",
      locations: "Dehradun → Rishikesh (45 km)",
      driving: "1.5 hrs",
      hotel: "Hotel in Rishikesh",
      description:
        "Pickup from Dehradun, transfer to Rishikesh. Check in, evening walk along the ghats. Attend Parmarth Niketan Ganga Aarti at sunset. Dinner by the Ganga.",
    },
    {
      day: 2,
      title: "Rishikesh Deep Dive",
      locations: "Rishikesh (local)",
      driving: "—",
      hotel: "Hotel in Rishikesh",
      description:
        "Morning yoga session at an ashram (6–7 AM). Breakfast. Visit Triveni Ghat, Lakshman Jhula, Ram Jhula. Explore Beatles Ashram ruins. Optional: white-water rafting (Grade I–IV, ₹800–1,500 extra). Evening aarti.",
    },
    {
      day: 3,
      title: "Neelkanth Mahadev + Adventure",
      locations: "Rishikesh → Neelkanth Mahadev (32 km)",
      driving: "1.5 hrs",
      hotel: "Hotel in Rishikesh",
      description:
        "Morning trek or drive to Neelkanth Mahadev temple (1,330 m). Darshan and return by noon. Afternoon: bungee jumping, cliff jumping, or zip-lining (optional, extra cost). Evening meditation at Sivananda Ashram.",
    },
    {
      day: 4,
      title: "Rishikesh → Dehradun (Departure)",
      locations: "Rishikesh → Dehradun (45 km)",
      driving: "1.5 hrs",
      hotel: "Drop at Dehradun",
      description:
        "Morning at leisure — final Ganga dip at Triveni Ghat for blessings. Transfer to Dehradun. Tour complete.",
    },
  ],
  "mussoorie-tour": [
    {
      day: 1,
      title: "Dehradun → Mussoorie",
      locations: "Dehradun → Mussoorie (35 km)",
      driving: "1.5 hrs",
      hotel: "Hotel in Mussoorie",
      description:
        "Pickup from Dehradun, scenic drive up to Mussoorie. Check in, walk on Mall Road, visit Camel's Back Road. Dinner and evening stroll. Views of Doon Valley lit up at night.",
    },
    {
      day: 2,
      title: "Mussoorie Full Day Exploration",
      locations: "Mussoorie (local)",
      driving: "—",
      hotel: "Hotel in Mussoorie",
      description:
        "Morning visit to Lal Tibba (highest point, Himalayan panorama). Kempty Falls for a refreshing stop. Gun Hill via ropeway. Company Garden. Evening shopping on Mall Road.",
    },
    {
      day: 3,
      title: "Surkanda Devi + Departure",
      locations: "Mussoorie → Surkanda Devi (35 km) → Dehradun",
      driving: "1.5 hrs + 2 hrs",
      hotel: "Drop at Dehradun",
      description:
        "Morning drive to Surkanda Devi temple (2.5 km trek or ropeway). Darshan at the Shakti Peetha, panoramic Himalayan views. Return to Dehradun for departure.",
    },
  ],
};

const YATRA_INCLUSIONS: Record<
  string,
  { inclusions: string[]; exclusions: string[] }
> = {
  default: {
    inclusions: [
      "AC vehicle transport for entire route (sedan/SUV for groups up to 6)",
      "All accommodation as per selected tier (breakfast + dinner)",
      "Experienced yatra guide — GMVN-certified, fluent in Hindi and English",
      "All forest/shrine entry permits and registration fees",
      "High-altitude medical kit + pulse oximeter",
      "First aid kit and basic medications (AMS, altitude sickness)",
      "All government registration and biometric fees (Kedarnath/Chardham)",
      "24/7 emergency support line — Shail Hikers operations center",
      "Gratitude certificate + digital photo album",
    ],
    exclusions: [
      "Helicopter to Kedarnath (available as paid add-on)",
      "Personal travel insurance (strongly recommended)",
      "Pony/palanquin to Kedarnath (₹1,500–₹3,000 extra, pay locally)",
      "Special pujas: Abhishek, Rudrabhishek, Mahabhishek (payable at temple)",
      "Meals not specified in itinerary (Day 1 lunch, last day lunch)",
      "Personal expenses: laundry, telephone, tips",
      "Porter charges for personal luggage (₹800/day)",
      "Any extra nights due to weather or personal reasons",
      "Rafting, bungee, or other adventure activities (pay locally)",
    ],
  },
};

const YATRA_FAQS: Record<string, { q: string; a: string; cat: string }[]> = {
  default: [
    {
      cat: "Logistics",
      q: "What is the best time to do Chardham Yatra?",
      a: "May to June and September to October are ideal. The shrines open in April/May and close in November. Avoid peak June (very crowded), and July–August (monsoon landslides). September is the sweet spot: clear weather, shorter queues, lush post-monsoon landscapes.",
    },
    {
      cat: "Logistics",
      q: "Is government registration mandatory for Chardham Yatra?",
      a: "Yes, since 2022. You must register on the official Chardham Devasthanam portal for Kedarnath and Badrinath. Registration is free and can be done online or at Haridwar/Rishikesh registration booths. Shail Hikers handles this for all guests.",
    },
    {
      cat: "Fitness",
      q: "How fit do I need to be for Chardham Yatra?",
      a: "Moderately fit. The main challenge is the 16 km Kedarnath trek (6–8 hrs). All other dhams are accessible by vehicle (Gangotri, Yamunotri base). If you cannot walk 16 km, the helicopter (₹4,999+) or ponies/palanquins are excellent alternatives. For Yamunotri, it's a 6 km trek with no shortcuts.",
    },
    {
      cat: "Fitness",
      q: "Can elderly or senior citizens do the yatra?",
      a: "Yes, with planning. Yamunotri: palanquin available. Kedarnath: helicopter or pony recommended. Gangotri and Badrinath are driveable to the temple gate. Medical fitness clearance is recommended for those above 65 or with heart/lung conditions. Consult your doctor before booking.",
    },
    {
      cat: "Gear",
      q: "What should I wear for the yatra?",
      a: "Layered clothing is essential. Even in May–June, nights at Kedarnath/Badrinath drop to 5–10°C. Must-carry: warm fleece, waterproof jacket, warm trekking shoes (for Kedarnath/Yamunotri), rain poncho. Traditional attire (saree/dhoti) for temple entry is culturally respectful but not mandatory.",
    },
    {
      cat: "Gear",
      q: "Are ATMs available along the Chardham route?",
      a: "ATMs exist in Barkot, Uttarkashi, Guptkashi, Joshimath, and Badrinath. They are frequently out of cash in peak season. Carry sufficient cash (₹5,000–₹10,000) from Haridwar/Rishikesh. Most dhabas and small shops don't accept UPI above ₹1,000 in remote areas.",
    },
    {
      cat: "Safety",
      q: "Is the Chardham Yatra safe?",
      a: "Yes, when done with a reliable operator. Roads have improved significantly post-2013. Shail Hikers monitors weather forecasts daily, avoids known landslide-prone timings, and has 24/7 emergency contacts. We have completed 200+ Chardham batches with zero major incidents.",
    },
    {
      cat: "Safety",
      q: "What happens if a shrine closes due to weather?",
      a: "We have contingency plans for all weather events. If a shrine is temporarily closed, we wait at the nearest safe guesthouse. If the closure extends beyond 24 hours, we adjust the itinerary. For complete cancellations due to calamities, full refund is processed within 7 business days.",
    },
    {
      cat: "Booking",
      q: "How far in advance should I book Chardham Yatra?",
      a: "For May–June departures: book by February at latest. Premium accommodation and helicopter slots fill up by March. September–October: book by July. Shail Hikers releases a limited number of April slots for VIP early-bird bookings with exclusive guide assignments.",
    },
    {
      cat: "Booking",
      q: "Can I customize the Chardham Yatra itinerary?",
      a: "Yes, for private batches. Add extra nights at any location, include specific pujas, upgrade accommodation, or add helicopter for select legs. Contact us for a custom quotation. Group customization available for 8+ people.",
    },
    {
      cat: "Logistics",
      q: "What is the pickup/drop point?",
      a: "Pickup from Haridwar ISBT or Rishikesh bus stand. If coming from Delhi, the Dehradun/Haridwar Shatabdi train is most convenient (5 hrs). Nearest airport: Dehradun Jolly Grant Airport (40 km from Haridwar). Shail Hikers can arrange Dehradun airport pickup at extra cost.",
    },
    {
      cat: "Fitness",
      q: "Can children do the Chardham Yatra?",
      a: "Yes, children 7+ can comfortably do Gangotri and Badrinath by vehicle. For Kedarnath, helicopter is recommended for children under 12. Yamunotri's 6 km trek is manageable for fit children 10+. Pony rides are available for younger children at both Yamunotri and Kedarnath.",
    },
    {
      cat: "Gear",
      q: "Do I need to carry food for the trek?",
      a: "No. Shail Hikers includes all meals in the package. However, carrying personal snacks (energy bars, dry fruits, chocolates) for the Kedarnath trek is recommended. Avoid heavy meals before the climb. Dhabas exist at checkpoints on the Kedarnath route.",
    },
    {
      cat: "Safety",
      q: "What altitude sickness precautions should I take?",
      a: "Kedarnath (3,584 m) and Badrinath (3,133 m) can cause mild altitude sickness. Symptoms: headache, nausea, dizziness. Our guides carry pulse oximeters and Diamox (acetazolamide) in the first aid kit. Acclimatization tips: hydrate well, no alcohol, ascend slowly, rest if symptomatic.",
    },
    {
      cat: "Booking",
      q: "What is the cancellation policy?",
      a: "Cancellation 30+ days before departure: 90% refund. 15–30 days: 50% refund. 7–15 days: 25% refund. Less than 7 days: no refund. For full details, see our Cancellation Policy page. We strongly recommend purchasing travel insurance at the time of booking.",
    },
  ],
};

const YATRA_REVIEWS = [
  {
    name: "Sunita Verma",
    city: "Jaipur",
    rating: 5,
    date: "October 2024",
    text: "Shail Hikers made our Chardham Yatra an experience of a lifetime. The organization was flawless — right from pickup at Haridwar to drop. Our guide Ramesh ji was not just a guide but a philosopher who explained the significance of each dham so beautifully that even my skeptical husband was moved to tears at Kedarnath.",
    yatra: "Chardham Yatra",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=60&q=80",
  },
  {
    name: "Dr. Rajesh Iyer",
    city: "Chennai",
    rating: 5,
    date: "June 2024",
    text: "As a 68-year-old with knee issues, I was worried about the Kedarnath climb. Shail Hikers arranged helicopter for us and even pre-booked the Mahabhishek puja at Badrinath which was the most spiritually profound experience of my life. They thought of everything.",
    yatra: "Do Dham Yatra",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80",
  },
  {
    name: "Ananya Krishnamurthy",
    city: "Hyderabad",
    rating: 5,
    date: "March 2024",
    text: "Rishikesh with Shail Hikers was magical. The sunrise aarti at Triveni Ghat and the Parmarth Niketan evening aarti were beyond words. Our guide knew every temple, every story. The whole family — from my 70-year-old mother to my 8-year-old son — had the time of their lives.",
    yatra: "Rishikesh Tour",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80",
  },
  {
    name: "Vikram & Priya Agarwal",
    city: "Lucknow",
    rating: 5,
    date: "May 2024",
    text: "Mussoorie weekend with Shail Hikers exceeded all expectations. The Surkanda Devi trek at sunrise, Camel's Back Road walk, and the cozy hotel they arranged — everything was perfect. Will definitely book the full Chardham Yatra next year with them.",
    yatra: "Mussoorie Tour",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80",
  },
  {
    name: "Meera Pillai",
    city: "Kochi",
    rating: 5,
    date: "September 2024",
    text: "September Chardham with Shail Hikers was ideal — minimal crowds, clear skies, and the most efficient transportation. They pre-booked our pujas everywhere and gave us detailed briefings before each dham. The food was home-style and delicious throughout. Highly recommend!",
    yatra: "Chardham Yatra",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=80",
  },
];

const YATRA_PERMITS: Record<
  string,
  { name: string; by: string; cost: string; handled: string; docs: string[] }[]
> = {
  "chardham-yatra": [
    {
      name: "Chardham Yatra Online Registration",
      by: "Uttarakhand Tourism Department",
      cost: "Free",
      handled: "Shail Hikers registers all guests online before departure",
      docs: ["Aadhaar card", "Mobile number", "Passport photo"],
    },
    {
      name: "Kedarnath Biometric Registration",
      by: "DSGMC / Kedarnath Devasthanam Board",
      cost: "Included",
      handled: "Done at Sonprayag check-post by our guide",
      docs: ["Original Aadhaar card (mandatory)"],
    },
    {
      name: "Badrinath Entry Registration",
      by: "BKTC (Badrinath-Kedarnath Temple Committee)",
      cost: "Included",
      handled: "Online pre-registration by Shail Hikers",
      docs: ["Aadhaar or Passport"],
    },
    {
      name: "Medical Fitness Certificate (Kedarnath on foot)",
      by: "State Medical Authority",
      cost: "₹50–₹100 at camps",
      handled: "Checked at Sonprayag; our guide advises on process",
      docs: ["Doctor certificate (obtainable at Sonprayag medical camp)"],
    },
  ],
  default: [
    {
      name: "Yatra Registration",
      by: "Uttarakhand Tourism Department",
      cost: "Free",
      handled: "Shail Hikers handles all registration",
      docs: ["Aadhaar card", "Mobile number"],
    },
    {
      name: "Photo ID at All Temples",
      by: "Temple Committee",
      cost: "Included",
      handled: "Carry original government ID throughout",
      docs: ["Aadhaar card or Passport (original)"],
    },
  ],
};

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
  "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=500&q=80",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80",
];

const PRICING_TIERS = [
  { group: "1 person", multiplier: 1.15 },
  { group: "2–4 persons", multiplier: 1 },
  { group: "5–8 persons", multiplier: 0.95 },
  { group: "9–15 persons", multiplier: 0.9 },
];

interface YatraTabsProps {
  yatra: Yatra;
}

export default function YatraTabs({ yatra }: YatraTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const tabs = ALL_TABS.filter((t) => !t.heliOnly || yatra.helicopterOption);
  const itinerary =
    YATRA_ITINERARIES[yatra.slug] ?? YATRA_ITINERARIES["rishikesh-tour"];
  const { inclusions, exclusions } = YATRA_INCLUSIONS.default;
  const faqs = YATRA_FAQS.default;
  const permits = YATRA_PERMITS[yatra.slug] ?? YATRA_PERMITS.default;

  return (
    <div>
      {/* Sticky Tab Bar */}
      <div
        className="sticky top-0 z-30 overflow-x-auto"
        style={{
          background: "#EDF7F2",
          borderBottom: "1px solid rgba(212,237,224,0.2)",
        }}
      >
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-ocid={`yatra.tab.${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors"
              style={{
                color: activeTab === tab.id ? "#1A2A1E" : "#4A5E52",
                borderBottom:
                  activeTab === tab.id
                    ? "2px solid #E8541A"
                    : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 max-w-5xl" style={{ minHeight: 400 }}>
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div
              style={{
                borderLeft: "4px solid #E8541A",
                paddingLeft: "1.25rem",
              }}
            >
              <p
                style={{
                  color: "#1A2A1E",
                  lineHeight: 1.85,
                  fontSize: "1.05rem",
                }}
              >
                {yatra.shortDescription}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#1A2A1E", fontFamily: "var(--font-display)" }}
              >
                Yatra Highlights
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    icon: "🛕",
                    title: "Sacred Darshan",
                    desc: "Direct temple access at all dhams",
                  },
                  {
                    icon: "🚐",
                    title: "AC Transport",
                    desc: "Comfortable vehicle throughout",
                  },
                  {
                    icon: "🏨",
                    title: "Quality Hotels",
                    desc: "Comfortable accommodation each night",
                  },
                  {
                    icon: "👨‍🍳",
                    title: "All Meals",
                    desc: "Breakfast & dinner included",
                  },
                  {
                    icon: "🧭",
                    title: "Expert Guide",
                    desc: "GMVN-certified spiritual guide",
                  },
                  {
                    icon: "📋",
                    title: "All Permits",
                    desc: "Registration handled for you",
                  },
                  {
                    icon: "🏥",
                    title: "Medical Kit",
                    desc: "Pulse oximeter & first aid",
                  },
                  {
                    icon: "📞",
                    title: "24/7 Support",
                    desc: "Emergency line always active",
                  },
                ].map((h) => (
                  <div
                    key={h.title}
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(212,237,224,0.04)",
                      border: "1px solid rgba(212,237,224,0.15)",
                    }}
                  >
                    <div className="text-2xl mb-2">{h.icon}</div>
                    <p
                      className="font-bold text-sm mb-1"
                      style={{ color: "#1A2A1E" }}
                    >
                      {h.title}
                    </p>
                    <p className="text-xs" style={{ color: "#4A5E52" }}>
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reference Table */}
            <div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#1A2A1E", fontFamily: "var(--font-display)" }}
              >
                Yatra At A Glance
              </h3>
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(212,237,224,0.2)" }}
              >
                {[
                  [
                    "Duration",
                    `${yatra.durationDays} Days / ${yatra.durationNights} Nights`,
                  ],
                  ["Best Time", yatra.bestTime],
                  ["Starting Point", yatra.startingPoint],
                  ["Difficulty", yatra.difficulty],
                  ["Vehicle", "AC Sedan/SUV (up to 6 persons per vehicle)"],
                  [
                    "Accommodation",
                    "Hotels (Standard/Deluxe as per selected tier)",
                  ],
                  ["Meals", "Breakfast + Dinner included daily"],
                  ["Guides", "GMVN-Certified Spiritual Guide (1 per group)"],
                  [
                    "Advance Registration",
                    yatra.requiresAdvanceRegistration
                      ? "Mandatory — handled by Shail Hikers"
                      : "Not required",
                  ],
                  [
                    "Helicopter Option",
                    yatra.helicopterOption
                      ? "Available as paid add-on"
                      : "Not applicable",
                  ],
                ].map(([label, value], i) => (
                  <div
                    key={label}
                    className="flex"
                    style={{
                      background:
                        i % 2 === 0 ? "rgba(212,237,224,0.03)" : "transparent",
                      borderTop:
                        i > 0 ? "1px solid rgba(212,237,224,0.1)" : undefined,
                    }}
                  >
                    <div
                      className="w-40 md:w-52 p-3 font-bold text-sm flex-shrink-0"
                      style={{ color: "#E8541A" }}
                    >
                      {label}
                    </div>
                    <div
                      className="flex-1 p-3 text-sm"
                      style={{ color: "#4A5E52" }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Senior Citizen Accessibility */}
            <div
              className="p-5 rounded-xl"
              style={{
                background: "rgba(168,197,218,0.08)",
                border: "1px solid rgba(168,197,218,0.25)",
              }}
            >
              <h4
                className="font-bold mb-2 flex items-center gap-2"
                style={{ color: "#2E7D4F" }}
              >
                ♿ Senior Citizen & Accessibility Information
              </h4>
              <p
                style={{
                  color: "#4A5E52",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                }}
              >
                Chardham Yatra is designed to be accessible to pilgrims of all
                ages. Gangotri and Badrinath temples are directly accessible by
                vehicle (walking distance &lt;500 m from parking). For
                Yamunotri, palanquin (doli) service is available for
                ₹2,000–₹4,000 return. For Kedarnath, helicopter is the preferred
                option for seniors. Our guides ensure a comfortable pace and
                carry portable oxygen canisters for high-altitude comfort.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {[
                  "Pony available at Kedarnath",
                  "Palanquin at Yamunotri",
                  "Helicopter option",
                  "Medical staff at camps",
                  "Gentle pace groups",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: "rgba(168,197,218,0.12)",
                      color: "#2E7D4F",
                      border: "1px solid rgba(168,197,218,0.3)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ITINERARY TAB */}
        {activeTab === "itinerary" && (
          <div className="space-y-4">
            <p className="mb-6" style={{ color: "#4A5E52" }}>
              Day-by-day journey across the sacred route.
            </p>
            {itinerary.map((day) => (
              <details
                key={day.day}
                className="group rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(212,237,224,0.2)" }}
              >
                <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                    style={{ background: "#E8541A", color: "#FFFFFF" }}
                  >
                    D{day.day}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold" style={{ color: "#1A2A1E" }}>
                      {day.title}
                    </p>
                    <p className="text-sm" style={{ color: "#4A5E52" }}>
                      {day.locations}
                    </p>
                  </div>
                  <span
                    className="text-xl transition-transform group-open:rotate-180 flex-shrink-0"
                    style={{ color: "#E8541A" }}
                  >
                    ›
                  </span>
                </summary>
                <div className="px-5 pb-5 space-y-4">
                  <div className="flex flex-wrap gap-4">
                    {day.driving !== "—" && (
                      <div
                        className="flex items-center gap-2"
                        style={{ color: "#4A5E52", fontSize: "0.875rem" }}
                      >
                        <span>🚐</span> {day.driving} drive
                      </div>
                    )}
                    <div
                      className="flex items-center gap-2"
                      style={{ color: "#4A5E52", fontSize: "0.875rem" }}
                    >
                      <span>🏨</span> {day.hotel}
                    </div>
                  </div>
                  <p style={{ color: "#4A5E52", lineHeight: 1.75 }}>
                    {day.description}
                  </p>
                </div>
              </details>
            ))}
          </div>
        )}

        {/* INCLUSIONS TAB */}
        {activeTab === "inclusions" && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: "#1A2A1E" }}
              >
                ✅ Inclusions
              </h3>
              <ul className="space-y-2">
                {inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{
                      background: "rgba(45,80,22,0.08)",
                      border: "1px solid rgba(45,80,22,0.25)",
                    }}
                  >
                    <span style={{ color: "#2E7D4F" }}>✓</span>
                    <span
                      style={{
                        color: "#4A5E52",
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: "#1A2A1E" }}
              >
                ❌ Exclusions
              </h3>
              <ul className="space-y-2">
                {exclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{
                      background: "rgba(232,84,26,0.06)",
                      border: "1px solid rgba(232,84,26,0.2)",
                    }}
                  >
                    <span style={{ color: "#E8541A" }}>✗</span>
                    <span
                      style={{
                        color: "#4A5E52",
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* PRICING TAB */}
        {activeTab === "pricing" && (
          <div className="space-y-8">
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(212,237,224,0.2)" }}
            >
              <div
                className="p-4"
                style={{ background: "rgba(232,84,26,0.15)" }}
              >
                <h3 className="font-bold" style={{ color: "#1A2A1E" }}>
                  Group Size Pricing
                </h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "rgba(212,237,224,0.04)" }}>
                    {["Group Size", "Price Per Person", "Discount"].map((h) => (
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
                  {PRICING_TIERS.map((tier, i) => (
                    <tr
                      key={tier.group}
                      style={{
                        borderTop: "1px solid rgba(212,237,224,0.1)",
                        background:
                          i % 2 === 0
                            ? "rgba(212,237,224,0.02)"
                            : "transparent",
                      }}
                    >
                      <td className="p-4" style={{ color: "#4A5E52" }}>
                        {tier.group}
                      </td>
                      <td
                        className="p-4 font-bold"
                        style={{ color: "#D4A843" }}
                      >
                        ₹
                        {Math.round(
                          yatra.basePrice * tier.multiplier,
                        ).toLocaleString("en-IN")}
                      </td>
                      <td
                        className="p-4 text-sm"
                        style={{
                          color:
                            tier.multiplier < 1
                              ? "#2E7D4F"
                              : tier.multiplier > 1
                                ? "#E8541A"
                                : "#4A5E52",
                        }}
                      >
                        {tier.multiplier < 1
                          ? `Save ${Math.round((1 - tier.multiplier) * 100)}%`
                          : tier.multiplier > 1
                            ? "+15% solo surcharge"
                            : "Base price"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  label: "Pay Full",
                  desc: "5% discount applied",
                  badge: "Best Value",
                  color: "#D4A843",
                },
                {
                  label: "Pay ₹5,000 Now",
                  desc: "Balance 14 days before",
                  badge: "Popular",
                  color: "#E8541A",
                },
                {
                  label: "EMI — 3 or 6 months",
                  desc: "Via Razorpay",
                  badge: "",
                  color: "#2E7D4F",
                },
              ].map((opt) => (
                <div
                  key={opt.label}
                  className="p-5 rounded-xl"
                  style={{
                    background: "rgba(212,237,224,0.04)",
                    border: "1px solid rgba(212,237,224,0.15)",
                  }}
                >
                  {opt.badge && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block"
                      style={{ background: opt.color, color: "#EDF7F2" }}
                    >
                      {opt.badge}
                    </span>
                  )}
                  <p className="font-bold" style={{ color: "#1A2A1E" }}>
                    {opt.label}
                  </p>
                  <p className="text-sm" style={{ color: "#4A5E52" }}>
                    {opt.desc}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="p-5 rounded-xl"
              style={{
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <p className="font-bold mb-1" style={{ color: "#D4A843" }}>
                Early Bird Discount
              </p>
              <p style={{ color: "#4A5E52", fontSize: "0.9rem" }}>
                Book 60 days ahead — save 10%. Refer a friend: both get ₹500
                off.
              </p>
            </div>
          </div>
        )}

        {/* PHOTOS TAB */}
        {activeTab === "photos" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {GALLERY_IMAGES.map((img, i) => (
                <div
                  key={img}
                  data-ocid={`yatra.photo.item.${i + 1}`}
                  className="rounded-xl overflow-hidden aspect-square"
                >
                  <img
                    src={img}
                    alt={`${yatra.name} scene ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPIRITUAL SIGNIFICANCE TAB */}
        {activeTab === "spiritual" && <YatraSpiritualTab yatra={yatra} />}

        {/* HELICOPTER OPTIONS TAB */}
        {activeTab === "helicopter" && <YatraHelicopterTab yatra={yatra} />}

        {/* ACCOMMODATION TAB */}
        {activeTab === "accommodation" && (
          <YatraAccommodationTab yatra={yatra} />
        )}

        {/* DARSHAN TIMINGS TAB */}
        {activeTab === "darshan" && <YatraDarshanTab yatra={yatra} />}

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="space-y-5">
            <div
              className="flex items-center gap-4 p-5 rounded-xl"
              style={{
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <div className="text-center">
                <p className="text-4xl font-bold" style={{ color: "#D4A843" }}>
                  4.9
                </p>
                <p className="text-xs" style={{ color: "#4A5E52" }}>
                  out of 5
                </p>
              </div>
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2 mb-1">
                    <span className="text-xs w-4" style={{ color: "#4A5E52" }}>
                      {star}★
                    </span>
                    <div
                      className="flex-1 h-2 rounded-full"
                      style={{ background: "rgba(212,237,224,0.2)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: star === 5 ? "85%" : star === 4 ? "12%" : "3%",
                          background: "#D4A843",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {YATRA_REVIEWS.map((review, i) => (
              <div
                key={review.name}
                data-ocid={`yatra.review.item.${i + 1}`}
                className="p-5 rounded-xl"
                style={{
                  border: "1px solid rgba(212,237,224,0.15)",
                  background: "rgba(212,237,224,0.03)",
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    style={{ border: "2px solid #4A5E52" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold" style={{ color: "#1A2A1E" }}>
                      {review.name}
                    </p>
                    <p className="text-xs" style={{ color: "#4A5E52" }}>
                      {review.city} · {review.date} · {review.yatra}
                    </p>
                  </div>
                  <span style={{ color: "#D4A843" }}>
                    {"★".repeat(review.rating)}
                  </span>
                </div>
                <p
                  style={{
                    color: "#4A5E52",
                    lineHeight: 1.7,
                    fontSize: "0.9rem",
                  }}
                >
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* FAQS TAB */}
        {activeTab === "faqs" && (
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(212,237,224,0.15)" }}
              >
                <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none">
                  <div className="flex items-start gap-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded mt-0.5 flex-shrink-0"
                      style={{
                        background: "rgba(232,84,26,0.2)",
                        color: "#E8541A",
                      }}
                    >
                      {faq.cat}
                    </span>
                    <span className="font-medium" style={{ color: "#1A2A1E" }}>
                      {faq.q}
                    </span>
                  </div>
                  <span
                    className="text-xl transition-transform group-open:rotate-180 flex-shrink-0 mt-0.5"
                    style={{ color: "#E8541A" }}
                  >
                    ›
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p style={{ color: "#4A5E52", lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        )}

        {/* PERMITS TAB */}
        {activeTab === "permits" && (
          <div className="space-y-4">
            {permits.map((permit) => (
              <div
                key={permit.name}
                className="p-5 rounded-xl"
                style={{
                  border: "1px solid rgba(212,237,224,0.15)",
                  background: "rgba(212,237,224,0.03)",
                }}
              >
                <h4 className="font-bold mb-3" style={{ color: "#1A2A1E" }}>
                  {permit.name}
                </h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span style={{ color: "#E8541A" }}>Issued by: </span>
                    <span style={{ color: "#4A5E52" }}>{permit.by}</span>
                  </div>
                  <div>
                    <span style={{ color: "#E8541A" }}>Cost: </span>
                    <span style={{ color: "#D4A843" }}>{permit.cost}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span style={{ color: "#E8541A" }}>How handled: </span>
                    <span style={{ color: "#4A5E52" }}>{permit.handled}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span style={{ color: "#E8541A" }}>Documents: </span>
                    <span style={{ color: "#4A5E52" }}>
                      {permit.docs.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="p-4 rounded-xl"
              style={{
                background: "rgba(168,197,218,0.06)",
                border: "1px solid rgba(168,197,218,0.2)",
              }}
            >
              <p className="font-bold mb-1" style={{ color: "#2E7D4F" }}>
                Upload Your Aadhaar
              </p>
              <p className="text-sm" style={{ color: "#4A5E52" }}>
                Upload your Aadhaar card in your dashboard before the yatra. Our
                team uses it for all permit and registration processing — saving
                you time at checkposts.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
