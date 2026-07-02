import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Check, MapPin, Phone, MessageCircle, ShieldCheck, Hammer, Ruler } from "lucide-react";
import { STUDIO_PHONE, STUDIO_TEL, submitLead, formatEstimateRange } from "@/lib/whatsapp";

const MATERIALS = [
  { key: "Architectural Shingles", min: 5.25, max: 7.75, blurb: "30-yr lifecycle · Class A fire · 130 mph wind", eco: "Recyclable granules" },
  { key: "Stone-Coated Steel", min: 9.5, max: 14.5, blurb: "Metal resilience with a shingle silhouette", eco: "Recycled steel content" },
  { key: "Standing-Seam Aluminium", min: 11.5, max: 16.75, blurb: "40+ yr PVDF coating · hidden fastener", eco: "100% recyclable" },
  { key: "Luxury Slate & Synthetic Slate", min: 18.5, max: 32.5, blurb: "Heritage-grade · 50+ year lifecycle", eco: "Cool-roof rated" },
  { key: "Clay / Concrete Tile", min: 13, max: 22, blurb: "Mediterranean architecture · fire proof", eco: "Naturally sourced" },
] as const;

const SCOPES = [
  "Full Roof Replacement",
  "Premium Architectural Upgrade",
  "Emergency Leak / Storm Repair",
  "New Construction Install",
];

export const Route = createFileRoute("/get-estimate")({
  head: () => ({
    meta: [
      { title: "Get a Free Roofing Estimate in Ohio — Aurexo Roofing Studio" },
      { name: "description", content: "Premium roofing estimates in Ohio. Interactive size + material calculator, transparent per-SqFt pricing, instant WhatsApp handoff to a certified Aurexo estimator." },
      { name: "keywords", content: "roofing estimate Ohio, premium roofing quote, slate roof cost Cleveland, standing seam metal Ohio, architectural shingles quote" },
      { property: "og:title", content: "Premium Roofing Estimates in Ohio — Aurexo" },
      { property: "og:description", content: "Instant, itemized roofing estimates from a certified Ohio studio." },
    ],
    links: [{ rel: "canonical", href: "/get-estimate" }],
  }),
  component: GetEstimate,
});

function GetEstimate() {
  const [sqft, setSqft] = useState(3200);
  const [material, setMaterial] = useState<(typeof MATERIALS)[number]["key"]>("Architectural Shingles");
  const [complexity, setComplexity] = useState<"Simple" | "Moderate" | "Complex">("Moderate");
  const [tearoff, setTearoff] = useState(true);
  const [scope, setScope] = useState<string>(SCOPES[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");

  const selected = MATERIALS.find((m) => m.key === material)!;
  const complexityMult = complexity === "Simple" ? 0.94 : complexity === "Complex" ? 1.18 : 1;
  const tearMult = tearoff ? 1.08 : 1;
  const low = Math.round(sqft * selected.min * complexityMult * tearMult);
  const high = Math.round(sqft * selected.max * complexityMult * tearMult);
  const range = formatEstimateRange(low, high);

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const payload = {
      name, phone, email, zip,
      projectType: scope,
      material,
      sqft,
      estimate: range,
      message: `Roof complexity: ${complexity}. Tear-off included: ${tearoff ? "yes" : "no"}. ${notes}`.trim(),
      source: "get-estimate",
    };
    // Open WhatsApp synchronously (inside the user gesture) so popup blockers don't kill it.
    const href = buildWhatsAppHref(payload);
    window.open(href, "_blank", "noopener,noreferrer");
    // Fire-and-forget logging.
    submitLead(payload).catch(() => {});
    setSent(true);
    setSubmitting(false);
  };

  return (
    <main>
      <section aria-labelledby="estimate-h1" className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-bold text-brand ring-1 ring-brand/30">
            <MapPin className="h-3 w-3" /> Premium Roofing Estimates in Ohio
          </span>
          <h1 id="estimate-h1" className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Get a documented, line-item roofing estimate in <span className="text-brand">under 60 seconds.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            Interactive material and size calculator engineered around real 2026 Ohio pricing. No sign-up, no obligation — your brief is packaged into a legible summary and handed off to a certified Aurexo estimator on WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/70">
            <span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-brand" /> 25-yr workmanship warranty</span>
            <span className="inline-flex items-center gap-1"><Hammer className="h-4 w-4 text-brand" /> Master-Elite certified crews</span>
            <span className="inline-flex items-center gap-1"><Ruler className="h-4 w-4 text-brand" /> Itemised, transparent pricing</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="calculator-h2" className="mx-auto max-w-6xl px-4 py-12">
        <h2 id="calculator-h2" className="sr-only">Interactive roofing estimator</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* Interactive estimator */}
          <article className="rounded-3xl border border-border bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold text-ink">1 · Size your roof</h3>
            <div className="mt-4 flex items-baseline justify-between">
              <label htmlFor="sqft-input" className="text-sm font-medium text-muted-foreground">Estimated square footage</label>
              <span className="text-2xl font-extrabold text-ink">{sqft.toLocaleString()} <span className="text-xs font-medium text-muted-foreground">SqFt</span></span>
            </div>
            <input
              id="sqft-input" type="range" min={1000} max={15000} step={100}
              value={sqft} onChange={(e) => setSqft(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-surface accent-brand"
            />
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
              <span>1,000 sqft</span><span>15,000 sqft</span>
            </div>

            <h3 className="mt-8 text-xl font-bold text-ink">2 · Select material tier</h3>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {MATERIALS.map((m) => {
                const active = m.key === material;
                return (
                  <button key={m.key} type="button" onClick={() => setMaterial(m.key)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${active ? "border-brand bg-brand/10" : "border-border bg-white hover:border-ink"}`}
                  >
                    <p className="text-sm font-bold text-ink">{m.key}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{m.blurb}</p>
                    <p className="mt-1 text-[11px] font-semibold text-brand">${m.min.toFixed(2)}–${m.max.toFixed(2)} / sqft installed</p>
                  </button>
                );
              })}
            </div>

            <h3 className="mt-8 text-xl font-bold text-ink">3 · Roof complexity</h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(["Simple", "Moderate", "Complex"] as const).map((c) => (
                <button key={c} type="button" onClick={() => setComplexity(c)}
                  className={`rounded-xl border px-3 py-3 text-sm font-semibold ${complexity === c ? "border-brand bg-brand/10 text-ink" : "border-border text-muted-foreground hover:text-ink"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={tearoff} onChange={(e) => setTearoff(e.target.checked)} className="h-4 w-4 accent-brand" />
              Include full tear-off + deck inspection
            </label>
          </article>

          {/* Live estimate */}
          <aside className="lg:sticky lg:top-24 self-start rounded-3xl bg-ink p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Live Estimate</p>
            <p className="mt-2 text-4xl font-extrabold sm:text-5xl">{range}</p>
            <p className="mt-2 text-sm text-white/60">
              Installed range for {sqft.toLocaleString()} sqft of {material.toLowerCase()} on a {complexity.toLowerCase()} Ohio roof.
            </p>
            <dl className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm">
              <Row label="Material" value={material} />
              <Row label="Square footage" value={`${sqft.toLocaleString()} sqft`} />
              <Row label="Complexity" value={complexity} />
              <Row label="Tear-off" value={tearoff ? "Included" : "Not included"} />
              <Row label="Eco profile" value={selected.eco} />
            </dl>
            <a href={`tel:${STUDIO_TEL}`} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 py-3 text-sm font-semibold text-white hover:bg-white/10">
              <Phone className="h-4 w-4" /> {STUDIO_PHONE}
            </a>
          </aside>
        </div>
      </section>

      {/* Detailed inquiry form */}
      <section aria-labelledby="inquiry-h2" className="mx-auto max-w-4xl px-4 pb-16">
        <div className="rounded-3xl border border-border bg-white p-6 sm:p-10">
          <h2 id="inquiry-h2" className="text-2xl font-bold text-ink">Submit your brief</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The moment you submit, your brief is packaged into a legible WhatsApp summary and saved to our lead pipeline — no data is lost if you close the tab.
          </p>

          {sent ? (
            <div className="mt-8 rounded-2xl border border-brand/40 bg-brand/10 p-6 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-ink">
                <Check className="h-7 w-7" strokeWidth={3} />
              </div>
              <h3 className="mt-3 text-xl font-bold text-ink">Brief submitted</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We opened WhatsApp with your full brief prefilled. A certified estimator will reach out within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input required value={name} onChange={(e) => setName(e.target.value)} className="est-input" placeholder="Full name" />
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="est-input" placeholder="Phone" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="est-input" placeholder="Email (optional)" />
              <input required value={zip} onChange={(e) => setZip(e.target.value)} className="est-input" placeholder="Ohio Zip / County" />
              <select value={scope} onChange={(e) => setScope(e.target.value)} className="est-input sm:col-span-2">
                {SCOPES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="est-input sm:col-span-2" placeholder="Anything else? Timeline, insurance claim, architectural preferences…" />

              <button type="submit" disabled={submitting} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-ink disabled:opacity-60">
                <MessageCircle className="h-4 w-4" /> {submitting ? "Packaging…" : "Send Brief to WhatsApp"}
              </button>
              <p className="sm:col-span-2 text-center text-[11px] text-muted-foreground">
                By submitting you agree to be contacted by Aurexo Roofing Studio via phone, email, or WhatsApp.
              </p>
              <style>{`.est-input{width:100%;border:1px solid var(--border);border-radius:0.75rem;padding:0.75rem 1rem;font-size:0.875rem;background:white;outline:none}.est-input:focus{border-color:var(--ink)}`}</style>
            </form>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Prefer to keep browsing?{" "}
          <Link to="/buy" className="font-semibold text-ink underline underline-offset-2">
            View recent architectural transformations <ArrowRight className="inline h-3 w-3" />
          </Link>
        </p>
      </section>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-white/85">
      <dt className="text-white/55">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
