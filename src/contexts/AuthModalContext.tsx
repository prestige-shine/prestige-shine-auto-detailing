import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = { isOpen: boolean; open: () => void; close: () => void };

const AuthModalCtx = createContext<Ctx | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AuthModalCtx.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </AuthModalCtx.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalCtx);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}
