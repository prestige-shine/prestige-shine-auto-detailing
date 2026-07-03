import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ShieldCheck, Sparkles, Award, ArrowRight, Star, MessageCircle, Gauge, DollarSign, BarChart3 } from "lucide-react";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { PartnersMarquee } from "@/components/aurexo/PartnersMarquee";
import { HomeFAQ } from "@/components/aurexo/HomeFAQ";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const carImg = (id: string, w = 1280) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const HERO_IMG = carImg("photo-1552519507-da3b142c6e3d", 1920);

const BEFORE_AFTER = [
  { id: "swirl-porsche", label: "Paint Swirl Correction — Porsche 911", before: carImg("photo-1600661653561-629509216228"), after: carImg("photo-1552519507-da3b142c6e3d"), tier: "Paint Correction" },
  { id: "oxidation-bmw", label: "Oxidation Removal — BMW M5", before: carImg("photo-1493238792000-8113da705763"), after: carImg("photo-1503376780353-7e6692767b70"), tier: "Paint Correction" },
  { id: "pet-hair-suv", label: "Pet-Hair Extraction — SUV Interior", before: carImg("photo-1605618313023-d3f1caeeed8b"), after: carImg("photo-1544829099-b9a0c07fad1a"), tier: "Interior Deep Clean" },
  { id: "coffee-steam", label: "Coffee-Stain Steam Extraction", before: carImg("photo-1583121274602-3e2820c69888"), after: carImg("photo-1607861716497-e65ab29fc7ea"), tier: "Interior Deep Clean" },
  { id: "headlight", label: "Headlight Restoration", before: carImg("photo-1493238792000-8113da705763"), after: carImg("photo-1600661653561-629509216228"), tier: "Express Exterior" },
  { id: "tesla-ceramic", label: "Ceramic-Coated Tesla Model 3", before: carImg("photo-1605618313023-d3f1caeeed8b"), after: carImg("photo-1552519507-da3b142c6e3d"), tier: "9H Ceramic Coating" },
];

const TIERS = [
  { name: "Express Exterior Maintenance", desc: "Hand wash, clay bar decontamination, spray sealant, wheel & tire detail. Perfect for regular upkeep.", price: "From $149", icon: "⚡" },
  { name: "Full Interior Deep Clean & Extraction", desc: "Hot-water extraction, steam sanitization, leather conditioning, odor elimination, glass treatment.", price: "From $329", icon: "🧹" },
  { name: "Premium 9H Ceramic Coating & Paint Correction", desc: "Multi-stage machine polishing, swirl removal, 9H ceramic application — up to 9-year protection.", price: "From $1,899", icon: "💎" },
];

const TOOLS = [
  { label: "Instant Detailing Price", sub: "Get your estimate in 60 s", to: "/calculator", icon: DollarSign },
  { label: "Compare Packages", sub: "Side-by-side package view", to: "/compare", icon: BarChart3 },
  { label: "Payment Plans", sub: "Flexible financing options", to: "/financing", icon: Gauge },
  { label: "Owner Reviews", sub: "400+ verified ratings", to: "/reviews", icon: Star },
];

const waHref = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurexo Detailing Studio — Concierge Auto Detailing in Ohio" },
      { name: "description", content: "Premium auto detailing in Ohio. Ceramic 9H coating, multi-stage paint correction, interior hot-water extraction — concierge results." },
      { property: "og:title", content: "Aurexo Detailing Studio — Concierge Auto Detailing in Ohio" },
      { property: "og:description", content: "Ceramic 9H coating, paint correction, and interior deep extraction. Serving all of Ohio." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: HERO_IMG },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Aurexo Detailing Studio — Ohio" },
      { name: "twitter:description", content: "Concierge auto detailing perfected in Ohio." },
      { name: "application/ld+json", content: JSON.stringify({ "@context": "https://schema.org", "@type": ["LocalBusiness", "AutoDetailing"], "name": "Aurexo Detailing Studio", "description": "Premium concierge auto detailing, ceramic coating, and paint correction in Ohio.", "telephone": "+15615550142", "areaServed": "Ohio, USA", "priceRange": "$$$", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "400" } }) },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = useMemo(() => [...vehicles.filter((v) => v.featured), ...vehicles.filter((v) => !v.featured)].slice(0, 4), []);
  const ctaMsg = "Hi Aurexo Detailing Studio — I'd like to book a free vehicle assessment in Ohio. Please send me available slots.";

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[88vh] overflow-hidden bg-ink">
        <img src={HERO_IMG} alt="Luxury sports car after ceramic coating — Aurexo Detailing Studio Ohio" className="absolute inset-0 h-full w-full object-cover opacity-50" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/60 to-ink" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/30">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" /> Serving All of Ohio
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Concierge Auto Detailing,<br /><span className="text-brand">Perfected in Ohio.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
            Ceramic 9H nano-coating, multi-stage paint correction, and professional interior hot-water extraction — all delivered with white-glove precision at our Ohio studio.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/get-estimate" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-ink transition hover:bg-brand/90">
              Get Instant Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/sell" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
              Book Free Vehicle Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: Award, num: "5,200+", label: "Ohio Vehicles Detailed" },
              { icon: ShieldCheck, num: "Up to 9 years", label: "Ceramic Coating Warranty" },
              { icon: Star, num: "4.9/5", label: "Owner Ratings (400+ reviews)" },
            ].map(({ icon: Icon, num, label }) => (
              <div key={label} className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-6 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/15"><Icon className="h-6 w-6 text-ink" /></div>
                <p className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">{num}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">Our Services</p>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Choose Your Service Tier</h2>
          <p className="mt-2 text-sm text-muted-foreground">Every package is tailored to your vehicle class and condition — no cookie-cutter pricing.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl border border-border bg-white p-6 transition hover:border-ink/40 hover:shadow-md">
              <div className="text-3xl">{t.icon}</div>
              <h3 className="mt-3 font-bold text-ink">{t.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.desc}</p>
              <p className="mt-4 text-lg font-extrabold text-brand">{t.price}</p>
              <Link to="/services" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-brand">
                Learn more <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Before / After Gallery */}
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Recent Work</p>
            <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Recent Automotive Transformations</h2>
            <p className="mt-2 text-sm text-muted-foreground">Real results from our Ohio studio — before & after every treatment.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BEFORE_AFTER.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-white">
                <div className="flex">
                  <div className="relative flex-1">
                    <img src={item.before} alt={`Before — ${item.label}`} className="h-40 w-full object-cover" loading="lazy" />
                    <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[11px] font-bold text-white">Before</span>
                  </div>
                  <div className="w-px bg-brand/40" />
                  <div className="relative flex-1">
                    <img src={item.after} alt={`After — ${item.label}`} className="h-40 w-full object-cover" loading="lazy" />
                    <span className="absolute right-2 top-2 rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-ink">After</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-ink">{item.label}</p>
                  <span className="mt-1 inline-block rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-medium text-ink">{item.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Featured</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">Top Detailing Packages</h2>
          </div>
          <Link to="/listings" className="inline-flex items-center gap-1 text-sm font-medium text-ink">All packages <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
      </section>

      {/* Quick Tools */}
      <section className="border-y border-border bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Tools</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">Everything You Need to Decide</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map(({ label, sub, to, icon: Icon }) => (
              <Link key={label} to={to} className="flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center transition hover:border-ink/40 hover:shadow-md">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/15"><Icon className="h-6 w-6 text-ink" /></div>
                <p className="mt-3 font-bold text-ink">{label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PartnersMarquee />
      <HomeFAQ />

      {/* Bottom CTA */}
      <section className="bg-ink py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/30">
            <Sparkles className="h-3.5 w-3.5" /> Limited Slots Available
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">Ready for a Flawless Finish?</h2>
          <p className="mt-3 text-sm text-white/65">Message us on WhatsApp and get a personalised quote within 2 hours.</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href={waHref(ctaMsg)} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-ink transition hover:bg-brand/90">
              <MessageCircle className="h-4 w-4" /> Book via WhatsApp
            </a>
            <Link to="/get-estimate" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50">
              Get Instant Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/45">+1 (561) 555-0142 · Ohio, USA · Mon–Sat 7 am–6 pm</p>
        </div>
      </section>
    </main>
  );
}
