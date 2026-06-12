import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CompareCtx = createContext<Ctx | null>(null);
const MAX = 3;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX) return prev;
      return [...prev, id];
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ids,
      has: (id) => ids.includes(id),
      toggle,
      remove: (id) => setIds((p) => p.filter((x) => x !== id)),
      clear: () => setIds([]),
    }),
    [ids, toggle],
  );

  return <CompareCtx.Provider value={value}>{children}</CompareCtx.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareCtx);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
