import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Car, Calendar, MapPin, ClipboardList, Check, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { buildWhatsAppHref, submitLead } from "@/lib/whatsapp";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Book a Free Vehicle Assessment — Prestige Shine Auto Detailing" },
      { name: "description", content: "Book a free vehicle condition assessment at Prestige Shine Auto Detailing in Miramichi. We'll evaluate your paint, interior, and recommend the ideal detailing package." },
      { property: "og:title", content: "Free Vehicle Assessment — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "Free Miramichi vehicle detailing assessments — walk out with a clear plan and transparent quote." },
    ],
  }),
  component: Sell,
});

function Sell() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    year: "",
    make: "",
    model: "",
    condition: "",
    date: "",
    zip: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const payload = {
      name: form.name,
      phone: form.phone,
      zip: form.zip,
      projectType: "Free Vehicle Assessment",
      message: `Vehicle: ${form.year} ${form.make} ${form.model}. Condition notes: ${form.condition}. Preferred date: ${form.date}`,
      source: "sell / vehicle-assessment",
    };
    const href = buildWhatsAppHref(payload);
    window.open(href, "_blank", "noopener,noreferrer");
    submitLead(payload).catch(() => {});
    setSent(true);
    setSubmitting(false);
  };

  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="Free Assessment"
        title="Book your free vehicle assessment."
        subtitle="Bring your vehicle to our Miramichi shop by appointment — Kevin will inspect paint condition, interior, and glass, then recommend the right package with a transparent, no-pressure quote."
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl bg-white border border-border p-6 sm:p-8">
          <h2 className="text-xl font-bold text-ink">Tell us about your vehicle</h2>

          {sent ? (
            <div className="mt-6 rounded-2xl border border-brand/40 bg-brand/10 p-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-ink">
                <Check className="h-8 w-8" strokeWidth={3} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink">Assessment booked!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We opened WhatsApp with your request. Kevin will confirm your appointment slot within 2 hours.
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                <strong>Next step:</strong> Look out for a WhatsApp or call from our studio. Bring your vehicle at the agreed time — assessment takes about 20 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required value={form.name} onChange={set("name")} className="f-input" placeholder="Full name" />
              <input required value={form.phone} onChange={set("phone")} className="f-input" placeholder="Phone number" />
              <input required value={form.year} onChange={set("year")} className="f-input" placeholder="Vehicle year (e.g. 2021)" />
              <input required value={form.make} onChange={set("make")} className="f-input" placeholder="Make (e.g. Toyota)" />
              <input required value={form.model} onChange={set("model")} className="f-input sm:col-span-2" placeholder="Model (e.g. Camry)" />
              <textarea value={form.condition} onChange={set("condition")} rows={3} className="f-input sm:col-span-2" placeholder="Current condition notes — swirls, stains, odours, scratches…" />
              <input type="date" value={form.date} onChange={set("date")} className="f-input" />
              <input required value={form.zip} onChange={set("zip")} className="f-input" placeholder="Your Postal Code" />
              <button type="submit" disabled={submitting} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-ink disabled:opacity-60">
                <MessageCircle className="h-4 w-4" /> {submitting ? "Booking…" : "Book free assessment via WhatsApp"}
              </button>
              <style>{`.f-input{width:100%;border:1px solid var(--border);border-radius:0.75rem;padding:0.75rem 1rem;font-size:0.875rem;background:white;outline:none}.f-input:focus{border-color:var(--ink)}`}</style>
            </form>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-ink">What happens at your assessment</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { i: Car, t: "1. Vehicle arrives", d: "Arrive at the Miramichi shop at your scheduled check-in time." },
            { i: ClipboardList, t: "2. Paint & interior inspection", d: "Kevin will inspect paint, glass, upholstery, and trim under studio lighting." },
            { i: MapPin, t: "3. Custom recommendation", d: "You receive a clear, itemised service recommendation with no obligation to proceed." },
            { i: Calendar, t: "4. Book your slot", d: "If you're happy with the plan, Kevin will schedule your detail with you." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl bg-white border border-border p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-ink">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold text-ink text-sm">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
