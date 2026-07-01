import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Check } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { submitLead, STUDIO_PHONE, STUDIO_TEL } from "@/lib/whatsapp";

const PROJECT_TYPES = [
  "Full Roof Replacement",
  "Premium Architectural Upgrade",
  "Emergency Leak / Storm Repair",
  "Warranty Service Visit",
  "New Construction Install",
  "Other Inquiry",
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Aurexo Roofing Studio — Ohio" },
      { name: "description", content: "Reach the Aurexo Roofing Studio team across Ohio. Structured contact form, WhatsApp handoff, and studio phone line." },
      { property: "og:title", content: "Contact — Aurexo Roofing Studio" },
      { property: "og:description", content: "Get in touch with a certified Ohio roofing studio." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", projectType: PROJECT_TYPES[0], message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const href = await submitLead({
      name: form.name, email: form.email, phone: form.phone,
      projectType: form.projectType, message: form.message,
      source: "contact-form",
    });
    setSent(true); setSending(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <PageHeader eyebrow="Contact" title="Talk to a real Ohio roofer." subtitle="Structured contact, direct studio phone line, and instant WhatsApp handoff — no bots in between." />

      <section aria-labelledby="contact-h2" className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="rounded-2xl bg-white border border-border p-6 sm:p-8">
          <h2 id="contact-h2" className="text-xl font-bold text-ink">Send us a project brief</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every submission is saved to our lead pipeline and simultaneously packaged into a legible WhatsApp brief for the estimator on-call.
          </p>

          {sent ? (
            <div className="mt-6 rounded-2xl border border-brand/40 bg-brand/10 p-6 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-ink">
                <Check className="h-7 w-7" strokeWidth={3} />
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink">Brief delivered</h3>
              <p className="mt-1 text-sm text-muted-foreground">We opened WhatsApp with your full brief. An estimator will follow up shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="c-input" placeholder="Full name" />
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="c-input" placeholder="Phone" />
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" className="c-input sm:col-span-2" placeholder="Email" />
              <select value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} className="c-input sm:col-span-2">
                {PROJECT_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="c-input sm:col-span-2" placeholder="Describe your project — location, timeline, materials of interest…" />
              <button type="submit" disabled={sending} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-ink disabled:opacity-60">
                <MessageCircle className="h-4 w-4" /> {sending ? "Sending…" : "Send Brief to WhatsApp"}
              </button>
              <style>{`.c-input{width:100%;border:1px solid var(--border);border-radius:0.75rem;padding:0.75rem 1rem;font-size:0.875rem;background:white;outline:none}.c-input:focus{border-color:var(--ink)}`}</style>
            </form>
          )}
        </article>

        <aside className="space-y-3">
          {[
            { i: Phone, t: "Call the studio", d: STUDIO_PHONE, href: `tel:${STUDIO_TEL}` },
            { i: Mail, t: "Email", d: "studio@aurexoroofing.com", href: "mailto:studio@aurexoroofing.com" },
            { i: MapPin, t: "Studio HQ", d: "Aurexo Roofing Studio — Cleveland, Ohio, USA" },
            { i: Clock, t: "Hours", d: "Mon–Fri 7AM–7PM · Sat 8AM–4PM EST" },
          ].map(({ i: Icon, t, d, href }) => {
            const Wrap: any = href ? "a" : "div";
            return (
              <Wrap key={t} href={href} className="flex items-start gap-4 rounded-2xl bg-white border border-border p-5 hover:border-ink transition">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-ink">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </Wrap>
            );
          })}

          <div className="rounded-2xl border border-border bg-ink p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Ohio service radius</p>
            <p className="mt-2 text-sm text-white/80">
              Cleveland · Akron · Canton · Columbus · Cincinnati · Toledo · Dayton · Youngstown — and every luxury suburb between.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
