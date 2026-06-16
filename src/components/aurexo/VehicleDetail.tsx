import { useState } from "react";
import {
  Heart,
  Share2,
  Printer,
  Plus,
  Gauge,
  Calendar,
  Fuel,
  Palette,
  Cog,
  Settings2,
  Hash,
  Boxes,
  BadgeCheck,
  Cylinder,
  DoorOpen,
  Users,
  Building2,
  Route,
  MapPin,
  ArrowRight,
  Star,
  Check,
  Camera,
  Video,
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import fordGT from "@/assets/ford-gt-white.jpg";
import carSilver from "@/assets/car-silver.jpg";
import carBlack from "@/assets/car-black.jpg";
import carBlue from "@/assets/car-blue.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryDashboard from "@/assets/gallery-dashboard.jpg";
import galleryCabin from "@/assets/gallery-cabin.jpg";
import { FinanceCalculator } from "@/components/aurexo/FinanceCalculator";

const tabs = ["Overview", "Description", "Features"] as const;
type Tab = (typeof tabs)[number];

const specs = [
  { icon: Gauge, label: "Mileage", value: "2" },
  { icon: Calendar, label: "Year", value: "2026" },
  { icon: Fuel, label: "Fuel Type", value: "Gasoline" },
  { icon: Palette, label: "Color", value: "Black" },
  { icon: Cog, label: "Engine Size", value: "5.0" },
  { icon: Settings2, label: "Transmission", value: "Automatic" },
  { icon: Hash, label: "Vin Number", value: "1" },
  { icon: Boxes, label: "Stock Number", value: "001" },
  { icon: BadgeCheck, label: "Condition", value: "New Car" },
  { icon: Cylinder, label: "Cylinders", value: "10" },
  { icon: DoorOpen, label: "Doors", value: "4" },
  { icon: Users, label: "Seat", value: "6" },
  { icon: Building2, label: "City MPG", value: "2" },
  { icon: Route, label: "Highway MPG", value: "4" },
  { icon: Settings2, label: "Drive Type", value: "FWD - ..." },
];

const featureCats = ["Safety", "Interior", "Exterior", "Mechanical"] as const;
const featureLists: Record<(typeof featureCats)[number], string[]> = {
  Safety: ["Blind-spot monitoring with cross-traffic alert", "Forward collision warning and automatic emergency braking", "Lane-keeping assistance with driver attention monitoring", "Full-length curtain and side-impact airbags", "Rear parking sensors with high-definition camera"],
  Interior: ["Hand-finished leather and microfiber sport seats", "Dual-zone automatic climate control", "Wireless Apple CarPlay and Android Auto", "Configurable digital instrument cluster", "Premium audio with cabin-noise compensation"],
  Exterior: ["Lightweight forged alloy wheels", "Adaptive LED headlamps with automatic high beam", "Aerodynamic rear diffuser and active spoiler", "Heated power-folding mirrors", "Factory metallic paint with ceramic protection"],
  Mechanical: ["Performance-tuned engine management", "Adaptive suspension with selectable drive modes", "Limited-slip differential and launch control", "High-performance ventilated braking system", "Electronic stability and traction management"],
};

const reviews = [
  {
    name: "Dy Randynox",
    date: "May 19, 2026",
    body: "Absolutely incredible driving experience. The acceleration is jaw-dropping and the interior feels like a spaceship. Worth every penny.",
  },
  {
    name: "Robert Fox",
    date: "May 19, 2026",
    body: "Service from the dealer was outstanding. They walked me through every option, financing was painless, and delivery was on time.",
  },
  {
    name: "Mista Nyroom",
    date: "May 19, 2026",
    body: "Build quality is top tier. The carbon fiber details are stunning in person. Highway MPG could be better but you don't buy this car for economy.",
  },
];

const related = [
  { img: carSilver, title: "2026 BMW 5 Series", price: "$32,600", km: "2" },
  { img: carBlack, title: "2025 Toyota GT 86 Coupe", price: "$28,900", km: "5" },
  { img: carBlue, title: "2026 Hyundai Tucson SUV", price: "$36,400", km: "1" },
];

import type { Vehicle } from "@/lib/aurexo-data";
import { useCompare } from "@/contexts/CompareContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export function VehicleDetail({ vehicle }: { vehicle?: Vehicle } = {}) {
  const heroImage = vehicle?.img ?? fordGT;
  const heroTitle = vehicle?.title ?? "2022 Ford GT White";
  const vehicleId = vehicle?.id ?? "2022-ford-gt-white";
  const { has, toggle } = useCompare();
  const favorites = useFavorites();
  const inCompare = has(vehicleId);
  const [tab, setTab] = useState<Tab>("Overview");
  const [featTab, setFeatTab] = useState<(typeof featureCats)[number]>("Safety");
  const favorite = favorites.has(vehicleId);
  const dynamicSpecs = specs.map((spec) => {
    if (!vehicle) return spec;
    const values: Record<string, string> = {
      Mileage: vehicle.km,
      Year: String(vehicle.year),
      "Fuel Type": vehicle.fuel,
      Transmission: vehicle.transmission,
      Condition: vehicle.condition,
      Doors: vehicle.body === "Coupe" ? "2" : vehicle.body === "Truck" ? "4" : "4–5",
      Seat: vehicle.body === "Coupe" ? "2–4" : vehicle.body === "SUV" ? "5–7" : "5",
      "Drive Type": vehicle.body === "SUV" || vehicle.body === "Truck" ? "AWD" : "RWD",
    };
    return { ...spec, value: values[spec.label] ?? spec.value };
  });
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <main className="bg-surface min-h-screen min-w-0 overflow-x-clip pb-20">
      {/* Sticky segmented tab header */}
      <div className="sticky top-16 z-30 bg-surface/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="inline-flex rounded-full border border-border bg-white p-1 text-sm font-medium">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-full transition ${
                  tab === t
                    ? "bg-ink text-white"
                    : "text-muted-foreground hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Identity + actions */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
          {heroTitle}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Premium supercar · Stock #001 · Atlanta, GA
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => toggle(vehicleId)}
            aria-pressed={inCompare}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
              inCompare ? "border-brand bg-brand text-ink" : "border-border bg-white text-ink hover:border-ink"
            }`}
          >
            {inCompare ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {inCompare ? "Added to compare" : "Compare"}
          </button>
          {[
            { icon: Heart, label: favorite ? "Remove from saved vehicles" : "Save vehicle", active: favorite, onClick: () => favorites.toggle(vehicleId) },
            { icon: Share2, label: "Share" },
            { icon: Printer, label: "Print" },
          ].map((b, i) => {
            const Icon = b.icon;
            return (
              <button
                key={i}
                onClick={b.onClick}
                aria-label={b.label}
                className={`grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-ink hover:border-ink ${
                  b.active ? "border-brand text-brand" : ""
                }`}
              >
                <Icon className="h-4 w-4" fill={b.active ? "currentColor" : "none"} />
              </button>
            );
          })}
        </div>

        <VehicleGallery heroImage={heroImage} heroTitle={heroTitle} />
      </section>

      {/* Car Overview spec grid */}
      <section className="mx-auto max-w-6xl px-4 mt-8">
        <h2 className="text-xl font-bold text-ink">Car Overview</h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {dynamicSpecs.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-white p-4"
              >
                <Icon className="h-5 w-5 text-brand" />
                <p className="mt-3 text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-sm font-semibold text-ink truncate">
                  {s.value}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Description / Features content */}
      <section className="mx-auto max-w-6xl px-4 mt-8">
        {tab === "Description" && (
          <div className="rounded-2xl bg-white border border-border p-5">
            <h2 className="text-xl font-bold text-ink">Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The 2022 Ford GT White is a masterclass in mid-engine engineering,
              priced from <span className="font-semibold text-ink">RM 115,900</span> to{" "}
              <span className="font-semibold text-ink">RM 141,900</span> depending on
              configuration. Crafted with a carbon fiber monocoque, twin-turbo
              EcoBoost V6 power, and active aerodynamics, this is a track-bred
              machine refined for the open road.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Includes a limited factory warranty, complimentary first service,
              and access to Aurexo's certified maintenance network across the
              region.
            </p>
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-white border border-border p-5">
          <h2 className="text-xl font-bold text-ink">Get To Know This Car</h2>
          <div className="mt-4 flex gap-6 border-b border-border overflow-x-auto">
            {featureCats.map((c) => (
              <button
                key={c}
                onClick={() => setFeatTab(c)}
                className={`relative pb-3 text-sm font-medium whitespace-nowrap ${
                  featTab === c ? "text-ink" : "text-muted-foreground"
                }`}
              >
                {c}
                {featTab === c && (
                  <span className="absolute -bottom-px left-0 right-0 h-[3px] rounded-full bg-brand" />
                )}
              </button>
            ))}
          </div>
          <ul className="mt-5 grid sm:grid-cols-2 gap-3">
            {featureLists[featTab].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-ink">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-ink">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Financing Calculator */}
      <section className="mx-auto max-w-6xl px-4 mt-6">
        <h2 className="mb-4 text-xl font-bold text-ink">Financing Calculator</h2>
        <FinanceCalculator defaultPrice={vehicle?.priceNum ?? 425000} />
      </section>

      {/* Map module */}
      <section className="mx-auto max-w-6xl px-4 mt-6">
        <div className="rounded-2xl bg-white border border-border p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-ink">
              <MapPin className="h-4 w-4 text-brand" /> Paris, France
            </div>
            <a className="text-sm font-medium text-ink underline-offset-2 hover:underline">
              Get Directions
            </a>
          </div>
          <div className="relative mt-4 h-72 overflow-hidden rounded-xl border border-border">
            {/* mock map */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg,#e8eef3 0%,#dfe7ee 50%,#cdd8e1 100%)",
              }}
            >
              <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 400 300">
                <path d="M0 80 Q120 60 200 120 T400 100" stroke="#9aa6b2" strokeWidth="2" fill="none" />
                <path d="M0 180 Q140 200 240 160 T400 220" stroke="#9aa6b2" strokeWidth="2" fill="none" />
                <path d="M60 0 L80 300" stroke="#b6bfc8" strokeWidth="1.5" />
                <path d="M260 0 L300 300" stroke="#b6bfc8" strokeWidth="1.5" />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand text-ink shadow-lg ring-4 ring-brand/30">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>
            </div>
            {/* floating summary card */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-80 rounded-xl bg-white shadow-xl border border-border p-3 flex gap-3">
              <img
                src={heroImage}
                alt=""
                className="h-16 w-20 rounded-lg object-cover shrink-0"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{heroTitle}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  2 Odo · Gasoline · Automatic
                </p>
                <a className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-ink">
                  View Details <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 mt-6">
        <div className="rounded-2xl bg-white border border-border p-5">
          <h2 className="text-xl font-bold text-ink">Customer Reviews</h2>
          <div className="mt-4 flex items-center gap-4 rounded-xl bg-surface border border-border p-4">
            <div className="text-4xl font-extrabold text-ink">4.8</div>
            <div>
              <div className="flex gap-0.5 text-brand">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Overall Rating Base on 4 Reviews
              </p>
            </div>
          </div>

          <ul className="mt-5 space-y-5">
            {reviews.map((r, i) => (
              <li key={i} className="border-b border-border pb-5 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-indigo text-sm font-bold text-white">
                    {r.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold text-ink">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>
                    <div className="mt-1 flex gap-0.5 text-brand">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {r.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-xl border border-dashed border-border bg-surface p-4 text-center text-sm text-muted-foreground">
            You need to{" "}
            <a className="font-semibold text-ink underline underline-offset-2">login</a>{" "}
            in order to post a review
          </div>
        </div>
      </section>

      {/* Dealer profile */}
      <section className="mx-auto max-w-6xl px-4 mt-6">
        <div className="rounded-2xl bg-white border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-ink text-sm font-bold text-white">
              RF
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-ink">Robert Fox</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-semibold text-ink">
                <BadgeCheck className="h-3 w-3 text-brand" fill="currentColor" />
                Verified Dealer
              </span>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-ink hover:bg-brand/90">
              <Phone className="h-4 w-4" /> Call To Dealer
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo py-3.5 text-sm font-semibold text-white hover:bg-indigo/90">
              <MessageCircle className="h-4 w-4" /> Chat Via WhatsApp
            </button>
            <button
              onClick={() => setInquiryOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3.5 text-sm font-semibold text-ink"
            >
              Send Inquiry About Vehicle
            </button>
          </div>
        </div>
      </section>

      {/* You might also like */}
      <section className="mx-auto max-w-6xl px-4 mt-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-ink">You Might Also Like</h2>
          <a className="text-sm font-medium text-muted-foreground">See all</a>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory">
          {related.map((c) => (
            <article
              key={c.title}
              className="snap-start w-[280px] sm:w-[320px] shrink-0 rounded-2xl bg-white border border-border overflow-hidden"
            >
              <div className="relative">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
                <span
                  className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
                  style={{ background: "#4338CA" }}
                >
                  Great Price
                </span>
                <button
                  aria-label="Save"
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 border border-border text-ink"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
                    <Camera className="h-3 w-3" /> 7
                  </span>
                  <span className="flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
                    <Video className="h-3 w-3" /> 2
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-ink truncate">{c.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {c.km} km · 2026 · Gasoline
                </p>
                <p className="mt-2 text-lg font-extrabold text-ink">{c.price}</p>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <button className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink">
                    <Plus className="h-3 w-3" /> Compare
                  </button>
                  <a className="inline-flex items-center gap-1 text-xs font-semibold text-ink">
                    View details <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Floating action button */}
      <button
        onClick={() => setInquiryOpen(true)}
        className="fixed bottom-6 right-6 z-30 grid h-14 w-14 place-items-center rounded-full bg-brand text-ink shadow-xl shadow-brand/30 hover:scale-105 transition"
        aria-label="Quick inquiry"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <InquirySheet open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </main>
  );
}

function VehicleGallery({ heroImage, heroTitle }: { heroImage: string; heroTitle: string }) {
  const gallery = [
    { src: heroImage, label: "Exterior" },
    { src: galleryInterior, label: "Interior" },
    { src: galleryDashboard, label: "Dashboard" },
    { src: galleryCabin, label: "Cabin" },
  ];
  const [active, setActive] = useState(0);
  const current = gallery[active];

  return (
    <div className="mt-6 w-full" aria-label={`${heroTitle} media gallery`}>
      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-ink aspect-[4/3] sm:aspect-[16/9]">
        <img
          src={current.src}
          alt={`${heroTitle} ${current.label.toLowerCase()} view`}
          loading="eager"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          {current.label} · {active + 1}/{gallery.length}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2" role="tablist" aria-label="Choose gallery image">
        {gallery.map((image, index) => (
          <button
            key={image.label}
            type="button"
            onClick={() => setActive(index)}
            aria-selected={active === index}
            aria-label={`Show ${image.label.toLowerCase()} view`}
            className={`overflow-hidden rounded-xl border bg-white p-1 ${active === index ? "border-brand ring-2 ring-brand/25" : "border-border"}`}
          >
            <img src={image.src} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function CalcField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      <style>{`.calc-input{width:100%;border:1px solid var(--border);border-radius:0.75rem;padding:0.75rem 1rem;font-size:0.875rem;background:white;outline:none}.calc-input:focus{border-color:var(--ink)}`}</style>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-bold text-ink">{value}</span>
    </div>
  );
}

function InquirySheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <>
      <div
        onClick={() => { onClose(); setTimeout(() => setSent(false), 300); }}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
        {sent ? (
          <div className="py-10 text-center">
            <div className="mx-auto grid h-16 w-16 animate-[pop_0.4s_ease-out] place-items-center rounded-full bg-brand text-ink">
              <Check className="h-8 w-8" strokeWidth={3} />
            </div>
            <h3 className="mt-4 text-xl font-bold text-ink">Message sent</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The dealer will reach out within 2 hours. We'll email you a copy too.
            </p>
            <button
              onClick={() => { onClose(); setTimeout(() => setSent(false), 300); }}
              className="mt-5 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white"
            >
              Done
            </button>
            <style>{`@keyframes pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}`}</style>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-ink">Send Inquiry About Vehicle</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The dealer typically responds in under 2 hours.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-5 space-y-3"
            >
              <input required className="calc-input" placeholder="Name" />
              <input required className="calc-input" type="email" placeholder="Email" />
              <input className="calc-input" placeholder="Phone (Optional)" />
              <select className="calc-input" defaultValue="avail">
                <option value="avail">This Vehicle's Availability</option>
                <option>Price negotiation</option>
                <option>Test drive booking</option>
                <option>Financing options</option>
              </select>
              <textarea
                className="calc-input"
                rows={4}
                defaultValue="Hi, I'm interested in this vehicle. Could you let me know if it's still available and if a test drive can be arranged this week?"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-ink py-3.5 text-sm font-semibold text-white"
              >
                Send Inquiry
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
