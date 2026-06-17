import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Banknote, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { FinanceCalculator } from "@/components/aurexo/FinanceCalculator";

export const Route = createFileRoute("/financing")({
  head: () => ({
    meta: [
      { title: "Project Financing — Aurexo Roofing Studio" },
      { name: "description", content: "Premium roofing financing from 6.5% APR. Plan your Ohio project budget with line-item transparency and flexible terms up to 84 months." },
      { property: "og:title", content: "Project Financing — Aurexo Roofing Studio" },
      { property: "og:description", content: "Roofing project financing from 6.5% APR with terms up to 84 months." },
    ],
  }),
  component: Financing,
});

function Financing() {
  return (
    <main>
      <PageHeader eyebrow="Financing" title="Premium roofing, planned around your budget." subtitle="We partner with specialist lenders to finance Ohio roofing projects from $10,000 to $300,000 with transparent line-item pricing." />

      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { i: Banknote, t: "Rates from 6.5% APR", d: "Competitive financing structured around premium roofing projects." },
          { i: ShieldCheck, t: "Soft credit pull only", d: "Check your rate without affecting your credit score." },
          { i: Clock, t: "48-hour decisions", d: "Most homeowners receive a written offer within two business days." },
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
          <div><h2 className="text-2xl font-bold text-ink">How Aurexo project financing works</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Pre-qualification collects basic identity, household income, and the documented Aurexo estimate to match you with specialist roofing lenders. A soft credit inquiry does not change your score. If you accept a structured offer, the lender completes identity verification, income review, and a hard credit inquiry before final approval.</p></div>
          <div><h3 className="text-lg font-bold text-ink">Compare the complete loan — not just the payment</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Review annual percentage rate, term, amount financed, taxes, fees, total interest, and total of payments. A longer term reduces the monthly bill while increasing total interest expense. A premium roof is a capital improvement that typically outlasts the loan — match the term to your ownership horizon.</p></div>
          <div><h3 className="text-lg font-bold text-ink">Documents that may be required</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground"><li>Government-issued identification and proof of Ohio residence</li><li>Recent pay statements, tax returns, or bank statements</li><li>Property deed or mortgage statement for the project address</li><li>Signed Aurexo Roofing Studio line-item estimate</li></ul></div>
          <p className="text-xs leading-relaxed text-muted-foreground">Rates and approvals vary by lender, credit profile, property, loan-to-value ratio, residence, and market conditions. Advertised rates are not guaranteed. Aurexo Roofing Studio is not a lender and does not make credit decisions.</p>
        </div>
      </section>
    </main>
  );
}
