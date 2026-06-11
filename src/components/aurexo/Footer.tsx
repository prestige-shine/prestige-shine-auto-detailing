import { useState } from "react";
import { Plus, Minus, Phone, MapPin, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";

const groups: Record<string, string[]> = {
  "Quick Links": ["Home", "About Us", "Services", "Blog", "Contact"],
  "Buying & Selling": ["Sell Your Car", "Buy a Car", "Car Dealerships", "Financing", "Compare"],
};

function AccordionRow({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-white"
      >
        <span>{title}</span>
        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
      {open && (
        <ul className="pb-4 space-y-2">
          {items.map((i) => (
            <li key={i} className="text-sm text-white/70 hover:text-white cursor-pointer">{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Logo variant="light" />

        <div className="mt-8">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Opening Hours</h4>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Monday – Friday from 8 AM to 8 PM<br />
            Saturday from 9 AM to 6 PM EST
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex items-center rounded-full bg-white/[0.07] border border-white/15 pl-5 pr-1.5 py-1.5"
        >
          <input
            type="email"
            placeholder="Enter your e-mail"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 outline-none"
          />
          <button
            type="submit"
            aria-label="Subscribe"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-ink"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8">
          {Object.entries(groups).map(([k, v]) => (
            <AccordionRow key={k} title={k} items={v} />
          ))}
        </div>

        <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
          <div className="flex items-center gap-3 text-sm text-white/85">
            <Phone className="h-4 w-4 text-brand shrink-0" />
            <span>1-866-288-6868</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-white/85">
            <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <span>6205 Peachtree Dunwoody Rd, Atlanta, GA 30328</span>
          </div>
        </div>

        <p className="mt-10 text-xs text-white/40">© 2026 Aurexo. All rights reserved.</p>
      </div>
    </footer>
  );
}
