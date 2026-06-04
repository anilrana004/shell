import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  Mountain,
  Play,
  Plus,
  Share2,
  User2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "../components/Layout";

type FilterTab =
  | "All"
  | "Treks"
  | "Yatras"
  | "Wildlife"
  | "Camps"
  | "Summits"
  | "Corporate";

interface Photo {
  id: number;
  url: string;
  thumb: string;
  category: FilterTab;
  location: string;
  altitude: string;
  photographer: string;
  title: string;
}

interface Video {
  id: number;
  thumb: string;
  title: string;
  duration: string;
  views: string;
  youtubeId: string;
}

const PHOTOS: Photo[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=75",
    category: "Summits",
    location: "Kedarkantha Summit",
    altitude: "12,500 ft",
    photographer: "Deepak Rawat",
    title: "Kedarkantha Summit Dawn",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75",
    category: "Treks",
    location: "Kedarkantha Trail",
    altitude: "10,200 ft",
    photographer: "Amit Negi",
    title: "Snow-Laden Pine Forest",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=75",
    category: "Treks",
    location: "Har Ki Dun Valley",
    altitude: "11,675 ft",
    photographer: "Priya Sharma",
    title: "Valley of the Gods",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=75",
    category: "Summits",
    location: "Buran Ghati Pass",
    altitude: "15,328 ft",
    photographer: "Vikram Singh",
    title: "High Pass Crossing",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=600&q=75",
    category: "Treks",
    location: "Chandernahan Lake",
    altitude: "14,100 ft",
    photographer: "Sunita Bisht",
    title: "Sacred Mirror Lake",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1544132583786-2b82cca7f5d7?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1544132583786-2b82cca7f5d7?w=600&q=75",
    category: "Yatras",
    location: "Kedarnath Temple",
    altitude: "11,755 ft",
    photographer: "Deepak Rawat",
    title: "Sacred Kedarnath Dham",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=75",
    category: "Treks",
    location: "Valley of Flowers",
    altitude: "11,500 ft",
    photographer: "Sunita Bisht",
    title: "Wildflower Bloom — July",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=600&q=75",
    category: "Wildlife",
    location: "Govind Wildlife Sanctuary",
    altitude: "9,800 ft",
    photographer: "Amit Negi",
    title: "Himalayan Monal Pheasant",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=75",
    category: "Camps",
    location: "Kedarkantha Base Camp",
    altitude: "11,250 ft",
    photographer: "Priya Sharma",
    title: "Starlit Camp at Base",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=75",
    category: "Treks",
    location: "Rupin Pass Trail",
    altitude: "14,100 ft",
    photographer: "Vikram Singh",
    title: "Waterfall Canyon Traverse",
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=75",
    category: "Camps",
    location: "Dayara Bugyal",
    altitude: "12,000 ft",
    photographer: "Sunita Bisht",
    title: "Morning Mist at Camp",
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600&q=75",
    category: "Corporate",
    location: "Nag Tibba",
    altitude: "9,915 ft",
    photographer: "Deepak Rawat",
    title: "Team Corporate Batch",
  },
  {
    id: 13,
    url: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=600&q=75",
    category: "Wildlife",
    location: "Chopta Meadows",
    altitude: "10,760 ft",
    photographer: "Amit Negi",
    title: "Himalayan Langur at Sunrise",
  },
  {
    id: 14,
    url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=600&q=75",
    category: "Summits",
    location: "Bali Pass",
    altitude: "16,207 ft",
    photographer: "Vikram Singh",
    title: "Summit Ridge — Bali Pass",
  },
  {
    id: 15,
    url: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=600&q=75",
    category: "Treks",
    location: "Phulara Ridge",
    altitude: "12,500 ft",
    photographer: "Priya Sharma",
    title: "Endless Ridge Walk",
  },
  {
    id: 16,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=75",
    category: "Corporate",
    location: "Kedarkantha",
    altitude: "12,500 ft",
    photographer: "Deepak Rawat",
    title: "Corporate Team Summit",
  },
  {
    id: 17,
    url: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&q=75",
    category: "Yatras",
    location: "Gangotri Temple",
    altitude: "10,000 ft",
    photographer: "Priya Sharma",
    title: "Gangotri at Dawn",
  },
  {
    id: 18,
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=75",
    category: "Camps",
    location: "Borasu Pass Base",
    altitude: "13,200 ft",
    photographer: "Amit Negi",
    title: "Twilight Camp — High Altitude",
  },
  {
    id: 19,
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=75",
    category: "Wildlife",
    location: "Ruinsara Tal",
    altitude: "12,697 ft",
    photographer: "Sunita Bisht",
    title: "Blue Sheep on Rocky Slope",
  },
  {
    id: 20,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=75",
    category: "Treks",
    location: "Har Ki Dun Forest",
    altitude: "8,200 ft",
    photographer: "Vikram Singh",
    title: "Silver Birch at Seema Camp",
  },
  {
    id: 21,
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=75",
    category: "Summits",
    location: "Chopta Chandrashila",
    altitude: "13,100 ft",
    photographer: "Deepak Rawat",
    title: "Chandrashila Summit",
  },
  {
    id: 22,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75",
    category: "Yatras",
    location: "Rishikesh Ganga",
    altitude: "1,360 ft",
    photographer: "Priya Sharma",
    title: "Rishikesh at Sunrise",
  },
  {
    id: 23,
    url: "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?w=600&q=75",
    category: "Corporate",
    location: "Nag Tibba Summit",
    altitude: "9,915 ft",
    photographer: "Amit Negi",
    title: "Group Achievement Moment",
  },
  {
    id: 24,
    url: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&q=75",
    category: "Wildlife",
    location: "Valley of Flowers NP",
    altitude: "11,500 ft",
    photographer: "Sunita Bisht",
    title: "Brahma Kamal — State Flower",
  },
  {
    id: 25,
    url: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=600&q=75",
    category: "Camps",
    location: "Rupin Pass Camp",
    altitude: "11,000 ft",
    photographer: "Vikram Singh",
    title: "Campfire Circle — Night Camp",
  },
  {
    id: 26,
    url: "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=600&q=75",
    category: "Treks",
    location: "Dayara Bugyal",
    altitude: "11,500 ft",
    photographer: "Priya Sharma",
    title: "Alpine Meadow Expanse",
  },
  {
    id: 27,
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=75",
    category: "Summits",
    location: "Kedarkantha Summit",
    altitude: "12,500 ft",
    photographer: "Amit Negi",
    title: "Panoramic Himalayan Vista",
  },
  {
    id: 28,
    url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=75",
    category: "Treks",
    location: "Bali Pass Glacier",
    altitude: "14,000 ft",
    photographer: "Deepak Rawat",
    title: "Glacier Lake Reflection",
  },
  {
    id: 29,
    url: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=75",
    category: "Camps",
    location: "Chopta Base Camp",
    altitude: "10,760 ft",
    photographer: "Sunita Bisht",
    title: "Tent City Under Stars",
  },
  {
    id: 30,
    url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&q=75",
    category: "Yatras",
    location: "Badrinath Temple",
    altitude: "10,279 ft",
    photographer: "Vikram Singh",
    title: "Badrinath — Final Dham",
  },
];

const COMMUNITY_PHOTOS = [
  {
    id: 101,
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    name: "Rahul M.",
    trek: "Kedarkantha",
  },
  {
    id: 102,
    url: "https://images.unsplash.com/photo-1527824404775-dce343159efc?w=600&q=80",
    name: "Anjali S.",
    trek: "Har Ki Dun",
  },
  {
    id: 103,
    url: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=600&q=80",
    name: "Karan P.",
    trek: "Valley of Flowers",
  },
  {
    id: 104,
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&q=80",
    name: "Meera T.",
    trek: "Chopta",
  },
  {
    id: 105,
    url: "https://images.unsplash.com/photo-1540206395-68808572332f?w=600&q=80",
    name: "Siddharth R.",
    trek: "Buran Ghati",
  },
];

const VIDEOS: Video[] = [
  {
    id: 1,
    thumb:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80",
    title: "Kedarkantha Winter Summit — Full Highlights",
    duration: "3:42",
    views: "24.8K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    thumb:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    title: "Har Ki Dun — Valley of the Gods Trek Vlog",
    duration: "8:15",
    views: "18.2K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    thumb:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    title: "Buran Ghati Snow Rappel — 4K Drone",
    duration: "5:28",
    views: "31.5K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    thumb:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    title: "Valley of Flowers — July Wildflower Bloom",
    duration: "6:10",
    views: "15.9K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 5,
    thumb:
      "https://images.unsplash.com/photo-1544132583786-2b82cca7f5d7?w=600&q=80",
    title: "Chardham Yatra 2024 — Complete Tour",
    duration: "12:04",
    views: "42.1K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 6,
    thumb:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    title: "Rupin Pass Trek — Day by Day Journey",
    duration: "9:55",
    views: "22.3K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 7,
    thumb:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    title: "Night Sky at Kedarkantha Base Camp",
    duration: "2:18",
    views: "11.7K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 8,
    thumb:
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600&q=80",
    title: "Corporate Trek — Team Infosys at Kedarkantha",
    duration: "4:45",
    views: "8.4K",
    youtubeId: "dQw4w9WgXcQ",
  },
];

const FILTERS: FilterTab[] = [
  "All",
  "Treks",
  "Yatras",
  "Wildlife",
  "Camps",
  "Summits",
  "Corporate",
];

const PHOTO_OF_MONTH = PHOTOS[0];

function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = photos[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ background: "rgba(10,6,8,0.96)" }}
        onClick={onClose}
      >
        {/* Controls */}
        <div
          className="absolute top-4 right-4 flex gap-3 z-10"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Download photo"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: "rgba(232,84,26,0.2)",
              border: "1px solid #E8541A44",
              color: "#1A2A1E",
            }}
            onClick={() => window.open(photo.url, "_blank")}
          >
            <Download size={16} />
          </button>
          <button
            type="button"
            aria-label="Share photo"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: "rgba(232,84,26,0.2)",
              border: "1px solid #E8541A44",
              color: "#1A2A1E",
            }}
            onClick={() =>
              navigator.share?.({ title: photo.title, url: photo.url })
            }
          >
            <Share2 size={16} />
          </button>
          <button
            type="button"
            aria-label="Close lightbox"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: "rgba(232,84,26,0.3)",
              border: "1px solid #E8541A",
              color: "#1A2A1E",
            }}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Prev/Next */}
        <button
          type="button"
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
          style={{
            background: "rgba(232,84,26,0.25)",
            border: "1px solid #E8541A66",
            color: "#1A2A1E",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
          style={{
            background: "rgba(232,84,26,0.25)",
            border: "1px solid #E8541A66",
            color: "#1A2A1E",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          <ChevronRight size={22} />
        </button>

        {/* Image */}
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl max-h-[80vh] mx-16"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.url}
            alt={photo.title}
            className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"
          />
          {/* Metadata */}
          <div
            className="mt-4 flex flex-wrap gap-4 items-center justify-center text-sm"
            style={{ color: "#4A5E52" }}
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={13} style={{ color: "#E8541A" }} />
              {photo.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mountain size={13} style={{ color: "#D4A843" }} />
              {photo.altitude}
            </span>
            <span className="flex items-center gap-1.5">
              <User2 size={13} style={{ color: "#2E7D4F" }} />
              {photo.photographer}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(232,84,26,0.2)",
                color: "#1A2A1E",
                border: "1px solid #E8541A44",
              }}
            >
              {photo.category}
            </span>
          </div>
          <p
            className="text-center mt-2 font-display text-lg"
            style={{ color: "#1A2A1E" }}
          >
            {photo.title}
          </p>
          <p
            className="text-center text-xs mt-1"
            style={{ color: "#4A5E5266" }}
          >
            {index + 1} / {photos.length}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [showVideo, setShowVideo] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeTab === "All"
      ? PHOTOS
      : PHOTOS.filter((p) => p.category === activeTab);

  const openLightbox = (photoId: number) => {
    const idx = filtered.findIndex((p) => p.id === photoId);
    setLightboxIndex(idx);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );
  const nextPhoto = useCallback(
    () =>
      setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length],
  );

  return (
    <Layout>
      <div style={{ background: "#EDF7F2", minHeight: "100vh" }}>
        {/* Page Header */}
        <div
          className="relative py-20 text-center overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #EDF7F2 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-sm font-medium tracking-[0.3em] uppercase mb-3"
              style={{ color: "#E8541A" }}
            >
              Shail Hikers
            </p>
            <h1
              className="font-display text-5xl md:text-7xl font-semibold mb-4"
              style={{ color: "#1A2A1E" }}
            >
              OUR VISUAL JOURNEY
            </h1>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "#4A5E52" }}
            >
              10,000+ trekkers. 14 legendary trails. Thousands of moments
              captured in the Himalayas.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          {/* Photo of the Month */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                style={{ background: "#E8541A", color: "#FFFFFF" }}
              >
                📸 Photo of the Month
              </span>
              <span className="text-sm" style={{ color: "#4A5E52" }}>
                January 2025
              </span>
            </div>
            <button
              type="button"
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ border: "1px solid rgba(232,84,26,0.3)" }}
              onClick={() => openLightbox(PHOTO_OF_MONTH.id)}
              data-ocid="gallery.photo_of_month"
            >
              <img
                src={PHOTO_OF_MONTH.url}
                alt={PHOTO_OF_MONTH.title}
                className="w-full h-72 md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex flex-wrap gap-3 mb-3">
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: "#E8541A", color: "#FFFFFF" }}
                  >
                    {PHOTO_OF_MONTH.category}
                  </span>
                </div>
                <h2
                  className="font-display text-3xl md:text-5xl font-semibold mb-2"
                  style={{ color: "#1A2A1E" }}
                >
                  {PHOTO_OF_MONTH.title}
                </h2>
                <div
                  className="flex flex-wrap gap-4 text-sm"
                  style={{ color: "#4A5E52" }}
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    {PHOTO_OF_MONTH.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mountain size={13} style={{ color: "#D4A843" }} />
                    {PHOTO_OF_MONTH.altitude}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User2 size={13} />
                    By {PHOTO_OF_MONTH.photographer}
                  </span>
                </div>
              </div>
            </button>
          </motion.div>

          {/* Filter Bar + Video Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div
              className="flex gap-1 overflow-x-auto pb-1"
              data-ocid="gallery.filter_tabs"
            >
              {FILTERS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setShowVideo(false);
                  }}
                  data-ocid={`gallery.filter.${tab.toLowerCase()}`}
                  className="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all"
                  style={{
                    color:
                      activeTab === tab && !showVideo ? "#1A2A1E" : "#4A5E52",
                    background:
                      activeTab === tab && !showVideo
                        ? "rgba(232,84,26,0.2)"
                        : "transparent",
                    borderBottom:
                      activeTab === tab && !showVideo
                        ? "2px solid #E8541A"
                        : "2px solid transparent",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowVideo((v) => !v)}
              data-ocid="gallery.video_toggle"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0"
              style={{
                background: showVideo ? "#E8541A" : "rgba(232,84,26,0.15)",
                color: "#1A2A1E",
                border: "1px solid rgba(232,84,26,0.4)",
              }}
            >
              <Play size={15} />
              {showVideo ? "Show Photos" : "Video Gallery"}
            </button>
          </div>

          {/* Results count */}
          {!showVideo && (
            <p className="text-sm mb-6" style={{ color: "#4A5E5299" }}>
              Showing {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
              {activeTab !== "All" ? ` in ${activeTab}` : ""}
            </p>
          )}

          {/* Photo Masonry Grid */}
          {!showVideo && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                columns: "var(--gallery-cols, 2)",
                columnGap: "1rem",
              }}
              className="[--gallery-cols:2] md:[--gallery-cols:3]"
            >
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.07 }}
                  className="break-inside-avoid mb-4 group relative rounded-xl overflow-hidden cursor-pointer"
                  style={{ border: "1px solid rgba(232,84,26,0.15)" }}
                  onClick={() => openLightbox(photo.id)}
                  data-ocid={`gallery.photo.item.${i + 1}`}
                >
                  <img
                    src={photo.thumb}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105 block"
                    style={{ display: "block" }}
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(255,255,255,0.92) 0%, transparent 60%)",
                    }}
                  >
                    <p
                      className="font-display text-sm font-semibold truncate"
                      style={{ color: "#1A2A1E" }}
                    >
                      {photo.title}
                    </p>
                    <div
                      className="flex items-center gap-2 mt-1"
                      style={{ color: "#4A5E52" }}
                    >
                      <span className="flex items-center gap-1 text-xs">
                        <MapPin size={10} />
                        {photo.location}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "#D4A843" }}
                      >
                        <Mountain size={10} />
                        {photo.altitude}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#2E7D4F" }}>
                      📷 {photo.photographer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Video Gallery Grid */}
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {VIDEOS.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative rounded-xl overflow-hidden cursor-pointer"
                  style={{ border: "1px solid rgba(232,84,26,0.2)" }}
                  data-ocid={`gallery.video.item.${i + 1}`}
                  onClick={() =>
                    window.open(
                      `https://youtube.com/watch?v=${video.youtubeId}`,
                      "_blank",
                    )
                  }
                >
                  <img
                    src={video.thumb}
                    alt={video.title}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(232,84,26,0.9)",
                        boxShadow: "0 0 30px rgba(232,84,26,0.5)",
                      }}
                    >
                      <Play
                        size={22}
                        style={{ color: "#1A2A1E", marginLeft: 3 }}
                        fill="#1A2A1E"
                      />
                    </div>
                  </div>
                  <div
                    className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded font-mono"
                    style={{
                      background: "rgba(26,42,30,0.85)",
                      color: "#1A2A1E",
                    }}
                  >
                    {video.duration}
                  </div>
                  <div className="p-3" style={{ background: "#FFFFFF" }}>
                    <p
                      className="text-sm font-medium leading-snug line-clamp-2"
                      style={{ color: "#1A2A1E" }}
                    >
                      {video.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#4A5E52" }}>
                      {video.views} views
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Trekker Submitted Photos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  className="font-display text-3xl md:text-4xl font-semibold"
                  style={{ color: "#1A2A1E" }}
                >
                  Trekker-Submitted Photos
                </h2>
                <p className="text-sm mt-1" style={{ color: "#4A5E52" }}>
                  Moments captured by our community of Himalayan adventurers
                </p>
              </div>
              <Camera size={28} style={{ color: "#E8541A" }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {COMMUNITY_PHOTOS.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative rounded-xl overflow-hidden group"
                  style={{ border: "1px solid rgba(232,84,26,0.2)" }}
                  data-ocid={`gallery.community.item.${i + 1}`}
                >
                  <img
                    src={photo.url}
                    alt={`${photo.name} — ${photo.trek}`}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#1A2A1E" }}
                    >
                      {photo.name}
                    </p>
                    <p className="text-xs" style={{ color: "#4A5E52" }}>
                      {photo.trek}
                    </p>
                  </div>
                </motion.div>
              ))}
              {/* Submit card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: COMMUNITY_PHOTOS.length * 0.08 }}
                className="relative rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3 h-48 cursor-pointer group transition-all"
                style={{
                  border: "2px dashed rgba(232,84,26,0.4)",
                  background: "rgba(232,84,26,0.06)",
                }}
                data-ocid="gallery.submit_photo_button"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(232,84,26,0.2)",
                    border: "1px solid #E8541A44",
                  }}
                >
                  <Plus size={22} style={{ color: "#E8541A" }} />
                </div>
                <div className="text-center">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#1A2A1E" }}
                  >
                    Submit Your Photo
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#4A5E52" }}>
                    Share your Himalayan moments
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </Layout>
  );
}
