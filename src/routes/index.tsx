import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type SVGProps } from "react";
import {
  Search, Car, ShieldCheck, Banknote, Headphones, ArrowRight, MapPin, Star,
  Linkedin, Mail, Calendar,
} from "lucide-react";
import heroPoster from "@/assets/hero-road.jpg";
import { vehicles, bodyTypes, brands } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { FinanceCalculator } from "@/components/aurexo/FinanceCalculator";
import { team } from "@/lib/team";
import { articles } from "@/lib/articles";
import { siFord, siBmw, siToyota, siHyundai, siHonda, siChevrolet, siRivian, siMercedes, siAudi, siTesla } from "simple-icons/icons";

const brandIcons = { Ford: siFord, BMW: siBmw, Toyota: siToyota, Hyundai: siHyundai, Honda: siHonda, Chevrolet: siChevrolet, Rivian: siRivian, Mercedes: siMercedes, Audi: siAudi, Tesla: siTesla };

const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-luxury-car-on-a-road-31976-large.mp4";
const HERO_VIDEO_FALLBACK =
  "https://assets.mixkit.co/videos/preview/mixkit-traveling-down-the-coast-in-a-luxury-car-34555-large.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurexo — Premium Automotive Marketplace" },
      { name: "description", content: "Buy, sell and finance premium vehicles with verified dealers across the country." },
      { property: "og:title", content: "Aurexo — Premium Automotive Marketplace" },
      { property: "og:description", content: "Buy, sell and finance premium vehicles." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = vehicles.filter((v) => v.featured).slice(0, 6);
  const latest = articles.slice(0, 3);
  const [heroBrand, setHeroBrand] = useState("");
  const [heroBody, setHeroBody] = useState("");
  const [heroPrice, setHeroPrice] = useState("");
  const priceSearch = heroPrice === "under-20" ? { minPrice: 0, maxPrice: 20000 } : heroPrice === "20-50" ? { minPrice: 20000, maxPrice: 50000 } : heroPrice === "50-plus" ? { minPrice: 50000, maxPrice: 500000 } : {};

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
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {vehicles.length}+ vehicles available
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Find your next ride.<br />
            <span className="text-brand">Drive it home today.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/75 sm:text-base">
            Premium new and used vehicles from verified dealers. Transparent pricing,
            instant financing, delivered to your door.
          </p>

          <div className="mt-8 rounded-2xl bg-white p-3 text-ink shadow-2xl sm:p-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
              <select value={heroBrand} onChange={(event) => setHeroBrand(event.target.value)} className="min-h-12 rounded-xl border border-border px-3 py-3 text-sm">
                <option>Any Make</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={heroBody} onChange={(event) => setHeroBody(event.target.value)} className="min-h-12 rounded-xl border border-border px-3 py-3 text-sm">
                <option>Any Body Type</option>
                {bodyTypes.filter((b) => b.count > 0).map((b) => <option key={b.label} value={b.label}>{b.label}</option>)}
              </select>
              <select value={heroPrice} onChange={(event) => setHeroPrice(event.target.value)} className="min-h-12 rounded-xl border border-border px-3 py-3 text-sm">
                <option>Any Price</option>
                <option value="under-20">Under $20k</option>
                <option value="20-50">$20k – $50k</option>
                <option value="50-plus">$50k+</option>
              </select>
              <Link to="/buy" search={{ brand: heroBrand || undefined, body: heroBody || undefined, ...priceSearch }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-ink">
                <Search className="h-4 w-4" /> Search
              </Link>
            </div>
          </div>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
            {[["12k+", "Vehicles"], ["340+", "Dealers"], ["98%", "Happy Buyers"]].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-extrabold text-brand sm:text-3xl">{n}</div>
                <div className="text-xs text-white/65">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body Types */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-ink">Browse by Body Type</h2>
          <Link to="/buy" className="text-sm font-medium text-muted-foreground">View all</Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {bodyTypes.filter((b) => b.count > 0).map((b) => {
            const BodyIcon = bodyIconFor(b.label);
            return (
            <Link key={b.label} to="/inventory/$body" params={{ body: b.label.toLowerCase() }} className="group rounded-2xl border border-border bg-white p-5 text-center transition hover:border-ink">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface group-hover:bg-brand/15">
                <BodyIcon className="h-9 w-9 text-ink" />
              </div>
              <p className="mt-3 font-semibold text-ink">{b.label}</p>
              <p className="text-xs text-muted-foreground">{b.count} cars</p>
            </Link>
          )})}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-ink">Featured Vehicles</h2>
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
        <h2 className="text-2xl font-bold text-ink">Why choose Aurexo</h2>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: ShieldCheck, t: "Verified Dealers", d: "Every dealer is vetted, rated and accountable." },
            { i: Banknote, t: "Easy Financing", d: "Pre-approved loans from 4.5% APR in minutes." },
            { i: Car, t: "Free Delivery", d: "Door-to-door delivery on every purchase." },
            { i: Headphones, t: "24/7 Support", d: "Real humans, real answers, around the clock." },
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

      {/* Financing Calculator (mirror) */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Financing</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">Crunch the numbers</h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Adjust the price, down payment and term to see what you'll pay each month — no signup required.
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
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Our Team</p>
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
            <p className="text-xs font-bold uppercase tracking-wide text-brand">News & Blogs</p>
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

      {/* Top Brands */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold text-ink">Top Brands</h2>
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {brands.slice(0, 10).map((b) => {
            const icon = brandIcons[b as keyof typeof brandIcons];
            return (
            <Link to="/buy" search={{ brand: b }} key={b} className="group flex min-h-32 flex-col items-center justify-center rounded-2xl border border-border bg-white px-3 py-5 text-center text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10 text-ink transition group-hover:text-brand"><path d={icon.path} fill="currentColor" /></svg>
              <span className="mt-3">{b}</span>
            </Link>
          )})}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-ink">What our customers say</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ["Sarah M.", "Bought my BMW in under 48 hours. Stress-free and the price was unbeatable."],
            ["Marcus T.", "The financing tool got me approved instantly. Picked up my truck the next day."],
            ["Priya K.", "Loved the verified dealer ratings. I knew exactly who I was dealing with."],
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
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to sell your car?</h2>
            <p className="mt-2 max-w-md text-sm text-white/70">
              Get a fair instant offer or list it to our 50,000+ buyer network.
            </p>
            <Link to="/sell" className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-ink">
              Get my offer <ArrowRight className="h-4 w-4" />
            </Link>
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

function bodyIconFor(body: string) {
  const paths: Record<string, string> = {
    Sedan: "M3 15h18l-1.5-4-4-2H8l-3.5 2L3 15Zm3 0a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0",
    SUV: "M3 15h18l-1-6H7l-3 3-1 3Zm3 0a2 2 0 1 0 4 0m7 0a2 2 0 1 0 4 0M9 9V6h7l3 3",
    Coupe: "M3 15h18l-2-4-5-3H9l-5 4-1 3Zm3 0a2 2 0 1 0 4 0m7 0a2 2 0 1 0 4 0",
    Hatchback: "M3 15h18l-1-7H9l-5 4-1 3Zm3 0a2 2 0 1 0 4 0m8 0a2 2 0 1 0 4 0M16 8l4 4",
    Truck: "M2 15h20v-4l-3-3h-5v7M3 8h11v7H3V8Zm2 7a2 2 0 1 0 4 0m8 0a2 2 0 1 0 4 0",
  };
  return function BodyIcon(props: SVGProps<SVGSVGElement>) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[body]} /></svg>;
  };
}
