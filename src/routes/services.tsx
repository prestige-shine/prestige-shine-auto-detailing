import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sparkles, Droplets, Shield, Plus, Car, Layers, Gem } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import baAfter1 from "@/assets/ba-after-1.jpg";
import baAfter3 from "@/assets/ba-after-3.jpg";
import bmwX5 from "@/assets/bmwx5.jpg";
import audiQ5 from "@/assets/audi_q5.jpg";
import pontiacTransAm from "@/assets/pontiac_trans_am.jpg";
import camaro from "@/assets/camaro.jpg";
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
    price: "Priced by Size",
    duration: "Est. 2–5 hours",
    idealFor: "Work trucks, family vehicles, pet owners, pre-sale preparation, post-winter resets",
    image: baAfter1,
    blurb:
      "Your interior is the part of the vehicle you actually live in. Prestige Shine removes the salt, sand, spills, and pet hair that build up through a Miramichi winter, helping restore the cabin to a clean, refreshed condition. Every panel is carefully cleaned by hand — no blow-and-go service and no simply covering up dirt with heavy dressings.",
    included: [
      "Full vacuum of seats, carpets, trunk and every crevice",
      "Hot-water extraction of carpets and fabric upholstery",
      "Steam cleaning of vents, seams and hard-to-reach trim",
      "Leather cleaned and conditioned with pH-balanced products",
      "Dashboard, console, and door-card detailing with UV-protective treatment",
      "Pet hair and salt stain removal",
      "Odour neutralising treatment",
      "Streak-free interior glass",
    ],
  },
  {
    id: "exterior",
    icon: Droplets,
    name: "Exterior Detailing",
    price: "Priced by Size",
    duration: "Est. 2–4 hours",
    idealFor: "Daily drivers, seasonal refreshes, vehicles being prepped for sale or protection",
    image: bmwX5,
    blurb:
      "A proper exterior detail is more than a wash. Prestige Shine chemically and mechanically decontaminates the paint to leave the surface thoroughly clean, then safely enhances the gloss using rinseless-safe techniques, clean wash media, and controlled pressure designed to minimise the risk of introducing new scratches or marring.",
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
    name: "Full Detailing",
    price: "cars from $200",
    duration: "Est. 4 hours – 1 day",
    idealFor: "Owners who want one complete inside-and-out transformation",
    image: baAfter3,
    blurb:
      "A Full Detail combines complete interior and exterior work in a single appointment. Pricing is set by vehicle size: cars from $200, compact SUVs from $225, mid-size SUVs from $275, large / 3-row SUVs from $300, XL SUVs from $350, pickup trucks from $300 and large / HD trucks from $350. Every vehicle is personally inspected and quality-controlled by Kevin, and the final quote is confirmed before any work starts.",
    included: [
      "Complete interior clean plus exterior wash, decontamination and protection",
      "Hot-water extraction and deeper interior restoration where needed",
      "Optional Full Detail + Paint Enhancement combo — cars from $450 up to $700 for XL SUVs and HD trucks",
      "Door jamb detailing included",
      "Wheels, tires and trim restored on every package",
      "Photo documentation of the finished vehicle",
    ],
  },
  {
    id: "ceramic",
    icon: Shield,
    name: "Ceramic Coating",
    price: "from $800",
    duration: "Est. 1–3 days",
    idealFor: "New vehicles, high-value cars, owners who want long-term, low-maintenance protection",
    image: audiQ5,
    blurb:
      "As a System X certified installer, Kevin applies professional-grade ceramic coatings with careful preparation, including paint correction where required, panel wiping, and controlled curing conditions. The result is a hard, slick, hydrophobic surface that enhances gloss, improves resistance to environmental contamination, and makes routine washing easier. Product durability and any applicable manufacturer warranty depend on the specific System X product, its warranty terms, and proper maintenance.",
    included: [
      "3-Year Ceramic Protection — from $800",
      "System X 6-Year Ceramic Coating — from $1,200",
      "Correction + 6-Year Ceramic — from $1,500",
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
    name: "Full Detail + Paint Enhancement",
    price: "cars from $450",
    duration: "Est. 4 hours – 1 day",
    idealFor: "Owners who want a complete detail plus noticeably improved gloss in one visit",
    image: pontiacTransAm,
    blurb:
      "Prestige Shine most popular combination: a complete Full Detail paired with a 1-step paint enhancement that lifts gloss and reduces light swirling in the same appointment. Pricing follows vehicle size — cars from $450, compact SUVs from $475, mid-size SUVs from $550, large / 3-row SUVs from $600, XL SUVs from $700, pickup trucks from $600 and large / HD trucks from $700.",
    included: [
      "Complete interior and exterior Full Detail",
      "Full chemical and clay decontamination before polishing",
      "1-step machine paint enhancement for added gloss and clarity",
      "Light swirl and haze reduction",
      "Protection applied to lock in the finish",
      "Wheels, tires and trim restored",
      "Maintenance wash guidance tailored to your vehicle",
    ],
  },
  {
    id: "paint-correction",
    icon: Car,
    name: "Paint Correction",
    price: "from $300",
    duration: "Est. 1–3 days",
    idealFor: "Swirled, dull, oxidised or previously poorly-washed paint",
    image: camaro,
    blurb:
      "Paint correction is where some of the biggest transformations happen. Kevin measures paint thickness, assesses the condition of the panels, and machine polishes in stages to reduce or remove swirls, wash marring, and oxidation rather than simply filling them in. Under direct light, the difference can be striking — sharper reflections, richer colour, and a clearer, more refined finish.",
    included: [
      "1-Step Paint Enhancement — from $300",
      "2-Step Paint Correction — from $600",
      "Advanced / Multi-Stage Paint Correction — from $900",
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
  { name: "Headlight Restoration", price: "$59/pair", desc: "Polish and UV-seal oxidised headlight lenses to improve clarity and help protect against future oxidation." },
  { name: "Engine Bay Detail", price: "$89", desc: "Degrease, rinse and dress accessible engine bay plastics and components." },
  { name: "Leather Conditioning", price: "$79", desc: "Clean and condition leather seating and trim surfaces with pH-balanced products; does not include repair, dye or odour restoration." },
  { name: "Ceramic Wheel Coating", price: "$149", desc: "Ceramic coating applied to the accessible faces of all four wheels for brake-dust resistance and easier cleaning. Wheels are cleaned in place; barrel coating and wheel removal are not included." },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Detailing Services — Prestige Shine Auto Detailing" },
      { name: "description", content: "Interior detailing, exterior detailing, full detail packages from $200, full detail + paint enhancement from $450, System X ceramic coatings from $800 and paint correction in Miramichi, NB." },
      { property: "og:title", content: "Our Six Services — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "Interior, exterior, full detail packages, paint enhancement, ceramic coating and paint correction — every vehicle is personally inspected and quality-controlled by Kevin in Miramichi, NB." },
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
        subtitle="Six core services plus a menu of precision add-ons — every vehicle is personally inspected and quality-controlled by Kevin at Prestige Shine Auto Detailing in Miramichi, NB. By Appointment Only, with drop-off at our dedicated detailing and coating shop."
      />

      {/* Swipeable tier carousel */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Our Services</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">Swipe to explore each service</h2>
          </div>
          <p className="hidden text-xs text-muted-foreground sm:block">Drag, swipe, or use arrows †’</p>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {tiers.map((t) => {
              const TIcon = t.icon;
              const isActive = active === t.id;
              return (
                <CarouselItem key={t.id} className="pl-4 basis-[82%] sm:basis-2/3 lg:basis-1/2">
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
          <CarouselPrevious className="hidden sm:flex -left-2 bg-white/90 shadow-md" />
          <CarouselNext className="hidden sm:flex -right-2 bg-white/90 shadow-md" />
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
            <span className="rounded-full bg-surface border border-border px-3 py-1"><strong>Estimated duration:</strong> {tier.duration}</span>
            <span className="rounded-full bg-surface border border-border px-3 py-1"><strong>Ideal for:</strong> {tier.idealFor}</span>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">All durations are estimates and depend on vehicle size, condition, and any add-ons.</p>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{tier.blurb}</p>
          <p className="mt-3 text-xs text-muted-foreground">Prices shown are starting estimates. Final pricing is based on vehicle size and condition. Excessive pet hair, staining, heavy soiling, or unusually neglected vehicles may cost more.</p>

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
              href="https://wa.me/15062514451?text=Hi%20Prestige Shine%2C%20I%27d%20like%20to%20book%20a%20detailing%20appointment."
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

