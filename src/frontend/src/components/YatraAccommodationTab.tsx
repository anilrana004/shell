import type { Yatra } from "@/types";

interface Props {
  yatra: Yatra;
}

const ACCOMMODATION_DATA: Record<
  string,
  {
    overview: string;
    tiers: {
      tier: string;
      stars: number;
      pricePerNight: number;
      description: string;
      facilities: string[];
      sampleHotels: string;
      image: string;
    }[];
  }
> = {
  "chardham-yatra": {
    overview:
      "Accommodation along the Chardham route ranges from basic dharamshalas to premium hotels. Book early (January onwards) for May–June season as demand vastly outstrips supply. Shail Hikers pre-blocks inventory across all tiers.",
    tiers: [
      {
        tier: "Budget",
        stars: 1,
        pricePerNight: 800,
        description:
          "Clean, functional dormitory or basic double rooms. Ideal for solo pilgrims on a tight budget. Shared bathrooms with hot water (morning hours only).",
        facilities: [
          "Shared bathroom",
          "Basic meals",
          "Locker",
          "WiFi (limited)",
        ],
        sampleHotels: "GMVN Tourist Rest Houses, Dharamshalas at each dham",
        image:
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80",
      },
      {
        tier: "Standard",
        stars: 2,
        pricePerNight: 2200,
        description:
          "Comfortable double/twin rooms with attached bathroom. Geyser hot water, room service, and morning bed-tea included. Our most popular tier for families.",
        facilities: [
          "Attached bathroom",
          "Geyser hot water",
          "Room service",
          "Parking",
          "Heater",
        ],
        sampleHotels:
          "Hotel Mandakini (Kedarnath), Hotel Devlok (Badrinath), Hotel Yamuna (Uttarkashi)",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
      },
      {
        tier: "Deluxe",
        stars: 3,
        pricePerNight: 4500,
        description:
          "Well-appointed rooms with mountain views, premium mattresses, and quality in-house restaurant. Ideal for couples and small groups wanting comfort after a long day's journey.",
        facilities: [
          "Mountain view",
          "Restaurant",
          "24hr hot water",
          "TV",
          "Heater",
          "Travel desk",
        ],
        sampleHotels:
          "Snow Valley Resort (Kedarnath base), Badri Vishal Hotel, Hotel Uttarakhand Grand",
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80",
      },
      {
        tier: "Luxury",
        stars: 4,
        pricePerNight: 9000,
        description:
          "Premium resort-style accommodation with panoramic Himalayan views, spa, fine dining, and concierge service. Limited availability — book 3+ months ahead for peak season.",
        facilities: [
          "Panoramic views",
          "Spa",
          "Fine dining",
          "Concierge",
          "Airport/station transfers",
          "Butler service",
        ],
        sampleHotels:
          "Narayan Palace (Badrinath), The Fern Ganga (Rishikesh), Zostel Plus (Haridwar)",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
      },
    ],
  },
  "do-dham-yatra": {
    overview:
      "The Do Dham route offers fewer options than full Chardham but quality has improved significantly since 2022. Accommodation near Kedarnath (Sonprayag/Gaurikund base) and Badrinath town is abundant. Book 2 months in advance for May.",
    tiers: [
      {
        tier: "Budget",
        stars: 1,
        pricePerNight: 700,
        description:
          "Basic rooms and GMVN rest houses at Sonprayag, Gaurikund, and Badrinath. Clean, functional, and pilgrimage-focused. Hot water by bucket.",
        facilities: ["Basic rooms", "Bucket hot water", "Meals nearby"],
        sampleHotels: "GMVN Tourist Bungalows, Sharma Guest House (Badrinath)",
        image:
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80",
      },
      {
        tier: "Standard",
        stars: 2,
        pricePerNight: 1800,
        description:
          "Mid-range double rooms with attached baths and reliable hot water. Most include dinner and breakfast in the room rate.",
        facilities: [
          "Attached bathroom",
          "Hot water",
          "Breakfast included",
          "Heater",
        ],
        sampleHotels: "Hotel Shri Badri (Badrinath), Hotel Kalindi (Sonprayag)",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
      },
      {
        tier: "Deluxe",
        stars: 3,
        pricePerNight: 3800,
        description:
          "Quality rooms with Mandakini/Alakananda river views, in-house dining with South Indian and North Indian menus. Best value in this tier.",
        facilities: [
          "River view",
          "Restaurant",
          "24hr hot water",
          "TV",
          "Room heater",
        ],
        sampleHotels: "Snow Crest Inn (Badrinath), Hotel Devlok Kedarnath",
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80",
      },
      {
        tier: "Luxury",
        stars: 4,
        pricePerNight: 7500,
        description:
          "Premium mountain resort accommodation with panoramic views, spa treatments, and premium vegetarian dining. Very limited availability near Kedarnath and Badrinath.",
        facilities: [
          "Premium views",
          "Spa",
          "Fine dining",
          "Concierge",
          "Yoga deck",
        ],
        sampleHotels: "The Fern (en route), Dwarika's Devi Darshan",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
      },
    ],
  },
  "rishikesh-tour": {
    overview:
      "Rishikesh has an exceptional range of accommodation from ashram stays to luxury riverside resorts. The town is divided by the Ganga — Laxman Jhula side has backpacker/ashram options, Tapovan area has luxury resorts.",
    tiers: [
      {
        tier: "Budget",
        stars: 1,
        pricePerNight: 500,
        description:
          "Ashram dormitories and guesthouses. Yoga retreat packages often include meals. Simple, clean, and deeply spiritual. Experience authentic ashram life.",
        facilities: [
          "Shared rooms",
          "Yoga classes",
          "Vegetarian meals",
          "Meditation sessions",
        ],
        sampleHotels:
          "Parmarth Niketan, Sivananda Ashram, Swarg Ashram guesthouses",
        image:
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80",
      },
      {
        tier: "Standard",
        stars: 2,
        pricePerNight: 1500,
        description:
          "Mid-range hotels and camps along the Ganga. River-facing rooms, rooftop yoga areas, and in-house cafes with organic food. Very popular with young travelers.",
        facilities: ["Ganga view", "Rooftop café", "AC", "WiFi", "Breakfast"],
        sampleHotels: "Hotel Surya, Zostel Rishikesh, Camp Namaste",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
      },
      {
        tier: "Deluxe",
        stars: 3,
        pricePerNight: 3200,
        description:
          "Boutique hotels with pool, spa, and private Ganga-view decks. Excellent restaurants with world cuisine. Perfect for couples and wellness retreats.",
        facilities: [
          "Pool",
          "Spa",
          "Ganga view balcony",
          "Multi-cuisine",
          "Yoga deck",
          "Cycling",
        ],
        sampleHotels:
          "Aloha on the Ganges, Aqua Terra Resort, The Hideout Hostel (premium)",
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80",
      },
      {
        tier: "Luxury",
        stars: 5,
        pricePerNight: 8500,
        description:
          "World-class riverside resorts with private plunge pools, Ayurvedic spas, Michelin-class dining, and wellness programs. The ultimate Rishikesh experience.",
        facilities: [
          "Private pool",
          "Ayurvedic spa",
          "Fine dining",
          "River cruises",
          "Butler",
          "Airport transfer",
        ],
        sampleHotels: "Ananda in the Himalayas, Vana Retreat, Taj Rishikesh",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
      },
    ],
  },
  "mussoorie-tour": {
    overview:
      "Mussoorie has abundant accommodation options across all budgets. Mall Road area is most convenient for sightseeing. The Library area offers quieter stays with better views. Book 4–6 weeks ahead for peak summer (May–July) and Christmas season.",
    tiers: [
      {
        tier: "Budget",
        stars: 1,
        pricePerNight: 600,
        description:
          "Clean guesthouses and homestays, typically a short walk from Mall Road. Family-run properties with home-cooked breakfast. Great for experiencing local Mussoorie culture.",
        facilities: [
          "Basic rooms",
          "Home breakfast",
          "Hot water",
          "Valley views from some",
        ],
        sampleHotels: "Hotel Woodland, Mayfair Homestay, Prakash Guest House",
        image:
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80",
      },
      {
        tier: "Standard",
        stars: 2,
        pricePerNight: 1800,
        description:
          "Well-maintained hotels with valley or mountain views, attached restaurants, and convenient Mall Road location. Most popular category for family trips.",
        facilities: [
          "Valley view",
          "Restaurant",
          "Room service",
          "Parking",
          "WiFi",
        ],
        sampleHotels:
          "Hotel Broadway, Kasmanda Palace (heritage), Hotel Roselyn",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
      },
      {
        tier: "Deluxe",
        stars: 3,
        pricePerNight: 4000,
        description:
          "Premium hotels with panoramic Himalayan views, in-house fine dining, and heritage architecture. Experience British colonial charm with modern comforts.",
        facilities: [
          "Panoramic views",
          "Heritage décor",
          "Fine dining",
          "Bonfire evenings",
          "Spa",
        ],
        sampleHotels:
          "Savoy Heritage Hotel, The Carlton's Plum, Fortune Resort",
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80",
      },
      {
        tier: "Luxury",
        stars: 5,
        pricePerNight: 9500,
        description:
          "Iconic heritage grand hotels and luxury mountain retreats. Private cottages with fireplaces, butler service, and exclusive dining experiences.",
        facilities: [
          "Private cottage",
          "Fireplace",
          "Butler",
          "Spa",
          "Heritage architecture",
          "Exclusive dining",
        ],
        sampleHotels:
          "JW Marriott Mussoorie Walnut Grove, The Amber Hotel, Lal Bahadur Shastri NPA",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
      },
    ],
  },
};

export default function YatraAccommodationTab({ yatra }: Props) {
  const data =
    ACCOMMODATION_DATA[yatra.slug] ?? ACCOMMODATION_DATA["rishikesh-tour"];

  return (
    <div className="space-y-8">
      <div
        className="p-5 rounded-xl"
        style={{
          background: "rgba(232,84,26,0.08)",
          borderLeft: "4px solid #E8541A",
        }}
      >
        <p style={{ color: "#1A2A1E", lineHeight: 1.7 }}>{data.overview}</p>
      </div>

      <div className="space-y-6">
        {data.tiers.map((tier) => (
          <div
            key={tier.tier}
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(212,237,224,0.2)" }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 h-40 md:h-auto flex-shrink-0">
                <img
                  src={tier.image}
                  alt={`${tier.tier} accommodation`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{
                        background: "rgba(232,84,26,0.2)",
                        color: "#E8541A",
                      }}
                    >
                      {tier.tier}
                    </span>
                    <span style={{ color: "#D4A843" }}>
                      {"★".repeat(tier.stars)}
                      {"☆".repeat(5 - tier.stars)}
                    </span>
                  </div>
                  <span className="font-bold" style={{ color: "#D4A843" }}>
                    from ₹{tier.pricePerNight.toLocaleString("en-IN")}
                    <span
                      className="text-sm font-normal"
                      style={{ color: "#4A5E52" }}
                    >
                      /night
                    </span>
                  </span>
                </div>
                <p
                  className="mb-3"
                  style={{
                    color: "#4A5E52",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                  }}
                >
                  {tier.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tier.facilities.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        background: "rgba(212,237,224,0.06)",
                        color: "#4A5E52",
                        border: "1px solid rgba(212,237,224,0.2)",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <p className="text-xs" style={{ color: "#4A5E52" }}>
                  <span style={{ color: "#D4A843" }}>Sample:</span>{" "}
                  {tier.sampleHotels}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="p-5 rounded-xl text-center"
        style={{
          background: "rgba(201,168,76,0.08)",
          border: "1px solid rgba(201,168,76,0.25)",
        }}
      >
        <p className="font-bold mb-1" style={{ color: "#D4A843" }}>
          Upgrade Accommodation
        </p>
        <p className="text-sm mb-3" style={{ color: "#4A5E52" }}>
          Upgrade your accommodation tier at the time of booking or up to 30
          days before departure, subject to availability.
        </p>
        <a
          href="tel:+918279888470"
          data-ocid="accommodation.upgrade_button"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold"
          style={{ background: "#E8541A", color: "#FFFFFF" }}
        >
          📞 Call to Upgrade — +91-8279888470
        </a>
      </div>
    </div>
  );
}
