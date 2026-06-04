import { type ReactNode, useEffect, useState } from "react";
import { ScrollHeaderProvider } from "@/context/scroll-header-context";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { Navbar } from "./Navbar";
import { PageTransition } from "./PageTransition";
import { WhatsAppButton } from "./WhatsAppButton";

const SOCIAL_PROOF = [
  "Priya from Delhi just booked Kedarkantha ✔",
  "Rahul & team from Bangalore booked Corporate Trek ✔",
  "Sneha from Mumbai just booked Valley of Flowers ✔",
  "Arjun from Pune just booked Rupin Pass ✔",
  "Kavya from Hyderabad just booked Har Ki Dun ✔",
];

interface SocialProofToastProps {
  message: string;
  onDismiss: () => void;
}

function SocialProofToast({ message, onDismiss }: SocialProofToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <output
      data-ocid="social_proof.toast"
      aria-live="polite"
      className="fixed bottom-24 left-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl max-w-xs animate-slide-up md:bottom-6"
      style={{
        background: "#FFFFFF",
        border: "1px solid #C8E0D4",
        borderLeft: "4px solid #2E7D4F",
        boxShadow: "0 8px 32px rgba(46,125,79,0.12)",
      }}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
        style={{ background: "#2E7D4F" }}
      />
      <p
        style={{ color: "#1A2A1E" }}
        className="text-xs font-medium leading-snug flex-1"
      >
        {message}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        style={{ color: "#4A5E52" }}
        className="text-xs hover:text-[#1A2A1E] transition-colors flex-shrink-0 leading-none"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </output>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const first = setTimeout(() => {
      setToastMsg(SOCIAL_PROOF[0]);
      setMsgIndex(1);
    }, 8000);
    return () => clearTimeout(first);
  }, []);

  useEffect(() => {
    if (msgIndex === 0) return;
    const interval = setInterval(() => {
      setToastMsg(SOCIAL_PROOF[msgIndex % SOCIAL_PROOF.length]);
      setMsgIndex((i) => i + 1);
    }, 25000);
    return () => clearInterval(interval);
  }, [msgIndex]);

  return (
    <ScrollHeaderProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <MobileNav />
        <main className="flex-1 md:pt-[calc(2rem+5rem)] pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
        {toastMsg && (
          <SocialProofToast
            message={toastMsg}
            onDismiss={() => setToastMsg(null)}
          />
        )}
      </div>
    </ScrollHeaderProvider>
  );
}
