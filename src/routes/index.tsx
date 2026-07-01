import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ShieldCheck, Hammer, Award, Headphones, ArrowRight, MapPin, Star,
  Linkedin, Mail, Calendar, MessageCircle, Phone,
} from "lucide-react";
import heroPoster from "@/assets/hero-road.jpg";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { FinanceCalculator } from "@/components/aurexo/FinanceCalculator";
import { team } from "@/lib/team";
import { articles } from "@/lib/articles";
import { PartnersMarquee } from "@/components/aurexo/PartnersMarquee";
import { HomeFAQ } from "@/components/aurexo/HomeFAQ";
import { WHATSAPP_NUMBER, STUDIO_PHONE, STUDIO_TEL } from "@/lib/whatsapp";

// Aerial residential drone footage placeholders
const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-the-coast-of-a-modern-city-43332-large.mp4";
const HERO_VIDEO_FALLBACK =
  "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-suburbs-44760-large.mp4";

// Premium roofing materials with realistic $/sqft installed rates for Ohio
const MATERIALS = [
  { key: "Architectural Shingles", min: 4.5, max: 7.5, blurb: "Premium asphalt · 30-yr lifecycle" },
  { key: "Stone-Coated Steel", min: 9, max: 14, blurb: "Metal resilience · shingle silhouette" },
  { key: "Premium Aluminium", min: 10, max: 16, blurb: "Standing-seam · 40-yr coating" },
  { key: "Luxury Slate", min: 18, max: 32, blurb: "Heritage estate · 50-yr+ lifecycle" },
] as const;

type MaterialKey = (typeof MATERIALS)[number]["key"];

// WHATSAPP_NUMBER imported from @/lib/whatsapp

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurexo Roofing Studio — Premium Roofing Contractor in Ohio" },
      { name: "description", content: "Luxury roofing systems engineered for Ohio homes. Architectural shingles, standing-seam metal, premium aluminium, and natural slate — installed by a manufacturer-certified studio." },
      { property: "og:title", content: "Aurexo Roofing Studio — Premium Roofing Contractor in Ohio" },
      { property: "og:description", content: "Premium roofing installations across Ohio. Get a free estimate today." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = useMemo(() => {
    const featuredIds = new Set(vehicles.filter((p) => p.featured).map((p) => p.id));
    return [
      ...vehicles.filter((p) => featuredIds.has(p.id)),
      ...vehicles.filter((p) => !featuredIds.has(p.id)),
    ].slice(0, 10);
  }, []);
  const latest = articles.slice(0, 3);

  // Estimator state
  const [sqft, setSqft] = useState<number>(3000);
  const [material, setMaterial] = useState<MaterialKey>("Architectural Shingles");
  const selected = MATERIALS.find((m) => m.key === material)!;
  const estLow = Math.round(sqft * selected.min);
  const estHigh = Math.round(sqft * selected.max);

  const whatsappMessage = useMemo(() => {
    const lines = [
      "Hi Aurexo Roofing Studio, I'd like to book a free site inspection.",
      "",
      `• Roof size: ${sqft.toLocaleString()} sqft`,
      `• Material: ${material}`,
      `• Estimated range: ${usd(estLow)} – ${usd(estHigh)}`,
      "",
      "Please let me know your next available appointment in Ohio.",
    ];
    return encodeURIComponent(lines.join("\n"));
  }, [sqft, material, estLow, estHigh]);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
          <source src={HERO_VIDEO_FALLBACK} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/65 to-ink" />
        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/30">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Serving all of Ohio, USA
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Next-Generation<br />
            <span className="text-brand">Roofing Systems.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/75 sm:text-base">
            Premium roofing engineered for Ohio's four seasons. Manufacturer-certified
            crews, transparent line-item pricing, and a 25-year workmanship warranty on
            every project.
          </p>

          {/* Estimator panel */}
          <div className="mt-8 rounded-2xl bg-white p-4 text-ink shadow-2xl sm:p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-wide text-brand">Instant Estimator</p>
              <p className="text-xs text-muted-foreground">Ohio market rates · 2026</p>
            </div>

            {/* Square footage slider */}
            <div className="mt-4">
              <div className="flex items-baseline justify-between">
                <label htmlFor="sqft" className="text-sm font-semibold text-ink">
                  Estimated Roof Size
                </label>
                <span className="text-sm font-extrabold text-ink">
                  {sqft.toLocaleString()} <span className="text-xs font-medium text-muted-foreground">SqFt</span>
                </span>
              </div>
              <input
                id="sqft"
                type="range"
                min={1000}
                max={15000}
                step={100}
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-surface accent-brand"
              />
              <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                <span>1,000 sqft</span>
                <span>15,000 sqft</span>
              </div>
            </div>

            {/* Material selector */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-ink">Material</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {MATERIALS.map((m) => {
                  const active = m.key === material;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setMaterial(m.key)}
                      className={`min-h-14 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${
                        active
                          ? "border-brand bg-brand/10 text-ink"
                          : "border-border bg-white text-ink hover:border-ink"
                      }`}
                    >
                      <span className="block">{m.key}</span>
                      <span className="mt-0.5 block text-[10px] font-medium text-muted-foreground">
                        {m.blurb}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Estimate output */}
            <div className="mt-5 rounded-xl bg-surface/60 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                Estimated Cost Range
              </p>
              <p className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">
                {usd(estLow)} <span className="text-muted-foreground">–</span> {usd(estHigh)}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Installed range for {sqft.toLocaleString()} sqft of {material.toLowerCase()} in Ohio,
                including tear-off, underlayment, flashing, and ventilation.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-ink hover:bg-brand/90"
              >
                <MessageCircle className="h-4 w-4" /> Book Free Site Inspection
              </a>
              <Link
                to="/get-estimate"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white py-3 text-sm font-semibold text-ink hover:border-ink"
              >
                Get a Free Estimate <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 text-center">
            {[["1,800+", "Ohio Projects"], ["25 yr", "Workmanship Warranty"], ["4.9/5", "Homeowner Rating"]].map(([n, l]) => (
              <div key={l} className="mx-auto">
                <div className="text-2xl font-extrabold text-brand sm:text-3xl">{n}</div>
                <div className="text-xs text-white/65">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Recent Work</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">Recent Architectural Transformations</h2>
          </div>
          <Link to="/featured" className="inline-flex items-center gap-1 text-sm font-medium text-ink">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
      </section>

      {/* Why Aurexo */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-ink">Why choose Aurexo Roofing Studio</h2>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: ShieldCheck, t: "25-Year Workmanship Warranty", d: "Non-prorated, transferable, registered in your name." },
            { i: Award, t: "Manufacturer Certified", d: "Master Elite, SELECT ShingleMaster, and DECRA credentialed." },
            { i: Hammer, t: "Fixed-Completion Guarantee", d: "On-schedule delivery or we cover the overage." },
            { i: Headphones, t: "24-Hour Storm Response", d: "Emergency tarping and insurance-grade documentation." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-white p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-ink">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold text-ink">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Financing Calculator */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Financing</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">Plan your project budget</h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Adjust the project total, down payment, and term to see what a premium roof costs each month — no signup required.
            </p>
          </div>
          <Link to="/calculator" className="hidden text-sm font-medium text-ink sm:inline-flex items-center gap-1">
            Full calculator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6">
          <FinanceCalculator />
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Our Studio</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">The people behind Aurexo</h2>
          </div>
          <Link to="/about" className="hidden text-sm font-medium text-ink sm:inline">About us →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {team.map((m) => (
            <article key={m.email} className="overflow-hidden rounded-2xl border border-border bg-white">
              <img src={m.photo} alt={m.name} className="aspect-[4/5] w-full object-cover" loading="lazy" />
              <div className="p-4">
                <p className="truncate font-bold text-ink">{m.name}</p>
                <p className="truncate text-xs text-muted-foreground">{m.role}</p>
                <div className="mt-3 flex items-center gap-2">
                  <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-8 w-8 place-items-center rounded-full border border-border text-ink hover:border-ink">
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a href={m.twitter} target="_blank" rel="noreferrer" aria-label="Twitter / X" className="grid h-8 w-8 place-items-center rounded-full border border-border text-ink hover:border-ink">
                    <XLogo />
                  </a>
                  <a href={`mailto:${m.email}`} aria-label="Email" className="grid h-8 w-8 place-items-center rounded-full border border-border text-ink hover:border-ink">
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* News & Blogs */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">News & Guides</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">From the editorial desk</h2>
          </div>
          <Link to="/news" className="inline-flex items-center gap-1 text-sm font-medium text-ink">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {latest.map((a) => (
            <article key={a.slug} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white">
              <div className="relative">
                <img src={a.cover} alt={a.title} className="h-48 w-full object-cover" loading="lazy" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink/90 px-2.5 py-1 text-[11px] font-bold text-white">
                  <Calendar className="h-3 w-3" /> {a.date}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-brand">{a.category}</p>
                <h3 className="mt-1 text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: a.slug }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink"
                >
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-ink">What Ohio homeowners say</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ["Sarah M. · Shaker Heights, OH", "Aurexo replaced our 1920s slate mansard with a synthetic system that looks identical to the original — two days ahead of schedule."],
            ["Marcus T. · Hudson, OH", "Our standing-seam aluminium roof survived the May derecho without a single panel lifting. Best capital improvement we've ever made."],
            ["Priya K. · Bath Township, OH", "Walked us through every line item before signing. No surprises on invoice day, and the curb appeal is unrecognisable."],
          ].map(([n, q]) => (
            <div key={n} className="rounded-2xl border border-border bg-white p-5">
              <div className="flex gap-0.5 text-brand">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">"{q}"</p>
              <p className="mt-3 text-sm font-semibold text-ink">{n}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white sm:p-12">
          <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative">
            <MapPin className="h-6 w-6 text-brand" />
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to upgrade your roof?</h2>
            <p className="mt-2 max-w-md text-sm text-white/70">
              Get a documented, line-item estimate from an Aurexo studio in your Ohio metro — no obligation.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-ink">
                <MessageCircle className="h-4 w-4" /> WhatsApp the Studio
              </a>
              <a href="tel:+15615550199" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                <Phone className="h-4 w-4" /> +1 (561) 555-0199
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.01L4.6 22H1.34l8.04-9.18L1 2h7.02l4.84 6.4L18.24 2zm-2.4 18h1.86L7.26 4h-1.97l10.55 16z" />
    </svg>
  );
}
