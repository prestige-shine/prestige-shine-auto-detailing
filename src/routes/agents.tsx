import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import dealer1 from "@/assets/dealer-1.jpg";
import dealer2 from "@/assets/dealer-2.jpg";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Sale Agents — Aurexo" },
      { name: "description", content: "Meet the certified Aurexo sales agents ready to help you find your next car." },
      { property: "og:title", content: "Sale Agents — Aurexo" },
      { property: "og:description", content: "Meet our certified Aurexo sales agents." },
    ],
  }),
  component: Agents,
});

const agents = [
  { name: "Robert Fox", role: "Senior Sales Agent", deals: 412, rating: 4.9, img: dealer1, lang: "EN · ES" },
  { name: "Maya Chen", role: "Luxury Specialist", deals: 287, rating: 4.8, img: dealer2, lang: "EN · ZH" },
  { name: "Daniel Reyes", role: "EV Specialist", deals: 198, rating: 4.9, img: dealer1, lang: "EN · ES" },
  { name: "Sofia Patel", role: "Financing Lead", deals: 356, rating: 5.0, img: dealer2, lang: "EN · HI" },
];

function Agents() {
  return (
    <main>
      <PageHeader eyebrow="Team" title="Meet our sale agents." subtitle="Certified specialists who handle thousands of transactions every year." />
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((a) => (
          <article key={a.name} className="rounded-2xl bg-white border border-border overflow-hidden">
            <img src={a.img} alt={a.name} className="w-full aspect-square object-cover" loading="lazy" />
            <div className="p-5">
              <h3 className="font-bold text-ink">{a.name}</h3>
              <p className="text-xs text-muted-foreground">{a.role}</p>
              <p className="mt-2 text-xs text-muted-foreground">{a.deals} deals · ⭐ {a.rating} · {a.lang}</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-brand py-2 text-xs font-semibold text-ink"><Phone className="h-3.5 w-3.5"/> Call</button>
                <button className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-indigo py-2 text-xs font-semibold text-white"><MessageCircle className="h-3.5 w-3.5"/> Chat</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
