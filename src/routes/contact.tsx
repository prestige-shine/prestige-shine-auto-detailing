import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Check } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { buildWhatsAppHref, STUDIO_PHONE, STUDIO_TEL, STUDIO_EMAIL, WHATSAPP_NUMBER } from "@/lib/whatsapp";

const SERVICE_OPTIONS = [
  "Interior Detailing",
  "Exterior Detailing",
  "Full Detailing",
  "Ceramic Coating",
  "Full Detail + Paint Enhancement",
  "Paint Correction",
  "Headlight Restoration",
  "Engine Bay Detail",
  "Leather Conditioning",
  "Ceramic Wheel Coating",
  "Other / Not sure",
];

const locations = [
  { name: "Prestige Shine Auto Detailing", address: "229 Jacqueline Dr, Miramichi, NB E1N 3Z2, Canada", hours: "By Appointment Only" },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Prestige Shine Auto Detailing — Miramichi, NB" },
      { name: "description", content: "Contact Prestige Shine Auto Detailing at 229 Jacqueline Dr, Miramichi, NB. Call +1 (506) 251-4451 or email prestige101shine@gmail.com to book a detail or request a quote." },
      { property: "og:title", content: "Contact — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "Get in touch with Miramichi's premier auto detailing studio — Miramichi, NB and surrounding areas." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", vehicle: "", service: SERVICE_OPTIONS[0], notes: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const href = buildWhatsAppHref({
      name: form.name,
      phone: form.phone,
      projectType: form.service,
      message: `Vehicle: ${form.vehicle}. Notes: ${form.notes}`,
      source: "contact-form",
    });
    window.open(href, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="Contact"
        title="Talk to a real Miramichi detailer."
        subtitle="Direct communication with a locally owned, owner-operated detailing studio."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="rounded-2xl bg-white border border-border p-6 sm:p-8">
          <h2 className="text-xl font-bold text-ink">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your enquiry is packaged into a legible WhatsApp brief and sent directly to Prestige Shine.
          </p>

          {sent ? (
            <div className="mt-6 rounded-2xl border border-brand/40 bg-brand/10 p-6 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-ink">
                <Check className="h-7 w-7" strokeWidth={3} />
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink">Message delivered!</h3>
              <p className="mt-1 text-sm text-muted-foreground">WhatsApp is open with your brief. Kevin will follow up shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="c-input" placeholder="Full name" />
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="c-input" placeholder="Phone number" />
              <input required value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} className="c-input sm:col-span-2" placeholder="Your vehicle (e.g. 2022 BMW M3)" />
              <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="c-input sm:col-span-2">
                {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={4} className="c-input sm:col-span-2" placeholder="Any additional notes — current condition, timeline, preferred appointment time…" />
              <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white">
                <MessageCircle className="h-4 w-4" /> Send via WhatsApp
              </button>
              <style>{`.c-input{width:100%;border:1px solid var(--border);border-radius:0.75rem;padding:0.75rem 1rem;font-size:0.875rem;background:white;outline:none}.c-input:focus{border-color:var(--ink)}`}</style>
            </form>
          )}
        </article>

        <aside className="space-y-3">
          <a href={`tel:${STUDIO_TEL}`} className="flex items-start gap-4 rounded-2xl bg-white border border-border p-5 hover:border-ink transition">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-ink"><Phone className="h-5 w-5" /></div>
            <div><p className="font-bold text-ink">Call the studio</p><p className="text-sm text-muted-foreground">{STUDIO_PHONE}</p></div>
          </a>
          <a href={`mailto:${STUDIO_EMAIL}`} className="flex items-start gap-4 rounded-2xl bg-white border border-border p-5 hover:border-ink transition">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-ink"><Mail className="h-5 w-5" /></div>
            <div><p className="font-bold text-ink">Email</p><p className="text-sm text-muted-foreground">{STUDIO_EMAIL}</p></div>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Prestige Shine Auto Detailing, I'd like to book a detailing appointment.")}`}
            target="_blank" rel="noreferrer"
            className="flex items-start gap-4 rounded-2xl bg-white border border-border p-5 hover:border-ink transition"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-ink"><MessageCircle className="h-5 w-5" /></div>
            <div><p className="font-bold text-ink">WhatsApp</p><p className="text-sm text-muted-foreground">Tap to open a chat — fastest response</p></div>
          </a>
          <div className="flex items-start gap-4 rounded-2xl bg-white border border-border p-5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-ink"><Clock className="h-5 w-5" /></div>
            <div><p className="font-bold text-ink">Hours</p><p className="text-sm text-muted-foreground">By Appointment Only</p></div>
          </div>

          <div className="rounded-2xl border border-border bg-ink p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Studio location</p>
            <ul className="mt-2 space-y-2">
              {locations.map((l) => (
                <li key={l.name} className="flex items-start gap-2 text-sm text-white/80">
                  <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span><strong className="text-white">{l.name}</strong> — {l.address}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
