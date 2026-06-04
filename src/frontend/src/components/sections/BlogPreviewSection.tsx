import { BLOG_POSTS } from "@/data/treks";
import { Link } from "@tanstack/react-router";
import { Clock, Eye, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const CATEGORY_COLORS: Record<string, string> = {
  "Trek Tips": "#E8541A",
  "Yatra Guides": "#D4A843",
  Gear: "#2E7D4F",
  Stories: "#2E7D4F",
};

export function BlogPreviewSection() {
  return (
    <section
      data-ocid="blog.section"
      style={{ background: "#FFFFFF" }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.4em] mb-3"
              style={{ color: "#E8541A" }}
            >
              From Our Experts
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
            >
              LATEST DISPATCHES
            </motion.h2>
          </div>
          <Link
            to="/blog"
            data-ocid="blog.view_all"
            className="hidden md:inline text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "#4A5E52" }}
          >
            All Articles →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => {
            const catColor = CATEGORY_COLORS[post.category] ?? "#E8541A";
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                data-ocid={`blog.card.${i + 1}`}
                className="group rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(232,84,26,0.2)" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={`${post.title} - blog article cover`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(255,255,255,0.9) 100%)",
                    }}
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
                      style={{
                        background: `${catColor}33`,
                        border: `1px solid ${catColor}55`,
                        color: catColor,
                      }}
                    >
                      {post.category}
                    </span>
                    {post.isTrending && (
                      <span
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
                        style={{
                          background: "rgba(232,84,26,0.4)",
                          color: "#1A2A1E",
                        }}
                      >
                        <TrendingUp size={9} /> Trending
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="p-5"
                  style={{ background: "rgba(255,255,255,0.8)" }}
                >
                  <h3
                    className="text-base font-semibold mb-2 leading-snug group-hover:opacity-80 transition-opacity"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#1A2A1E",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed mb-4 line-clamp-2"
                    style={{ color: "#4A5E52" }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "#4A5E5260" }}
                      >
                        <Clock size={10} /> {post.readTime} min read
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "#4A5E5260" }}
                      >
                        <Eye size={10} /> {post.views.toLocaleString()}
                      </span>
                    </div>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      data-ocid={`blog.read.${i + 1}`}
                      className="text-xs font-semibold transition-colors hover:opacity-70"
                      style={{ color: "#E8541A" }}
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
