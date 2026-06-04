// ─── Core Backend Types ─────────────────────────────────────────────────────

export interface Trek {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  difficulty: "Easy" | "Moderate" | "Difficult" | "Extreme";
  maxAltitude: number; // in feet
  maxAltitudeM: number; // in meters
  trekDistance: number; // km
  durationDays: number;
  durationNights: number;
  bestTime: string;
  startingPoint: string;
  nearestRailhead: string;
  nearestAirport: string;
  basePrice: number; // INR
  region: string;
  shortDescription: string;
  relatedSlugs: string[];
  weatherNote: string;
  isFeatured?: boolean;
  seatsAvailable?: number;
  rating?: number;
  reviewCount?: number;
  completedThisMonth?: number;
  /** Trail route summary for agency-style cards */
  route: string;
  highlights: string[];
  inclusions: string[];
  groupType: string;
}

export interface Yatra {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  durationDays: number;
  durationNights: number;
  bestTime: string;
  startingPoint: string;
  basePrice: number;
  shortDescription: string;
  requiresAdvanceRegistration: boolean;
  helicopterOption: boolean;
  nextDeparture?: string;
  pilgrimage?: string;
  /** e.g. "Garhwal Himalayas, Uttarakhand" */
  region: string;
  rating: number;
  reviewCount: number;
  /** Key dhams / stops — standard agency card bullets */
  highlights: string[];
  /** Short inclusion labels for icon row */
  inclusions: string[];
  groupType: string;
  seatsAvailable?: number;
  /** One-line route summary */
  route: string;
}

export interface Batch {
  id: string;
  trekSlug: string;
  startDate: string;
  endDate: string;
  seatsTotal: number;
  seatsBooked: number;
  price: number;
  guideName: string;
  guideId: string;
  status: "open" | "filling_fast" | "full" | "cancelled" | "completed";
}

export interface TravelerInfo {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  emergencyContact: string;
  medicalConditions: string;
  tshirtSize: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  mealPreference: "veg" | "non-veg";
  isFirstHimalayanTrek: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  perPerson: boolean;
  unit?: string;
}

export interface Booking {
  id: string;
  userId: string;
  trekSlug: string;
  batchId: string;
  travelers: TravelerInfo[];
  addOns: string[];
  totalAmount: number;
  paidAmount: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  couponCode?: string;
  paymentMode: "full" | "partial" | "emi";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  dateOfBirth?: string;
  profilePhoto?: string;
  loyaltyTier: "Explorer" | "Trailblazer" | "Summit Master";
  treksCompleted: number;
  referralCode: string;
  referralCredit: number;
  notifications: {
    email: boolean;
    whatsapp: boolean;
    newBatches: boolean;
    offers: boolean;
    blog: boolean;
    weather: boolean;
  };
}

export interface Review {
  id: string;
  trekSlug: string;
  userId: string;
  userName: string;
  userCity: string;
  userPhoto?: string;
  trekDate: string;
  groupType: "solo" | "couple" | "friends" | "family" | "corporate";
  overallRating: number;
  categoryRatings: {
    guide: number;
    trail: number;
    food: number;
    camping: number;
    value: number;
    safety: number;
  };
  body: string;
  photos?: string[];
  helpfulCount: number;
  isVerified: boolean;
  response?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  category: "Trek Tips" | "Yatra Guides" | "Gear" | "Stories" | "News";
  author: string;
  publishedAt: string;
  readTime: number; // minutes
  views: number;
  tags: string[];
  relatedTreks: string[];
  content: string;
  isFeatured?: boolean;
  isTrending?: boolean;
}

// ─── Rich Frontend Types ─────────────────────────────────────────────────────

export interface ItineraryDay {
  dayNum: number;
  title: string;
  distance: number; // km
  walkingHours: number;
  altitudeStart: number; // ft
  altitudeEnd: number; // ft
  description: string;
  meals: { breakfast: string; lunch: string; dinner: string };
  proTip: string;
  photoSpot: string;
  trailTypes: string[];
  waypoints?: string[];
  campsiteInfo?: string;
  weatherNote?: string;
  difficultyPill?: "Easy" | "Moderate" | "Hard";
}

export interface GearItem {
  name: string;
  essential: boolean;
  weightNote?: string;
}

export interface RentalItem {
  name: string;
  pricePerDay: number;
}

export interface PermitInfo {
  name: string;
  issuedBy: string;
  cost: string;
  handledBy: string;
  documentsRequired: string[];
}

export interface Species {
  name: string;
  type: "flora" | "fauna";
  description: string;
}

export interface Attraction {
  name: string;
  distance: number; // km
  type: string;
  image: string;
}

export interface TrekData extends Trek {
  highlights: { icon: string; title: string; description: string }[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  faqs: { question: string; answer: string; category: string }[];
  gearList: {
    mandatory: GearItem[];
    recommended: GearItem[];
    rental: RentalItem[];
  };
  permits: PermitInfo[];
  flora: Species[];
  fauna: Species[];
  uniqueFeatures: { title: string; description: string }[];
  didYouKnow: string;
  nearestAttractions: Attraction[];
  fitnessLevel: number; // 0-10
  minAge: number;
  maxAge: number;
  galleryImages: string[];
}

export interface YatraData extends Yatra {
  highlights: { icon: string; title: string; description: string }[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  faqs: { question: string; answer: string; category: string }[];
  spiritualSignificance: string;
  helicopterInfo?: string;
  accommodationTiers: {
    tier: string;
    description: string;
    pricePerNight: number;
  }[];
  darshanTimings: {
    place: string;
    openTime: string;
    closeTime: string;
    notes: string;
  }[];
  accessibilityInfo: string;
  galleryImages: string[];
}

// ─── UI State Types ───────────────────────────────────────────────────────────

export type DifficultyLevel = "Easy" | "Moderate" | "Difficult" | "Extreme";

export interface TrekFilter {
  destination: string;
  month: string;
  difficulty: string;
  duration: string;
  budget: string;
  groupType: string;
}

export interface BookingState {
  step: 1 | 2 | 3 | 4;
  selectedBatch?: Batch;
  travelers: TravelerInfo[];
  selectedAddOns: string[];
  couponCode: string;
  paymentMode: "full" | "partial" | "emi";
}
