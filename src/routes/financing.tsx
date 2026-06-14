import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Banknote, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { FinanceCalculator } from "@/components/aurexo/FinanceCalculator";

export const Route = createFileRoute("/financing")({
  head: () => ({
    meta: [
      { title: "Financing — Aurexo" },
      { name: "description", content: "Get pre-approved in minutes. Competitive rates from 4.5% APR with no impact to your credit score." },
      { property: "og:title", content: "Financing — Aurexo" },
      { property: "og:description", content: "Get pre-approved in minutes with rates from 4.5% APR." },
    ],
  }),
  component: Financing,
});

function Financing() {
  return (
    <main>
      <PageHeader eyebrow="Financing" title="Pre-approved in minutes. Zero hit to your credit." subtitle="We work with 22 lenders to get you the lowest rate — fast." />

      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { i: Banknote, t: "Rates from 4.5% APR", d: "Competitive financing for new and used cars." },
          { i: ShieldCheck, t: "Soft credit pull only", d: "Check your rate without affecting your score." },
          { i: Clock, t: "Instant decisions", d: "Most applicants are approved in under 3 minutes." },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="rounded-2xl bg-white border border-border p-5">
            <Icon className="h-6 w-6 text-brand" />
            <h3 className="mt-3 font-bold text-ink">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">Payment planner</p>
          <h2 className="mt-1 text-2xl font-bold text-ink">Build a loan around your budget</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Change your price, down payment, APR, and term to compare the complete cost in real time.</p>
        </div>
        <FinanceCalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <div className="rounded-2xl bg-white border border-border p-6">
          <h2 className="text-2xl font-bold text-ink">Apply now</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="rounded-xl border border-border px-4 py-3 text-sm" placeholder="Full Name" />
            <input className="rounded-xl border border-border px-4 py-3 text-sm" type="email" placeholder="Email" />
            <input className="rounded-xl border border-border px-4 py-3 text-sm" placeholder="Phone" />
            <input className="rounded-xl border border-border px-4 py-3 text-sm" placeholder="Annual Income" />
            <input className="rounded-xl border border-border px-4 py-3 text-sm sm:col-span-2" placeholder="Loan Amount Requested" />
            <button className="sm:col-span-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-ink">Check my rate</button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground text-center">No impact to credit. Takes about 2 minutes.</p>
        </div>

        <ul className="mt-8 space-y-3">
          {["No application fees","Refinance options up to 84 months","Co-signers welcome","Loans for any credit profile"].map((p) => (
            <li key={p} className="flex items-center gap-3 rounded-xl bg-white border border-border p-4 text-sm text-ink">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-ink"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
              {p}
            </li>
          ))}
        </ul>

        <Link to="/calculator" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
          Estimate your monthly payment <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="mt-12 space-y-8 border-t border-border pt-10">
          <div><h2 className="text-2xl font-bold text-ink">How Aurexo auto financing works</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Pre-qualification collects basic identity, income, housing, and requested loan information to estimate eligible offers. A soft credit inquiry does not change your score. If you select a lender and proceed, the lender may complete identity verification, income review, and a hard credit inquiry before final approval.</p></div>
          <div><h3 className="text-lg font-bold text-ink">Compare the complete loan—not just the payment</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Review annual percentage rate, term, amount financed, down payment, taxes, fees, total interest, and total of payments. A longer loan can reduce the monthly bill while increasing interest expense and the period in which the balance may exceed the vehicle's value.</p></div>
          <div><h3 className="text-lg font-bold text-ink">Documents that may be required</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground"><li>Government-issued identification and proof of residence</li><li>Recent pay statements, tax returns, or bank statements</li><li>Insurance binder for the selected vehicle</li><li>Trade-in title, registration, and payoff information when applicable</li></ul></div>
          <p className="text-xs leading-relaxed text-muted-foreground">Rates and approvals vary by lender, credit profile, vehicle, loan-to-value ratio, residence, and market conditions. Advertised rates are not guaranteed. Aurexo is not a lender and does not make credit decisions.</p>
        </div>
      </section>
    </main>
  );
}
