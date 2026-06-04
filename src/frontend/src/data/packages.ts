export interface HomepagePackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  duration: string;
  image: string;
  badge: string;
  tag: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  /** Short labels for inclusion icon row */
  inclusionIcons: string[];
  /** TanStack route path */
  linkTo: string;
  region: string;
  rating: number;
  reviewCount: number;
  route: string;
  groupType: string;
  treksIncluded: string[];
  bestTime: string;
}

export const HOMEPAGE_PACKAGES: HomepagePackage[] = [
  {
    id: "govind-combo",
    name: "Kedarkantha + Har Ki Dun",
    tagline: "The Ultimate Govind Sanctuary Experience",
    price: 11999,
    originalPrice: 14498,
    duration: "13 Days / 12 Nights",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80",
    badge: "Most Popular",
    tag: "COMBO SAVER",
    highlights: [
      "2 iconic treks — snow summit + valley of gods",
      "Full Govind Wildlife Sanctuary circuit",
      "Save ₹2,499 vs booking separately",
    ],
    includes: [
      "Both trek fees & forest permits",
      "Dehradun ↔ Sankri transport",
      "All meals & camping gear",
      "Certified guide for full trip",
      "₹10L group insurance",
    ],
    excludes: ["Personal porter", "Merchandise kit"],
    inclusionIcons: ["Camping", "Meals", "Guide", "Transport", "Insurance"],
    linkTo: "/packages",
    region: "Govind Wildlife Sanctuary, Uttarakhand",
    rating: 4.9,
    reviewCount: 156,
    route: "Sankri → Kedarkantha (12,500 ft) → Har Ki Dun Valley → Maninda",
    groupType: "Combo Group Trek",
    treksIncluded: ["Kedarkantha", "Har Ki Dun"],
    bestTime: "Dec–Apr + Apr–Nov",
  },
  {
    id: "chardham-deluxe",
    name: "Chardham Yatra Deluxe",
    tagline: "India's Most Sacred Pilgrimage, Elevated",
    price: 24999,
    originalPrice: 29999,
    duration: "11 Days / 10 Nights",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    badge: "Premium",
    tag: "BEST VALUE",
    highlights: [
      "Yamunotri, Gangotri, Kedarnath & Badrinath",
      "3★ hotels + VIP darshan assistance",
      "Optional helicopter upgrades available",
    ],
    includes: [
      "All 4 dhams with registration support",
      "AC transport & driver allowances",
      "Daily breakfast & dinner",
      "Dedicated yatra coordinator",
      "Travel insurance included",
    ],
    excludes: ["Personal helicopter upgrade", "Extra excursions"],
    inclusionIcons: ["Hotel", "Meals", "Transport", "Darshan", "Insurance"],
    linkTo: "/yatras/chardham-yatra",
    region: "Garhwal Himalayas, Uttarakhand",
    rating: 4.8,
    reviewCount: 412,
    route: "Haridwar → Barkot → Uttarkashi → Kedarnath → Badrinath",
    groupType: "Deluxe Pilgrimage",
    treksIncluded: ["Chardham Yatra"],
    bestTime: "May–Jun, Sep–Oct",
  },
  {
    id: "winter-special",
    name: "Uttarakhand Winter Special",
    tagline: "3 Snow Treks — One Epic Winter Journey",
    price: 15999,
    originalPrice: 19497,
    duration: "15 Days / 14 Nights",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    badge: "Winter 2025",
    tag: "SEASONAL",
    highlights: [
      "Kedarkantha + Dayara Bugyal + Nag Tibba",
      "3 snow experiences in one booking",
      "Progressive altitude & fitness build-up",
    ],
    includes: [
      "All 3 trek fees & permits",
      "Inter-trek transport & logistics",
      "All meals & camping equipment",
      "Specialist winter guide team",
      "Full group insurance cover",
    ],
    excludes: ["Personal gear rental", "Extra hotel nights"],
    inclusionIcons: ["Camping", "Meals", "Guide", "Transport", "Insurance"],
    linkTo: "/packages",
    region: "Uttarkashi & Tehri Garhwal",
    rating: 4.8,
    reviewCount: 98,
    route: "Dehradun → Kedarkantha → Dayara Bugyal → Nag Tibba → Dehradun",
    groupType: "Winter Combo",
    treksIncluded: ["Kedarkantha", "Dayara Bugyal", "Nag Tibba"],
    bestTime: "Dec–Mar",
  },
];
