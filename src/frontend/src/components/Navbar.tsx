import { type AnnouncementPublic, createActor } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  Briefcase,
  ChevronDown,
  HelpCircle,
  Image,
  Info,
  Mountain,
  Phone,
  Search,
  Shield,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const AnnouncementText: React.FC<{ html: string }> = ({ html }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (spanRef.current) spanRef.current.innerHTML = html;
  }, [html]);
  return <span ref={spanRef} />;
};

const ALL_TREKS = [
  {
    name: "Kedarkantha",
    slug: "kedarkantha",
    difficulty: "Easy",
    price: "Rs 5,999",
    color: "#2D6A4F",
    altitude: "12,500 ft",
    days: 6,
  },
  {
    name: "Har Ki Dun",
    slug: "har-ki-dun",
    difficulty: "Easy",
    price: "Rs 6,499",
    color: "#2D6A4F",
    altitude: "11,670 ft",
    days: 7,
  },
  {
    name: "Valley of Flowers",
    slug: "valley-of-flowers",
    difficulty: "Moderate",
    price: "Rs 7,499",
    color: "#D4A843",
    altitude: "14,100 ft",
    days: 7,
  },
  {
    name: "Dayara Bugyal",
    slug: "dayara-bugyal",
    difficulty: "Easy",
    price: "Rs 5,499",
    color: "#2D6A4F",
    altitude: "12,000 ft",
    days: 5,
  },
  {
    name: "Nag Tibba",
    slug: "nag-tibba",
    difficulty: "Easy",
    price: "Rs 3,499",
    color: "#2D6A4F",
    altitude: "9,915 ft",
    days: 2,
  },
  {
    name: "Chopta Chandrashila",
    slug: "chopta-chandrashila",
    difficulty: "Moderate",
    price: "Rs 5,999",
    color: "#D4A843",
    altitude: "13,123 ft",
    days: 4,
  },
  {
    name: "Buran Ghati",
    slug: "buran-ghati",
    difficulty: "Difficult",
    price: "Rs 8,999",
    color: "#F88379",
    altitude: "15,000 ft",
    days: 8,
  },
  {
    name: "Rupin Pass",
    slug: "rupin-pass",
    difficulty: "Difficult",
    price: "Rs 7,999",
    color: "#F88379",
    altitude: "15,250 ft",
    days: 8,
  },
  {
    name: "Bali Pass",
    slug: "bali-pass",
    difficulty: "Difficult",
    price: "Rs 9,499",
    color: "#F88379",
    altitude: "16,207 ft",
    days: 9,
  },
  {
    name: "Ruinsara Tal",
    slug: "ruinsara-tal",
    difficulty: "Moderate",
    price: "Rs 6,999",
    color: "#D4A843",
    altitude: "14,780 ft",
    days: 7,
  },
  {
    name: "Borasu Pass",
    slug: "borasu-pass",
    difficulty: "Difficult",
    price: "Rs 9,999",
    color: "#F88379",
    altitude: "17,100 ft",
    days: 10,
  },
  {
    name: "Phulara Ridge",
    slug: "phulara-ridge",
    difficulty: "Moderate",
    price: "Rs 6,499",
    color: "#D4A843",
    altitude: "12,800 ft",
    days: 5,
  },
  {
    name: "Chandernahan Lake",
    slug: "chandernahan-lake",
    difficulty: "Moderate",
    price: "Rs 6,999",
    color: "#D4A843",
    altitude: "14,000 ft",
    days: 6,
  },
  {
    name: "Chaainsheel Bugyal",
    slug: "chaainsheel-bugyal",
    difficulty: "Easy",
    price: "Rs 5,999",
    color: "#2D6A4F",
    altitude: "11,500 ft",
    days: 4,
  },
];

const YATRAS = [
  {
    name: "Chardham Yatra",
    slug: "chardham-yatra",
    tagline: "Four Sacred Dhams in one divine journey",
    days: 12,
    price: "Rs 18,999",
  },
  {
    name: "Do Dham Yatra",
    slug: "do-dham-yatra",
    tagline: "Kedarnath & Badrinath — twin blessings",
    days: 7,
    price: "Rs 11,999",
  },
  {
    name: "Mussoorie Tour",
    slug: "mussoorie-tour",
    tagline: "Queen of the Hills — weekend escape",
    days: 3,
    price: "Rs 5,499",
  },
  {
    name: "Rishikesh Tour",
    slug: "rishikesh-tour",
    tagline: "Yoga, rafting & spiritual awakening",
    days: 4,
    price: "Rs 6,499",
  },
];

type MegaSection = "treks" | "yatras" | "about" | "support" | null;

function NavRightActions({
  searchOpen,
  setSearchOpen,
}: {
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}) {
  const { isAuthenticated, clear, identity } = useInternetIdentity();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const principalShort =
    isAuthenticated && identity
      ? identity.getPrincipal().toText().slice(0, 6)
      : "";

  return (
    <div className="flex items-center gap-2">
      {/* Search */}
      <button
        type="button"
        onClick={() => setSearchOpen(!searchOpen)}
        className="p-2 rounded-lg transition-colors hover:bg-white/5"
        style={{ color: searchOpen ? "#1A1A1A" : "#4A4A4A" }}
        aria-label="Search treks"
        data-ocid="navbar.search_input"
      >
        {searchOpen ? <X size={17} /> : <Search size={17} />}
      </button>
      {/* Phone */}
      <a
        href="tel:+918279888470"
        className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[#1A1A1A] hidden lg:flex"
        style={{ color: "#4A4A4A" }}
      >
        <Phone size={13} />
        +91-82798 88470
      </a>
      {/* Book Now */}
      <Link
        to="/book/$slug"
        params={{ slug: "kedarkantha" }}
        className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90 hover:scale-[1.02]"
        style={{ background: "#F88379", color: "#1A1A1A" }}
        data-ocid="navbar.book_now_button"
      >
        Book Now
      </Link>
      {/* Auth */}
      {isAuthenticated ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen((v) => !v)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-opacity hover:opacity-80"
            style={{ background: "#F88379", color: "#fff" }}
            data-ocid="navbar.user_avatar"
            aria-label="User menu"
          >
            {principalShort}
          </button>
          {userMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl overflow-hidden z-50"
              style={{
                background: "#E6D8C4",
                border: "1px solid rgba(248,131,121,0.3)",
              }}
            >
              <Link
                to="/dashboard"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-white/5"
                style={{ color: "#1A1A1A" }}
                data-ocid="navbar.dashboard_link"
              >
                My Dashboard
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-white/5"
                style={{ color: "#4A4A4A" }}
                data-ocid="navbar.my_bookings_link"
              >
                My Bookings
              </Link>
              <button
                type="button"
                onClick={() => {
                  clear();
                  setUserMenuOpen(false);
                }}
                className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-white/5"
                style={{ color: "#F88379" }}
                data-ocid="navbar.logout_button"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/auth/login"
          className="px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
          style={{ background: "#F88379", color: "#fff" }}
          data-ocid="navbar.login_button"
        >
          Login
        </Link>
      )}
    </div>
  );
}

const FALLBACK_ANNOUNCEMENTS = [
  "🏔 Kedarkantha Winter Batch — Jan 15 | 3 Seats Left",
  "Valley of Flowers 2025 — Registrations Open",
  "Har Ki Dun Spring Batch — Feb 10 | Limited Seats",
  "Early Bird: Book 60 days ahead, Save 10% →",
  "Buran Ghati Summer: Jul 5 | 4 Seats Left",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaSection>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcements, setAnnouncements] = useState<AnnouncementPublic[]>([]);
  const [announcementsLoaded, setAnnouncementsLoaded] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { actor } = useActor(createActor);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    async function fetchAnnouncements() {
      if (!actor) return;
      try {
        const data = await actor.getActiveAnnouncements();
        setAnnouncements(data);
      } catch {
        // keep fallback state
      } finally {
        setAnnouncementsLoaded(true);
      }
    }
    fetchAnnouncements();
    const interval = setInterval(fetchAnnouncements, 60000);
    return () => clearInterval(interval);
  }, [actor]);

  const openMega = (section: MegaSection) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setActiveMega(section);
  };
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setActiveMega(null), 120);
  };

  const filteredTreks = searchQuery
    ? ALL_TREKS.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <header
      className="hidden md:block md:fixed md:top-0 md:inset-x-0 md:z-40"
      data-ocid="navbar"
    >
      {/* Announcement bar */}
      {(() => {
        const activeTexts =
          announcementsLoaded && announcements.length > 0
            ? announcements.filter((a) => a.isActive).map((a) => a.text)
            : FALLBACK_ANNOUNCEMENTS;
        if (announcementsLoaded && activeTexts.length === 0) return null;
        const tickerText = activeTexts.join(" · ");
        return (
          <div
            style={{ background: "#F88379" }}
            className="overflow-hidden hidden md:block"
          >
            <div className="py-1.5 flex">
              <div
                className="animate-marquee whitespace-nowrap flex items-center gap-12 text-xs font-medium"
                style={{ color: "#1A1A1A" }}
              >
                {[0, 1].map((i) => (
                  <span key={i} className="flex items-center gap-8">
                    <AnnouncementText html={tickerText} />
                    <span>·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Main nav */}
      <nav
        className={`hidden md:flex items-center transition-all duration-300 ${
          scrolled ? "h-14" : "h-18"
        }`}
        style={{
          background: scrolled
            ? "rgba(45,27,30,0.92)"
            : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(248,131,121,0.2)",
          height: scrolled ? 56 : 72,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              role="img"
              aria-label="Shail Hikers mountain logo"
            >
              <path d="M20 3L38 36H2L20 3Z" fill="#F88379" />
              <path d="M20 13L30 36H10L20 13Z" fill="#E6D8C4" opacity="0.5" />
              <circle cx="20" cy="36" r="2" fill="#D4A843" />
            </svg>
            <span
              style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
              className="font-semibold tracking-widest uppercase text-lg group-hover:text-white transition-colors"
            >
              Shail Hikers
            </span>
          </Link>

          {/* Nav items */}
          <div className="flex items-center gap-0.5">
            {/* Treks mega menu */}
            <div
              className="relative"
              onMouseEnter={() => openMega("treks")}
              onMouseLeave={closeMega}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors"
                style={{
                  color:
                    pathname.startsWith("/treks") || pathname === "/trek-finder"
                      ? "#1A1A1A"
                      : "#4A4A4A",
                }}
                data-ocid="navbar.treks_menu"
              >
                Treks
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    activeMega === "treks" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeMega === "treks" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-1 rounded-2xl shadow-2xl p-5"
                    style={{
                      background: "#E6D8C4",
                      border: "1px solid #F8837933",
                      width: 680,
                    }}
                    onMouseEnter={() => openMega("treks")}
                    onMouseLeave={closeMega}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        style={{
                          color: "#1A1A1A",
                          fontFamily: "var(--font-display)",
                        }}
                        className="text-lg font-semibold"
                      >
                        Himalayan Treks
                      </h3>
                      <Link
                        to="/treks"
                        style={{ color: "#F88379" }}
                        className="text-xs hover:text-[#1A1A1A] transition-colors font-medium"
                      >
                        View All 14 →
                      </Link>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {ALL_TREKS.map((t) => (
                        <Link
                          key={t.slug}
                          to="/treks/$slug"
                          params={{ slug: t.slug }}
                          onClick={() => setActiveMega(null)}
                          className="rounded-xl p-2.5 transition-all hover:scale-[1.02] group"
                          style={{
                            background: "#FFFFFF",
                            border: "1px solid #F883791A",
                          }}
                        >
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <span
                              style={{ color: "#1A1A1A" }}
                              className="text-[11px] font-semibold leading-tight group-hover:text-white transition-colors"
                            >
                              {t.name}
                            </span>
                            <span
                              className="text-[9px] px-1 py-0.5 rounded-full font-semibold flex-shrink-0"
                              style={{
                                background: `${t.color}22`,
                                color: t.color,
                              }}
                            >
                              {t.difficulty[0]}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span
                              style={{ color: "#4A4A4A" }}
                              className="text-[10px]"
                            >
                              {t.altitude}
                            </span>
                            <span
                              style={{ color: "#D4A843" }}
                              className="text-[10px] font-semibold"
                            >
                              {t.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: "#2D6A4F" }}
                            />
                            <span
                              style={{ color: "#4A4A4A77" }}
                              className="text-[9px]"
                            >
                              {t.days}D
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div
                      className="grid grid-cols-2 gap-2 pt-3"
                      style={{ borderTop: "1px solid #F883791A" }}
                    >
                      <Link
                        to="/trek-finder"
                        onClick={() => setActiveMega(null)}
                        className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                        style={{
                          background: "#F8837915",
                          border: "1px dashed #F8837955",
                        }}
                      >
                        <Sparkles size={16} style={{ color: "#F88379" }} />
                        <div>
                          <p
                            style={{ color: "#1A1A1A" }}
                            className="text-xs font-semibold"
                          >
                            Not sure which trek?
                          </p>
                          <p
                            style={{ color: "#4A4A4A" }}
                            className="text-[10px]"
                          >
                            Take our 2-min AI quiz →
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/compare"
                        onClick={() => setActiveMega(null)}
                        className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                        style={{
                          background: "#F8837915",
                          border: "1px dashed #F8837955",
                        }}
                      >
                        <BarChart2 size={16} style={{ color: "#F88379" }} />
                        <div>
                          <p
                            style={{ color: "#1A1A1A" }}
                            className="text-xs font-semibold"
                          >
                            Compare treks
                          </p>
                          <p
                            style={{ color: "#4A4A4A" }}
                            className="text-[10px]"
                          >
                            Side-by-side for up to 3 →
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Yatras mega menu */}
            <div
              className="relative"
              onMouseEnter={() => openMega("yatras")}
              onMouseLeave={closeMega}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors"
                style={{
                  color: pathname.startsWith("/yatras") ? "#1A1A1A" : "#4A4A4A",
                }}
                data-ocid="navbar.yatras_menu"
              >
                Yatras
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    activeMega === "yatras" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeMega === "yatras" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-1 rounded-2xl shadow-2xl p-5"
                    style={{
                      background: "#E6D8C4",
                      border: "1px solid #F8837933",
                      width: 360,
                    }}
                    onMouseEnter={() => openMega("yatras")}
                    onMouseLeave={closeMega}
                  >
                    <h3
                      style={{
                        color: "#1A1A1A",
                        fontFamily: "var(--font-display)",
                      }}
                      className="text-base font-semibold mb-3"
                    >
                      Yatras &amp; Sacred Tours
                    </h3>
                    <div className="space-y-1.5">
                      {YATRAS.map((y) => (
                        <Link
                          key={y.slug}
                          to="/yatras/$slug"
                          params={{ slug: y.slug }}
                          onClick={() => setActiveMega(null)}
                          className="flex items-center justify-between p-3 rounded-xl transition-all hover:scale-[1.01] group"
                          style={{
                            background: "#FFFFFF",
                            border: "1px solid #F883791A",
                          }}
                        >
                          <div>
                            <p
                              style={{ color: "#1A1A1A" }}
                              className="text-xs font-semibold group-hover:text-white transition-colors"
                            >
                              {y.name}
                            </p>
                            <p
                              style={{ color: "#4A4A4A" }}
                              className="text-[10px] mt-0.5"
                            >
                              {y.tagline}
                            </p>
                            <p
                              style={{ color: "#4A4A4A77" }}
                              className="text-[10px]"
                            >
                              {y.days} days
                            </p>
                          </div>
                          <span
                            style={{ color: "#D4A843" }}
                            className="text-xs font-bold flex-shrink-0 ml-3"
                          >
                            {y.price}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Packages */}
            <Link
              to="/packages"
              className="px-3 py-2 text-sm font-medium transition-colors"
              style={{
                color: pathname === "/packages" ? "#1A1A1A" : "#4A4A4A",
              }}
            >
              Packages
            </Link>

            {/* Corporate */}
            <Link
              to="/corporate"
              className="px-3 py-2 text-sm font-medium transition-colors"
              style={{
                color: pathname === "/corporate" ? "#1A1A1A" : "#4A4A4A",
              }}
            >
              Corporate
            </Link>

            {/* About dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openMega("about")}
              onMouseLeave={closeMega}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors"
                style={{
                  color:
                    pathname.startsWith("/about") ||
                    pathname === "/team" ||
                    pathname === "/gallery" ||
                    pathname === "/blog"
                      ? "#1A1A1A"
                      : "#4A4A4A",
                }}
                data-ocid="navbar.about_menu"
              >
                About
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    activeMega === "about" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeMega === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-1 rounded-2xl shadow-2xl p-3"
                    style={{
                      background: "#E6D8C4",
                      border: "1px solid #F8837933",
                      minWidth: 180,
                    }}
                    onMouseEnter={() => openMega("about")}
                    onMouseLeave={closeMega}
                  >
                    {[
                      { label: "About Us", to: "/about", icon: Info },
                      { label: "Our Team", to: "/team", icon: Users },
                      { label: "Gallery", to: "/gallery", icon: Image },
                      { label: "Blog", to: "/blog", icon: BookOpen },
                    ].map(({ label, to, icon: Icon }) => (
                      <Link
                        key={to}
                        to={to as "/"}
                        onClick={() => setActiveMega(null)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors"
                        style={{
                          color: pathname === to ? "#1A1A1A" : "#4A4A4A",
                        }}
                      >
                        <Icon size={14} />
                        <span className="text-sm">{label}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Support dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openMega("support")}
              onMouseLeave={closeMega}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors"
                style={{ color: "#4A4A4A" }}
                data-ocid="navbar.support_menu"
              >
                Support
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    activeMega === "support" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeMega === "support" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-1 rounded-2xl shadow-2xl p-3"
                    style={{
                      background: "#E6D8C4",
                      border: "1px solid #F8837933",
                      minWidth: 200,
                    }}
                    onMouseEnter={() => openMega("support")}
                    onMouseLeave={closeMega}
                  >
                    {[
                      {
                        label: "Cancellation Policy",
                        to: "/cancellation-policy",
                        icon: Shield,
                      },
                      {
                        label: "Terms & Conditions",
                        to: "/terms",
                        icon: HelpCircle,
                      },
                      { label: "Privacy Policy", to: "/privacy", icon: Shield },
                      {
                        label: "Emergency Helpline",
                        href: "tel:+918279888470",
                        icon: Phone,
                      },
                    ].map(({ label, to, href, icon: Icon }) =>
                      to ? (
                        <Link
                          key={to}
                          to={to as "/"}
                          onClick={() => setActiveMega(null)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors"
                          style={{ color: "#4A4A4A" }}
                        >
                          <Icon size={14} />
                          <span className="text-sm">{label}</span>
                        </Link>
                      ) : (
                        <a
                          key={href}
                          href={href}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors"
                          style={{ color: "#F88379" }}
                        >
                          <Icon size={14} />
                          <span className="text-sm font-semibold">{label}</span>
                        </a>
                      ),
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right actions */}
          <NavRightActions
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
          />
        </div>

        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full inset-x-0 overflow-hidden"
              style={{
                background: "#E6D8C4",
                borderBottom: "1px solid #F8837933",
              }}
            >
              <div className="max-w-2xl mx-auto px-4 py-4">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#4A4A4A" }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search treks, yatras, destinations..."
                    className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #F8837944",
                      color: "#1A1A1A",
                    }}
                  />
                </div>
                {filteredTreks.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {filteredTreks.slice(0, 5).map((t) => (
                      <Link
                        key={t.slug}
                        to="/treks/$slug"
                        params={{ slug: t.slug }}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors"
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #F883791A",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Mountain size={14} style={{ color: "#F88379" }} />
                          <span
                            style={{ color: "#1A1A1A" }}
                            className="text-sm font-medium"
                          >
                            {t.name}
                          </span>
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full"
                            style={{
                              background: `${t.color}22`,
                              color: t.color,
                            }}
                          >
                            {t.difficulty}
                          </span>
                        </div>
                        <span
                          style={{ color: "#D4A843" }}
                          className="text-xs font-semibold"
                        >
                          {t.price}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
                {searchQuery && filteredTreks.length === 0 && (
                  <p
                    className="mt-3 text-sm text-center"
                    style={{ color: "#4A4A4A" }}
                  >
                    No treks found for "{searchQuery}"
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
