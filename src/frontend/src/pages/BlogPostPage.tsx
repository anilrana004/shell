import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Copy,
  Eye,
  Share2,
  Tag,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { BLOG_POSTS, type BlogPost, CATEGORY_COLORS } from "../data/blog";
import { TREKS } from "../data/treks";

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

function renderBody(body: string) {
  const lines = body.split("\n\n");
  return lines.map((line, i) => {
    const lineKey = `line-${i}-${line.slice(0, 20).replace(/\s/g, "_")}`;
    if (line.startsWith("## ")) {
      return (
        <h2
          key={lineKey}
          className="font-display text-2xl md:text-3xl font-semibold mt-10 mb-4"
          style={{ color: "#1A2A1E" }}
        >
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3
          key={lineKey}
          className="font-display text-xl font-semibold mt-8 mb-3"
          style={{ color: "#4A5E52" }}
        >
          {line.slice(4)}
        </h3>
      );
    }
    if (line.startsWith("> ")) {
      return (
        <blockquote
          key={lineKey}
          className="my-6 pl-5 py-1"
          style={{ borderLeft: "3px solid #E8541A", color: "#4A5E52" }}
        >
          <p className="text-base italic leading-relaxed">{line.slice(2)}</p>
        </blockquote>
      );
    }
    const parts = line.split(/\*\*([^*]+)\*\*/g);
    const content = parts.map((part, j) =>
      j % 2 === 1 ? (
        <strong
          key={`bold-${i}-${part}`}
          style={{ color: "#1A2A1E", fontWeight: 700 }}
        >
          {part}
        </strong>
      ) : (
        part
      ),
    );
    return (
      <p
        key={lineKey}
        className="text-base leading-loose mb-4"
        style={{ color: "#c8b4b8" }}
      >
        {content}
      </p>
    );
  });
}

export default function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <div
          className="min-h-screen flex flex-col items-center justify-center gap-6"
          style={{ background: "#EDF7F2" }}
        >
          <h1 className="font-display text-4xl" style={{ color: "#1A2A1E" }}>
            Article Not Found
          </h1>
          <p style={{ color: "#4A5E52" }}>
            This post doesn’t exist or may have been removed.
          </p>
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#E8541A" }}
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedTreks = TREKS.filter((t) =>
    post.relatedTreks.includes(t.slug),
  ).slice(0, 3);
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category,
  ).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div style={{ background: "#EDF7F2", minHeight: "100vh" }}>
        {/* Hero */}
        <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(26,42,30,0.85) 80%, #EDF7F2 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 md:px-6 pb-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs mb-5 transition-colors"
              style={{ color: "#4A5E52" }}
            >
              <ArrowLeft size={13} /> Back to Blog
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <CategoryBadge category={post.category} />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display font-semibold leading-tight mb-5"
              style={{
                color: "#1A2A1E",
                fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              }}
            >
              {post.title}
            </motion.h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: "2px solid #E8541A" }}
                />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#1A2A1E" }}
                  >
                    {post.author.name}
                  </p>
                  <p className="text-xs" style={{ color: "#4A5E5288" }}>
                    {post.author.role}
                  </p>
                </div>
              </div>
              <div
                className="flex flex-wrap items-center gap-4 text-xs"
                style={{ color: "#4A5E5288" }}
              >
                <span>{post.date}</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime} min read
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={12} />
                  {(post.views / 1000).toFixed(1)}K views
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Article body - 8 cols */}
            <article className="lg:col-span-8">
              <div>{renderBody(post.body)}</div>

              {/* Tags */}
              <div
                className="mt-12 pt-8"
                style={{ borderTop: "1px solid rgba(232,84,26,0.2)" }}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={15} style={{ color: "#E8541A" }} />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(232,84,26,0.12)",
                        color: "#4A5E52",
                        border: "1px solid rgba(232,84,26,0.25)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-14">
                  <h2
                    className="font-display text-3xl font-semibold mb-6"
                    style={{ color: "#1A2A1E" }}
                  >
                    Related Articles
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {relatedPosts.map((rp, i) => (
                      <Link
                        key={rp.slug}
                        to={`/blog/${rp.slug}` as never}
                        className="group rounded-xl overflow-hidden block transition-transform hover:-translate-y-1"
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid rgba(232,84,26,0.2)",
                        }}
                        data-ocid={`blog_post.related.item.${i + 1}`}
                      >
                        <img
                          src={rp.heroImage}
                          alt={rp.title}
                          className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="p-3">
                          <CategoryBadge category={rp.category} />
                          <p
                            className="text-sm font-semibold mt-2 line-clamp-2"
                            style={{ color: "#1A2A1E" }}
                          >
                            {rp.title}
                          </p>
                          <p
                            className="text-xs mt-1 flex items-center gap-1"
                            style={{ color: "#4A5E5266" }}
                          >
                            <Clock size={10} />
                            {rp.readTime}m read
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sticky Sidebar - 4 cols */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28 self-start">
              {/* Related Treks */}
              {relatedTreks.length > 0 && (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(232,84,26,0.2)",
                  }}
                >
                  <h3
                    className="font-display text-xl font-semibold mb-4"
                    style={{ color: "#1A2A1E" }}
                  >
                    Planning This Trek?
                  </h3>
                  <div className="space-y-3">
                    {relatedTreks.map((trek, i) => (
                      <Link
                        key={trek.slug}
                        to={`/treks/${trek.slug}` as never}
                        className="flex gap-3 group items-center"
                        data-ocid={`blog_post.related_trek.item.${i + 1}`}
                      >
                        <img
                          src={trek.heroImage}
                          alt={trek.name}
                          className="w-16 h-14 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-semibold truncate"
                            style={{ color: "#1A2A1E" }}
                          >
                            {trek.name}
                          </p>
                          <p className="text-xs" style={{ color: "#4A5E5266" }}>
                            {trek.durationDays} days · {trek.difficulty}
                          </p>
                          <p
                            className="text-xs font-bold"
                            style={{ color: "#D4A843" }}
                          >
                            From ₹{trek.basePrice.toLocaleString()}
                          </p>
                        </div>
                        <ChevronRight
                          size={14}
                          style={{ color: "#E8541A", flexShrink: 0 }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* About Author */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(232,84,26,0.2)",
                }}
              >
                <h3
                  className="font-display text-xl font-semibold mb-4"
                  style={{ color: "#1A2A1E" }}
                >
                  About the Author
                </h3>
                <div className="flex items-start gap-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    style={{ border: "2px solid #E8541A" }}
                  />
                  <div>
                    <p className="font-semibold" style={{ color: "#1A2A1E" }}>
                      {post.author.name}
                    </p>
                    <p className="text-xs mb-2" style={{ color: "#E8541A" }}>
                      {post.author.role}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#4A5E5299" }}
                    >
                      An experienced Himalayan guide with Shail Hikers, leading
                      treks across Uttarakhand since 2016.
                    </p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(232,84,26,0.2)",
                }}
              >
                <h3
                  className="font-display text-xl font-semibold mb-4"
                  style={{ color: "#1A2A1E" }}
                >
                  <Share2
                    size={16}
                    className="inline mr-2"
                    style={{ color: "#E8541A" }}
                  />
                  Share This Post
                </h3>
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                    style={{ background: "#2E7D4F", color: "#FFFFFF" }}
                    data-ocid="blog_post.share_whatsapp"
                  >
                    <span style={{ fontSize: 18 }}>&#128172;</span> Share on
                    WhatsApp
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                    style={{
                      background: "rgba(168,197,218,0.15)",
                      color: "#2E7D4F",
                      border: "1px solid rgba(168,197,218,0.25)",
                    }}
                    data-ocid="blog_post.share_twitter"
                  >
                    <span>&#120143;</span> Share on Twitter
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                    style={{
                      background: "rgba(232,84,26,0.12)",
                      color: "#4A5E52",
                      border: "1px solid rgba(232,84,26,0.25)",
                    }}
                    data-ocid="blog_post.copy_link_button"
                  >
                    <Copy size={15} /> {copied ? "Link Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>

              {/* Newsletter */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "linear-gradient(135deg, #FFFFFF, #EDF7F2)",
                  border: "1px solid rgba(232,84,26,0.3)",
                }}
              >
                <h3
                  className="font-display text-xl font-semibold mb-1"
                  style={{ color: "#1A2A1E" }}
                >
                  Trek Updates
                </h3>
                <p className="text-xs mb-4" style={{ color: "#4A5E5288" }}>
                  Get new trek guides and batch alerts in your inbox.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none mb-3"
                  style={{
                    background: "rgba(232,84,26,0.1)",
                    border: "1px solid rgba(232,84,26,0.3)",
                    color: "#1A2A1E",
                  }}
                  data-ocid="blog_post.newsletter_input"
                />
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "#E8541A", color: "#FFFFFF" }}
                  data-ocid="blog_post.newsletter_submit"
                >
                  Subscribe
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
