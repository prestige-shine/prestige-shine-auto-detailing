import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Aurexo" },
      { name: "description", content: "The terms governing your use of the Aurexo platform." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Terms of use." subtitle="Last updated June 11, 2026" />
      <section className="mx-auto max-w-3xl px-4 py-12 space-y-6 text-sm text-muted-foreground leading-relaxed">
        {[
          ["1. Acceptance", "By accessing Aurexo you agree to these terms. If you don't agree, please don't use the service."],
          ["2. Eligibility", "You must be at least 18 to purchase, finance, or sell a vehicle through Aurexo."],
          ["3. Listings", "Aurexo verifies dealer information but doesn't take title to vehicles. The selling dealer is the responsible counterparty."],
          ["4. Financing", "Loan offers are provided by third-party lenders and subject to credit approval. Rates shown are estimates."],
          ["5. Privacy", "Your data is handled in line with our Privacy Policy. We never sell your personal information."],
          ["6. Limitation of Liability", "Aurexo's total liability is limited to fees you've paid us in the past 12 months."],
        ].map(([h, b]) => (
          <div key={h}>
            <h2 className="text-base font-bold text-ink">{h}</h2>
            <p className="mt-2">{b}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
