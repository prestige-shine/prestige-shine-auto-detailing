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
          ["1. Acceptance and scope", "By accessing or using Aurexo websites, applications, communications, or marketplace services, you agree to these Terms of Use and applicable policies. If you use Aurexo for an organization, you represent that you can bind that organization. If you do not agree, discontinue use of the service."],
          ["2. Eligibility and accounts", "You must be at least 18 and legally able to enter contracts to purchase, finance, or sell a vehicle. You are responsible for accurate registration information, account confidentiality, and activity performed through your account. Notify Aurexo promptly if you suspect unauthorized access."],
          ["3. Marketplace role and vehicle listings", "Aurexo provides technology that connects shoppers, sellers, dealers, lenders, and service providers. Unless explicitly stated, Aurexo does not own listed vehicles and is not the selling dealer. Dealers and sellers are responsible for price, availability, condition, disclosures, title, taxes, registration, and transaction documents. Inventory can change before a reservation is confirmed."],
          ["4. Pricing, reservations, and transactions", "Displayed prices may exclude tax, title, registration, government charges, transportation, dealer documentation fees, optional products, and lender costs. A reservation may temporarily hold a vehicle but is not a completed purchase. Final terms appear in documents provided by the seller and must be reviewed before signing."],
          ["5. Financing and estimates", "Loan offers are provided by independent lenders and remain subject to application, identity verification, credit review, collateral requirements, and final approval. Calculators and example payments are estimates only. Aurexo does not guarantee rates, approval, or savings and is not responsible for a lender's credit decision."],
          ["6. Seller responsibilities", "Sellers must have authority to sell, provide truthful vehicle and lien information, disclose known material damage, and supply documents required for title transfer. Fraudulent, misleading, duplicate, or unlawful listings may be removed and accounts may be suspended."],
          ["7. Acceptable use", "You may not scrape or copy inventory at scale, circumvent security, impersonate another person, submit malicious code, interfere with service availability, use the platform for unlawful activity, or exploit marketplace information to harass users. Automated access requires prior written permission."],
          ["8. Intellectual property", "Aurexo names, marks, interface designs, software, editorial content, and original media are protected by intellectual-property law. Limited personal use is permitted; commercial republication, modification, resale, or creation of derivative databases requires written authorization."],
          ["9. Privacy and communications", "Personal data is processed according to the Aurexo Privacy Policy and transaction requirements. By providing contact details, you authorize service-related communications. Marketing preferences can be changed through available controls, though essential transaction and security messages may continue."],
          ["10. Disclaimers", "Services are provided on an as-available basis. To the maximum extent permitted by law, Aurexo disclaims implied warranties regarding merchantability, fitness, uninterrupted access, listing accuracy, and third-party services. Nothing here excludes warranties that cannot legally be disclaimed."],
          ["11. Limitation of liability", "To the maximum extent permitted by law, Aurexo is not liable for indirect, incidental, special, consequential, exemplary, or lost-profit damages arising from marketplace use, a vehicle, or third-party conduct. Aurexo's aggregate liability is limited to fees paid directly to Aurexo during the preceding 12 months, unless a different limit is required by law."],
          ["12. Changes and contact", "We may update these terms to reflect legal, security, or service changes. Material revisions will be identified by an updated date and, when appropriate, additional notice. Questions may be sent through the Contact page or by mail to Aurexo, 6205 Peachtree Dunwoody Rd, Atlanta, GA 30328."],
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
