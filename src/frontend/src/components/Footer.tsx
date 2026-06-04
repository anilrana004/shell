import { Link } from "@tanstack/react-router";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";

const _treks = [
  { name: "Kedarkantha", slug: "kedarkantha", color: "#2D6A4F" },
  { name: "Har Ki Dun", slug: "har-ki-dun", color: "#2D6A4F" },
  { name: "Buran Ghati", slug: "buran-ghati", color: "#F88379" },
  { name: "Rupin Pass", slug: "rupin-pass", color: "#F88379" },
  { name: "Bali Pass", slug: "bali-pass", color: "#F88379" },
  { name: "Valley of Flowers", slug: "valley-of-flowers", color: "#2D6A4F" },
  { name: "Dayara Bugyal", slug: "dayara-bugyal", color: "#2D6A4F" },
  { name: "Nag Tibba", slug: "nag-tibba", color: "#2D6A4F" },
  {
    name: "Chopta Chandrashila",
    slug: "chopta-chandrashila",
    color: "#2D6A4F",
  },
  { name: "Phulara Ridge", slug: "phulara-ridge", color: "#F88379" },
  { name: "Borasu Pass", slug: "borasu-pass", color: "#F88379" },
  { name: "Chandernahan Lake", slug: "chandernahan-lake", color: "#2D6A4F" },
  { name: "Ruinsara Tal", slug: "ruinsara-tal", color: "#2D6A4F" },
  { name: "Chaainsheel Bugyal", slug: "chaainsheel-bugyal", color: "#2D6A4F" },
];

const FOOTER_TREKS = [
  { name: "Kedarkantha", slug: "kedarkantha", color: "#2D6A4F" },
  { name: "Har Ki Dun", slug: "har-ki-dun", color: "#2D6A4F" },
  { name: "Valley of Flowers", slug: "valley-of-flowers", color: "#2D6A4F" },
  { name: "Dayara Bugyal", slug: "dayara-bugyal", color: "#2D6A4F" },
  { name: "Nag Tibba", slug: "nag-tibba", color: "#2D6A4F" },
  {
    name: "Chopta Chandrashila",
    slug: "chopta-chandrashila",
    color: "#2D6A4F",
  },
  { name: "Chandernahan Lake", slug: "chandernahan-lake", color: "#D4A843" },
  { name: "Chaainsheel Bugyal", slug: "chaainsheel-bugyal", color: "#2D6A4F" },
  { name: "Phulara Ridge", slug: "phulara-ridge", color: "#D4A843" },
  { name: "Ruinsara Tal", slug: "ruinsara-tal", color: "#D4A843" },
  { name: "Buran Ghati", slug: "buran-ghati", color: "#F88379" },
  { name: "Rupin Pass", slug: "rupin-pass", color: "#F88379" },
  { name: "Bali Pass", slug: "bali-pass", color: "#F88379" },
  { name: "Borasu Pass", slug: "borasu-pass", color: "#F88379" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer style={{ background: "#E6D8C4" }} className="text-sm">
      {/* Trust badges bar */}
      <div style={{ background: "#FFFFFF", borderTop: "1px solid #F8837933" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-8">
          {[
            { icon: "★", label: "10,000+ Happy Trekkers" },
            { icon: "★", label: "Since 2015" },
            { icon: "★", label: "ITBP-Certified Guides" },
            { icon: "★", label: "24/7 Support" },
            { icon: "★", label: "100% Safe Record" },
            { icon: "★", label: "₹10L Group Insurance" },
          ].map((t) => (
            <span
              key={t.label}
              className="flex items-center gap-2 font-medium tracking-wide text-xs uppercase"
              style={{ color: "#1A1A1A" }}
            >
              <span style={{ color: "#D4A843" }}>{t.icon}</span>
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1 — Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 40 40"
              fill="none"
              role="img"
              aria-label="Shail Hikers mountain logo"
            >
              <path d="M20 4L36 34H4L20 4Z" fill="#F88379" />
              <path d="M20 14L28 34H12L20 14Z" fill="#E6D8C4" opacity="0.5" />
              <circle cx="20" cy="34" r="2" fill="#D4A843" />
            </svg>
            <span
              style={{ color: "#1A1A1A", fontFamily: "var(--font-display)" }}
              className="text-xl font-semibold tracking-widest uppercase"
            >
              Shail Hikers
            </span>
          </Link>
          <p
            style={{ color: "#4A4A4A" }}
            className="text-xs leading-relaxed mb-6"
          >
            Uttarakhand's finest Himalayan trekking company. Crafting
            extraordinary journeys across the high Himalayas since 2015.
          </p>
          <div className="flex gap-3 mb-6">
            {[
              {
                icon: <Instagram size={15} />,
                href: "https://instagram.com/shailhikers",
                label: "Instagram",
              },
              { icon: <Facebook size={15} />, href: "#", label: "Facebook" },
              { icon: <Youtube size={15} />, href: "#", label: "YouTube" },
              { icon: <Twitter size={15} />, href: "#", label: "Twitter" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #F8837944",
                  color: "#4A4A4A",
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:border-[#F88379] hover:text-[#1A1A1A] transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="space-y-1.5">
            {[
              "Ministry of Tourism Reg.",
              "AATO Member",
              "UK Tourism Licensed",
            ].map((c) => (
              <div key={c} className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#D4A843" }}
                />
                <span style={{ color: "#4A4A4A77" }} className="text-[10px]">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2 — Treks (all 14 with colored difficulty dots) */}
        <div>
          <h3
            className="text-xs font-bold uppercase tracking-widest mb-5 pb-2"
            style={{ color: "#1A1A1A", borderBottom: "1px solid #F8837944" }}
          >
            Treks
          </h3>
          <ul className="space-y-2">
            {FOOTER_TREKS.map((t) => (
              <li key={t.slug} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: t.color }}
                />
                <Link
                  to="/treks/$slug"
                  params={{ slug: t.slug }}
                  style={{ color: "#4A4A4A" }}
                  className="hover:text-[#1A1A1A] transition-colors text-xs"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Yatras + Packages */}
        <div>
          <h3
            style={{ color: "#1A1A1A", borderBottom: "1px solid #F8837944" }}
            className="text-xs font-bold uppercase tracking-widest mb-5 pb-2"
          >
            Yatras & Tours
          </h3>
          <ul className="space-y-2 mb-6">
            {[
              { label: "Chardham Yatra", to: "/yatras/chardham-yatra" },
              { label: "Do Dham Yatra", to: "/yatras/do-dham-yatra" },
              { label: "Mussoorie Tour", to: "/yatras/mussoorie-tour" },
              { label: "Rishikesh Tour", to: "/yatras/rishikesh-tour" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to as "/"}
                  style={{ color: "#4A4A4A" }}
                  className="hover:text-[#1A1A1A] transition-colors text-xs"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3
            style={{ color: "#1A1A1A", borderBottom: "1px solid #F8837944" }}
            className="text-xs font-bold uppercase tracking-widest mb-3 pb-2"
          >
            Explore
          </h3>
          <ul className="space-y-2">
            {[
              { label: "All Packages", to: "/packages" },
              { label: "Corporate Groups", to: "/corporate" },
              { label: "Trek Finder Quiz", to: "/trek-finder" },
              { label: "Compare Treks", to: "/compare" },
              { label: "Gallery", to: "/gallery" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to as "/"}
                  style={{ color: "#4A4A4A" }}
                  className="hover:text-[#1A1A1A] transition-colors text-xs"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Company */}
        <div>
          <h3
            style={{ color: "#1A1A1A", borderBottom: "1px solid #F8837944" }}
            className="text-xs font-bold uppercase tracking-widest mb-5 pb-2"
          >
            Company
          </h3>
          <ul className="space-y-2.5">
            {[
              { label: "About Us", to: "/about" },
              { label: "Our Team", to: "/team" },
              { label: "Blog", to: "/blog" },
              { label: "Contact Us", to: "/contact" },
              { label: "Cancellation Policy", to: "/cancellation-policy" },
              { label: "Terms & Conditions", to: "/terms" },
              { label: "Privacy Policy", to: "/privacy" },
              { label: "Sitemap", to: "/sitemap" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to as "/"}
                  style={{ color: "#4A4A4A" }}
                  className="hover:text-[#1A1A1A] transition-colors text-xs"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-5 flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            style={{
              background: "#FFFFFF",
              border: "1px solid #F8837944",
              color: "#1A1A1A",
            }}
          >
            📄 Download Press Kit
          </button>
        </div>

        {/* Col 5 — Contact + Newsletter */}
        <div>
          <h3
            style={{ color: "#1A1A1A", borderBottom: "1px solid #F8837944" }}
            className="text-xs font-bold uppercase tracking-widest mb-5 pb-2"
          >
            Contact
          </h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <Phone
                size={13}
                style={{ color: "#F88379" }}
                className="mt-0.5 flex-shrink-0"
              />
              <a
                href="tel:+918279888470"
                style={{ color: "#4A4A4A" }}
                className="hover:text-[#1A1A1A] text-xs"
              >
                +91-8279888470
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail
                size={13}
                style={{ color: "#F88379" }}
                className="mt-0.5 flex-shrink-0"
              />
              <a
                href="mailto:Shailhikers@gmail.com"
                style={{ color: "#4A4A4A" }}
                className="hover:text-[#1A1A1A] text-xs break-all"
              >
                Shailhikers@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin
                size={13}
                style={{ color: "#F88379" }}
                className="mt-0.5 flex-shrink-0"
              />
              <span style={{ color: "#4A4A4A" }} className="text-xs">
                Dehradun, Uttarakhand, India
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Clock
                size={13}
                style={{ color: "#F88379" }}
                className="mt-0.5 flex-shrink-0"
              />
              <span style={{ color: "#4A4A4A" }} className="text-xs">
                Mon–Sun 7AM–10PM IST
              </span>
            </li>
          </ul>
          <p
            style={{ color: "#1A1A1A" }}
            className="text-xs font-bold mb-1 uppercase tracking-wide"
          >
            Newsletter
          </p>
          <p style={{ color: "#4A4A4A66" }} className="text-[10px] mb-3">
            Join 8,000+ trekkers for tips &amp; offers
          </p>
          {subscribed ? (
            <p className="text-xs font-semibold" style={{ color: "#D4A843" }}>
              🏔 You're subscribed! Welcome to the tribe.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #F8837944",
                  color: "#1A1A1A",
                }}
                className="flex-1 text-xs px-3 py-2 rounded-l-lg outline-none placeholder:text-[#4A4A4A66] focus:border-[#F88379]"
                data-ocid="footer.newsletter_input"
              />
              <button
                type="submit"
                style={{ background: "#F88379" }}
                className="px-3 py-2 rounded-r-lg hover:opacity-90 transition-opacity"
                data-ocid="footer.newsletter_submit"
                aria-label="Subscribe to newsletter"
              >
                <Send size={13} style={{ color: "#1A1A1A" }} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar — payment icons + copyright */}
      <div style={{ borderTop: "1px solid #F883791A", background: "#150A0C" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span
              style={{ color: "#4A4A4A66" }}
              className="text-[10px] uppercase tracking-wider mr-1"
            >
              Secure Payments:
            </span>
            {[
              "Razorpay",
              "UPI",
              "Visa",
              "Mastercard",
              "RuPay",
              "NetBanking",
            ].map((p) => (
              <span
                key={p}
                className="text-[10px] px-2 py-0.5 rounded font-medium"
                style={{
                  background: "#FFFFFF",
                  color: "#4A4A4A",
                  border: "1px solid #F8837922",
                }}
              >
                {p}
              </span>
            ))}
          </div>
          <p style={{ color: "#4A4A4A66" }} className="text-xs">
            &copy; {year} Shail Hikers. All rights reserved.{" "}
            <a
              href="https://omnistack.co.in"
              style={{ color: "#F88379" }}
              className="hover:text-[#1A1A1A] transition-colors"
            >
              omnistack.co.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
