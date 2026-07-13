import { createContext, useContext, useState, type ReactNode } from "react";
import { LeadQualificationDialog } from "@/components/aurexo/LeadQualificationDialog";

type Ctx = { open: (preset?: { serviceKey?: string }) => void; close: () => void };
const LeadDialogCtx = createContext<Ctx>({ open: () => {}, close: () => {} });

export function LeadDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<{ serviceKey?: string } | undefined>(undefined);

  return (
    <LeadDialogCtx.Provider
      value={{
        open: (p) => {
          setPreset(p);
          setIsOpen(true);
        },
        close: () => setIsOpen(false),
      }}
    >
      {children}
      <LeadQualificationDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        presetServiceKey={preset?.serviceKey}
      />
    </LeadDialogCtx.Provider>
  );
}

export function useLeadDialog() {
  return useContext(LeadDialogCtx);
}