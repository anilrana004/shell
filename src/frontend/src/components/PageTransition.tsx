import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const prevPathname = useRef(pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setIsTransitioning(true);
      setKey((k) => k + 1);

      const t = setTimeout(() => setIsTransitioning(false), 400);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <>
      {/* Curtain wipe overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key={`curtain-${key}`}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1, originX: 0 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] pointer-events-none"
            style={{ background: "#E8541A" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
