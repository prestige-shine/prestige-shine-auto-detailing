import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Users, Trophy, Globe } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aurexo Roofing Studio" },
      { name: "description", content: "Aurexo Roofing Studio is an Ohio premium roofing contractor specializing in architectural shingles, standing-seam metal, premium aluminium, and natural slate." },
      { property: "og:title", content: "About — Aurexo Roofing Studio" },
      { property: "og:description", content: "Premium roofing contractor based in Ohio." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main>
      <PageHeader eyebrow="About Aurexo" title="A premium roofing studio, built for Ohio." subtitle="Founded in 2014, Aurexo Roofing Studio designs and installs luxury roofing systems across every major Ohio metro — backed by manufacturer-certified crews and a 25-year workmanship warranty." />
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { i: Users, n: "1,800+", l: "Ohio homes served" },
          { i: Trophy, n: "12", l: "Industry awards" },
          { i: ShieldCheck, n: "25 yr", l: "Workmanship warranty" },
          { i: Globe, n: "6", l: "Studios across Ohio" },
        ].map(({ i: Icon, n, l }) => (
          <div key={l} className="rounded-2xl bg-white border border-border p-5 text-center">
            <Icon className="h-6 w-6 mx-auto text-brand" />
            <p className="mt-3 text-2xl font-extrabold text-ink">{n}</p>
            <p className="text-xs text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl bg-white border border-border p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-ink">Our mission</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            We believe a roof is the most important capital improvement on any Ohio home — and that homeowners deserve to specify it the way an architect would. Aurexo Roofing Studio combines manufacturer-certified crews, line-item transparency, premium materials, and a fixed-completion guarantee so the project goes in once, correctly, and outlasts the mortgage.
          </p>
          <h3 className="mt-8 text-lg font-bold text-ink">What we stand for</h3>
          <ul className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
            {["Radical line-item transparency","Manufacturer-certified crews on every job","Premium materials specified to the home","Workmanship warranty registered in your name"].map((p) => (
              <li key={p} className="flex items-center gap-2 rounded-xl bg-surface p-3"><span className="h-2 w-2 rounded-full bg-brand"/> {p}</li>
            ))}
          </ul>
          <div className="mt-10 grid gap-8 border-t border-border pt-10 lg:grid-cols-2">
            <div><h3 className="text-lg font-bold text-ink">How an Aurexo project works</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Every engagement begins with a documented site inspection — deck, ventilation, flashing details, and existing material composition. The estimate that follows itemises every layer of the assembly so you authorize what proceeds, including any concealed conditions uncovered during tear-off.</p></div>
            <div><h3 className="text-lg font-bold text-ink">Studio quality standards</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Crews carry Master Elite, SELECT ShingleMaster, and DECRA Certified Installer credentials. Every project assigns a dedicated finish carpenter for valleys, penetrations, and ornamental metal so the details closest to your eye are handled by the most experienced hands on site.</p></div>
            <div><h3 className="text-lg font-bold text-ink">Transparent project budgeting</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Estimates expose underlayment, ice-and-water shield, drip edge, starter and ridge cap, premium finish material, flashing metal, and ventilation as separate line items. Educational guides explain material trade-offs, wind and fire ratings, warranty structure, and the Midwest insurance implications of each choice.</p></div>
            <div><h3 className="text-lg font-bold text-ink">Support after completion</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Warranty registration is filed in your name on completion day. Annual inspections are logged to your digital project file with photographs and recommendations, providing the documentation your insurance carrier expects after Ohio's storm seasons.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
