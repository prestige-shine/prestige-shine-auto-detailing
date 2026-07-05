import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { team } from "@/lib/team";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Our Detailers — Top Coat Auto Detailers" },
      { name: "description", content: "Meet the Top Coat Auto Detailers team — certified ceramic coating installers and paint correction specialists across Lahore." },
      { property: "og:title", content: "Our Detailers — Top Coat Auto Detailers" },
      { property: "og:description", content: "Certified ceramic and paint correction specialists across Lahore." },
    ],
  }),
  component: Agents,
});

function Agents() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="The Team" title="Our Detailers" subtitle="Certified installers behind every Top Coat package." />
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
