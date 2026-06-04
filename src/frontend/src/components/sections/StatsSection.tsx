import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 10000, suffix: "+", label: "Happy Trekkers" },
  { value: 14, suffix: "", label: "Trek Routes" },
  { value: 9, suffix: "", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Batches Completed" },
  { value: 4.9, suffix: "★", label: "Rating" },
  { value: 100, suffix: "%", label: "Safe Record" },
  { value: 50, suffix: "+", label: "Corporate Groups" },
  { value: 15, suffix: "", label: "Expert Guides" },
];

function AnimatedNumber({
  target,
  suffix,
  inView,
}: { target: number; suffix: string; inView: boolean }) {
  const [current, setCurrent] = useState(0);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 2000;
    const raf = requestAnimationFrame(function tick(time) {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else setCurrent(target);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const display = isDecimal
    ? current.toFixed(1)
    : current >= 1000
      ? Math.floor(current).toLocaleString()
      : Math.floor(current).toString();

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      ref={ref}
      data-ocid="stats.section"
      style={{ background: "#E8541A" }}
      className="py-10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              data-ocid={`stats.item.${i + 1}`}
              className="text-center"
            >
              <p
                className="text-3xl md:text-4xl font-bold tracking-tight leading-none mb-1"
                style={{ fontFamily: "var(--font-display)", color: "#FFFFFF" }}
              >
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </p>
              <p
                className="text-xs uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
