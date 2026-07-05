import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MessageCircle, ArrowRight, ShieldCheck, Sparkles, Car } from "lucide-react";
import { buildWhatsAppHref, submitLead, STUDIO_PHONE, STUDIO_TEL } from "@/lib/whatsapp";

const VEHICLE_CLASSES = ["Sedan / Coupe", "SUV / Crossover", "Truck / Ute", "Hatchback / Wagon", "Sports Car / Supercar", "Van / Minivan"];
const TIERS = [
  { key: "express", label: "Express Exterior Maintenance", price: 89 },
  { key: "interior", label: "Full Interior Deep Clean", price: 199 },
  { key: "ceramic", label: "Premium 9H Ceramic Coating", price: 999 },
];
const ADDONS = ["Headlight Restoration (+$59)", "Engine Bay Detail (+$89)", "Leather Conditioning (+$79)", "Ceramic Wheel Coating (+$149)"];
const WINDOWS = ["Morning (8AM–12PM)", "Afternoon (12PM–4PM)", "Drop-off overnight"];

export const Route = createFileRoute("/get-estimate")({
  head: () => ({
    meta: [
      { title: "Request a Detailing Estimate — Top Coat Auto Detailers Ohio" },
      { name: "description", content: "Get an instant detailing estimate from Top Coat. Choose your vehicle class, service tier, and add-ons — we'll package your brief and connect you with a certified Ohio detailer." },
      { property: "og:title", content: "Instant Detailing Estimate — Top Coat Ohio" },
      { property: "og:description", content: "Fast, transparent auto detailing estimates from Ohio's premier studio." },
    ],
    links: [{ rel: "canonical", href: "/get-estimate" }],
  }),
  component: GetEstimate,
});

function GetEstimate() {
  const [vehicleClass, setVehicleClass] = useState(VEHICLE_CLASSES[0]);
  const [tier, setTier] = useState(TIERS[0].key);
  const [addons, setAddons] = useState<string[]>([]);
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [window_, setWindow_] = useState(WINDOWS[0]);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selectedTier = TIERS.find((t) => t.key === tier)!;
  const addonTotal = addons.reduce((sum, a) => {
    const match = a.match(/\+\$(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);
  const estimatedFrom = selectedTier.price + addonTotal;

  const toggleAddon = (a: string) => setAddons((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const payload = {
      name, phone, zip,
      projectType: selectedTier.label,
      message: `Vehicle class: ${vehicleClass}. Add-ons: ${addons.join(", ") || "none"}. Address: ${address}. Appointment window: ${window_}. Notes: ${notes}`,
      estimate: `from $${estimatedFrom.toLocaleString()}`,
      source: "get-estimate",
    };
    const href = buildWhatsAppHref(payload);
    window.open(href, "_blank", "noopener,noreferrer");
    submitLead(payload).catch(() => {});
    setSent(true);
    setSubmitting(false);
  };

  return (
    <main className="overflow-x-hidden">
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-bold text-brand ring-1 ring-brand/30">
            <Car className="h-3 w-3" /> Instant Detailing Estimate — Ohio
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Request your detailing estimate in <span className="text-brand">under 60 seconds.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            Select your vehicle class, service tier, and any add-ons. We'll package your brief and connect you with a certified Top Coat detailer via WhatsApp — no obligation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/70">
            <span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-brand" /> 5-year ceramic warranty</span>
            <span className="inline-flex items-center gap-1"><Sparkles className="h-4 w-4 text-brand" /> IDA-certified detailers</span>
            <span className="inline-flex items-center gap-1"><Check className="h-4 w-4 text-brand" /> Transparent, itemised pricing</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 space-y-8">
            <div>
              <h2 className="text-lg font-bold text-ink">1 · Vehicle class</h2>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {VEHICLE_CLASSES.map((c) => (
                  <button key={c} type="button" onClick={() => setVehicleClass(c)}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold text-left transition ${vehicleClass === c ? "border-brand bg-brand/10 text-ink" : "border-border text-muted-foreground hover:text-ink"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-ink">2 · Service tier</h2>
              <div className="mt-3 grid gap-2">
                {TIERS.map((t) => (
                  <button key={t.key} type="button" onClick={() => setTier(t.key)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${tier === t.key ? "border-brand bg-brand/10" : "border-border hover:border-ink"}`}>
                    <span className="font-bold text-ink">{t.label}</span>
                    <span className="ml-2 text-sm text-brand">from ${t.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-ink">3 · Add-ons</h2>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADDONS.map((a) => (
                  <label key={a} className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm text-ink">
                    <input type="checkbox" checked={addons.includes(a)} onChange={() => toggleAddon(a)} className="h-4 w-4 accent-brand" />
                    {a}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <div className="rounded-3xl bg-ink p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wide text-brand">Estimated from</p>
              <p className="mt-2 text-4xl font-extrabold">${estimatedFrom.toLocaleString()}</p>
              <p className="mt-1 text-sm text-white/60">{selectedTier.label} · {vehicleClass}</p>
              {addons.length > 0 && <p className="mt-1 text-xs text-white/50">{addons.length} add-on(s) included</p>}
              <a href={`tel:${STUDIO_TEL}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 py-3 text-sm font-semibold text-white hover:bg-white/10">
                {STUDIO_PHONE}
              </a>
            </div>

            {sent ? (
              <div className="rounded-2xl border border-brand/40 bg-brand/10 p-6 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand text-ink">
                  <Check className="h-6 w-6" strokeWidth={3} />
                </div>
                <h3 className="mt-3 font-bold text-ink">Estimate sent!</h3>
                <p className="mt-1 text-xs text-muted-foreground">A detailer will confirm your quote via WhatsApp shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-5 space-y-3">
                <h3 className="font-bold text-ink">Submit your brief</h3>
                <input required value={name} onChange={(e) => setName(e.target.value)} className="e-input" placeholder="Full name" />
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="e-input" placeholder="Phone" />
                <input required value={zip} onChange={(e) => setZip(e.target.value)} className="e-input" placeholder="ZIP code" />
                <input value={address} onChange={(e) => setAddress(e.target.value)} className="e-input" placeholder="Address (optional)" />
                <select value={window_} onChange={(e) => setWindow_(e.target.value)} className="e-input">
                  {WINDOWS.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="e-input" placeholder="Any extra notes…" />
                <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-ink disabled:opacity-60">
                  <MessageCircle className="h-4 w-4" /> {submitting ? "Sending…" : "Send to WhatsApp"}
                </button>
                <style>{`.e-input{width:100%;border:1px solid var(--border);border-radius:0.75rem;padding:0.75rem 1rem;font-size:0.875rem;background:white;outline:none}.e-input:focus{border-color:var(--ink)}`}</style>
              </form>
            )}

            <p className="text-center text-sm text-muted-foreground">
              <Link to="/buy" className="font-semibold text-ink underline underline-offset-2">Browse detailing packages <ArrowRight className="inline h-3 w-3" /></Link>
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
