import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Clock,
  Eye,
  Search,
  Star,
  Tag,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { BLOG_POSTS, type BlogPost, CATEGORY_COLORS } from "../data/blog";

const ALL_TAGS = [
  "Kedarkantha",
  "Winter Trek",
  "Uttarakhand",
  "Gear",
  "Beginners",
  "Solo Trek",
  "Chardham",
  "Valley of Flowers",
  "UNESCO",
  "Snow Trek",
  "Camping",
  "High Altitude",
  "Yatra",
  "Family Trek",
  "Monsoon",
];

const POST_COUNTS: Record<BlogPost["category"], number> = {
  "Trek Tips": 2,
  "Yatra Guides": 1,
  Gear: 1,
  Stories: 1,
};

const POPULAR_POSTS = BLOG_POSTS.slice(0, 3);

const featuredPost = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];
const listPosts = BLOG_POSTS.filter((p) => p.slug !== featuredPost.slug);

function CategoryBadge({ category }: { category: BlogPost["category"] }) {
  return (
    <span
      className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
      style={{
        background: `${CATEGORY_COLORS[category]}22`,
        color: CATEGORY_COLORS[category],
        border: `1px solid ${CATEGORY_COLORS[category]}44`,
      }}
    >
      {category}
    </span>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(232,84,26,0.2)",
      }}
      data-ocid={`blog.card.item.${index + 1}`}
    >
      <Link to={`/blog/${post.slug}` as never} className="block">
        <div className="relative overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF]/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <CategoryBadge category={post.category} />
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3
            className="font-display text-xl font-semibold leading-snug mb-2 group-hover:transition-colors line-clamp-2"
            style={{ color: "#1A2A1E" }}
          >
            {post.title}
          </h3>
          <p
            className="text-sm leading-relaxed line-clamp-3 flex-1"
            style={{ color: "#4A5E5299" }}
          >
            {post.excerpt}
          </p>
          <div
            className="flex items-center gap-3 mt-4 pt-4"
            style={{ borderTop: "1px solid rgba(232,84,26,0.15)" }}
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover"
              style={{ border: "2px solid #E8541A44" }}
            />
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-medium truncate"
                style={{ color: "#1A2A1E" }}
              >
                {post.author.name}
              </p>
              <p className="text-xs" style={{ color: "#4A5E5266" }}>
                {post.date}
              </p>
            </div>
            <div
              className="flex items-center gap-3 text-xs"
              style={{ color: "#4A5E5266" }}
            >
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.readTime}m
              </span>
              <span className="flex items-center gap-1">
                <Eye size={11} />
                {(post.views / 1000).toFixed(1)}K
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = searchQuery.trim()
    ? [...BLOG_POSTS].filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    : null;

  const postsToShow = filteredPosts ?? listPosts;
  const showFeatured = !filteredPosts;

  return (
    <Layout>
      <div style={{ background: "#EDF7F2", minHeight: "100vh" }}>
        {/* Header */}
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
              Shail Hikers Journal
            </p>
            <h1
              className="font-display text-5xl md:text-7xl font-semibold mb-4"
              style={{ color: "#1A2A1E" }}
            >
              TREK STORIES &amp; GUIDES
            </h1>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "#4A5E52" }}
            >
              Expert guides, personal stories, gear reviews, and yatra wisdom
              from the Himalayan trails.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          {/* Editor's Pick */}
          {showFeatured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <div className="flex items-center gap-3 mb-5">
                <Star size={16} style={{ color: "#D4A843" }} />
                <span
                  className="text-sm font-bold tracking-[0.2em] uppercase"
                  style={{ color: "#D4A843" }}
                >
                  Editor’s Pick
                </span>
              </div>
              <Link
                to={`/blog/${featuredPost.slug}` as never}
                className="block group"
                data-ocid="blog.editors_pick_card"
              >
                <div
                  className="relative rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                  style={{ border: "1px solid rgba(201,168,76,0.3)" }}
                >
                  <img
                    src={featuredPost.heroImage}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#EDF7F2] via-[#EDF7F2]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="flex flex-wrap gap-3 items-center mb-3">
                      <CategoryBadge category={featuredPost.category} />
                      <span
                        className="text-xs px-3 py-1 rounded-full font-bold"
                        style={{
                          background: "#D4A84322",
                          color: "#D4A843",
                          border: "1px solid #D4A84344",
                        }}
                      >
                        🔥 Trending
                      </span>
                    </div>
                    <h2
                      className="font-display text-3xl md:text-5xl font-semibold leading-tight mb-3 max-w-3xl"
                      style={{ color: "#1A2A1E" }}
                    >
                      {featuredPost.title}
                    </h2>
                    <p
                      className="text-base mb-4 max-w-2xl leading-relaxed line-clamp-2"
                      style={{ color: "#4A5E52" }}
                    >
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                          style={{ border: "2px solid #E8541A" }}
                        />
                        <div>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "#1A2A1E" }}
                          >
                            {featuredPost.author.name}
                          </p>
                          <p className="text-xs" style={{ color: "#4A5E5288" }}>
                            {featuredPost.author.role}
                          </p>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-4 text-sm"
                        style={{ color: "#4A5E5288" }}
                      >
                        <span>{featuredPost.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} />
                          {featuredPost.readTime} min read
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={13} />
                          {(featuredPost.views / 1000).toFixed(1)}K views
                        </span>
                      </div>
                      <span
                        className="flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: "#E8541A" }}
                      >
                        Read Article <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Blog List — 8 cols */}
            <div className="lg:col-span-8">
              {searchQuery && (
                <p className="mb-6 text-sm" style={{ color: "#4A5E52" }}>
                  {filteredPosts?.length ?? 0} result
                  {filteredPosts?.length !== 1 ? "s" : ""} for “{searchQuery}”
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {postsToShow.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))}
                {filteredPosts && filteredPosts.length === 0 && (
                  <div
                    className="col-span-2 text-center py-16"
                    data-ocid="blog.empty_state"
                  >
                    <BookOpen
                      size={40}
                      style={{ color: "#E8541A33", margin: "0 auto 1rem" }}
                    />
                    <p style={{ color: "#4A5E52" }}>
                      No posts found for “{searchQuery}”
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar — 4 cols */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Search */}
              <div>
                <h3
                  className="font-display text-xl font-semibold mb-4"
                  style={{ color: "#1A2A1E" }}
                >
                  Search
                </h3>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#4A5E5266" }}
                  />
                  <input
                    type="text"
                    placeholder="Search articles…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(232,84,26,0.3)",
                      color: "#1A2A1E",
                    }}
                    data-ocid="blog.search_input"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3
                  className="font-display text-xl font-semibold mb-4"
                  style={{ color: "#1A2A1E" }}
                >
                  Categories
                </h3>
                <div className="space-y-2">
                  {(Object.keys(POST_COUNTS) as BlogPost["category"][]).map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        className="flex items-center justify-between px-4 py-3 rounded-xl transition-colors cursor-pointer w-full text-left"
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid rgba(232,84,26,0.15)",
                        }}
                        onClick={() => setSearchQuery(cat)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: CATEGORY_COLORS[cat] }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: "#1A2A1E" }}
                          >
                            {cat}
                          </span>
                        </div>
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${CATEGORY_COLORS[cat]}20`,
                            color: CATEGORY_COLORS[cat],
                          }}
                        >
                          {POST_COUNTS[cat]}
                        </span>
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Popular Posts */}
              <div>
                <h3
                  className="font-display text-xl font-semibold mb-4"
                  style={{ color: "#1A2A1E" }}
                >
                  <TrendingUp
                    size={18}
                    className="inline mr-2"
                    style={{ color: "#D4A843" }}
                  />
                  Popular Posts
                </h3>
                <div className="space-y-4">
                  {POPULAR_POSTS.map((post, i) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}` as never}
                      className="flex gap-3 group"
                      data-ocid={`blog.popular.item.${i + 1}`}
                    >
                      <img
                        src={post.heroImage}
                        alt={post.title}
                        className="w-20 h-16 rounded-lg object-cover flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium leading-snug line-clamp-2 group-hover:transition-colors"
                          style={{ color: "#1A2A1E" }}
                        >
                          {post.title}
                        </p>
                        <div
                          className="flex items-center gap-2 mt-1 text-xs"
                          style={{ color: "#4A5E5266" }}
                        >
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {post.readTime}m
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={10} />
                            {(post.views / 1000).toFixed(1)}K
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags Cloud */}
              <div>
                <h3
                  className="font-display text-xl font-semibold mb-4"
                  style={{ color: "#1A2A1E" }}
                >
                  <Tag
                    size={16}
                    className="inline mr-2"
                    style={{ color: "#E8541A" }}
                  />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ALL_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
                      style={{
                        background:
                          searchQuery === tag
                            ? "#E8541A"
                            : "rgba(232,84,26,0.12)",
                        color: searchQuery === tag ? "#1A2A1E" : "#4A5E52",
                        border: "1px solid rgba(232,84,26,0.3)",
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
