export interface BlogPost {
  slug: string;
  title: string;
  category: "Trek Tips" | "Yatra Guides" | "Gear" | "Stories";
  excerpt: string;
  heroImage: string;
  author: { name: string; avatar: string; role: string };
  date: string;
  readTime: number;
  views: number;
  tags: string[];
  relatedTreks: string[];
  featured?: boolean;
  body: string;
}

export const CATEGORY_COLORS: Record<BlogPost["category"], string> = {
  "Trek Tips": "#E8541A",
  "Yatra Guides": "#2E7D4F",
  Gear: "#2E7D4F",
  Stories: "#E8541A",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "complete-guide-kedarkantha-winter-trek-2025",
    title: "Complete Guide to Kedarkantha Winter Trek 2025",
    category: "Trek Tips",
    excerpt:
      "Everything you need to know about India's most beloved winter snowscape — from base camp logistics to summit-day strategy, packing lists, and the best photo spots.",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    author: {
      name: "Deepak Rawat",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
      role: "Lead Trek Leader",
    },
    date: "December 10, 2024",
    readTime: 8,
    views: 12400,
    tags: [
      "Kedarkantha",
      "Winter Trek",
      "Uttarakhand",
      "Snow Trek",
      "Beginner",
    ],
    relatedTreks: ["kedarkantha", "nag-tibba", "dayara-bugyal"],
    featured: true,
    body: [
      "## The Crown Jewel of Winter Trekking",
      "Kedarkantha stands at 12,500 feet in the Govind Wildlife Sanctuary, Uttarkashi district of Uttarakhand. Every winter, between December and April, the entire trail transforms into a pristine white corridor of snow-draped oak and rhododendron forests that feels like walking inside a snow globe.",
      "The approach from Sankri village is deceptively gentle. You cross frozen streams, pass through shepherds' meadows blanketed in a foot of snow, and camp under skies so clear that the Milky Way appears close enough to touch. By Day 3, when you begin the summit push at 4 AM under a canopy of stars, you understand why over 10,000 trekkers every year brave sub-zero temperatures to stand on this summit.",
      "## Why Winter is the Best Season",
      "The monsoon brings leeches and slippery trails. Post-monsoon offers golden meadows but lacks drama. Summer is pleasant but ordinary. Winter, however, delivers the full cinematic experience — chest-deep snow on the summit cone, frozen pine branches catching golden sunrise light, and the kind of silence that only a snowfield at 12,000 feet can offer.",
      "The summit panorama in winter is exceptional: Swargarohini, Bandarpunch, Black Peak, and on clear days, distant Kedarnath peaks emerge from the horizon like painted gods.",
      "## Base Camp: Sankri Village",
      "All Kedarkantha treks begin from Sankri (6,400 ft), a cheerful Himalayan village 200 km from Dehradun. The drive up takes 8–9 hours through Mussoorie, Barkot, and Purola. Shail Hikers operates a dedicated trek briefing session at Sankri the evening before Day 1. Our teams check all gear, demonstrate crampons usage, and review the acclimatization schedule.",
      "## Day-by-Day: What Actually Happens",
      "**Day 1 — Sankri to Juda Ka Talab (9,100 ft, 5 km):** The trail begins gently through pine and oak forests. By afternoon you reach Juda Ka Talab — a frozen lake that glitters silver-blue in winter. Night temperatures drop to -8°C. Shail Hikers provides -15°C rated sleeping bags as standard.",
      "**Day 2 — Juda Ka Talab to Kedarkantha Base (11,250 ft, 4 km):** This acclimatization day opens dramatic views. The meadow camp has 360-degree mountain views. Guides deliver the summit-day briefing and crampons fitting session.",
      "**Day 3 — Summit Push and Descent to Sankri:** The 3:30 AM wake-up is brutal but the reward is transcendent. The 2.5 km summit push in crampons takes 2.5–3 hours. At the top: a small Shiva temple, prayer flags, and the most complete Himalayan panorama on any accessible trek in India.",
      "## Essential Packing for Winter",
      "The number one mistake beginners make is underestimating layering. Temperature swings from 5°C at midday to -12°C overnight. You need a quality moisture-wicking base layer, mid-layer fleece, and a down jacket rated to at least -10°C. Shail Hikers provides crampons, trekking poles on request, and -15°C sleeping bags as standard inclusions.",
      "## Fitness Preparation: 6-Week Plan",
      "Kedarkantha is rated Easy-Moderate, accessible to first-time high-altitude trekkers. Begin training 6 weeks before departure. Weeks 1–2: daily 45-minute brisk walks. Weeks 3–4: add stair climbing and 5 km runs. Weeks 5–6: full-day hikes on weekends carrying a 7 kg backpack.",
      "## Booking Advice",
      "December and January batches fill within days of opening. February offers the deepest snow but the coldest nights. March is ideal — deep snow, warming temperatures, lower competition for seats. Book at minimum 45 days ahead. The early-bird discount of 10% applies to bookings made 60+ days in advance.",
    ].join("\n\n"),
  },
  {
    slug: "chardham-yatra-everything-you-need-to-know",
    title: "Chardham Yatra: Everything You Need to Know",
    category: "Yatra Guides",
    excerpt:
      "A comprehensive pilgrim's handbook for the four sacred dhams of Uttarakhand — Yamunotri, Gangotri, Kedarnath, and Badrinath — covering opening dates, route logistics, and spiritual significance.",
    heroImage:
      "https://images.unsplash.com/photo-1544132583786-2b82cca7f5d7?w=1200&q=80",
    author: {
      name: "Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
      role: "Trek Leader & Yatra Specialist",
    },
    date: "November 28, 2024",
    readTime: 12,
    views: 9800,
    tags: [
      "Chardham",
      "Yatra",
      "Kedarnath",
      "Badrinath",
      "Uttarakhand",
      "Pilgrimage",
    ],
    relatedTreks: ["chardham-yatra", "do-dham-yatra", "rishikesh-tour"],
    body: [
      "## The Four Abodes of the Divine",
      "The Chardham Yatra is not merely a pilgrimage circuit — it is India's most sacred journey, completed by over three million devotees each year. The four dhams — Yamunotri, Gangotri, Kedarnath, and Badrinath — lie at altitudes ranging from 10,000 to 12,000 feet in the Garhwal Himalayas of Uttarakhand.",
      "## Opening and Closing Dates 2025",
      "The dhams open on auspicious Akshaya Tritiya in April/May and close on Diwali in October/November.\n- **Yamunotri:** Opens ~May 8, 2025. Closes ~November 2, 2025.\n- **Gangotri:** Opens ~May 8, 2025. Closes ~November 2, 2025.\n- **Kedarnath:** Opens ~May 10, 2025. Closes ~November 5, 2025.\n- **Badrinath:** Opens ~May 12, 2025. Closes ~November 17, 2025.",
      "Peak season runs from May to June and again in September–October. First-time pilgrims should target May or October for ideal weather and manageable crowds.",
      "## Registration and Biometric Requirements",
      "The Uttarakhand government mandates online registration for the Kedarnath portion, with biometric authentication at checkposts. Daily pilgrimage caps apply at Kedarnath: 12,000 to 15,000 per day. Shail Hikers handles all registration and permits as part of our Chardham packages.",
      "## The Four Dhams: What to Expect",
      "**Yamunotri (3,291 m):** The trek begins at Janki Chatti (2,650 m) and follows the Yamuna river for 6 km to the temple, passing hot water springs and a waterfall.",
      "**Gangotri (3,048 m):** Vehicles can drive directly to this temple town. The Gangotri temple sits at the base of a spectacular canyon where the Bhagirathi river runs turquoise-blue.",
      "**Kedarnath (3,583 m):** The emotional centrepiece. The ancient stone temple sits in a dramatic bowl surrounded by glaciers. The 16 km trek from Gaurikund gains nearly 1,600 m of altitude. Helicopter options available.",
      "**Badrinath (3,133 m):** The final and grandest dham. The colourful Vishnu temple stands against Neelkantha peak (6,596 m). Mana village, India's last village before the Tibetan border, is a rewarding excursion.",
      "## Health Precautions at Altitude",
      "All four dhams exceed 10,000 feet. The most common mistake is rushing the itinerary. Shail Hikers designs all Chardham itineraries with acclimatisation rest days. If you develop persistent headache or nausea at any dham, descend 500 m immediately.",
      "## Booking Your Yatra with Shail Hikers",
      "Our standard package spans 11 nights / 12 days from Dehradun, covering all four dhams with guesthouse accommodation, all meals, private vehicle transport, and an experienced guide. We limit groups to 15 pilgrims per batch. May and September batches book out within 48 hours of opening.",
    ].join("\n\n"),
  },
  {
    slug: "ultimate-trekking-gear-guide-beginners",
    title: "The Ultimate Trekking Gear Guide for Beginners",
    category: "Gear",
    excerpt:
      "A practical, no-BS guide to building your first trekking kit without overspending — what to buy, what to skip, what to borrow, and the best brands available in India.",
    heroImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    author: {
      name: "Amit Negi",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
      role: "Mountain Guide & Gear Expert",
    },
    date: "November 15, 2024",
    readTime: 10,
    views: 7600,
    tags: [
      "Gear",
      "Beginners",
      "Trekking Shoes",
      "Backpack",
      "Layering",
      "Budget",
    ],
    relatedTreks: ["kedarkantha", "nag-tibba", "chopta-chandrashila"],
    body: [
      "## The Gear Trap That Kills Budgets",
      "Every year, first-time trekkers arrive at our base camp carrying brand-new gear that has never seen mud or rain. Some of it is exactly right. Some of it is dangerously wrong. A comfortable, safe high-altitude trekking kit can be assembled for Rs8,000–Rs12,000 if you are strategic.",
      "## The Non-Negotiables: Spend Money Here",
      "**Trekking Shoes (Rs2,500–Rs6,000):** Your single most important purchase. You need ankle-height shoes with a Vibram sole, waterproofing, and a rock plate. The Quechua MH500 from Decathlon (Rs2,999) is exceptional value for moderate treks. Do not wear regular sports shoes — they have zero ankle support and no grip on wet rock.",
      "**A 40–50L Backpack (Rs1,500–Rs4,000):** The Quechua NH500 (Rs2,999) is our top recommendation. Key features: hip belt that transfers weight from shoulders, back panel ventilation, rain cover.",
      "**Moisture-Wicking Base Layers (Rs500–Rs1,500):** Cotton kills trekkers. Wet cotton against skin in sub-zero temperatures causes rapid heat loss. You need synthetic or merino wool base layers.",
      "## The Middle Ground: Spend Moderately",
      "**Fleece Mid-Layer (Rs800–Rs2,500):** A 200-weight fleece is the workhorse of your kit. Wear alone at camp, layer under your shell in rain, or pack for emergency warmth.",
      "**Down/Insulated Jacket (Rs2,000–Rs8,000):** For treks above 10,000 ft, mandatory. For winter treks, ensure your jacket is rated to at least -10°C.",
      "**Waterproof Shell Jacket (Rs1,500–Rs5,000):** Goes over everything when it rains or snows. Seam-sealed construction and a hood large enough to fit over your beanie are essential.",
      "## The Smart Shortcuts: Borrow, Rent, or Skip",
      "**Trekking Poles:** Unless you have knee issues, optional for moderate treks. Shail Hikers provides them on request as standard inclusions. No need to purchase.",
      "**Sleeping Bag:** We provide -15°C rated sleeping bags on all treks. This is not an item you need to own.",
      "**Crampons/Gaiters:** Trek-specific. Shail Hikers provides or rents these when required.",
      "## Packing Weight: The Golden Rule",
      "Your pack should weigh no more than 12 kg fully loaded, including water. Every kilogram above this costs you on the trail — slower pace, more fatigue, greater injury risk. Weigh your packed bag before departure and ruthlessly remove anything you can rent from us at base camp.",
    ].join("\n\n"),
  },
  {
    slug: "my-first-solo-trek-har-ki-dun-transformation",
    title: "My First Solo Trek to Har Ki Dun — A Transformation Story",
    category: "Stories",
    excerpt:
      "I arrived at Sankri with a panic attack and left with a summited mountain and something I hadn't felt in years: peace. This is what happened in those seven days.",
    heroImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    author: {
      name: "Anjali Mehta",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
      role: "Trekker & Writer",
    },
    date: "October 22, 2024",
    readTime: 7,
    views: 11200,
    tags: [
      "Solo Trek",
      "Har Ki Dun",
      "Personal Story",
      "Mental Health",
      "Transformation",
    ],
    relatedTreks: ["har-ki-dun", "kedarkantha", "ruinsara-tal"],
    body: [
      "## The Night Before",
      "I booked the Har Ki Dun trek on an impulse at 2 AM in October, three months after a breakup that had unraveled my sense of self. I had never camped overnight in my life. I was 31, from Bengaluru, and the last physically demanding thing I had done was rush to catch a flight. I paid the deposit before I could talk myself out of it.",
      "I met the Shail Hikers team that evening at the Sankri briefing session. Trek Leader Deepak said: 'The mountain will always be there. We go at the mountain's pace, not yours.' I didn't fully understand what he meant until Day 4.",
      "## Days 1 and 2: The Ache of Unfamiliar Muscles",
      "Har Ki Dun valley sits in the Govind Wildlife Sanctuary, approached from Sankri through the Tons valley. The first two days are a gentle but persistent climb through silver birch forests and stone-built Garhwali villages where children waved at us from doorways. My shoulders screamed by hour three. The sweep guide offered a Glucon-D biscuit and said nothing sympathetic, which was exactly right.",
      "That night in the tent at Seema campsite (8,200 ft), something shifted. There was no wifi. No notifications. Just rain on the tent fly and the sound of the Tons river below. I slept for nine hours — the first full night's sleep I'd had in months.",
      "## Day 3: The Valley Opens",
      "This is when Har Ki Dun does what it is famous for. The valley opens into a vast amphitheatre ringed by peaks above 6,000 m. Swargarohini I, II, and III float above the treeline. Jaundhar Glacier gleams blue-white at the valley head. I stopped on a ridge and could not move for several minutes. Not from exhaustion. From something too large for the mind to immediately process.",
      "## Days 4 and 5: What Actually Changes",
      "High altitude is clarifying in ways difficult to describe. By Day 4, I had stopped thinking about Bengaluru, my job, or my past. There was simply no bandwidth for anything beyond the next ridge, the next campsite, the next meal. The mountains enforce presence in a way that no meditation app can simulate.",
      "On the summit day, when we pushed to the head of the valley at 11,700 ft in cold, thin air, I did not fall behind. My lungs found a rhythm. My legs, aching and unfamiliar, carried me to the top.",
      "## The Return and What I Brought Back",
      "I arrived in Dehradun with a certificate from Shail Hikers, 847 photos on my phone, and the knowledge that I am fundamentally capable of hard things. Not metaphorical hard things. Actual, physical, at-altitude, blistered-feet hard things.",
      "The mountains give you evidence of your own resilience in a way that is inarguable. I booked Rupin Pass for March before I even reached Bengaluru.",
    ].join("\n\n"),
  },
  {
    slug: "best-time-valley-of-flowers-month-by-month",
    title: "Best Time to Visit Valley of Flowers: Month-by-Month Guide",
    category: "Trek Tips",
    excerpt:
      "The Valley of Flowers blooms for only four months a year, and what you see depends entirely on when you visit. Our month-by-month breakdown tells you exactly which wildflowers peak when.",
    heroImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    author: {
      name: "Sunita Bisht",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
      role: "Safety Officer & Naturalist",
    },
    date: "September 30, 2024",
    readTime: 9,
    views: 8900,
    tags: [
      "Valley of Flowers",
      "UNESCO",
      "Wildflowers",
      "Uttarakhand",
      "National Park",
    ],
    relatedTreks: ["valley-of-flowers", "chopta-chandrashila", "har-ki-dun"],
    body: [
      "## A UNESCO World Heritage Site That Exists Only in Summer",
      "The Valley of Flowers National Park (UNESCO World Heritage Site, 2005) sits at 3,352–3,658 m in Chamoli district, Uttarakhand. It is closed from November to May under heavy snowpack. Between June and October, it harbours over 500 species of wildflowers across 87 square kilometres of glacier-fed meadows. What you see depends almost entirely on when you arrive.",
      "## June (Opens mid-June): The First Blush",
      "June is dominated by Himalayan Blue Poppy (Meconopsis betonicifolia) — the iconic blue flower that draws botanists from around the world. Also blooming: Primula denticulata in purple clusters. Trail conditions are challenging but crowds are thin and the experience is raw and exploratory.",
      "## July: The Explosion (Peak Season)",
      "July is the Valley at full spectrum. Monsoon rains trigger simultaneous mass blooming — violet Geranium pratense, yellow Potentilla, magenta Epilobium, and the spectacular Brahma Kamal (Saussurea obvallata), Uttarakhand's state flower, which blooms only above 4,000 m. **July is our strongest recommendation** for first-time visitors. Book early — July batches fill by April.",
      "## August: Transition and the Blue Horizon",
      "Late-blooming species take over: Aster alpinus in blue-violet, Bistorta affinis forming pink ground covers, the elegant Dactylorhiza hatagirea orchid. Late August sees first hints of autumn colour. Leeches on the lower trail are a notable August feature.",
      "## September: The Golden Hour",
      "September is a secret that experienced trekkers guard carefully. The monsoon retreats, skies turn crystalline blue, and the valley floor transitions to warm amber and rust tones. The mountains emerge from cloud for the first time in months. September trail conditions are at their best — dry paths, no leeches, stable weather.",
      "## October: The Last Days",
      "The park closes by early November. October marks the final window. The valley turns red, amber, and brown as grasses prepare for winter. Snow begins to dust the ridges above 4,500 m, providing dramatic early-winter contrast.",
      "## Practical Planning Notes",
      "The trek begins from Govindghat (1,828 m) with a 13 km approach to Ghangaria (3,049 m). From Ghangaria, the valley is 3 km and 400 m above. All permits arranged by Shail Hikers as part of our packages. Accommodation in Ghangaria secures advance bookings in July and August when lodges fill weeks ahead.",
    ].join("\n\n"),
  },
];
