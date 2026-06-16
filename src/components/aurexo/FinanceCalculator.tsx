import { useMemo, useState } from "react";

export function FinanceCalculator({ defaultPrice = 35000 }: { defaultPrice?: number }) {
  const [price, setPrice] = useState(defaultPrice);
  const [rate, setRate] = useState(5.5);
  const [term, setTerm] = useState(60);
  const [down, setDown] = useState(5000);

  const { principal, monthly, total, interest } = useMemo(() => {
    const principal = Math.max(price - down, 0);
    const r = rate / 100 / 12;
    const n = Math.max(term, 1);
    const monthly = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    return { principal, monthly, total, interest: total - principal };
  }, [price, rate, term, down]);

  const principalShare = total > 0 ? (principal / total) * 100 : 0;
  const interestShare = total > 0 ? (interest / total) * 100 : 0;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-2xl border border-border bg-white p-5 sm:p-6">
        <h3 className="text-lg font-bold text-ink">Estimate your payment</h3>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Field label="Vehicle Price" value={price} onChange={(value) => setPrice(Math.max(value, 0))} prefix="$" />
          <Field label="Down Payment" value={down} onChange={(value) => setDown(Math.min(Math.max(value, 0), price))} prefix="$" />
          <label className="block sm:col-span-2">
            <span className="flex items-center justify-between text-xs font-medium text-muted-foreground">
              Interest Rate <strong className="text-sm text-ink">{rate.toFixed(1)}% APR</strong>
            </span>
            <Slider
              value={[rate]}
              onValueChange={([value]) => setRate(value ?? 0)}
              min={0}
              max={20}
              step={0.1}
              aria-label="Interest rate"
              className="mt-4 min-h-8"
            />
            <span className="flex justify-between text-[11px] text-muted-foreground"><span>0%</span><span>20%</span></span>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Loan Term</span>
            <select
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm"
            >
              {[36, 48, 60, 72].map((m) => (
                <option key={m} value={m}>{m} months</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="rounded-2xl bg-ink p-6 text-white">
        <p className="text-xs uppercase tracking-wide text-white/60">Monthly payment</p>
        <p className="mt-1 text-4xl font-extrabold text-brand">{fmt(monthly)}</p>
        <dl className="mt-5 divide-y divide-white/10 text-sm">
          <Row label="Est. Total Loan Amount" value={fmt(principal)} />
          <Row label="Total Interest" value={fmt(interest)} />
          <Row label="Total Cost" value={fmt(total + down)} />
        </dl>
        <div className="mt-6" aria-label="Principal and interest breakdown">
          <div className="flex h-3 overflow-hidden rounded-full bg-white/10">
            <span className="bg-brand" style={{ width: `${principalShare}%` }} />
            <span className="bg-indigo" style={{ width: `${interestShare}%` }} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div><span className="inline-block h-2 w-2 rounded-full bg-brand" /> <span className="text-white/65">Principal</span><strong className="mt-1 block text-white">{fmt(principal)}</strong></div>
            <div><span className="inline-block h-2 w-2 rounded-full bg-indigo" /> <span className="text-white/65">Interest</span><strong className="mt-1 block text-white">{fmt(interest)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, prefix, step = 1,
}: { label: string; value: number; onChange: (n: number) => void; prefix?: string; step?: number }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1.5 flex items-center rounded-xl border border-border bg-white px-4 py-3">
        {prefix && <span className="text-sm text-muted-foreground mr-1">{prefix}</span>}
        <input
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <dt className="text-white/70">{label}</dt>
      <dd className="font-bold">{value}</dd>
    </div>
  );
}
