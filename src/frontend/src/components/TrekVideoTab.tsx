import type { TrekData } from "@/types";

interface Props {
  trek: TrekData;
}

const VIDEO_SECTIONS = [
  {
    title: "Trek Highlights Reel",
    desc: "3-minute cinematic overview of the full trek experience",
    duration: "3:12",
    views: "24.8K",
    thumb:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80",
  },
  {
    title: "Full Day Vlogs - Playlist",
    desc: "Day-by-day video logs from our previous trekkers",
    duration: "Playlist",
    views: "12.1K",
    thumb:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  },
  {
    title: "Guide Introduction",
    desc: "Lead guide speaks about what to expect on this trek",
    duration: "2:05",
    views: "8.3K",
    thumb:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    title: "Safety Briefing Video",
    desc: "Complete safety protocols, altitude sickness prevention, emergency procedures",
    duration: "5:30",
    views: "18.2K",
    thumb:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
  },
  {
    title: "Trekker Testimonials",
    desc: "Before and after stories from trekkers who completed this trail",
    duration: "4:45",
    views: "31.6K",
    thumb:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
  },
  {
    title: "Drone Footage - Aerial",
    desc: "Breathtaking drone b-roll of the complete trek route from above",
    duration: "6:20",
    views: "45.2K",
    thumb:
      "https://images.unsplash.com/photo-1540202403-b7abd6747a18?w=600&q=80",
  },
];

export default function TrekVideoTab({ trek }: Props) {
  return (
    <div className="py-8 space-y-8">
      <h2 className="font-display text-3xl" style={{ color: "#1A2A1E" }}>
        Videos - {trek.name}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIDEO_SECTIONS.map((video) => (
          <div
            key={video.title}
            className="rounded-2xl overflow-hidden border group cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.9)",
              borderColor: "#4A5E5222",
            }}
          >
            <div className="relative">
              <img
                src={video.thumb}
                alt={video.title}
                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.5)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: "rgba(232,84,26,0.9)" }}
                >
                  <span className="text-2xl ml-1" style={{ color: "#1A2A1E" }}>
                    &#9654;
                  </span>
                </div>
              </div>
              <div
                className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  color: "#1A2A1E",
                }}
              >
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <div
                className="font-semibold text-sm mb-1"
                style={{ color: "#1A2A1E" }}
              >
                {video.title}
              </div>
              <div className="text-xs mb-2" style={{ color: "#4A5E52" }}>
                {video.desc}
              </div>
              <div className="text-xs" style={{ color: "#4A5E5288" }}>
                {video.views} views
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
