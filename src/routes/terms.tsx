import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Top Coat Auto Detailers" },
      { name: "description", content: "Terms of service for Top Coat Auto Detailers auto detailing services in Lahore." },
      { property: "og:title", content: "Terms of Service — Top Coat Auto Detailers" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Legal" title="Terms of Service" subtitle="Updated Jan 2026. Applies to all detailing packages booked with Top Coat Auto Detailers." />
      <section className="mx-auto max-w-3xl px-4 py-10 space-y-6 text-sm leading-relaxed text-ink">
        <div>
          <h2 className="text-lg font-bold">1. Scope of Services</h2>
          <p className="mt-2 text-muted-foreground">Top Coat Auto Detailers provides auto detailing services including exterior maintenance, interior deep cleaning, paint correction, and ceramic coating installation, performed at our Lahore studios or as mobile service at your address.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">2. Vehicle Assessment & Quotes</h2>
          <p className="mt-2 text-muted-foreground">Online quotes are estimates. Final pricing is confirmed after our in-person or photo-based vehicle assessment. We reserve the right to adjust pricing for conditions materially different from what was disclosed at booking.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">3. Cancellation Policy</h2>
          <p className="mt-2 text-muted-foreground">Cancellations more than 24 hours before your appointment are refunded in full. Cancellations inside 24 hours forfeit a $75 booking deposit for Express/Interior packages and $250 for Ceramic/Correction packages.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">4. Before / After Photos</h2>
          <p className="mt-2 text-muted-foreground">By booking, you grant Top Coat the right to photograph your vehicle for internal quality documentation and, unless you opt out in writing, for anonymized marketing use. License plates and identifying VIN details are always blurred.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">5. Ceramic Coating Warranty</h2>
          <p className="mt-2 text-muted-foreground">Registered Top Coat 9H ceramic warranties (5–9 years) cover loss of hydrophobic performance under normal use. Warranty requires annual maintenance decontamination at an Top Coat studio to stay active. Damage from automated tunnel washes, harsh solvents, accidents, or improper aftercare voids coverage.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">6. Limits of Liability</h2>
          <p className="mt-2 text-muted-foreground">Top Coat is not responsible for pre-existing damage, aftermarket paint of unknown provenance, or paint failures caused by prior clear-coat degradation. Our liability is limited to the value of the service performed.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">7. Payments</h2>
          <p className="mt-2 text-muted-foreground">We accept cards, ACH, Apple Pay, and financing via our approved partners. Balances are due on completion unless a payment plan has been signed in advance.</p>
        </div>
      </section>
    </main>
  );
}
