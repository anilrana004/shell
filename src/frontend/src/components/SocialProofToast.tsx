import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const proofs = [
  { name: "Anjali", city: "Gurgaon", trek: "Kedarkantha", time: "2 mins ago" },
  { name: "Rahul", city: "Bangalore", trek: "Rupin Pass", time: "8 mins ago" },
  { name: "Priya", city: "Mumbai", trek: "Har Ki Dun", time: "15 mins ago" },
  {
    name: "Vikram",
    city: "Delhi",
    trek: "Valley of Flowers",
    time: "22 mins ago",
  },
  {
    name: "Meera",
    city: "Pune",
    trek: "Chopta Chandrashila",
    time: "34 mins ago",
  },
  { name: "Arjun", city: "Chennai", trek: "Dayara Bugyal", time: "1 hr ago" },
  { name: "Sneha", city: "Hyderabad", trek: "Nag Tibba", time: "2 hrs ago" },
];

export function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const first = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(first);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const hide = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(hide);
  }, [visible]);

  useEffect(() => {
    if (visible) return;
    const cycle = setTimeout(() => {
      setIndex((i) => (i + 1) % proofs.length);
      setVisible(true);
    }, 25000);
    return () => clearTimeout(cycle);
  }, [visible]);

  const p = proofs[index];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ type: "spring", damping: 22, stiffness: 300 }}
          className="fixed bottom-24 left-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl md:bottom-6"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8541A44",
            maxWidth: 280,
          }}
          data-ocid="social_proof.toast"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
            style={{ background: "#E8541A22", color: "#E8541A" }}
          >
            {p.name[0]}
          </div>
          <div className="min-w-0">
            <p
              className="text-xs font-semibold truncate"
              style={{ color: "#1A2A1E" }}
            >
              {p.name} from {p.city}
            </p>
            <p className="text-[10px] truncate" style={{ color: "#4A5E52" }}>
              just booked <span style={{ color: "#D4A843" }}>{p.trek}</span> ✓
            </p>
            <p className="text-[10px]" style={{ color: "#4A5E5266" }}>
              {p.time}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
