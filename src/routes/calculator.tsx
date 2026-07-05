import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { FinanceCalculator } from "@/components/aurexo/FinanceCalculator";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Loan Calculator — Top Coat" },
      { name: "description", content: "Estimate your monthly car payment with Top Coat's free financing calculator." },
      { property: "og:title", content: "Loan Calculator — Top Coat" },
      { property: "og:description", content: "Estimate your monthly car payment." },
    ],
  }),
  component: Calculator,
});

function Calculator() {
  return (
    <main>
      <PageHeader eyebrow="Tools" title="Loan Calculator" subtitle="Plan your purchase with realistic monthly numbers — no email required." />
      <section className="mx-auto max-w-5xl px-4 py-12">
        <FinanceCalculator />
      </section>
    </main>
  );
}
