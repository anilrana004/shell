import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  Briefcase,
  CalendarCheck,
  ChevronDown,
  Compass,
  Home,
  Image,
  Info,
  Menu,
  Mountain,
  Phone,
  PhoneCall,
  Search,
  Sparkles,
  User,
  Users,
  X,
} from "lucide-react";
import { useScrollHeader } from "@/hooks/use-scroll-header";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const _trekLinks = [
  { name: "Kedarkantha", slug: "kedarkantha" },
  { name: "Har Ki Dun", slug: "har-ki-dun" },
  { name: "Buran Ghati", slug: "buran-ghati" },
  { name: "Rupin Pass", slug: "rupin-pass" },
  { name: "Valley of Flowers", slug: "valley-of-flowers" },
  { name: "Dayara Bugyal", slug: "dayara-bugyal" },
  { name: "Nag Tibba", slug: "nag-tibba" },
  { name: "Chopta Chandrashila", slug: "chopta-chandrashila" },
];

const _yatraLinks = [
  { name: "Chardham Yatra", slug: "chardham-yatra" },
  { name: "Do Dham Yatra", slug: "do-dham-yatra" },
  { name: "Mussoorie Tour", slug: "mussoorie-tour" },
  { name: "Rishikesh Tour", slug: "rishikesh-tour" },
];

const _bottomNav = [
  { label: "Home", to: "/", icon: Home },
  { label: "Treks", to: "/treks", icon: Mountain },
  { label: "Yatras", to: "/yatras/chardham-yatra", icon: Compass },
  { label: "Book", to: "/book/kedarkantha", icon: CalendarCheck },
  { label: "Profile", to: "/dashboard", icon: User },
];

const ALL_MOBILE_TREKS = [
  {
    name: "Kedarkantha",
    slug: "kedarkantha",
    price: "₹5,999",
    color: "#2D6A4F",
  },
  { name: "Har Ki Dun", slug: "har-ki-dun", price: "₹6,499", color: "#2D6A4F" },
  {
    name: "Valley of Flowers",
    slug: "valley-of-flowers",
    price: "₹7,499",
    color: "#D4A843",
  },
  {
    name: "Dayara Bugyal",
    slug: "dayara-bugyal",
    price: "₹5,499",
    color: "#2D6A4F",
  },
  { name: "Nag Tibba", slug: "nag-tibba", price: "₹3,499", color: "#2D6A4F" },
  {
    name: "Chopta Chandrashila",
    slug: "chopta-chandrashila",
    price: "₹5,999",
    color: "#D4A843",
  },
  {
    name: "Phulara Ridge",
    slug: "phulara-ridge",
    price: "₹6,499",
    color: "#D4A843",
  },
  {
    name: "Chandernahan Lake",
    slug: "chandernahan-lake",
    price: "₹6,999",
    color: "#D4A843",
  },
  {
    name: "Chaainsheel Bugyal",
    slug: "chaainsheel-bugyal",
    price: "₹5,999",
    color: "#2D6A4F",
  },
  {
    name: "Ruinsara Tal",
    slug: "ruinsara-tal",
    price: "₹6,999",
    color: "#D4A843",
  },
  {
    name: "Buran Ghati",
    slug: "buran-ghati",
    price: "₹8,999",
    color: "#F88379",
  },
  { name: "Rupin Pass", slug: "rupin-pass", price: "₹7,999", color: "#F88379" },
  { name: "Bali Pass", slug: "bali-pass", price: "₹9,499", color: "#F88379" },
  {
    name: "Borasu Pass",
    slug: "borasu-pass",
    price: "₹9,999",
    color: "#F88379",
  },
];

const YATRA_MOBILE_LINKS = [
  { name: "Chardham Yatra", slug: "chardham-yatra" },
  { name: "Do Dham Yatra", slug: "do-dham-yatra" },
  { name: "Mussoorie Tour", slug: "mussoorie-tour" },
  { name: "Rishikesh Tour", slug: "rishikesh-tour" },
];

const BOTTOM_NAV = [
  { label: "Home", to: "/", icon: Home },
  { label: "Treks", to: "/treks", icon: Mountain },
  { label: "Yatras", to: "/yatras/chardham-yatra", icon: Compass },
  { label: "Book", to: "/book/kedarkantha", icon: CalendarCheck },
  { label: "Profile", to: "/dashboard", icon: User },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [trekExpanded, setTrekExpanded] = useState(false);
  const [yatraExpanded, setYatraExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const headerVisible = useScrollHeader(open);

  const close = () => setOpen(false);

  const filteredTreks = searchQuery
    ? ALL_MOBILE_TREKS.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <>
      {/* Mobile top bar — hides on scroll down, shows on scroll up */}
      <header
        className={`md:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 min-h-14 w-full transition-transform duration-300 ease-out will-change-transform ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          background: "rgba(45,27,30,0.98)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(248,131,121,0.25)",
          paddingTop: "env(safe-area-inset-top, 0px)",
          minHeight: "calc(3.5rem + env(safe-area-inset-top, 0px))",
        }}
        data-ocid="mobile_nav.header"
      >
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <svg
            width="28"
            height="28"
            viewBox="0 0 40 40"
            fill="none"
            role="img"
            aria-label="Shail Hikers"
            className="flex-shrink-0"
          >
            <path d="M20 3L38 36H2L20 3Z" fill="#F88379" />
            <path
              d="M20 13L30 36H10L20 13Z"
              fill="#E6D8C4"
              opacity="0.5"
            />
            <circle cx="20" cy="36" r="2" fill="#D4A843" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-display)",
              color: "#FFFFFF",
            }}
            className="font-semibold tracking-widest uppercase text-sm truncate"
          >
            Shail Hikers
          </span>
        </Link>
        <button
          type="button"
          data-ocid="mobile_nav.open_modal_button"
          onClick={() => setOpen(true)}
          className="p-2.5 rounded-xl flex-shrink-0"
          style={{
            background: "rgba(248,131,121,0.15)",
            border: "1px solid rgba(248,131,121,0.4)",
          }}
          aria-label="Open navigation menu"
        >
          <Menu size={20} style={{ color: "#FFFFFF" }} />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-50 bg-black/70 md:hidden backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm flex flex-col md:hidden"
              style={{
                background: "#FFFFFF",
                borderRight: "1px solid #F8837933",
              }}
              data-ocid="mobile_nav.dialog"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid #F8837922" }}
              >
                <Link
                  to="/"
                  onClick={close}
                  className="flex items-center gap-2"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 40 40"
                    fill="none"
                    role="img"
                    aria-label="Shail Hikers"
                  >
                    <path d="M20 3L38 36H2L20 3Z" fill="#F88379" />
                    <path
                      d="M20 13L30 36H10L20 13Z"
                      fill="#E6D8C4"
                      opacity="0.5"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#1A1A1A",
                    }}
                    className="text-lg font-semibold tracking-widest uppercase"
                  >
                    Shail Hikers
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={close}
                  className="p-1.5 rounded-md"
                  style={{ color: "#4A4A4A" }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search bar */}
              <div
                className="px-4 pt-4 pb-3"
                style={{ borderBottom: "1px solid #F8837915" }}
              >
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#4A4A4A" }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search treks, yatras..."
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      background: "#E6D8C4",
                      border: "1px solid #F8837933",
                      color: "#1A1A1A",
                    }}
                    data-ocid="mobile_nav.search_input"
                  />
                </div>
                {filteredTreks.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {filteredTreks.slice(0, 4).map((t) => (
                      <Link
                        key={t.slug}
                        to="/treks/$slug"
                        params={{ slug: t.slug }}
                        onClick={close}
                        className="flex items-center justify-between px-3 py-2 rounded-lg"
                        style={{ background: "#E6D8C4" }}
                      >
                        <span
                          style={{ color: "#1A1A1A" }}
                          className="text-xs font-medium"
                        >
                          {t.name}
                        </span>
                        <span
                          style={{ color: "#D4A843" }}
                          className="text-[10px]"
                        >
                          {t.price}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Nav content — scrollable */}
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
                {/* Treks accordion */}
                <button
                  type="button"
                  onClick={() => setTrekExpanded(!trekExpanded)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors"
                  style={{
                    background: trekExpanded ? "#E6D8C4" : "transparent",
                    color: "#1A1A1A",
                  }}
                  data-ocid="mobile_nav.treks_menu"
                >
                  <div className="flex items-center gap-2.5">
                    <Mountain size={16} style={{ color: "#F88379" }} />
                    <span className="font-semibold text-sm tracking-wide">
                      TREKS
                    </span>
                  </div>
                  <ChevronDown
                    size={15}
                    style={{
                      color: "#4A4A4A",
                      transform: trekExpanded ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>
                <AnimatePresence>
                  {trekExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-3"
                    >
                      <div className="py-1 space-y-0.5">
                        {ALL_MOBILE_TREKS.map((t) => (
                          <Link
                            key={t.slug}
                            to="/treks/$slug"
                            params={{ slug: t.slug }}
                            onClick={close}
                            className="flex items-center justify-between px-3 py-2 rounded-lg transition-colors"
                            style={{ color: "#4A4A4A" }}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: t.color }}
                              />
                              <span className="text-xs">{t.name}</span>
                            </div>
                            <span
                              style={{ color: "#D4A843" }}
                              className="text-[10px]"
                            >
                              {t.price}
                            </span>
                          </Link>
                        ))}
                        <Link
                          to="/treks"
                          onClick={close}
                          className="block px-3 py-2 text-xs font-semibold transition-colors"
                          style={{ color: "#F88379" }}
                        >
                          View All 14 Treks →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Yatras accordion */}
                <button
                  type="button"
                  onClick={() => setYatraExpanded(!yatraExpanded)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors"
                  style={{
                    background: yatraExpanded ? "#E6D8C4" : "transparent",
                    color: "#1A1A1A",
                  }}
                  data-ocid="mobile_nav.yatras_menu"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass size={16} style={{ color: "#F88379" }} />
                    <span className="font-semibold text-sm tracking-wide">
                      YATRAS & TOURS
                    </span>
                  </div>
                  <ChevronDown
                    size={15}
                    style={{
                      color: "#4A4A4A",
                      transform: yatraExpanded ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>
                <AnimatePresence>
                  {yatraExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-3"
                    >
                      <div className="py-1 space-y-0.5">
                        {YATRA_MOBILE_LINKS.map((y) => (
                          <Link
                            key={y.slug}
                            to="/yatras/$slug"
                            params={{ slug: y.slug }}
                            onClick={close}
                            className="block px-3 py-2 rounded-lg text-xs transition-colors"
                            style={{ color: "#4A4A4A" }}
                          >
                            {y.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Simple nav links */}
                {[
                  { label: "Packages", to: "/packages", icon: Briefcase },
                  { label: "Gallery", to: "/gallery", icon: Image },
                  { label: "Corporate", to: "/corporate", icon: Users },
                  { label: "Blog", to: "/blog", icon: BookOpen },
                  { label: "About", to: "/about", icon: Info },
                  { label: "Contact", to: "/contact", icon: Phone },
                ].map(({ label, to, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to as "/"}
                    onClick={close}
                    className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      color: pathname === to ? "#1A1A1A" : "#4A4A4A",
                      background: pathname === to ? "#E6D8C4" : "transparent",
                    }}
                  >
                    <Icon
                      size={16}
                      style={{
                        color: pathname === to ? "#F88379" : "#4A4A4A77",
                      }}
                    />
                    {label}
                  </Link>
                ))}

                {/* Quick action cards */}
                <div
                  className="mt-4 pt-4"
                  style={{ borderTop: "1px solid #F8837922" }}
                >
                  <p
                    style={{ color: "#4A4A4A66" }}
                    className="text-[10px] uppercase tracking-widest px-3 mb-3"
                  >
                    Quick Actions
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/trek-finder"
                      onClick={close}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-2xl text-center transition-all hover:scale-[1.02]"
                      style={{
                        background: "#F8837918",
                        border: "1px solid #F8837944",
                      }}
                      data-ocid="mobile_nav.trek_finder_button"
                    >
                      <Sparkles size={18} style={{ color: "#F88379" }} />
                      <span
                        style={{ color: "#1A1A1A" }}
                        className="text-[10px] font-semibold leading-tight"
                      >
                        Trek Finder Quiz
                      </span>
                      <span
                        style={{ color: "#4A4A4A66" }}
                        className="text-[9px]"
                      >
                        2-min AI quiz
                      </span>
                    </Link>
                    <Link
                      to="/compare"
                      onClick={close}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-2xl text-center transition-all hover:scale-[1.02]"
                      style={{
                        background: "#F8837918",
                        border: "1px solid #F8837944",
                      }}
                      data-ocid="mobile_nav.compare_button"
                    >
                      <BarChart2 size={18} style={{ color: "#F88379" }} />
                      <span
                        style={{ color: "#1A1A1A" }}
                        className="text-[10px] font-semibold leading-tight"
                      >
                        Compare Treks
                      </span>
                      <span
                        style={{ color: "#4A4A4A66" }}
                        className="text-[9px]"
                      >
                        Side-by-side
                      </span>
                    </Link>
                    <a
                      href="tel:+918279888470"
                      className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-2xl transition-all"
                      style={{
                        background: "#F8837918",
                        border: "1px solid #F8837955",
                      }}
                      data-ocid="mobile_nav.emergency_button"
                    >
                      <PhoneCall size={16} style={{ color: "#F88379" }} />
                      <span
                        style={{ color: "#1A1A1A" }}
                        className="text-xs font-semibold"
                      >
                        Emergency Helpline: +91-8279888470
                      </span>
                    </a>
                  </div>
                </div>

                {/* Social links */}
                <div className="pt-4 px-3 flex gap-3">
                  {[
                    {
                      label: "Instagram",
                      href: "https://instagram.com/shailhikers",
                    },
                    { label: "YouTube", href: "#" },
                    { label: "Facebook", href: "#" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      style={{ color: "#4A4A4A77" }}
                      className="text-[10px] hover:text-[#1A1A1A] transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Book Now CTA */}
              <div
                className="px-4 pb-safe pt-3"
                style={{
                  borderTop: "1px solid #F8837922",
                  paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
                }}
              >
                <Link
                  to="/book/$slug"
                  params={{ slug: "kedarkantha" }}
                  onClick={close}
                  className="block w-full py-4 rounded-2xl text-center font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "#F88379", color: "#1A1A1A" }}
                  data-ocid="mobile_nav.book_now_button"
                >
                  Book Your Trek Now
                </Link>
                <Link
                  to="/auth/login"
                  onClick={close}
                  className="block w-full py-3 mt-2.5 rounded-2xl text-center font-medium text-sm transition-colors"
                  style={{ color: "#4A4A4A", border: "1px solid #F8837944" }}
                  data-ocid="mobile_nav.login_button"
                >
                  Login / Register
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fixed bottom nav bar */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 flex shadow-[0_-4px_16px_rgba(26,26,26,0.08)]"
        style={{
          background: "#E6D8C4",
          borderTop: "1px solid #F8837966",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        aria-label="Bottom navigation"
      >
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.to ||
            (item.to !== "/" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to as "/"}
              className="relative flex-1 flex flex-col items-center gap-1 py-2.5 transition-colors"
              style={{ color: isActive ? "#F88379" : "#4A4A4A" }}
              data-ocid={`bottom_nav.${item.label.toLowerCase()}`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span
                className="text-[10px] font-medium"
                style={{ opacity: isActive ? 1 : 0.85 }}
              >
                {item.label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-0 w-8 h-0.5 rounded-full"
                  style={{ background: "#F88379" }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
