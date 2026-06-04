import type { Yatra } from "@/types";

const SPIRITUAL_CONTENT: Record<
  string,
  {
    intro: string;
    sites: { name: string; significance: string; mythology: string }[];
    conduct: string[];
    dressCode: string;
    photography: string;
    bestTimeForDarshan: string;
  }
> = {
  "chardham-yatra": {
    intro:
      "Chardham Yatra is the most sacred Hindu pilgrimage, believed to wash away all sins and grant moksha (liberation). The four dhams — Yamunotri, Gangotri, Kedarnath, and Badrinath — are manifestations of four divine forces at the source of four holy rivers in the Garhwal Himalayas.",
    sites: [
      {
        name: "Yamunotri",
        significance:
          "Abode of Goddess Yamuna, the sister of Yama (god of death). Worshipping here liberates devotees from a fearful death. The hot springs here (Surya Kund) are used to cook rice and potatoes as prasad.",
        mythology:
          "Asit Muni, a sage, meditated here through his old age. The river Yamuna is believed to be the daughter of the Sun God (Surya) and twin sister of Lord Yama. Her blessings free souls from the cycle of rebirth.",
      },
      {
        name: "Gangotri",
        significance:
          "The origin of the sacred Ganga, personified as Goddess Ganga. The temple faces north toward Gaumukh glacier, the actual source 19 km away. It is one of the most spiritually charged sites in the Himalayas.",
        mythology:
          "King Bhagirath performed penance here for thousands of years to bring Goddess Ganga to earth to liberate his ancestors. Lord Shiva caught Ganga in his matted hair to prevent the earth from being destroyed by her force.",
      },
      {
        name: "Kedarnath",
        significance:
          "One of the 12 Jyotirlingas of Lord Shiva — the most potent. The present temple was built by Adi Shankaracharya in the 8th century. At 3,584 m, it is the highest among the Chardham temples.",
        mythology:
          "After the Kurukshetra war, the Pandavas sought Lord Shiva's forgiveness. Shiva, evading them, disguised as a bull. When Bhima grabbed the bull's hump, Shiva disappeared underground, with his hump remaining at Kedarnath and other body parts at the Panch Kedar temples.",
      },
      {
        name: "Badrinath",
        significance:
          "Seat of Lord Vishnu in his Badri Narayana form. One of the 108 Divya Desams and the holiest Vaishnava shrine. The Char Dham Yatra is incomplete without Badrinath darshan.",
        mythology:
          "Lord Vishnu is said to have meditated here under a Badri tree (jujube). Goddess Lakshmi, unable to bear seeing her husband meditate in harsh cold, transformed herself into the Badri tree to shield him. Hence, the place is called Badri-Nath.",
      },
    ],
    conduct: [
      "Maintain silence near sanctum sanctorum — no photography inside temples",
      "Complete physical and mental fast on the day of darshan for maximum spiritual benefit",
      "Carry prasad rice/potatoes to cook in Surya Kund at Yamunotri",
      "Offer holy water of each river to the next dham as a sacred chain",
      "No leather items (belts, shoes) inside temple premises",
      "Mobiles strictly prohibited inside all four dham sanctums",
      "Alcohol and non-vegetarian food strictly prohibited during entire yatra",
      "Chant respective deity mantras during darshan for spiritual amplification",
    ],
    dressCode:
      "Traditional Indian attire recommended — saree/salwar kameez for women, dhoti/kurta for men. Shoulders and knees must be covered. Western clothing is permitted but modest. Head covering recommended at Kedarnath and Badrinath.",
    photography:
      "Photography allowed in outer temple premises and landscapes. Strictly NO photography inside the sanctum (garbhagriha) of any of the four dhams. Drone photography requires special permits from district administration.",
    bestTimeForDarshan:
      "Early morning darshan (5–7 AM, Mangal Aarti) is the most auspicious and least crowded. Evening Bhog Aarti (6–7 PM) is spiritually powerful and highly recommended. Avoid 10 AM–2 PM when queues stretch 3–4 hours.",
  },
  "do-dham-yatra": {
    intro:
      "Do Dham Yatra encompasses the two most powerful dhams of the Garhwal Himalayas — Kedarnath, the throne of Lord Shiva, and Badrinath, the abode of Lord Vishnu. These two deities represent the supreme forces of dissolution and preservation in Hindu cosmology, making this yatra a complete spiritual journey.",
    sites: [
      {
        name: "Kedarnath",
        significance:
          "One of the 12 Jyotirlingas of Lord Shiva — the most powerful manifestation of Shiva's cosmic energy. Situated at 3,584 m by the Mandakini river, the ancient stone temple has withstood centuries of Himalayan storms. The 2013 floods destroyed everything around it but left the temple untouched — an event considered miraculous by millions.",
        mythology:
          "The Pandavas, seeking absolution for the sins of the Kurukshetra war, chased Lord Shiva through the Himalayas. Shiva assumed the form of a bull and dived into the earth at Kedarnath, with his hump emerging at this site. The other body parts emerged at Tungnath, Rudranath, Madhyamaheshwar, and Kalpeshwar — together forming the Panch Kedar.",
      },
      {
        name: "Badrinath",
        significance:
          "The seat of Lord Vishnu's meditating form (Badrinarayan), Badrinath at 3,133 m sits between Nar and Narayana mountain ranges. It is said that what cannot be attained through thousands of years of penance and charity can be obtained through a single darshan at Badrinath.",
        mythology:
          "In the Satya Yuga, this entire region was the meditation ground of Nara and Narayana, the twin sons of Dharma who were incarnations of Vishnu. The Narada Muni, Kapila Muni, and many rishis performed tapas here. The present temple form was established by Adi Shankaracharya around 800 AD.",
      },
    ],
    conduct: [
      "Begin journey facing north — direction of Badrinath and Kailash",
      "Take a dip in Tapt Kund (hot spring) before Badrinath darshan",
      "Offer Panchaamrit (milk, curd, ghee, honey, sugar) at Kedarnath",
      "No alcohol, smoking, or non-veg food throughout the yatra",
      "No leather inside temple premises — wear cloth footwear or go barefoot",
      "Maintain sacred silence during Abhishek and Aarti rituals",
    ],
    dressCode:
      "Traditional Indian dress preferred. Clean, modest attire mandatory. Women: saree or salwar suit. Men: dhoti-kurta or clean trousers with kurta. No shorts, sleeveless tops, or revealing clothing inside any temple complex.",
    photography:
      "Outer temple compound photography permitted. Inner sanctum — strictly no phones or cameras. Kedarnath: photography of the main Shivalinga is prohibited. Badrinath: the central idol darshan area is no-camera.",
    bestTimeForDarshan:
      "Kedarnath: 4 AM Rudra Abhishek (most auspicious, book in advance). Badrinath: 4:30 AM Mahabhishek Puja is the highest spiritual experience. Evening Shayan Aarti (9 PM) at Badrinath is breathtaking.",
  },
  "rishikesh-tour": {
    intro:
      "Rishikesh, the 'Gateway to the Himalayas,' is where the sacred Ganga descends from the mountains to the plains, making it the most spiritually charged yoga and meditation capital on earth. Every stone, every aarti, every chant here is saturated with thousands of years of unbroken spiritual practice.",
    sites: [
      {
        name: "Triveni Ghat",
        significance:
          "The most sacred ghat in Rishikesh, where three rivers — Ganga, Yamuna, and the invisible Saraswati — are believed to converge. The evening Maha Aarti here, with 108 priests performing synchronized rituals with fire lamps, is one of the most moving spiritual spectacles in India.",
        mythology:
          "The name 'Triveni' (three braids) refers to the confluence of the three holiest rivers. A dip at Triveni Ghat during auspicious occasions is believed to free the soul from the cycle of birth and death.",
      },
      {
        name: "Parmarth Niketan Ashram",
        significance:
          "One of the largest ashrams in India, situated on the banks of the Ganga. The evening Ganga Aarti here draws thousands daily. The ashram founded by Swami Shukdevananda ji is a center for Vedantic studies, yoga teacher training, and interfaith dialogue.",
        mythology:
          "This site is associated with the sage Parmar Hansa. The 13-foot Shiva statue here is an artistic representation of divine consciousness. The ashram's Ganga aarti has been celebrated continuously for over 80 years.",
      },
      {
        name: "Neelkanth Mahadev Temple",
        significance:
          "Dedicated to Lord Shiva in his 'Blue-Throated' form (Neelkanth), this temple marks the spot where Shiva consumed the Halahala poison that emerged during the Samudra Manthan (churning of the cosmic ocean) to save the universe.",
        mythology:
          "During the churning of the ocean by gods and demons, the most deadly poison Halahala emerged first. Lord Shiva drank it to save creation, and Goddess Parvati held his throat to prevent it from spreading — turning his throat permanently blue.",
      },
    ],
    conduct: [
      "Remove footwear before entering all temples and ashram premises",
      "Dress modestly — no beachwear or revealing clothing near ghats and temples",
      "Maintain silence during Ganga Aarti — observe without chatting or phones",
      "Do not click photos during aarti rituals without permission",
      "No alcohol permitted in Rishikesh town — it is a dry city",
      "Respect the meditation silence zones in ashrams",
      "Do not touch the Ganga lamps or flowers offered during aarti",
    ],
    dressCode:
      "Light, modest Indian or Western clothing. Carry a dupatta/stole for temple entry. At ashrams: simple white or light-colored attire. Near ghats in evenings: comfortable modest wear. No shorts at Ganga ghats after sunset.",
    photography:
      "Photography warmly welcomed along the ghats, Lakshman Jhula, Ram Jhula, and open temple areas. Avoid photographing sadhus without permission. No photography during active pujas inside temples. The Ganga Aarti is photogenic but keep flash off.",
    bestTimeForDarshan:
      "Evening Ganga Aarti at Triveni Ghat (5:30–6:30 PM daily) — arrive by 5 PM for front space. Morning Rudra Abhishek at Neelkanth Mahadev (6–8 AM). Parmarth Ashram Aarti (sunset time, approx 6–7 PM).",
  },
  "mussoorie-tour": {
    intro:
      "While Mussoorie is celebrated as a hill station, its spiritual landscape is equally profound. The Surkanda Devi temple, Kempty Falls with its mythological associations, and the colonial-era Christ Church all tell stories of faith across cultures and centuries in the Garhwal foothills.",
    sites: [
      {
        name: "Surkanda Devi Temple",
        significance:
          "One of the 51 Shakti Peethas, Surkanda Devi is a powerful manifestation of Goddess Durga. The temple at 2,757 m commands panoramic Himalayan views and is especially crowded on Navratri when tens of thousands of devotees trek up to seek blessings.",
        mythology:
          "According to the Shakti Peetha legend, when Lord Shiva was carrying the body of Sati (his divine consort) in grief, Lord Vishnu used his Sudarshana Chakra to cut the body into 51 parts. Sati's head (sheesh) fell at this location — hence the name 'Sur-kanda' (head of divinity).",
      },
      {
        name: "Camel's Back Road & Heritage Walk",
        significance:
          "The famous 3 km promenade traces the ridge spine of Mussoorie and has historical significance as the leisure walk of British-era administrators and military officers. The Mall Road and Camel's Back Road together form a living museum of colonial-era Himalayan history.",
        mythology:
          "The road was originally constructed in 1845 by the British for recreational walking. Local legend holds that the rock formation resembling a camel's back is a petrified camel of a Mughal-era army that was cursed for harming a sadhu.",
      },
    ],
    conduct: [
      "Dress warmly and modestly for Surkanda Devi temple — the climb is steep and windy",
      "Carry prasad (coconut, red chunri) as offerings at Surkanda Devi",
      "No non-vegetarian food on days of temple visits",
      "Respect heritage buildings on Camel's Back Road — no vandalism or graffiti",
      "Maintain cleanliness at viewpoints and along Mall Road",
    ],
    dressCode:
      "Warm layers essential (10–18°C year-round). For Surkanda Devi temple: traditional modest dress preferred. Comfortable walking shoes mandatory for Camel's Back Road trek and temple paths.",
    photography:
      "Mussoorie offers spectacular photography opportunities at Lal Tibba, Gun Hill, and Camel's Back Road. Inside Surkanda Devi temple: outer area photography permitted, inner sanctum no-camera. Drone photography from viewpoints is spectacular in clear weather.",
    bestTimeForDarshan:
      "Surkanda Devi: Early morning (6–8 AM) for clear Himalayan views and minimal crowd. Navratri (March–April, October) for the vibrant festival atmosphere. Mussoorie town: Sunrise at Lal Tibba (6–7 AM) and sunset at Gun Hill are unmissable.",
  },
};

interface Props {
  yatra: Yatra;
}

export default function YatraSpiritualTab({ yatra }: Props) {
  const content =
    SPIRITUAL_CONTENT[yatra.slug] ?? SPIRITUAL_CONTENT["rishikesh-tour"];

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div
        className="p-6 rounded-xl"
        style={{
          background: "rgba(232,84,26,0.08)",
          borderLeft: "4px solid #E8541A",
        }}
      >
        <p style={{ color: "#1A2A1E", lineHeight: 1.8 }}>{content.intro}</p>
      </div>

      {/* Sacred Sites */}
      <div>
        <h3
          className="text-xl font-bold mb-4"
          style={{ color: "#1A2A1E", fontFamily: "var(--font-display)" }}
        >
          Sacred Sites & Their Significance
        </h3>
        <div className="space-y-4">
          {content.sites.map((site) => (
            <details
              key={site.name}
              className="group rounded-xl overflow-hidden"
              style={{
                background: "rgba(212,237,224,0.04)",
                border: "1px solid rgba(212,237,224,0.2)",
              }}
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛕</span>
                  <span
                    className="font-bold text-lg"
                    style={{ color: "#1A2A1E" }}
                  >
                    {site.name}
                  </span>
                </div>
                <span
                  className="text-xl transition-transform group-open:rotate-180"
                  style={{ color: "#E8541A" }}
                >
                  ›
                </span>
              </summary>
              <div className="px-5 pb-5 space-y-3">
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#E8541A" }}
                  >
                    Spiritual Significance
                  </span>
                  <p
                    className="mt-1"
                    style={{ color: "#4A5E52", lineHeight: 1.7 }}
                  >
                    {site.significance}
                  </p>
                </div>
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#D4A843" }}
                  >
                    Mythology & Legend
                  </span>
                  <p
                    className="mt-1"
                    style={{ color: "#4A5E52", lineHeight: 1.7 }}
                  >
                    {site.mythology}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Conduct & Guidelines */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="p-5 rounded-xl"
          style={{
            background: "rgba(212,237,224,0.04)",
            border: "1px solid rgba(212,237,224,0.15)",
          }}
        >
          <h4
            className="font-bold mb-3 flex items-center gap-2"
            style={{ color: "#1A2A1E" }}
          >
            <span>🙏</span> Conduct Guidelines
          </h4>
          <ul className="space-y-2">
            {content.conduct.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2"
                style={{
                  color: "#4A5E52",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                <span
                  className="mt-1 flex-shrink-0"
                  style={{ color: "#E8541A" }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div
            className="p-5 rounded-xl"
            style={{
              background: "rgba(212,237,224,0.04)",
              border: "1px solid rgba(212,237,224,0.15)",
            }}
          >
            <h4
              className="font-bold mb-2 flex items-center gap-2"
              style={{ color: "#1A2A1E" }}
            >
              <span>👗</span> Dress Code
            </h4>
            <p
              style={{
                color: "#4A5E52",
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              {content.dressCode}
            </p>
          </div>
          <div
            className="p-5 rounded-xl"
            style={{
              background: "rgba(212,237,224,0.04)",
              border: "1px solid rgba(212,237,224,0.15)",
            }}
          >
            <h4
              className="font-bold mb-2 flex items-center gap-2"
              style={{ color: "#1A2A1E" }}
            >
              <span>📷</span> Photography Rules
            </h4>
            <p
              style={{
                color: "#4A5E52",
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              {content.photography}
            </p>
          </div>
          <div
            className="p-5 rounded-xl"
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <h4
              className="font-bold mb-2 flex items-center gap-2"
              style={{ color: "#D4A843" }}
            >
              <span>⏰</span> Best Time for Darshan
            </h4>
            <p
              style={{
                color: "#4A5E52",
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              {content.bestTimeForDarshan}
            </p>
          </div>
        </div>
      </div>

      {/* Importance Banner */}
      <div
        className="p-5 rounded-xl text-center"
        style={{
          background: "rgba(232,84,26,0.12)",
          border: "1px solid rgba(232,84,26,0.3)",
        }}
      >
        <div className="text-4xl mb-3">🕉</div>
        <p className="font-bold mb-1" style={{ color: "#1A2A1E" }}>
          Pilgrimage Importance to Hindu Faith
        </p>
        <p style={{ color: "#4A5E52", fontSize: "0.9rem", lineHeight: 1.7 }}>
          The Chardham Yatra is believed to grant salvation (moksha) to
          devotees. Scriptures declare that a person who completes the Chardham
          Yatra in their lifetime is freed from the cycle of birth and death.
          Every Hindu aspires to complete this pilgrimage at least once, making
          it the holiest of all earthly journeys.
        </p>
      </div>
    </div>
  );
}
