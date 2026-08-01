import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ShieldCheck, Sparkles, Award, ArrowRight, Star, MessageCircle, Gauge, DollarSign, BarChart3, Calendar } from "lucide-react";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { PartnersMarquee } from "@/components/aurexo/PartnersMarquee";
import { HomeFAQ } from "@/components/aurexo/HomeFAQ";
import { BookingWidget } from "@/components/aurexo/BookingWidget";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { articles } from "@/lib/articles";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import baBefore1 from "@/assets/ba-before-1.jpg.asset.json";
import baAfter1 from "@/assets/ba-after-1.jpg.asset.json";
import baBefore2 from "@/assets/ba-before-2.jpg.asset.json";
import baAfter2 from "@/assets/ba-after-2.jpg.asset.json";
import baBefore3 from "@/assets/ba-before-3.jpg.asset.json";
import baAfter3 from "@/assets/ba-after-3.jpg.asset.json";
import baBefore4 from "@/assets/ba-before-4.jpg.asset.json";
import baAfter4 from "@/assets/ba-after-4.jpg.asset.json";
import baBefore5 from "@/assets/ba-before-5.jpg.asset.json";
import baAfter5 from "@/assets/ba-after-5.jpg.asset.json";

const carImg = (id: string, w = 1280) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const HERO_IMG = carImg("photo-1503376780353-7e6692767b70", 1920);
const HERO_VIDEO_MP4 = heroVideo.url;

const BEFORE_AFTER = [
  { id: "bmw-x5-revival", label: "Full Vehicle Revival — BMW X5", before: baBefore2.url, after: baAfter2.url, tier: "Full Detail & Paint Enhancement" },
  { id: "f150-interior-reset", label: "Work Truck Interior Reset — Ford F-150", before: baBefore1.url, after: baAfter1.url, tier: "Interior Restoration" },
  { id: "sienna-transformation", label: "Family Van Transformation — Toyota Sienna", before: baBefore3.url, after: baAfter3.url, tier: "Full Detail" },
  { id: "corvette-paint-revival", label: "Corvette Paint Revival — Chevrolet Corvette", before: baBefore4.url, after: baAfter4.url, tier: "Paint Correction" },
  { id: "trans-am-revival", label: "Classic Muscle Car Revival — Pontiac Trans Am", before: baBefore5.url, after: baAfter5.url, tier: "Complete Restoration Detail" },
];

const TIERS = [
  {
    name: "Express Exterior Maintenance",
    desc: "Hand wash, clay bar decontamination, spray sealant, wheel & tire detail. Perfect for regular upkeep.",
    price: "From $149",
    image: carImg("photo-1520340356584-f9917d1eea6f"),
  },
  {
    name: "Full Interior Deep Clean & Extraction",
    desc: "Hot-water extraction, steam sanitization, leather conditioning, odor elimination, glass treatment.",
    price: "From $329",
    image: carImg("photo-1449965408869-eaa3f722e40d"),
  },
  {
    name: "Premium 9H Ceramic Coating & Paint Correction",
    desc: "Multi-stage machine polishing, swirl removal, 9H ceramic application — up to 9-year protection.",
    price: "From $1,899",
    image: carImg("photo-1552519507-da3b142c6e3d"),
  },
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
      { title: "Top Coat Auto Detailers — Concierge Auto Detailing in Lahore" },
      { name: "description", content: "Premium auto detailing in Lahore. Ceramic 9H coating, multi-stage paint correction, interior hot-water extraction — concierge results." },
      { property: "og:title", content: "Top Coat Auto Detailers — Concierge Auto Detailing in Lahore" },
      { property: "og:description", content: "Ceramic 9H coating, paint correction, and interior deep extraction. Serving all of Lahore." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: HERO_IMG },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Top Coat Auto Detailers — Lahore" },
      { name: "twitter:description", content: "Concierge auto detailing perfected in Lahore." },
      { name: "application/ld+json", content: JSON.stringify({ "@context": "https://schema.org", "@type": ["LocalBusiness", "AutoDetailing"], "name": "Top Coat Auto Detailers", "description": "Premium concierge auto detailing, ceramic coating, and paint correction in Lahore.", "telephone": "+923219200955", "areaServed": "Lahore, Pakistan", "priceRange": "$$$", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "400" } }) },
    ],
    links: [
      { rel: "preload", as: "video", href: HERO_VIDEO_MP4, type: "video/mp4" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = useMemo(() => [...vehicles.filter((v) => v.featured), ...vehicles.filter((v) => !v.featured)].slice(0, 4), []);
  const latestArticles = useMemo(() => articles.slice(0, 3), []);
  const ctaMsg = "Hi Top Coat Auto Detailers — I'd like to book a free vehicle assessment in Lahore. Please send me available slots.";

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[88vh] overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_MP4}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disableRemotePlayback
          disablePictureInPicture
          controls={false}
          ref={(el) => {
            if (!el) return;
            el.muted = true;
            const tryPlay = () => el.play().catch(() => {});
            if (el.readyState >= 2) tryPlay();
            else el.addEventListener("loadeddata", tryPlay, { once: true });
            el.addEventListener("canplay", tryPlay, { once: true });
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-ink/85" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/30">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" /> Serving All of Lahore
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Concierge Auto Detailing,<br /><span className="text-brand">Perfected in Lahore.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
            Ceramic 9H nano-coating, multi-stage paint correction, and professional interior hot-water extraction — all delivered with white-glove precision at our Lahore studio.
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
              { icon: Award, num: "5,200+", label: "Lahore Vehicles Detailed" },
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

      {/* Service Tiers — image-forward */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">Our Services</p>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Choose Your Service Tier</h2>
          <p className="mt-2 text-sm text-muted-foreground">Every package is tailored to your vehicle class and condition — no cookie-cutter pricing.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((t) => (
            <article key={t.name} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition hover:-translate-y-1 hover:border-ink/40 hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-ink shadow-sm">
                  {t.price}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-bold text-ink">{t.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.desc}</p>
                <Link to="/services" className="mt-4 inline-flex items-center gap-1 self-start rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-brand-foreground transition hover:bg-brand/90">
                  Learn more <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Before / After Gallery */}
      <BookingWidget />

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Recent Work</p>
            <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Recent Work</h2>
            <p className="mt-2 text-sm text-muted-foreground">Real vehicle transformations completed by Prestige Shine Auto Detailing in Miramichi, NB. Every project showcases the craftsmanship, attention to detail, and premium finish our clients expect.</p>
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
          <Link to="/buy" className="inline-flex items-center gap-1 text-sm font-medium text-ink">All packages <ArrowRight className="h-4 w-4" /></Link>
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

      {/* Blog Section */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">From the Journal</p>
            <h2 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">Detailing Guides & Lahore Insights</h2>
          </div>
          <Link to="/news" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-ink">
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((a) => (
            <Link
              key={a.slug}
              to="/blog/$slug"
              params={{ slug: a.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={a.cover}
                  alt={a.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-ink">
                  {a.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-ink line-clamp-2 group-hover:text-brand">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {a.date}</span>
                  {a.readMinutes ? <span>· {a.readMinutes} min read</span> : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <Link to="/news" className="inline-flex items-center gap-1 text-sm font-medium text-ink">
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

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
          <p className="mt-5 text-xs text-white/45">+92 321 9200955 · Lahore, Pakistan · Mon–Sat 7 am–6 pm</p>
        </div>
      </section>
    </main>
  );
}
