import { useMemo, useState } from "react";

export function FinanceCalculator({ defaultPrice = 35000 }: { defaultPrice?: number }) {
  const [price, setPrice] = useState(defaultPrice);
  const [rate, setRate] = useState(5.5);
  const [term, setTerm] = useState(60);
  const [down, setDown] = useState(5000);

  const { principal, monthly, total, interest } = useMemo(() => {
    const principal = Math.max(price - down, 0);
    const r = rate / 100 / 12;
    const n = term;
    const monthly = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    return { principal, monthly, total, interest: total - principal };
  }, [price, rate, term, down]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-2xl border border-border bg-white p-5 sm:p-6">
        <h3 className="text-lg font-bold text-ink">Estimate your payment</h3>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Field label="Total Price" value={price} onChange={setPrice} prefix="$" />
          <Field label="Down Payment" value={down} onChange={setDown} prefix="$" />
          <Field label="Interest Rate (%)" value={rate} onChange={setRate} step={0.1} />
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Loan Term</span>
            <select
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm"
            >
              {[24, 36, 48, 60, 72, 84].map((m) => (
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
