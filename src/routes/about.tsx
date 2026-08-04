import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { team } from "@/lib/team";
import chevelleDetail from "@/assets/chevelle-ss-detail.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Prestige Shine Auto Detailing — Miramichi's Premier Auto Detailing" },
      { name: "description", content: "Founded in 2015 in Chatham, Prestige Shine Auto Detailing delivers museum-grade paint correction, 9H ceramic coatings, and deep interior cleaning across Miramichi." },
      { property: "og:title", content: "About Prestige Shine Auto Detailing" },
      { property: "og:description", content: "Miramichi's premier auto detailing studio — ceramic coatings, paint correction, and interior deep cleans since 2015." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="About Prestige Shine"
        title="Miramichi's most trusted detailing studio, built from passion."
        subtitle="Founded in 2015 in Chatham, Prestige Shine Auto Detailing has grown from a one-bay garage into four state-of-the-art facilities serving Northeast and Central Miramichi — each staffed by certified detailing professionals obsessed with perfection."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { i: ShieldCheck, n: "System X Certified Installer", l: "Professional Ceramic Coating Specialist" },
          { i: Sparkles, n: "Paint Correction Specialists", l: "Restoring Gloss, Depth & Clarity" },
          { i: MapPin, n: "Serving Miramichi, NB", l: "Premium Auto Detailing for Local Vehicle Owners" },
        ].map(({ i: Icon, n, l }) => (
          <div key={l} className="rounded-2xl bg-white border border-border p-5 text-center">
            <Icon className="h-6 w-6 mx-auto text-brand" />
            <p className="mt-3 text-base font-extrabold text-ink">{n}</p>
            <p className="text-xs text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>

      {/* Founding story */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl bg-white border border-border overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <img
            src={chevelleDetail.url}
            alt="Chevrolet Chevelle SS detailed by Prestige Shine Auto Detailing in Miramichi, NB"
            className="h-64 w-full object-cover lg:h-full"
            loading="lazy"
          />
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Our Story</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">Built by Kevin Hines, in Miramichi.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Prestige Shine Auto Detailing is owned and operated by Kevin Hines out of a clean, organised shop at 229 Jacqueline Dr in Miramichi, NB. Kevin is a System X certified ceramic coating installer and a paint correction specialist — every vehicle is polished, coated, and finished by his own hands, whether it's a daily driver, a work truck, or a classic like this Chevelle SS. No rushed production line, no handing your keys to a rotating crew: one detailer, one standard, and a finish local owners keep coming back for.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & values */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl bg-white border border-border p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-ink">Our mission</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Every vehicle that enters an Prestige Shine studio leaves better than when it arrived — not just cleaner, but protected, restored, and documented. We combine professional-grade chemistry with meticulous hand-work and transparent communication so you always know exactly what was done and why.
          </p>
          <h3 className="mt-8 text-lg font-bold text-ink">What we stand for</h3>
          <ul className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
            {[
              "Factory-certified ceramic coating applicators on every job",
              "Paint decontamination and correction before any protection layer",
              "Transparent, itemised service documentation with before/after photos",
              "5-year ceramic warranty registered in the vehicle owner's name",
              "Eco-responsible chemistry — waterless and low-VOC options available",
              "On-time completion guaranteed or we reschedule at no charge",
            ].map((p) => (
              <li key={p} className="flex items-center gap-2 rounded-xl bg-surface p-3">
                <span className="h-2 w-2 rounded-full bg-brand shrink-0" /> {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 border-t border-border pt-10 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-ink">The Prestige Shine process</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every engagement begins with a thorough paint inspection under specialized lighting. We measure paint thickness, identify contaminants, swirl marks, and oxidation before recommending a service tier. Nothing is assumed — everything is documented.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink">Studio quality standards</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
               Kevin is a System X certified installer and works out of a clean, climate-controlled bay dedicated to ceramic coating application — no dust, no humidity surprises, no shortcuts.
              </p>
            </div>
            <div>
               <h3 className="text-lg font-bold text-ink">Recognition</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Prestige Shine has earned 52+ verified five-star reviews from Miramichi vehicle owners, with repeat clients for ceramic coatings, paint correction, interior restoration, and full detail packages — the recognition that matters most is a customer sending their friends.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink">Aftercare & support</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every ceramic-coated vehicle receives a digital care guide and is entered into our reminder programme. Annual maintenance washes are logged to your vehicle's profile with updated condition photography, building a documented history that helps maintain resale value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">The team</p>
        <h2 className="mt-1 text-2xl font-bold text-ink">People behind the polish.</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((m) => (
            <article key={m.name} className="rounded-2xl bg-white border border-border overflow-hidden">
              <img src={m.photo} alt={m.name} className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-4">
                <h3 className="font-bold text-ink">{m.name}</h3>
                <p className="text-xs text-muted-foreground">{m.role}</p>
                <a href={`mailto:${m.email}`} className="mt-2 inline-block text-xs text-brand hover:underline">{m.email}</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
