import { useState } from "react";
import { Plus, Minus, Phone, MapPin, ArrowRight, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const groups: Record<string, { label: string; to: string }[]> = {
  "Quick Links": [{ label: "Home", to: "/" }, { label: "About Us", to: "/about" }, { label: "Services", to: "/services" }, { label: "Blog", to: "/news" }, { label: "Contact", to: "/contact" }],
  "Projects & Resources": [{ label: "Request Estimate", to: "/sell" }, { label: "Recent Projects", to: "/buy" }, { label: "Service Areas", to: "/dealerships" }, { label: "Financing", to: "/financing" }, { label: "Compare Materials", to: "/compare" }],
};

function AccordionRow({ title, items }: { title: string; items: { label: string; to: string }[] }) {
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
          {items.map((item) => (
            <li key={item.to}><Link to={item.to} className="block min-h-11 py-2 text-sm text-white/70 hover:text-white">{item.label}</Link></li>
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
            <a href="tel:+15615550199" className="hover:text-white">+1 (561) 555-0199</a>
          </div>
          <div className="flex items-start gap-3 text-sm text-white/85">
            <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <span>Aurexo Roofing Studio — Serving all of Ohio, USA</span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-8">
          <Social href="https://www.facebook.com" label="Facebook"><Facebook className="h-4 w-4" /></Social>
          <Social href="https://x.com" label="X"><XLogo /></Social>
          <Social href="https://www.instagram.com" label="Instagram"><Instagram className="h-4 w-4" /></Social>
          <Social href="https://wa.me/15615550199" label="WhatsApp"><MessageCircle className="h-4 w-4" /></Social>
        </div>

        <p className="mt-10 text-xs text-white/40">© 2026 Aurexo Roofing Studio · Ohio, USA. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:bg-brand hover:text-ink">{children}</a>;
}

function XLogo() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.01L4.6 22H1.34l8.04-9.18L1 2h7.02l4.84 6.4L18.24 2zm-2.4 18h1.86L7.26 4h-1.97l10.55 16z" /></svg>;
}
