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
import { Logo } from "@/components/Logo";
import { useScrollHeaderContext } from "@/context/scroll-header-context";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

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
    color: "#2E7D4F",
  },
  { name: "Har Ki Dun", slug: "har-ki-dun", price: "₹6,499", color: "#2E7D4F" },
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
    color: "#2E7D4F",
  },
  { name: "Nag Tibba", slug: "nag-tibba", price: "₹3,499", color: "#2E7D4F" },
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
    color: "#2E7D4F",
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
    color: "#E8541A",
  },
  { name: "Rupin Pass", slug: "rupin-pass", price: "₹7,999", color: "#E8541A" },
  { name: "Bali Pass", slug: "bali-pass", price: "₹9,499", color: "#E8541A" },
  {
    name: "Borasu Pass",
    slug: "borasu-pass",
    price: "₹9,999",
    color: "#E8541A",
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
  const { visible: headerVisible, pin, unpin } = useScrollHeaderContext();
  const [open, setOpen] = useState(false);
  const [trekExpanded, setTrekExpanded] = useState(false);
  const [yatraExpanded, setYatraExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    if (open) {
      pin("mobile-nav");
      return () => unpin("mobile-nav");
    }
    unpin("mobile-nav");
  }, [open, pin, unpin]);

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
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(232,84,26,0.25)",
          paddingTop: "env(safe-area-inset-top, 0px)",
          minHeight: "calc(3.5rem + env(safe-area-inset-top, 0px))",
        }}
        data-ocid="mobile_nav.header"
      >
        <Link to="/" className="flex items-center min-w-0">
          <Logo size={36} showWordmark className="text-sm" />
        </Link>
        <button
          type="button"
          data-ocid="mobile_nav.open_modal_button"
          onClick={() => setOpen(true)}
          className="p-2.5 rounded-xl flex-shrink-0"
          style={{
            background: "rgba(232,84,26,0.15)",
            border: "1px solid rgba(232,84,26,0.4)",
          }}
          aria-label="Open navigation menu"
        >
          <Menu size={20} style={{ color: "#1A2A1E" }} />
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
                borderRight: "1px solid #E8541A33",
              }}
              data-ocid="mobile_nav.dialog"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid #E8541A22" }}
              >
                <Link
                  to="/"
                  onClick={close}
                  className="flex items-center gap-2"
                >
                  <Logo size={32} showWordmark className="text-base" />
                </Link>
                <button
                  type="button"
                  onClick={close}
                  className="p-1.5 rounded-md"
                  style={{ color: "#4A5E52" }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search bar */}
              <div
                className="px-4 pt-4 pb-3"
                style={{ borderBottom: "1px solid #E8541A15" }}
              >
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#4A5E52" }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search treks, yatras..."
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      background: "#EDF7F2",
                      border: "1px solid #E8541A33",
                      color: "#1A2A1E",
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
                        style={{ background: "#EDF7F2" }}
                      >
                        <span
                          style={{ color: "#1A2A1E" }}
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
                    background: trekExpanded ? "#EDF7F2" : "transparent",
                    color: "#1A2A1E",
                  }}
                  data-ocid="mobile_nav.treks_menu"
                >
                  <div className="flex items-center gap-2.5">
                    <Mountain size={16} style={{ color: "#E8541A" }} />
                    <span className="font-semibold text-sm tracking-wide">
                      TREKS
                    </span>
                  </div>
                  <ChevronDown
                    size={15}
                    style={{
                      color: "#4A5E52",
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
                            style={{ color: "#4A5E52" }}
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
                          style={{ color: "#E8541A" }}
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
                    background: yatraExpanded ? "#EDF7F2" : "transparent",
                    color: "#1A2A1E",
                  }}
                  data-ocid="mobile_nav.yatras_menu"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass size={16} style={{ color: "#E8541A" }} />
                    <span className="font-semibold text-sm tracking-wide">
                      YATRAS & TOURS
                    </span>
                  </div>
                  <ChevronDown
                    size={15}
                    style={{
                      color: "#4A5E52",
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
                            style={{ color: "#4A5E52" }}
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
                      color: pathname === to ? "#1A2A1E" : "#4A5E52",
                      background: pathname === to ? "#EDF7F2" : "transparent",
                    }}
                  >
                    <Icon
                      size={16}
                      style={{
                        color: pathname === to ? "#E8541A" : "#4A5E5277",
                      }}
                    />
                    {label}
                  </Link>
                ))}

                {/* Quick action cards */}
                <div
                  className="mt-4 pt-4"
                  style={{ borderTop: "1px solid #E8541A22" }}
                >
                  <p
                    style={{ color: "#4A5E5266" }}
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
                        background: "#E8541A18",
                        border: "1px solid #E8541A44",
                      }}
                      data-ocid="mobile_nav.trek_finder_button"
                    >
                      <Sparkles size={18} style={{ color: "#E8541A" }} />
                      <span
                        style={{ color: "#1A2A1E" }}
                        className="text-[10px] font-semibold leading-tight"
                      >
                        Trek Finder Quiz
                      </span>
                      <span
                        style={{ color: "#4A5E5266" }}
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
                        background: "#E8541A18",
                        border: "1px solid #E8541A44",
                      }}
                      data-ocid="mobile_nav.compare_button"
                    >
                      <BarChart2 size={18} style={{ color: "#E8541A" }} />
                      <span
                        style={{ color: "#1A2A1E" }}
                        className="text-[10px] font-semibold leading-tight"
                      >
                        Compare Treks
                      </span>
                      <span
                        style={{ color: "#4A5E5266" }}
                        className="text-[9px]"
                      >
                        Side-by-side
                      </span>
                    </Link>
                    <a
                      href="tel:+918279888470"
                      className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-2xl transition-all"
                      style={{
                        background: "#E8541A18",
                        border: "1px solid #E8541A55",
                      }}
                      data-ocid="mobile_nav.emergency_button"
                    >
                      <PhoneCall size={16} style={{ color: "#E8541A" }} />
                      <span
                        style={{ color: "#1A2A1E" }}
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
                      style={{ color: "#4A5E5277" }}
                      className="text-[10px] hover:text-[#1A2A1E] transition-colors"
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
                  borderTop: "1px solid #E8541A22",
                  paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
                }}
              >
                <Link
                  to="/book/$slug"
                  params={{ slug: "kedarkantha" }}
                  onClick={close}
                  className="block w-full py-4 rounded-2xl text-center font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "#E8541A", color: "#FFFFFF" }}
                  data-ocid="mobile_nav.book_now_button"
                >
                  Book Your Trek Now
                </Link>
                <Link
                  to="/auth/login"
                  onClick={close}
                  className="block w-full py-3 mt-2.5 rounded-2xl text-center font-medium text-sm transition-colors"
                  style={{ color: "#4A5E52", border: "1px solid #E8541A44" }}
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
          background: "#EDF7F2",
          borderTop: "1px solid #E8541A66",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        aria-label="Bottom navigation"
      >
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          const isBook = item.label === "Book";
          const isActive =
            pathname === item.to ||
            (item.to !== "/" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to as "/"}
              className={`relative flex-1 flex flex-col items-center gap-1 py-2.5 transition-colors ${
                isBook ? "mx-1 my-1 rounded-xl" : ""
              }`}
              style={{
                color: isBook
                  ? "#FFFFFF"
                  : isActive
                    ? "#2E7D4F"
                    : "#4A5E52",
                background: isBook ? "#E8541A" : undefined,
              }}
              data-ocid={`bottom_nav.${item.label.toLowerCase()}`}
            >
              <Icon size={20} strokeWidth={isActive || isBook ? 2.5 : 2} />
              <span
                className="text-[10px] font-medium"
                style={{ opacity: isActive || isBook ? 1 : 0.85 }}
              >
                {item.label}
              </span>
              {isActive && !isBook && (
                <span
                  className="absolute bottom-0 w-8 h-0.5 rounded-full"
                  style={{ background: "#2E7D4F" }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
