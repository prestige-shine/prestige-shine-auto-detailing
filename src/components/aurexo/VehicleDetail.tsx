import { useEffect, useState } from "react";
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
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { vehicles as allVehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { FinanceCalculator } from "@/components/aurexo/FinanceCalculator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER, STUDIO_PHONE, STUDIO_TEL, buildLeadMessage } from "@/lib/whatsapp";

// Roofing-specific gallery assets (no automotive imagery)
const ROOF_GALLERY_INTERIOR = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1280&q=70";
const ROOF_GALLERY_CLOSEUP = "https://images.unsplash.com/photo-1632759145355-8b8f3ab5d6c3?auto=format&fit=crop&w=1280&q=70";
const ROOF_GALLERY_INSTALL = "https://images.unsplash.com/photo-1621886292650-52c6e73aaa15?auto=format&fit=crop&w=1280&q=70";
const ROOF_HERO_FALLBACK = "https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&w=1280&q=70";

const tabs = ["Overview", "Description", "Features"] as const;
type Tab = (typeof tabs)[number];

const specs = [
  { icon: Gauge, label: "Square Footage", value: "—" },
  { icon: Calendar, label: "Completed", value: "2025" },
  { icon: Fuel, label: "Material Family", value: "Asphalt" },
  { icon: Palette, label: "Color / Finish", value: "Charcoal" },
  { icon: Cog, label: "Pitch", value: "6:12" },
  { icon: Settings2, label: "Profile", value: "Architectural" },
  { icon: Hash, label: "Project No.", value: "AX-001" },
  { icon: Boxes, label: "Crew Size", value: "6" },
  { icon: BadgeCheck, label: "Service Type", value: "New Install" },
  { icon: Cylinder, label: "Layers Removed", value: "1" },
  { icon: DoorOpen, label: "Roof Profile", value: "Gable" },
  { icon: Users, label: "Stories", value: "2" },
  { icon: Building2, label: "Wind Rating", value: "130 mph" },
  { icon: Route, label: "Fire Rating", value: "Class A" },
  { icon: Settings2, label: "Underlayment", value: "Synthetic + Ice & Water" },
];

const featureCats = ["Material Composition", "Wind & Fire Resistance", "Warranty Details", "Workmanship"] as const;
const featureLists: Record<(typeof featureCats)[number], string[]> = {
  "Material Composition": ["SBS-modified asphalt with copper-granule UV blend", "Synthetic underlayment across the full deck", "Ice-and-water shield extending past warm-wall line", "Copper or lead-coated copper valley flashing", "G90 galvanised drip edge and step flashing"],
  "Wind & Fire Resistance": ["ASTM D7158 Class H — rated to 150 mph uplift", "Six-nail fastening pattern on every shingle course", "Class 4 impact rating eligible for Ohio insurance discounts", "Class A fire rating per ASTM E108", "Sealed-deck construction limits wind-driven rain"],
  "Warranty Details": ["Lifetime limited material warranty from the manufacturer", "25-year non-prorated Aurexo workmanship warranty", "Transferable once at no cost to the next owner", "Warranty registered in your name on completion day", "Annual inspections logged to your digital project file"],
  Workmanship: ["Manufacturer Master Elite certified crew", "Dedicated finish carpenter for valleys and penetrations", "Balanced intake and exhaust ventilation engineered to spec", "Daily clean-up with magnetic nail sweep", "Photographic documentation at every project phase"],
};

const reviews = [
  {
    name: "Dy Randynox",
    date: "May 19, 2026",
    body: "Aurexo replaced our 1920s slate mansard with a synthetic system that looks identical to the original. Two days ahead of schedule and immaculate clean-up.",
  },
  {
    name: "Robert Fox",
    date: "May 19, 2026",
    body: "Walked us through every line item before signing — underlayment, ice shield, copper valley flashing. No surprises on invoice day.",
  },
  {
    name: "Mista Nyroom",
    date: "May 19, 2026",
    body: "Our standing-seam aluminium roof survived the May derecho without a single panel lifting. Aurexo was on-site for a post-storm inspection within 24 hours.",
  },
];




import type { Vehicle } from "@/lib/aurexo-data";
import { useCompare } from "@/contexts/CompareContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export function VehicleDetail({ vehicle }: { vehicle?: Vehicle } = {}) {
  const heroImage = vehicle?.img ?? ROOF_HERO_FALLBACK;
  const heroTitle = vehicle?.title ?? "Aurexo Roofing Project";
  const vehicleId = vehicle?.id ?? "aurexo-project-001";
  const { has, toggle } = useCompare();
  const favorites = useFavorites();
  const inCompare = has(vehicleId);
  const [tab, setTab] = useState<Tab>("Overview");
  const [featTab, setFeatTab] = useState<(typeof featureCats)[number]>("Material Composition");
  const favorite = favorites.has(vehicleId);
  const dynamicSpecs = specs.map((spec) => {
    if (!vehicle) return spec;
    const values: Record<string, string> = {
      "Square Footage": `${vehicle.km} sqft`,
      Completed: String(vehicle.year),
      "Material Family": vehicle.fuel,
      Profile: vehicle.transmission,
      "Service Type": vehicle.condition,
      "Roof Profile": vehicle.body,
      Stories: vehicle.body === "Mansard" ? "3" : vehicle.body === "Shed" ? "1" : "2",
      "Wind Rating": vehicle.fuel === "Metal" ? "150 mph" : vehicle.fuel === "Slate" ? "110 mph" : "130 mph",
    };
    return { ...spec, value: values[spec.label] ?? spec.value };
  });
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const related = allVehicles.filter((x) => x.id !== vehicleId).slice(0, 6);

  const showToast = (msg: string) => {
    setShareToast(msg);
    window.setTimeout(() => setShareToast(null), 2400);
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        await (navigator as any).share({ title: heroTitle, url, text: `Aurexo Roofing Studio · ${heroTitle}` });
        return;
      }
    } catch {
      /* user cancelled — fall through to clipboard */
    }
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showToast("Link copied to clipboard");
      }
    } catch {
      showToast("Unable to share this project");
    }
  };
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

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
          Premium roofing system · Project #{vehicleId.slice(0, 6).toUpperCase()} · Ohio, USA
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
            { icon: Share2, label: "Share", onClick: handleShare },
            { icon: Printer, label: "Print", onClick: handlePrint },
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
            <h2 className="text-xl font-bold text-ink">Project Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {heroTitle} is a complete premium roofing system engineered for Ohio's full
              four-season climate. The assembly includes a documented deck inspection,
              continuous ice-and-water shield to code height, synthetic underlayment,
              copper-flashed valleys and penetrations, balanced intake and exhaust
              ventilation, and a finish material specified to the home's architectural
              language.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every Aurexo installation is backed by a 25-year non-prorated workmanship
              warranty in addition to the manufacturer's lifetime material coverage, with
              registration filed in the homeowner's name on completion day.
            </p>
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-white border border-border p-5">
          <h2 className="text-xl font-bold text-ink">Get to Know Your Roof</h2>
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
              <li key={f} className="flex items-start gap-3 text-sm text-ink">
                <span className="grid h-6 w-6 shrink-0 aspect-square place-items-center rounded-full bg-brand text-ink">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="leading-6">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Financing Calculator */}
      <section className="mx-auto max-w-6xl px-4 mt-6">
        <h2 className="mb-4 text-xl font-bold text-ink">Project Financing Calculator</h2>
        <FinanceCalculator defaultPrice={vehicle?.priceNum ?? 78400} />
      </section>

      {/* Map module */}
      <section className="mx-auto max-w-6xl px-4 mt-6">
        <div className="rounded-2xl bg-white border border-border p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-ink">
              <MapPin className="h-4 w-4 text-brand" /> Ohio, USA
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
                  {vehicle ? `${vehicle.km} sqft · ${vehicle.fuel} · ${vehicle.transmission}` : "Premium roofing system"}
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
            <button
              type="button"
              onClick={() => authModal.open()}
              className="font-semibold text-ink underline underline-offset-2 hover:text-brand"
            >
              login
            </button>{" "}
            in order to post a review
          </div>
        </div>
      </section>

      {/* Studio contact */}
      <section className="mx-auto max-w-6xl px-4 mt-6">
        <div className="rounded-2xl bg-white border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-ink text-sm font-bold text-white">
              AR
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-ink">Aurexo Roofing Studio</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-semibold text-ink">
                <BadgeCheck className="h-3 w-3 text-brand" fill="currentColor" />
                Certified Studio · Ohio
              </span>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <a href="tel:+15615550199" className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-ink hover:bg-brand/90">
              <Phone className="h-4 w-4" /> Call the Studio
            </a>
            <a
              href={`https://wa.me/15615550199?text=${encodeURIComponent(`Hi Aurexo, I'm interested in a project similar to: ${heroTitle}.`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo py-3.5 text-sm font-semibold text-white hover:bg-indigo/90"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <button
              onClick={() => setInquiryOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3.5 text-sm font-semibold text-ink"
            >
              Request Free Estimate
            </button>
          </div>
        </div>
      </section>

      {/* You might also like */}
      <section className="mx-auto max-w-6xl px-4 mt-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-ink">You Might Also Like</h2>
          <Link
            to="/buy"
            className="text-sm font-medium text-muted-foreground hover:text-ink underline-offset-2 hover:underline"
          >
            See all
          </Link>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory">
          {related.map((c) => (
            <div
              key={c.id}
              className="snap-start w-[280px] sm:w-[320px] shrink-0"
            >
              <VehicleCard v={c} />
            </div>
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
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!api) return;
    const updateActive = () => setActive(api.selectedScrollSnap());
    updateActive();
    api.on("select", updateActive);
    api.on("reInit", updateActive);
    return () => {
      api.off("select", updateActive);
      api.off("reInit", updateActive);
    };
  }, [api]);

  return (
    <div className="mt-6 min-w-0 max-w-full overflow-hidden" aria-label={`${heroTitle} media gallery`}>
      <Carousel
        setApi={setApi}
        opts={{ loop: true, dragFree: false, containScroll: "trimSnaps" }}
        className="group min-w-0 max-w-full overflow-hidden overscroll-x-contain"
      >
        <CarouselContent className="ml-0 touch-pan-y select-none">
          {gallery.map((image, index) => (
            <CarouselItem key={image.label} className="min-w-0 pl-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-ink sm:aspect-[16/9]">
                <img
                  src={image.src}
                  alt={`${heroTitle} ${image.label.toLowerCase()} view`}
                  width={1536}
                  height={1024}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  {image.label} · {index + 1}/{gallery.length}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 hidden h-11 w-11 border-0 bg-white/90 text-ink shadow-lg hover:bg-white sm:inline-flex" />
        <CarouselNext className="right-3 hidden h-11 w-11 border-0 bg-white/90 text-ink shadow-lg hover:bg-white sm:inline-flex" />
      </Carousel>

       <div className="mt-3 flex max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1" role="tablist" aria-label="Choose gallery image">
        {gallery.map((image, index) => (
          <Button
            key={image.label}
            type="button"
            variant="outline"
            onClick={() => api?.scrollTo(index)}
            aria-selected={active === index}
            className={`h-auto min-w-24 shrink-0 rounded-xl p-1.5 ${active === index ? "border-brand ring-2 ring-brand/25" : "border-border"}`}
          >
            <img src={image.src} alt="" width={120} height={80} loading="lazy" className="h-14 w-20 rounded-lg object-cover" />
            <span className="sr-only">Show {image.label.toLowerCase()} view</span>
          </Button>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground sm:hidden">Swipe to explore all views</p>
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
            <h3 className="text-xl font-bold text-ink">Request a Free Estimate</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The Aurexo studio typically responds within 2 hours during Ohio business hours.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-5 space-y-3"
            >
              <input required className="calc-input" placeholder="Name" />
              <input required className="calc-input" type="email" placeholder="Email" />
              <input className="calc-input" placeholder="Phone (Optional)" />
              <select className="calc-input" defaultValue="estimate">
                <option value="estimate">Free site inspection & estimate</option>
                <option>Storm restoration</option>
                <option>Material consultation</option>
                <option>Warranty service</option>
              </select>
              <textarea
                className="calc-input"
                rows={4}
                defaultValue="Hi Aurexo, I'd like to schedule a free site inspection for a roofing project on my Ohio home. Please reach out with your next available appointment."
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
