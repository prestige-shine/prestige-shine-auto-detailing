import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aurexo" },
      { name: "description", content: "Get in touch with the Aurexo team — buying, selling, financing or service." },
      { property: "og:title", content: "Contact — Aurexo" },
      { property: "og:description", content: "Get in touch with the Aurexo team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <main>
      <PageHeader eyebrow="Contact" title="Talk to a real human." subtitle="Phone, email, or stop by HQ — we'll get back within an hour." />
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-border p-6">
          <h2 className="text-xl font-bold text-ink">Send us a message</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mt-5 space-y-3">
            <input className="w-full rounded-xl border border-border px-4 py-3 text-sm" placeholder="Name" />
            <input className="w-full rounded-xl border border-border px-4 py-3 text-sm" type="email" placeholder="Email" />
            <input className="w-full rounded-xl border border-border px-4 py-3 text-sm" placeholder="Subject" />
            <textarea rows={5} className="w-full rounded-xl border border-border px-4 py-3 text-sm" placeholder="How can we help?" />
            <button className="w-full rounded-xl bg-ink py-3.5 text-sm font-semibold text-white">Send message</button>
          </form>
        </div>
        <div className="space-y-3">
          {[
            { i: Phone, t: "Call us", d: "+1 (561) 555-0199" },
            { i: Mail, t: "Email", d: "studio@aurexoroofing.com" },
            { i: MapPin, t: "Studio HQ", d: "Aurexo Roofing Studio — Ohio, USA" },
            { i: Clock, t: "Hours", d: "Mon–Fri 7AM–7PM · Sat 8AM–4PM EST" },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4 rounded-2xl bg-white border border-border p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-ink">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-ink">{t}</p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
