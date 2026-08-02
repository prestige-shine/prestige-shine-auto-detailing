import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sparkles, Droplets, Shield, Plus, Car, Layers, Gem } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import baAfter1 from "@/assets/ba-after-1.jpg.asset.json";
import baAfter3 from "@/assets/ba-after-3.jpg.asset.json";
import bmwX5 from "@/assets/bmwx5.jpg.asset.json";
import audiQ5 from "@/assets/audi_q5.jpg.asset.json";
import pontiacTransAm from "@/assets/pontiac_trans_am.jpg.asset.json";
import corvetteC8 from "@/assets/corvette_c8.jpg.asset.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const tiers = [
  {
    id: "interior",
    icon: Sparkles,
    name: "Interior Detailing",
    price: "from $100",
    duration: "2–5 hours",
    idealFor: "Work trucks, family vehicles, pet owners, pre-sale preparation, post-winter resets",
    image: baAfter1.url,
    blurb:
      "Your interior is the part of the vehicle you actually live in. We strip out the salt, sand, spills and pet hair that build up through a Miramichi winter and bring the cabin back to a condition most owners haven't seen since delivery day. Every panel is worked by hand — no blow-and-go, no cover-up dressings.",
    included: [
      "Full vacuum of seats, carpets, trunk and every crevice",
      "Hot-water extraction of carpets and fabric upholstery",
      "Steam cleaning of vents, seams and hard-to-reach trim",
      "Leather cleaned and conditioned with pH-balanced products",
      "Dashboard, console and door cards detailed and UV-protected",
      "Pet hair and salt stain removal",
      "Odour neutralising treatment",
      "Streak-free interior glass",
    ],
  },
  {
    id: "exterior",
    icon: Droplets,
    name: "Exterior Detailing",
    price: "from $100",
    duration: "2–4 hours",
    idealFor: "Daily drivers, seasonal refreshes, vehicles being prepped for sale or protection",
    image: bmwX5.url,
    blurb:
      "A proper exterior detail is more than a wash. We decontaminate the paint chemically and mechanically so the surface is truly clean, then enhance the gloss safely — using rinseless-safe technique, clean media and controlled pressure so nothing new is scratched into your finish.",
    included: [
      "Foam pre-soak and safe two-bucket contact wash",
      "Iron fallout, tar and bug removal",
      "Clay bar decontamination of paint and glass",
      "Wheel faces, barrels and wheel wells deep cleaned",
      "Gloss-enhancing polish or spray sealant",
      "Door jambs cleaned and dried",
      "Trim and tires dressed with a satin, non-greasy finish",
      "Exterior glass polished streak-free",
    ],
  },
  {
    id: "packages",
    icon: Layers,
    name: "Full Detailing Packages",
    price: "from $150",
    duration: "4 hours – 1 day",
    idealFor: "Owners who want one complete inside-and-out transformation",
    image: baAfter3.url,
    blurb:
      "Our Silver, Gold and Platinum packages combine interior and exterior work into a single visit. Pricing scales with vehicle size and condition — cars start at $100 and SUVs and trucks at $150 — and you always know the starting point before we begin. Kevin reviews every vehicle personally and confirms the final quote before any work starts.",
    included: [
      "Silver: complete interior clean plus exterior wash, decontamination and sealant",
      "Gold: adds extraction, deeper interior restoration and a gloss-enhancing polish",
      "Platinum: adds paint refinement and long-term protection for a showroom finish",
      "Engine bay and door jamb detailing available in higher tiers",
      "Wheels, tires and trim restored on every package",
      "Photo documentation of the finished vehicle",
    ],
  },
  {
    id: "ceramic",
    icon: Shield,
    name: "Ceramic Coating",
    price: "from $799",
    duration: "1–3 days",
    idealFor: "New vehicles, high-value cars, owners who want long-term, low-maintenance protection",
    image: audiQ5.url,
    blurb:
      "As a System X certified installer, Kevin applies professional-grade ceramic coatings the way they're meant to be applied: fully prepped, polished, panel-wiped and cured in a controlled environment. The result is a hard, slick, hydrophobic layer that keeps your paint glossy and dramatically easier to wash through every season.",
    included: [
      "System X certified professional coating products",
      "Full chemical and clay decontamination",
      "Machine polish to remove marring before coating",
      "IPA panel wipe to strip all polishing oils",
      "Coating applied panel by panel and levelled by hand",
      "Wheels, glass and trim coating available",
      "Controlled cure time before release",
      "Aftercare guidance so the coating performs for years",
    ],
  },
  {
    id: "paint-protection",
    icon: Gem,
    name: "Paint Protection",
    price: "from $249",
    duration: "4 hours – 1 day",
    idealFor: "Classics, weekend cars, and any vehicle facing salt, sand and UV exposure",
    image: pontiacTransAm.url,
    blurb:
      "Between road salt, gravel and long summer sun, paint in New Brunswick takes a beating. We match the right level of protection to how you actually use the vehicle — from durable sealants to hybrid and ceramic-based products — so the finish stays protected without changing its character.",
    included: [
      "Condition assessment and protection plan for your vehicle",
      "Decontamination and surface prep before any product is applied",
      "Durable sealant or hybrid ceramic protection",
      "UV, salt, bird dropping and water spot resistance",
      "Trim, plastic and glass protection included",
      "Wheel and tire protection available",
      "Maintenance wash schedule tailored to your vehicle",
    ],
  },
  {
    id: "paint-correction",
    icon: Car,
    name: "Paint Correction",
    price: "from $399",
    duration: "1–3 days",
    idealFor: "Swirled, dull, oxidised or previously poorly-washed paint",
    image: corvetteC8.url,
    blurb:
      "Paint correction is where the biggest transformations happen. Kevin measures paint thickness, tests panels, then machine polishes in stages to permanently remove swirls, wash marring and oxidation — instead of filling them in. Under direct light the difference is undeniable: sharper reflections, deeper colour, true clarity.",
    included: [
      "Paint depth measurement and test-spot panel work",
      "Compounding stage to remove defects",
      "Refining polish for a hologram-free finish",
      "Swirl, wash marring and oxidation removal",
      "Single-stage or multi-stage correction to suit the paint",
      "Chrome and trim brightwork polished by hand",
      "Protection applied to lock in the corrected finish",
      "Before and after photo documentation",
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
      { title: "Detailing Services — Prestige Shine Auto Detailing" },
      { name: "description", content: "Interior detailing, exterior detailing, full detailing packages, System X ceramic coating, paint protection and paint correction in Miramichi, NB." },
      { property: "og:title", content: "Our Six Services — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "Interior, exterior, full packages, ceramic coating, paint protection and paint correction — done personally by Kevin in Miramichi, NB." },
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
              href="https://wa.me/923219200955?text=Hi%20Top Coat%2C%20I%27d%20like%20to%20book%20a%20detailing%20appointment."
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
