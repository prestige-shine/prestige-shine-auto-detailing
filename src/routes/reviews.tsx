import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Clients Reviews — Aurexo" },
      { name: "description", content: "Real reviews from real Aurexo buyers and sellers across the country." },
      { property: "og:title", content: "Clients Reviews — Aurexo" },
      { property: "og:description", content: "Real reviews from real Aurexo buyers and sellers." },
    ],
  }),
  component: Reviews,
});

const all = [
  ["Sarah M.","Atlanta, GA","Bought my BMW 5 Series in under 48 hours. The dealer was upfront on every fee — what they quoted was exactly what I paid. Delivery was flawless."],
  ["Marcus T.","Dallas, TX","Got pre-approved while sitting in traffic. Picked up my F-150 the next morning. The Aurexo app made the paperwork take 10 minutes total."],
  ["Priya K.","San Francisco, CA","Loved the verified dealer ratings — knew exactly who I was dealing with. Even the financing was 1.2% lower than my bank offered."],
  ["Jordan A.","Brooklyn, NY","Sold my old Civic in 3 days and used the cash toward a Tesla. The trade-in process was the easiest thing about the whole upgrade."],
  ["Camille R.","Miami, FL","Beautiful interface, smart filters, and the chat-with-dealer feature actually works. Found my dream car on day one."],
  ["Liam P.","Seattle, WA","I'm a returning buyer — third car through Aurexo. Quality stays consistent and the customer support team is genuinely helpful."],
];

function Reviews() {
  return (
    <main>
      <PageHeader eyebrow="Reviews" title="4.9 / 5 from 12,400+ buyers." subtitle="Honest, unedited feedback from the Aurexo community." />
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {all.map(([name, loc, body]) => (
          <article key={name} className="rounded-2xl bg-white border border-border p-5">
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
      </section>
    </main>
  );
}
