import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useScrollHeader } from "@/hooks/use-scroll-header";

type ScrollHeaderContextValue = {
  visible: boolean;
  pin: (key: string) => void;
  unpin: (key: string) => void;
};

const ScrollHeaderContext = createContext<ScrollHeaderContextValue | null>(
  null,
);

export function ScrollHeaderProvider({ children }: { children: ReactNode }) {
  const [pins, setPins] = useState<Set<string>>(() => new Set());
  const pin = useCallback((key: string) => {
    setPins((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);
  const unpin = useCallback((key: string) => {
    setPins((prev) => {
      if (!prev.has(key)) return prev;
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, []);
  const forceVisible = pins.size > 0;
  const visible = useScrollHeader(forceVisible);
  const value = useMemo(
    () => ({ visible, pin, unpin }),
    [visible, pin, unpin],
  );

  return (
    <ScrollHeaderContext.Provider value={value}>
      {children}
    </ScrollHeaderContext.Provider>
  );
}

export function useScrollHeaderContext(): ScrollHeaderContextValue {
  const ctx = useContext(ScrollHeaderContext);
  if (!ctx) {
    throw new Error(
      "useScrollHeaderContext must be used within ScrollHeaderProvider",
    );
  }
  return ctx;
}
