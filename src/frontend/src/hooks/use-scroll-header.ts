import { useEffect, useRef, useState } from "react";

const SCROLL_DELTA = 6;
/** Always show header when within this distance from the top */
const TOP_OFFSET = 48;

/**
 * Hide on scroll down, show on scroll up — standard mobile travel-site header behavior.
 */
export function useScrollHeader(forceVisible = false): boolean {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (forceVisible) {
      setVisible(true);
      return;
    }

    const update = () => {
      const y = window.scrollY;

      if (y <= TOP_OFFSET) {
        setVisible(true);
      } else if (y - lastY.current > SCROLL_DELTA) {
        setVisible(false);
      } else if (lastY.current - y > SCROLL_DELTA) {
        setVisible(true);
      }

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceVisible]);

  return forceVisible || visible;
}
