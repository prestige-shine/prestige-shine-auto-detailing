import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Car,
  ShieldCheck,
  Banknote,
  Headphones,
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react";
import heroImg from "@/assets/hero-road.jpg";
import { vehicles, bodyTypes, brands } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurexo — Premium Automotive Marketplace" },
      { name: "description", content: "Buy, sell, and finance premium vehicles with verified dealers across the country." },
      { property: "og:title", content: "Aurexo — Premium Automotive Marketplace" },
      { property: "og:description", content: "Buy, sell, and finance premium vehicles with verified dealers across the country." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />
        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/30">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> 1,284 vehicles available
          </span>
          <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Find your next ride.<br />
            <span className="text-brand">Drive it home today.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm sm:text-base text-white/75">
            Premium new and used vehicles from verified dealers. Transparent pricing,
            instant financing, delivered to your door.
          </p>

          {/* Search card */}
          <div className="mt-8 rounded-2xl bg-white p-3 sm:p-4 text-ink shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <select className="rounded-xl border border-border px-3 py-3 text-sm">
                <option>Any Make</option>
                {brands.map((b) => <option key={b}>{b}</option>)}
              </select>
              <select className="rounded-xl border border-border px-3 py-3 text-sm">
                <option>Any Body Type</option>
                {bodyTypes.map((b) => <option key={b.label}>{b.label}</option>)}
              </select>
              <select className="rounded-xl border border-border px-3 py-3 text-sm">
                <option>Any Price</option>
                <option>Under $20k</option>
                <option>$20k – $50k</option>
                <option>$50k+</option>
              </select>
              <Link
                to="/buy"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-ink"
              >
                <Search className="h-4 w-4" /> Search
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
            {[
              ["12k+", "Vehicles"],
              ["340+", "Dealers"],
              ["98%", "Happy Buyers"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl sm:text-3xl font-extrabold text-brand">{n}</div>
                <div className="text-xs text-white/65">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by body type */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-ink">Browse by Body Type</h2>
          <Link to="/buy" className="text-sm font-medium text-muted-foreground">View all</Link>
        </div>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {bodyTypes.map((b) => (
            <Link
              key={b.label}
              to="/buy"
              className="group rounded-2xl bg-white border border-border p-5 text-center hover:border-ink transition"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface group-hover:bg-brand/15">
                <Car className="h-7 w-7 text-ink" />
              </div>
              <p className="mt-3 font-semibold text-ink">{b.label}</p>
              <p className="text-xs text-muted-foreground">{b.count} cars</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured vehicles */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-ink">Featured Vehicles</h2>
          <Link to="/buy" className="text-sm font-medium text-ink inline-flex items-center gap-1">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.slice(0, 6).map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
      </section>

      {/* Why Aurexo */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-ink">Why choose Aurexo</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { i: ShieldCheck, t: "Verified Dealers", d: "Every dealer is vetted, rated, and accountable." },
            { i: Banknote, t: "Easy Financing", d: "Pre-approved loans from 4.5% APR in minutes." },
            { i: Car, t: "Free Delivery", d: "Door-to-door delivery on every purchase." },
            { i: Headphones, t: "24/7 Support", d: "Real humans, real answers, around the clock." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl bg-white border border-border p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-ink">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold text-ink">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top brands */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold text-ink">Top Brands</h2>
        <div className="mt-5 grid grid-cols-3 sm:grid-cols-5 gap-3">
          {brands.slice(0, 10).map((b) => (
            <div
              key={b}
              className="rounded-xl bg-white border border-border py-5 text-center text-sm font-semibold text-ink"
            >
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-ink">What our customers say</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            ["Sarah M.", "Bought my BMW in under 48 hours. Stress-free and the price was unbeatable."],
            ["Marcus T.", "The financing tool got me approved instantly. Picked up my truck the next day."],
            ["Priya K.", "Loved the verified dealer ratings. I knew exactly who I was dealing with."],
          ].map(([n, q]) => (
            <div key={n} className="rounded-2xl bg-white border border-border p-5">
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
        <div className="rounded-3xl bg-ink p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative">
            <MapPin className="h-6 w-6 text-brand" />
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to sell your car?
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/70">
              Get a fair instant offer or list it to our 50,000+ buyer network.
            </p>
            <Link
              to="/sell"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-ink"
            >
              Get my offer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
