import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Loan Calculator — Aurexo" },
      { name: "description", content: "Estimate your monthly car payment with Aurexo's free financing calculator." },
      { property: "og:title", content: "Loan Calculator — Aurexo" },
      { property: "og:description", content: "Estimate your monthly car payment." },
    ],
  }),
  component: Calculator,
});

function Calculator() {
  const [price, setPrice] = useState(35000);
  const [rate, setRate] = useState(5.5);
  const [term, setTerm] = useState(60);
  const [down, setDown] = useState(5000);

  const principal = Math.max(price - down, 0);
  const r = rate / 100 / 12;
  const m = r === 0 ? principal / term : (principal * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1);
  const total = m * term;
  const interest = total - principal;

  return (
    <main>
      <PageHeader eyebrow="Tools" title="Loan Calculator" subtitle="Plan your purchase with realistic monthly numbers — no email required." />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl bg-white border border-border p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Vehicle Price" value={price} onChange={setPrice} prefix="$" />
            <Field label="Interest Rate (%)" value={rate} onChange={setRate} step={0.1} />
            <Field label="Down Payment" value={down} onChange={setDown} prefix="$" />
            <div>
              <label className="text-xs font-medium text-muted-foreground">Loan Term</label>
              <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm">
                {[24, 36, 48, 60, 72, 84].map((m) => <option key={m} value={m}>{m} months</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Stat label="Monthly Payment" value={`$${m.toFixed(2)}`} accent />
          <Stat label="Total Interest" value={`$${interest.toFixed(2)}`} />
          <Stat label="Total Cost" value={`$${(total + down).toFixed(2)}`} />
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, prefix, step = 1 }: { label: string; value: number; onChange: (n: number) => void; prefix?: string; step?: number }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1.5 flex items-center rounded-xl border border-border bg-white px-4 py-3">
        {prefix && <span className="text-sm text-muted-foreground mr-1">{prefix}</span>}
        <input type="number" step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="flex-1 bg-transparent text-sm outline-none" />
      </div>
    </label>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "bg-ink text-white border-ink" : "bg-white border-border text-ink"}`}>
      <p className={`text-xs ${accent ? "text-white/60" : "text-muted-foreground"}`}>{label}</p>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
    </div>
  );
}
