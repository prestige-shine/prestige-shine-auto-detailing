import { useState } from "react";
import { Plus, Minus, Phone, Mail, MapPin, ArrowRight, Facebook, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { STUDIO_PHONE, STUDIO_TEL, STUDIO_EMAIL, FACEBOOK_URL, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { useLeadDialog } from "@/contexts/LeadDialogContext";

const groups: Record<string, { label: string; to: string }[]> = {
  "Quick Links": [
    { label: "Home", to: "/" },
    { label: "About the Studio", to: "/about" },
    { label: "Detailing Services", to: "/services" },
    { label: "Detailing Journal", to: "/news" },
    { label: "Contact", to: "/contact" },
  ],
  "Services & Tools": [
    { label: "Instant Detailing Quote", to: "/get-estimate" },
    { label: "Book Vehicle Assessment", to: "/sell" },
    { label: "Recent Work", to: "/buy" },
    { label: "Studio Location", to: "/dealerships" },
  ],
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
            <li key={item.to}>
              <Link to={item.to} className="block min-h-11 py-2 text-sm text-white/70 hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Footer() {
  const { open } = useLeadDialog();
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Logo variant="light" />

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
          Prestige Shine Auto Detailing Miramichi is an appointment-only professional detailing studio specializing in full detailing, paint enhancement, paint correction and professional ceramic coatings.
        </p>

        <button
          type="button"
          onClick={() => open()}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-extrabold text-ink shadow-lg transition hover:opacity-90"
        >
          <Sparkles className="h-4 w-4" /> Get My Personalized Quote <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Studio Hours</h4>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              By Appointment Only
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Service Area</h4>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Miramichi, NB<br />
              and surrounding areas
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex items-center rounded-full bg-white/[0.07] border border-white/15 pl-5 pr-1.5 py-1.5"
        >
          <input
            type="email"
            placeholder="Get detailing tips + seasonal offers"
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
            <a href={`tel:${STUDIO_TEL}`} className="hover:text-white">{STUDIO_PHONE}</a>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/85">
            <Mail className="h-4 w-4 text-brand shrink-0" />
            <a href={`mailto:${STUDIO_EMAIL}`} className="hover:text-white">{STUDIO_EMAIL}</a>
          </div>
          <div className="flex items-start gap-3 text-sm text-white/85">
            <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <span>229 Jacqueline Dr, Miramichi, NB E1N 3Z2, Canada</span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-8">
          <Social href={FACEBOOK_URL} label="Facebook"><Facebook className="h-4 w-4" /></Social>
          <Social href={`https://wa.me/${WHATSAPP_NUMBER}`} label="WhatsApp"><MessageCircle className="h-4 w-4" /></Social>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2026 Prestige Shine Auto Detailing · Miramichi, NB. All rights reserved.</p>
          <Link to="/terms" className="hover:text-white/70">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:bg-brand hover:text-ink"
    >
      {children}
    </a>
  );
}
