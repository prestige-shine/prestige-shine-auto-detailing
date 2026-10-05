import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/aurexo/Reveal";
import { useMemo } from "react";
import {
  ShieldCheck,
  Paintbrush,
  CalendarClock,
  Images,
  Award,
  ArrowRight,
  Star,
  MessageCircle,
  DollarSign,
  Calendar,
  MapPin,
} from "lucide-react";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { PartnersMarquee } from "@/components/aurexo/PartnersMarquee";
import { HomeFAQ } from "@/components/aurexo/HomeFAQ";
import { BookingWidget } from "@/components/aurexo/BookingWidget";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { articles } from "@/lib/articles";
import heroCollage from "@/assets/hero-collage.png";
import prestigeShineLogo from "@/assets/prestige-shine-logo.png";
import baBefore1 from "@/assets/ba-before-1.jpg";
import baAfter1 from "@/assets/ba-after-1.jpg";
import baBefore2 from "@/assets/ba-before-2.jpg";
import baAfter2 from "@/assets/ba-after-2.jpg";
import baBefore3 from "@/assets/ba-before-3.jpg";
import baAfter3 from "@/assets/ba-after-3.jpg";
import baBefore4 from "@/assets/ba-before-4.jpg";
import baAfter4 from "@/assets/ba-after-4.jpg";
import baBefore5 from "@/assets/ba-before-5.jpg";
import baAfter5 from "@/assets/ba-after-5.jpg";
import bmwX5 from "@/assets/bmwx5.jpg";
import audiQ5 from "@/assets/audi_q5.jpg";
import pontiacTransAm from "@/assets/pontiac_trans_am.jpg";
import camaroBefore from "@/assets/camaro_before.jpg";
import camaroAfter from "@/assets/camaro_after.jpg";
import camaro from "@/assets/camaro.jpg";
import systemXCertificate from "@/assets/certifications/certificate.jpeg";

const HERO_IMG = heroCollage;

const BEFORE_AFTER = [
  {
    id: "bmw-x5-revival",
    label: "Full Vehicle Revival — BMW X5",
    before: baBefore2,
    after: baAfter2,
    tier: "Full Detail & Paint Enhancement",
  },
  {
    id: "f150-interior-reset",
    label: "Work Truck Interior Reset — Ford F-150",
    before: baBefore1,
    after: baAfter1,
    tier: "Interior Restoration",
  },
  {
    id: "sienna-transformation",
    label: "Family Van Transformation — Toyota Sienna",
    before: baBefore3,
    after: baAfter3,
    tier: "Full Detail",
  },
  {
    id: "corvette-paint-revival",
    label: "Corvette Paint Revival — Chevrolet Corvette",
    before: baBefore4,
    after: baAfter4,
    tier: "Paint Correction",
  },
  {
    id: "trans-am-revival",
    label: "Classic Muscle Car Revival — Pontiac Trans Am",
    before: baBefore5,
    after: baAfter5,
    tier: "Complete Restoration Detail",
  },
  {
    id: "camaro-transformation",
    label: "Classic Camaro Paint Correction — Before & After",
    before: camaroBefore,
    after: camaroAfter,
    tier: "Paint Correction",
  },
];

const TIERS = [
  {
    name: "Interior Detailing",
    desc: "Deep vacuum, hot-water extraction, steam sanitizing, leather cleaning and conditioning — every vent, seam and console restored by hand.",
    price: "Priced by size",
    image: baAfter1,
  },
  {
    name: "Exterior Detailing",
    desc: "Foam pre-wash, safe two-bucket contact wash, iron and tar decontamination, clay treatment, gloss enhancement and dressed trim, wheels and tires.",
    price: "Priced by size",
    image: bmwX5,
  },
  {
    name: "Full Detailing",
    desc: "Complete inside-and-out detailing priced by vehicle size — cars from $200 up to large and HD trucks from $350.",
    price: "Cars from $200",
    image: baAfter3,
  },
  {
    name: "Ceramic Coating",
    desc: "3-Year Ceramic Protection from $800, System X 6-Year Ceramic Coating from $1,200, or Correction + 6-Year Ceramic from $1,500 — prepped, polished and coated panel by panel.",
    price: "From $800",
    image: audiQ5,
  },
  {
    name: "Full Detail + Paint Enhancement",
    desc: "Our most popular combination — a complete full detail paired with a 1-step paint enhancement. Cars from $450 up to XL SUVs and HD trucks from $700.",
    price: "Cars from $450",
    image: pontiacTransAm,
  },
  {
    name: "Paint Correction",
    desc: "1-Step Paint Enhancement from $300, 2-Step Paint Correction from $600, or Advanced / Multi-Stage Correction from $900 — machine polishing that levels swirls, holograms and oxidation.",
    price: "From $300",
    image: camaro,
  },
];

const TOOLS = [
  {
    label: "Detailing Estimate",
    sub: "Quick estimate, no obligation",
    to: "/get-estimate",
    icon: DollarSign,
  },
  {
    label: "Our Recent Work",
    sub: "Before & after transformations",
    to: "/buy",
    icon: Images,
  },
  {
    label: "Owner Reviews",
    sub: "100+ 5-star Google reviews",
    to: "/reviews",
    icon: Star,
  },
  {
    label: "Our Services",
    sub: "Detailing, correction & coatings",
    to: "/services",
    icon: Award,
  },
];

const waHref = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Prestige Shine Auto Detailing | Miramichi, NB",
      },
      {
        name: "description",
        content:
          "Professional auto detailing, paint correction, paint enhancement, and ceramic coating services in Miramichi, NB.",
      },
      {
        property: "og:title",
        content: "Prestige Shine Auto Detailing | Miramichi, NB",
      },
      {
        property: "og:description",
        content:
          "Professional auto detailing, paint correction, paint enhancement, and ceramic coating services in Miramichi, NB.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:image",
        content: prestigeShineLogo,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Prestige Shine Auto Detailing | Miramichi, NB",
      },
      {
        name: "twitter:description",
        content:
          "Professional auto detailing, paint correction, paint enhancement, and ceramic coating services in Miramichi, NB.",
      },
      {
        name: "twitter:image",
        content: prestigeShineLogo,
      },
      {
        name: "application/ld+json",
        content: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "AutoDetailing"],
          name: "Prestige Shine Auto Detailing",
          description:
            "Professional auto detailing, ceramic coating, paint correction, and paint enhancement services in Miramichi, NB.",
          telephone: "+15062514451",
          email: "prestige101shine@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "229 Jacqueline Dr",
            addressLocality: "Miramichi",
            addressRegion: "NB",
            postalCode: "E1N 3Z2",
            addressCountry: "CA",
          },
          areaServed: {
            "@type": "City",
            name: "Miramichi",
          },
          sameAs: ["https://www.facebook.com/share/19LTaGPm2C/"],
          priceRange: "$$$",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "100",
          },
        }),
      },
    ],
    links: [{ rel: "preload", as: "image", href: HERO_IMG }],
  }),
  component: Home,
});

function Home() {
  const featured = useMemo(
    () =>
      [
        ...vehicles.filter((v) => v.featured),
        ...vehicles.filter((v) => !v.featured),
      ].slice(0, 4),
    [],
  );

  const latestArticles = useMemo(() => articles.slice(0, 3), []);

  const ctaMsg =
    "Hi Prestige Shine Auto Detailing — I'd like to book a free vehicle assessment in Miramichi. Please send me available slots.";

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[88vh] overflow-hidden bg-black">
        <img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center opacity-70 sm:opacity-80"
        />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-ink/70" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/30">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />{" "}
            Serving All of Miramichi
          </span>

          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Prestige Shine Auto Detailing,
            <br />
            <span className="text-brand [-webkit-text-stroke:2px_#E2ECF5] sm:[-webkit-text-stroke:1.5px_#E2ECF5]">
              Perfected in Miramichi.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
            Appointment-only, drop-off detailing at our dedicated detailing
            and coating shop in Miramichi. Kevin is a System X certified
            installer, providing professional ceramic coatings alongside full
            detailing, paint enhancement, and paint correction.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/get-estimate"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
            >
              Get Instant Quote <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/sell"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Free Vehicle Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                num: "System X Certified Installer",
                label: "Professional Ceramic Coatings",
              },
              {
                icon: Paintbrush,
                num: "Paint Correction Specialist",
                label: "Restore Gloss & Clarity",
              },
              {
                icon: MapPin,
                num: "Serving Miramichi, NB",
                label: "Locally Owned & Operated",
              },
            ].map(({ icon: Icon, num, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-6 text-center"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/15">
                  <Icon className="h-6 w-6 text-ink" />
                </div>

                <p className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
                  {num}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System X Certification */}
      <section className="mx-auto mt-6 max-w-6xl px-4 pb-12">
        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-white lg:grid-cols-2">
            {/* Text */}
            <div className="flex flex-col items-start justify-center p-8 sm:p-12">
              <p className="text-xs font-bold uppercase tracking-wide text-brand">
                System X Certification
              </p>

              <h2 className="mt-2 text-2xl font-bold text-ink">
                Kevin, System X Certified Installer
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Kevin Hines is an authorized System X applicator, trained to
                meet the quality process standards required for professional
                System X ceramic coating applications. Explore ceramic coating
                services prepared and applied with care at the Prestige Shine
                shop in Miramichi.
              </p>

              <Link
                to="/about"
                className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Certificate */}
            <div className="min-h-[320px] bg-surface sm:min-h-[380px] lg:min-h-0">
              <img
                src={systemXCertificate}
                alt="System X certified ceramic coating installer certificate"
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Service Tiers — image-forward */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">
            Our Services
          </p>

          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
            Six Services, One Standard of Finish
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            From interior resets to System X ceramic coatings — every vehicle
            is personally inspected and quality-controlled by Kevin and priced
            according to your vehicle's size and condition.
          </p>

          <p className="mx-auto mt-2 max-w-2xl text-xs text-muted-foreground">
            Prices shown are starting estimates. Final pricing is based on
            vehicle size and condition. Excessive pet hair, staining, heavy
            soiling, or unusually neglected vehicles may cost more.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((t) => (
            <Reveal key={t.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white transition hover:-translate-y-1 hover:border-ink/40 hover:shadow-xl">
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

                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {t.desc}
                  </p>

                  <Link
                    to="/services"
                    className="mt-4 inline-flex items-center gap-1 self-start rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-brand-foreground transition hover:bg-brand/90"
                  >
                    Learn more <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Before / After Gallery */}
      <BookingWidget />

      <section className="bg-surface pb-8 pt-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">
              Recent Transformations
            </p>

            <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
              Recent Work
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Real vehicle transformations completed by Prestige Shine Auto
              Detailing in Miramichi, NB. Every project showcases the
              craftsmanship, attention to detail, and premium finish clients
              expect from Prestige Shine.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BEFORE_AFTER.map((item) => (
              <Reveal key={item.id}>
                <div className="group overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:border-ink/40 hover:shadow-xl">
                  <div className="flex">
                    <div className="relative flex-1 overflow-hidden">
                      <img
                        src={item.before}
                        alt={`Before — ${item.label}`}
                        className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[11px] font-bold text-white">
                        Before
                      </span>
                    </div>

                    <div className="w-px bg-brand/40" />

                    <div className="relative flex-1 overflow-hidden">
                      <img
                        src={item.after}
                        alt={`After — ${item.label}`}
                        className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      <span className="absolute right-2 top-2 rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-white">
                        After
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm font-semibold text-ink">
                      {item.label}
                    </p>

                    {item.tier ? (
                      <span className="mt-1 inline-block rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-medium text-ink">
                        {item.tier}
                      </span>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Completed Vehicles */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-10">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">
              Featured
            </p>

            <h2 className="mt-1 text-2xl font-bold text-ink">
              Recent Completed Vehicles
            </h2>
          </div>

          <Link
            to="/buy"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink"
          >
            All work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((v) => (
            <Reveal key={v.id}>
              <VehicleCard v={v} verifiedMetadataOnly />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quick Tools */}
      <section className="border-y border-border bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">
              Tools
            </p>

            <h2 className="mt-2 text-2xl font-bold text-ink">
              Everything You Need to Decide
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map(({ label, sub, to, icon: Icon }) => (
              <Reveal key={label}>
                <Link
                  to={to}
                  className="group flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-ink/40 hover:shadow-xl"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/15 transition duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6 text-ink" />
                  </div>

                  <p className="mt-3 font-bold text-ink">{label}</p>

                  <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PartnersMarquee />

      {/* Blog Section */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">
              From the Journal
            </p>

            <h2 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
              Detailing Guides & Miramichi Insights
            </h2>
          </div>

          <Link
            to="/news"
            className="hidden items-center gap-1 text-sm font-medium text-ink sm:inline-flex"
          >
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
                <h3 className="line-clamp-2 font-bold text-ink group-hover:text-brand">
                  {a.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {a.excerpt}
                </p>

                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {a.date}
                  </span>

                  {a.readMinutes ? (
                    <span>· {a.readMinutes} min read</span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            to="/news"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink"
          >
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <HomeFAQ />

      {/* Bottom CTA */}
      <section className="bg-ink py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/30">
            <CalendarClock className="h-3.5 w-3.5" /> Limited Slots Available
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Ready for a Flawless Finish?
          </h2>

          <p className="mt-3 text-sm text-white/65">
            Real vehicle transformations completed by Prestige Shine Auto
            Detailing in Miramichi, NB. Every project showcases the
            craftsmanship, attention to detail, and premium finish clients
            expect from Prestige Shine.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={waHref(ctaMsg)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
            >
              <MessageCircle className="h-4 w-4" /> Book via WhatsApp
            </a>

            <Link
              to="/get-estimate"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
            >
              Get Instant Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/45">
            +1 (506) 251-4451 · Miramichi, NB · By Appointment Only
          </p>
        </div>
      </section>
    </main>
  );
}