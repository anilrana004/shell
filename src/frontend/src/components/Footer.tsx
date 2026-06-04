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
import { Logo } from "@/components/Logo";
import { useState } from "react";

const _treks = [
  { name: "Kedarkantha", slug: "kedarkantha", color: "#2E7D4F" },
  { name: "Har Ki Dun", slug: "har-ki-dun", color: "#2E7D4F" },
  { name: "Buran Ghati", slug: "buran-ghati", color: "#E8541A" },
  { name: "Rupin Pass", slug: "rupin-pass", color: "#E8541A" },
  { name: "Bali Pass", slug: "bali-pass", color: "#E8541A" },
  { name: "Valley of Flowers", slug: "valley-of-flowers", color: "#2E7D4F" },
  { name: "Dayara Bugyal", slug: "dayara-bugyal", color: "#2E7D4F" },
  { name: "Nag Tibba", slug: "nag-tibba", color: "#2E7D4F" },
  {
    name: "Chopta Chandrashila",
    slug: "chopta-chandrashila",
    color: "#2E7D4F",
  },
  { name: "Phulara Ridge", slug: "phulara-ridge", color: "#E8541A" },
  { name: "Borasu Pass", slug: "borasu-pass", color: "#E8541A" },
  { name: "Chandernahan Lake", slug: "chandernahan-lake", color: "#2E7D4F" },
  { name: "Ruinsara Tal", slug: "ruinsara-tal", color: "#2E7D4F" },
  { name: "Chaainsheel Bugyal", slug: "chaainsheel-bugyal", color: "#2E7D4F" },
];

const FOOTER_TREKS = [
  { name: "Kedarkantha", slug: "kedarkantha", color: "#2E7D4F" },
  { name: "Har Ki Dun", slug: "har-ki-dun", color: "#2E7D4F" },
  { name: "Valley of Flowers", slug: "valley-of-flowers", color: "#2E7D4F" },
  { name: "Dayara Bugyal", slug: "dayara-bugyal", color: "#2E7D4F" },
  { name: "Nag Tibba", slug: "nag-tibba", color: "#2E7D4F" },
  {
    name: "Chopta Chandrashila",
    slug: "chopta-chandrashila",
    color: "#2E7D4F",
  },
  { name: "Chandernahan Lake", slug: "chandernahan-lake", color: "#D4A843" },
  { name: "Chaainsheel Bugyal", slug: "chaainsheel-bugyal", color: "#2E7D4F" },
  { name: "Phulara Ridge", slug: "phulara-ridge", color: "#D4A843" },
  { name: "Ruinsara Tal", slug: "ruinsara-tal", color: "#D4A843" },
  { name: "Buran Ghati", slug: "buran-ghati", color: "#E8541A" },
  { name: "Rupin Pass", slug: "rupin-pass", color: "#E8541A" },
  { name: "Bali Pass", slug: "bali-pass", color: "#E8541A" },
  { name: "Borasu Pass", slug: "borasu-pass", color: "#E8541A" },
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
    <footer style={{ background: "#2E7D4F", borderTop: "4px solid #E8541A" }} className="text-sm text-white">
      {/* Trust badges bar */}
      <div style={{ background: "#FFFFFF", borderTop: "1px solid #E8541A33" }}>
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
              style={{ color: "#1A2A1E" }}
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
            <Logo size={36} showWordmark wordmarkLight className="text-xl" />
          </Link>
          <p
            style={{ color: "rgba(255,255,255,0.7)" }}
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
                  border: "1px solid #E8541A44",
                  color: "#4A5E52",
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:border-white hover:text-white transition-all"
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
                <span style={{ color: "rgba(255,255,255,0.5)" }} className="text-[10px]">
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
            style={{ color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.2)" }}
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
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  className="hover:text-white transition-colors text-xs"
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
            style={{ color: "#1A2A1E", borderBottom: "1px solid #E8541A44" }}
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
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  className="hover:text-white transition-colors text-xs"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3
            style={{ color: "#1A2A1E", borderBottom: "1px solid #E8541A44" }}
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
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  className="hover:text-white transition-colors text-xs"
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
            style={{ color: "#1A2A1E", borderBottom: "1px solid #E8541A44" }}
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
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  className="hover:text-white transition-colors text-xs"
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
              border: "1px solid #E8541A44",
              color: "#1A2A1E",
            }}
          >
            📄 Download Press Kit
          </button>
        </div>

        {/* Col 5 — Contact + Newsletter */}
        <div>
          <h3
            style={{ color: "#1A2A1E", borderBottom: "1px solid #E8541A44" }}
            className="text-xs font-bold uppercase tracking-widest mb-5 pb-2"
          >
            Contact
          </h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <Phone
                size={13}
                style={{ color: "#FFFFFF" }}
                className="mt-0.5 flex-shrink-0"
              />
              <a
                href="tel:+918279888470"
                style={{ color: "rgba(255,255,255,0.7)" }}
                className="hover:text-white text-xs"
              >
                +91-8279888470
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail
                size={13}
                style={{ color: "#E8541A" }}
                className="mt-0.5 flex-shrink-0"
              />
              <a
                href="mailto:Shailhikers@gmail.com"
                style={{ color: "rgba(255,255,255,0.7)" }}
                className="hover:text-white text-xs break-all"
              >
                Shailhikers@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin
                size={13}
                style={{ color: "#E8541A" }}
                className="mt-0.5 flex-shrink-0"
              />
              <span style={{ color: "rgba(255,255,255,0.7)" }} className="text-xs">
                Dehradun, Uttarakhand, India
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Clock
                size={13}
                style={{ color: "#E8541A" }}
                className="mt-0.5 flex-shrink-0"
              />
              <span style={{ color: "rgba(255,255,255,0.7)" }} className="text-xs">
                Mon–Sun 7AM–10PM IST
              </span>
            </li>
          </ul>
          <p
            style={{ color: "#FFFFFF" }}
            className="text-xs font-bold mb-1 uppercase tracking-wide"
          >
            Newsletter
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-[10px] mb-3">
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
                  border: "1px solid #E8541A44",
                  color: "#1A2A1E",
                }}
                className="flex-1 text-xs px-3 py-2 rounded-l-lg outline-none placeholder:text-[#4A5E5266] focus:border-[#E8541A]"
                data-ocid="footer.newsletter_input"
              />
              <button
                type="submit"
                style={{ background: "#FFFFFF", color: "#2E7D4F" }}
                className="px-3 py-2 rounded-r-lg hover:opacity-90 transition-opacity"
                data-ocid="footer.newsletter_submit"
                aria-label="Subscribe to newsletter"
              >
                <Send size={13} style={{ color: "#FFFFFF" }} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar — payment icons + copyright */}
      <div style={{ borderTop: "1px solid #E8541A1A", background: "#1F5C39" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span
              style={{ color: "rgba(255,255,255,0.5)" }}
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
                  color: "#4A5E52",
                  border: "1px solid #E8541A22",
                }}
              >
                {p}
              </span>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-xs">
            &copy; {year} Shail Hikers. All rights reserved.{" "}
            <a
              href="https://omnistack.co.in"
              style={{ color: "rgba(255,255,255,0.7)" }}
              className="hover:text-white transition-colors"
            >
              omnistack.co.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
