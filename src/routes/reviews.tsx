import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews — Aurexo Roofing Studio" },
      { name: "description", content: "Verified reviews from Ohio homeowners on our premium roofing installations, storm response, and warranty service." },
      { property: "og:title", content: "Client Reviews — Aurexo Roofing Studio" },
      { property: "og:description", content: "Verified reviews from Ohio homeowners served by Aurexo Roofing Studio." },
    ],
  }),
  component: Reviews,
});

const all: [string, string, string][] = [
  ["Sarah M.", "Shaker Heights, OH", "Aurexo replaced our 1920s slate mansard with a synthetic system that looks identical to the original. The crew documented every step and finished two days ahead of schedule — through a week of Lake Erie rain."],
  ["Marcus T.", "Hudson, OH", "Our standing-seam aluminium roof survived the May derecho without a single panel lifting. Aurexo was on-site for a free post-storm inspection within 24 hours. Best capital improvement we've ever made on the house."],
  ["Priya K.", "Bath Township, OH", "Walked us through every line item — underlayment, ice shield, copper valley flashing — before signing. No surprises on invoice day. The new tile roof completely changed the curb appeal of our villa."],
  ["Jordan A.", "Westlake, OH", "Re-roofed a 3,400 sqft hip roof in a single working week. The site stayed cleaner than my driveway normally is. Warranty paperwork was registered in my name the same afternoon they finished."],
  ["Camille R.", "Pepper Pike, OH", "We interviewed four studios. Aurexo was the only one that quoted the ventilation upgrade as a line item instead of an afterthought. Two years in, the attic temperatures are down 18°F and the HVAC bill shows it."],
  ["Liam P.", "Chagrin Falls, OH", "Premium copper accent roof on our pool house, then a full DaVinci synthetic slate on the main residence. Both projects on time, both immaculate. Already specifying Aurexo for the carriage house next spring."],
];

function Reviews() {
  return (
    <main>
      <PageHeader eyebrow="Reviews" title="4.9 / 5 from 1,800+ Ohio homeowners." subtitle="Honest, unedited feedback from homes we have re-roofed, restored, and storm-protected across Northeast Ohio." />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {all.map(([name, loc, body]) => (
            <article key={name} className="mb-4 break-inside-avoid rounded-2xl bg-white border border-border p-5">
              <div className="flex gap-0.5 text-brand">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />)}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">"{body}"</p>
              <div className="mt-4 border-t border-border pt-3">
                <p className="text-sm font-semibold text-ink">{name}</p>
                <p className="text-xs text-muted-foreground">{loc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-white p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Worked with us on a project?{" "}
            <Link to="/contact" className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-2 hover:text-brand">
              <MessageCircle className="h-3.5 w-3.5" /> Get in touch to share your review
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
