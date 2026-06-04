import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Show after 2s delay
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Pulse every 8s to draw attention
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
    }, 8000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.a
      href="https://wa.me/918279888470?text=Hi%20Shail%20Hikers!%20I'm%20interested%20in%20booking%20a%20trek."
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      aria-label="Chat on WhatsApp — Shail Hikers"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 15, stiffness: 300 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl md:bottom-8 md:right-6"
      style={{
        background: "#25D366",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
      }}
    >
      {/* Unread dot */}
      <span
        className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold"
        style={{ background: "#E8541A", color: "#FFFFFF" }}
      >
        1
      </span>
      {/* Pulse ring */}
      {pulse && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: "rgba(37,211,102,0.3)" }}
        />
      )}
      <MessageCircle size={26} color="#fff" fill="#fff" />
    </motion.a>
  );
}
