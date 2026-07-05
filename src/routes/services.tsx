import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sparkles, Droplets, Shield, Plus } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carImg = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const tiers = [
  {
    id: "express",
    icon: Droplets,
    name: "Express Exterior Maintenance",
    price: "from $89",
    duration: "60–90 min",
    idealFor: "Regular upkeep between deeper services, daily drivers, lease returns",
    image: carImg("photo-1520340356584-f9917d1eea6f"),
    included: [
      "Hand wash & rinse with pH-neutral foam",
      "Wheel & tire scrub with decontaminant",
      "Door jamb wipe-down",
      "Window exterior squeegee clean",
      "Tyre dressing application",
      "Quick-detailer spray & microfibre buff",
    ],
  },
  {
    id: "interior",
    icon: Sparkles,
    name: "Full Interior Deep Clean & Extraction",
    price: "from $199",
    duration: "3–5 hours",
    idealFor: "Pet owners, families, pre-sale preparation, post-winter refresh",
    image: carImg("photo-1449965408869-eaa3f722e40d"),
    included: [
      "Complete vacuum of all surfaces, crevices & boot",
      "Hot-water extraction for carpet & fabric seats",
      "Dashboard, console & trim clay and detail",
      "Door cards and pockets wiped & conditioned",
      "Headliner spot-cleaned",
      "Window interior streak-free clean",
      "Odour neutraliser treatment",
      "UV-protective dressing on all plastics",
    ],
  },
  {
    id: "ceramic",
    icon: Shield,
    name: "Premium 9H Ceramic Coating & Paint Correction",
    price: "from $999",
    duration: "2–4 days",
    idealFor: "New vehicle owners, paint-preservation enthusiasts, high-value vehicles",
    image: carImg("photo-1552519507-da3b142c6e3d"),
    included: [
      "Full paint decontamination (clay bar + iron fallout)",
      "Paint thickness measurement at all panels",
      "Single-stage machine polish (swirl & light scratch removal)",
      "Two-stage correction available (deep scratch & oxidation)",
      "Panel wipe-down with IPA to strip all oils",
      "9H Gtechniq Crystal Serum Ultra application",
      "EXO v4 topcoat for hydrophobic performance",
      "5-year warranty registered in your name",
      "Before & after documented photo set",
    ],
  },
];

const addons = [
  { name: "Headlight Restoration", price: "$59/pair", desc: "Polish and UV-seal oxidised headlight lenses for clarity and longevity." },
  { name: "Engine Bay Detail", price: "$89", desc: "Degrease, rinse, and dress all engine bay plastics and components." },
  { name: "Leather Conditioning", price: "$79", desc: "Clean and condition all leather surfaces with pH-balanced products." },
  { name: "PPF Consultation", price: "Free", desc: "Expert advice on paint protection film placement — clear bra, full bonnet, or full wrap referral." },
  { name: "Ceramic Wheel Coating", price: "$149", desc: "Pro-grade ceramic coating on all four wheels for brake-dust resistance and easy cleaning." },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Detailing Services — Top Coat Auto Detailers Ohio" },
      { name: "description", content: "Express exterior wash, full interior deep clean, 9H ceramic coating & paint correction. Add-ons: headlight restoration, engine bay, leather conditioning and more." },
      { property: "og:title", content: "Detailing Services — Top Coat Auto Detailers" },
      { property: "og:description", content: "Professional auto detailing services across Ohio." },
    ],
  }),
  component: Services,
});

function Services() {
  const [active, setActive] = useState(tiers[0].id);
  const tier = tiers.find((t) => t.id === active)!;
  const Icon = tier.icon;

  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="Services"
        title="Every service your vehicle deserves."
        subtitle="Three core detailing tiers plus a menu of precision add-ons — each performed by IDA-certified technicians in our climate-controlled studios."
      />

      {/* Swipeable tier carousel */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Signature Tiers</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">Swipe to explore each service</h2>
          </div>
          <p className="hidden text-xs text-muted-foreground sm:block">Drag, swipe, or use arrows →</p>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {tiers.map((t) => {
              const TIcon = t.icon;
              const isActive = active === t.id;
              return (
                <CarouselItem key={t.id} className="pl-4 sm:basis-2/3 lg:basis-1/2">
                  <button
                    type="button"
                    onClick={() => setActive(t.id)}
                    className={`group relative block w-full overflow-hidden rounded-3xl border text-left transition ${
                      isActive ? "border-brand shadow-xl" : "border-border hover:border-ink/40 hover:shadow-lg"
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={t.image}
                        alt={t.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <div className="flex items-center gap-2">
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-ink">
                            <TIcon className="h-4 w-4" />
                          </span>
                          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-bold backdrop-blur">
                            {t.price}
                          </span>
                        </div>
                        <h3 className="mt-3 text-lg font-extrabold leading-tight">{t.name}</h3>
                        <p className="mt-1 text-xs text-white/70">{t.duration}</p>
                      </div>
                      {isActive && (
                        <span className="absolute right-3 top-3 rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-ink">
                          Selected
                        </span>
                      )}
                    </div>
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-3" />
          <CarouselNext className="hidden sm:flex -right-3" />
        </Carousel>
      </section>

      {/* Active tier detail */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <article className="rounded-3xl border border-border bg-white p-6 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/15 text-ink">
              <Icon className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-extrabold text-ink">{tier.name}</h2>
              <p className="mt-1 text-xl font-bold text-brand">{tier.price}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-surface border border-border px-3 py-1"><strong>Duration:</strong> {tier.duration}</span>
            <span className="rounded-full bg-surface border border-border px-3 py-1"><strong>Ideal for:</strong> {tier.idealFor}</span>
          </div>

          <h3 className="mt-7 text-sm font-bold uppercase tracking-wide text-muted-foreground">What's included</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {tier.included.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface/40 p-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-ink">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-sm text-ink leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://wa.me/15615550142?text=Hi%20Top Coat%2C%20I%27d%20like%20to%20book%20a%20detailing%20appointment."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-ink"
            >
              Book this service
            </a>
            <a
              href="/get-estimate"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-ink transition"
            >
              Get an estimate
            </a>
          </div>
        </article>
      </section>

      {/* Add-ons */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">Enhance your detail</p>
        <h2 className="mt-1 text-2xl font-bold text-ink">Add-on services</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addons.map((a) => (
            <div key={a.name} className="rounded-2xl bg-white border border-border p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-ink">{a.name}</h3>
                <span className="shrink-0 rounded-full bg-brand/15 px-3 py-1 text-xs font-bold text-ink">{a.price}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand">
                <Plus className="h-3 w-3" /> Add to any service
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
