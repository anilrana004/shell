import { Instagram } from "lucide-react";
import { motion } from "motion/react";

const INSTAGRAM_PHOTOS = [
  {
    id: "ig1",
    src: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=300&q=80",
    alt: "Snow-covered Kedarkantha summit with pink alpenglow",
    likes: 2341,
  },
  {
    id: "ig2",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80",
    alt: "Trekkers walking through valley at sunrise",
    likes: 1876,
  },
  {
    id: "ig3",
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&q=80",
    alt: "High-altitude camp with mountain backdrop",
    likes: 3102,
  },
  {
    id: "ig4",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&q=80",
    alt: "Valley of Flowers in full monsoon bloom",
    likes: 4287,
  },
  {
    id: "ig5",
    src: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=300&q=80",
    alt: "Crystal clear glacial lake in the Himalayas",
    likes: 1654,
  },
  {
    id: "ig6",
    src: "https://images.unsplash.com/photo-1540202403-b7abd6747a18?w=300&q=80",
    alt: "Panoramic Himalayan ridge view at golden hour",
    likes: 2890,
  },
  {
    id: "ig7",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80",
    alt: "Alpine meadow with wildflowers and distant peaks",
    likes: 1432,
  },
  {
    id: "ig8",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=80",
    alt: "Aerial view of forested valley in Uttarakhand",
    likes: 2156,
  },
  {
    id: "ig9",
    src: "https://images.unsplash.com/photo-1604537466573-5e94508fd243?w=300&q=80",
    alt: "Snow-laden deodar forest trail in winter",
    likes: 1923,
  },
  {
    id: "ig10",
    src: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=300&q=80",
    alt: "High altitude lake under dramatic storm clouds",
    likes: 3445,
  },
  {
    id: "ig11",
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&q=80",
    alt: "Ancient temple in the Himalayan mountains",
    likes: 2067,
  },
  {
    id: "ig12",
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&q=80",
    alt: "Sunset over the Ganga river in Rishikesh",
    likes: 1789,
  },
];

export function InstagramSection() {
  return (
    <section
      data-ocid="instagram.section"
      style={{ background: "#EDF7F2" }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
            >
              #ShailHikers
            </motion.h2>
            <p className="text-sm mt-1" style={{ color: "#4A5E52" }}>
              Our community captures the Himalayas
            </p>
          </div>
          <a
            href="https://instagram.com/shailhikers"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="instagram.follow_link"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{
              background: "rgba(232,84,26,0.2)",
              border: "1px solid rgba(232,84,26,0.35)",
              color: "#4A5E52",
            }}
          >
            <Instagram size={15} />
            @shailhikers · 12.4K followers
          </a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {INSTAGRAM_PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              data-ocid={`instagram.item.${i + 1}`}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
              style={{ border: "1px solid rgba(232,84,26,0.15)" }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(232,84,26,0.65)" }}
              >
                <div className="text-center">
                  <span className="text-lg">♥</span>
                  <p
                    className="text-xs font-bold mt-0.5"
                    style={{ color: "#1A2A1E" }}
                  >
                    {photo.likes.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
