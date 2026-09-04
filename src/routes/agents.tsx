import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { team } from "@/lib/team";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Meet Your Detailer — Prestige Shine Auto Detailing" },
      { name: "description", content: "Meet Kevin Hines, owner, founder, certified ceramic coating installer and paint correction specialist at Prestige Shine Auto Detailing in Miramichi." },
      { property: "og:title", content: "Meet Your Detailer — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "Meet Kevin Hines, certified ceramic coating installer and paint correction specialist in Miramichi." },
    ],
  }),
  component: Agents,
});

function Agents() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Your Detailer" title="Meet Your Detailer" subtitle="Meet Kevin Hines, the certified detailer behind Prestige Shine." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.email} className="overflow-hidden rounded-2xl border border-border bg-white">
              <img src={m.photo} alt={m.name} className="aspect-square w-full object-cover" />
              <div className="p-4">
                <h3 className="text-base font-bold text-ink">{m.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{m.role}</p>
                <a href={`mailto:${m.email}`} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                  <Mail className="h-3 w-3" /> {m.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
