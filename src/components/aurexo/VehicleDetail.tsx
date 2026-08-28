import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  Share2,
  MessageCircle,
  Check,
  Star,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Car,
} from "lucide-react";
import type { Vehicle } from "@/lib/aurexo-data";
import { vehicles as allVehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "./VehicleCard";
import { useFavorites } from "@/contexts/FavoritesContext";
import { buildWhatsAppHref, STUDIO_PHONE, STUDIO_TEL } from "@/lib/whatsapp";

const TIER_META: Record<
  Vehicle["fuel"],
  { tagline: string; includes: string[]; aftercare: string; recommendedFor: string; process: { step: string; body: string }[] }
> = {
  Ceramic: {
    tagline: "9H nano-ceramic protection with multi-stage prep — flagship gloss and hydrophobic performance.",
    includes: [
      "Foam bath + touchless pre-wash",
      "Iron & tar chemical decontamination",
      "Full clay-bar decontamination",
      "Two-stage machine polish (cut + refine)",
      "IPA panel wipe-down & inspection",
      "9H ceramic base coat application",
      "System X ceramic top coat, controlled cure",
      "Ceramic glass coating on windshield",
      "Trim & plastic ceramic sealant",
      "Wheel face & barrel ceramic coating",
      "System X durability (3–6 years)",
      "Aftercare kit + first maintenance detail",
    ],
    aftercare:
      "Avoid automatic tunnel washes for 14 days. Hand-wash with pH-neutral shampoo; visit us annually for a maintenance decontamination to keep your warranty active.",
    recommendedFor: "Owners keeping the vehicle 3+ years, new vehicles, and anyone wanting low-maintenance protection through Miramichi winters.",
    process: [
      { step: "Assessment", body: "Paint depth gauge readings, defect mapping under LED inspection lighting." },
      { step: "Correction", body: "Two-stage machine polish to safely remove swirl marks and holograms." },
      { step: "Coating & cure", body: "Coating applied panel-by-panel and levelled by hand, then cured in a controlled environment." },
    ],
  },
  Correction: {
    tagline: "Multi-stage paint correction that removes swirl marks, wash marring, and light scratches.",
    includes: [
      "Foam bath + touchless pre-wash",
      "Full clay-bar decontamination",
      "Paint depth gauge mapping",
      "Compound stage (cutting)",
      "Polish stage (refining)",
      "Finishing polish for jewel-like gloss",
      "IPA wipe-down inspection",
      "6-month protective sealant",
      "Trim dressing & rubber restoration",
      "Wheel face polish",
      "Interior quick vacuum",
      "Photo-documented before/after",
    ],
    aftercare:
      "Follow with a ceramic coating within 30 days to lock in the correction. Hand wash only for the first month while the sealant fully cures.",
    recommendedFor: "Enthusiasts, show cars, and lease-return prep where swirl-mark removal matters.",
    process: [
      { step: "Decon", body: "Iron, tar, and bonded contaminant removal before any polishing touches paint." },
      { step: "Compound", body: "Rotary and dual-action machine polishing to level defects safely." },
      { step: "Refine", body: "Progressive polishes to deliver a mirror-flat, jewel-like finish." },
    ],
  },
  Interior: {
    tagline: "Full interior deep clean & extraction — pet hair, stains, odour, and grime handled at the fiber level.",
    includes: [
      "Full interior vacuum + air blowout",
      "Rubber-blade pet hair removal",
      "Hot-water carpet & upholstery extraction",
      "Enzymatic stain pre-treatment",
      "Headliner spot treatment",
      "Leather deep clean + conditioning",
      "Dashboard, console, and vent detailing",
      "Door jamb & sill cleaning",
      "Ozone odour neutralisation",
      "Glass streak-free finish (interior)",
      "Trunk deep clean",
      "Fabric protection top-coat",
    ],
    aftercare:
      "Allow 4–6 hours of dry-out time before daily use. Ozone-treated cabins may retain a light clean scent for 24 hours — that dissipates naturally.",
    recommendedFor: "Family vehicles, pet owners, rideshare drivers, and pre-sale reconditioning.",
    process: [
      { step: "Extraction", body: "Rotary agitation + hot-water extraction pulls dirt out of carpet fibers, not just off the surface." },
      { step: "Treatment", body: "Enzymatic and ozone treatments neutralize organic odours at their source." },
      { step: "Protect", body: "Fabric guard + leather conditioner lock the finish in for 3–4 months." },
    ],
  },
  Express: {
    tagline: "Express exterior maintenance — a fast, high-quality wash, decon, and sealant refresh.",
    includes: [
      "Foam bath + touchless pre-wash",
      "Two-bucket contact wash",
      "Wheel face + tire deep clean",
      "Bug & tar spot removal",
      "6-week spray sealant",
      "Tire dressing",
      "Streak-free glass",
      "Door jamb wipe-down",
      "Exhaust tip polish",
      "Quick interior vacuum",
      "Dash & console wipe-down",
      "Final IR gloss inspection",
    ],
    aftercare:
      "Rebook every 4–6 weeks to maintain the sealant layer. Subscription owners get priority slots.",
    recommendedFor: "Daily drivers and busy owners keeping a clean car between full details.",
    process: [
      { step: "Wash", body: "Two-bucket safe wash prevents wash marring — the #1 cause of swirl marks." },
      { step: "Decon", body: "Bug and tar spot treatment lifts contamination without abrasive scrubbing." },
      { step: "Protect", body: "Spray sealant tops the paint for six weeks of easy-clean hydrophobics." },
    ],
  },
};

const VEHICLE_CLASS_INFO: Record<string, string> = {
  "Coupe/Sedan": "Baseline pricing · 90 min typical labor",
  "SUV/Crossover": "×1.25 sizing multiplier · 120 min typical labor",
  Truck: "×1.35 sizing multiplier · 130 min typical labor",
  "Van/3-Row SUV": "×1.55 sizing multiplier · 150 min typical labor",
};

export function VehicleDetail({ vehicle }: { vehicle: Vehicle }) {
  const favorites = useFavorites();
  const isSaved = favorites.has(vehicle.id);
  const meta = TIER_META[vehicle.fuel];
  const [shareToast, setShareToast] = useState<string | null>(null);

  const whatsHref = useMemo(
    () =>
      buildWhatsAppHref({
        vehicleClass: vehicle.body,
        serviceTier: `${vehicle.fuel} — ${vehicle.title}`,
        notes: `Interested in work like this project: ${vehicle.title} (${vehicle.brand}, ${vehicle.year}). Booking status shown as ${vehicle.condition}.`,
        source: `package-${vehicle.id}`,
      }),
    [vehicle],
  );

  const related = allVehicles.filter((x) => x.id !== vehicle.id).slice(0, 6);

  const showToast = (msg: string) => {
    setShareToast(msg);
    window.setTimeout(() => setShareToast(null), 2400);
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        await (navigator as any).share({ title: vehicle.title, url });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showToast("Link copied to clipboard");
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <main className="overflow-x-hidden">
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-ink">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/buy" className="hover:text-ink">Recent Work</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-ink">{vehicle.title}</span>
        </nav>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-4">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-white">
          <img src={vehicle.img} alt={vehicle.title} className="aspect-[16/9] w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand">{vehicle.fuel} tier · {vehicle.transmission}</p>
          <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{vehicle.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{vehicle.summary ?? meta.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink">{vehicle.condition}</span>
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink">{vehicle.km} min labor</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Spec icon={<Car className="h-4 w-4" />} label="Vehicle Class" value={vehicle.body} />
            <Spec icon={<Sparkles className="h-4 w-4" />} label="Service Tier" value={vehicle.fuel} />
            <Spec icon={<ShieldCheck className="h-4 w-4" />} label="Finish Focus" value={vehicle.transmission} />
            <Spec icon={<Clock className="h-4 w-4" />} label="Est. Labor" value={`${vehicle.km} min`} />
            <Spec icon={<Star className="h-4 w-4" />} label="Booking Status" value={vehicle.condition} />
            <Spec icon={<Car className="h-4 w-4" />} label="Model Year" value={String(vehicle.year)} />
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-brand">Recommended for</p>
            <p className="mt-2 text-sm text-ink">{meta.recommendedFor}</p>
            <p className="mt-3 text-xs text-muted-foreground">{VEHICLE_CLASS_INFO[vehicle.body] ?? ""}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-ink">What's included</h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {meta.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-ink">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-ink">Our 3-step process</h2>
            <ol className="mt-3 grid gap-3 sm:grid-cols-3">
              {meta.process.map((p, i) => (
                <li key={p.step} className="rounded-2xl border border-border bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand">Step {i + 1}</p>
                  <p className="mt-1 text-sm font-bold text-ink">{p.step}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-brand">Aftercare</p>
            <p className="mt-2 text-sm text-ink">{meta.aftercare}</p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-brand">Book work like this</p>
            <p className="mt-1 text-xs text-muted-foreground">Ask about work like this for your vehicle — pricing is confirmed after a free assessment.</p>

            <a
              href={whatsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-ink"
            >
              <MessageCircle className="h-4 w-4" /> Book on WhatsApp
            </a>
            <a
              href={`tel:${STUDIO_TEL}`}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink py-3 text-sm font-semibold text-ink"
            >
              Call {STUDIO_PHONE}
            </a>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => favorites.toggle(vehicle.id)}
                className={`inline-flex items-center justify-center gap-2 rounded-full border py-2 text-xs font-semibold transition ${
                  isSaved ? "border-brand bg-brand/15 text-ink" : "border-border text-ink hover:border-ink"
                }`}
                aria-pressed={isSaved}
              >
                <Heart className="h-3.5 w-3.5" fill={isSaved ? "currentColor" : "none"} /> {isSaved ? "Saved" : "Save"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border py-2 text-xs font-semibold text-ink hover:border-ink"
              >
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
            </div>

            <div className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
              <p className="font-semibold text-ink">Free vehicle assessment</p>
              <p className="mt-1">We inspect paint condition, interior, and provide a fixed quote — on us.</p>
              <Link to="/sell" className="mt-2 inline-block font-semibold text-brand">
                Book free assessment →
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">More completed projects</h2>
        <p className="mt-1 text-sm text-muted-foreground">Other detailing work our Miramichi studios have booked recently.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((v) => (
            <VehicleCard key={v.id} v={v} />
          ))}
        </div>
      </section>

      {shareToast && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white shadow-lg">
          {shareToast}
        </div>
      )}
    </main>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <div className="flex items-center gap-2 text-brand">{icon}</div>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-bold text-ink">{value}</p>
    </div>
  );
}
