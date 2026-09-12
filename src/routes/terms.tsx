import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Prestige Shine Auto Detailing" },
      {
        name: "description",
        content:
          "Terms of service for Prestige Shine Auto Detailing services in Miramichi.",
      },
      {
        property: "og:title",
        content: "Terms of Service — Prestige Shine Auto Detailing",
      },
    ],
  }),
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="These terms outline the expectations and conditions for services provided by Prestige Shine Auto Detailing. Last Updated (12 September 2026)."
      />

      <section className="mx-auto max-w-3xl px-4 py-10 space-y-8 text-sm leading-relaxed text-ink">
        <div>
          <h2 className="text-lg font-bold">1. Services and Estimates</h2>
          <p className="mt-2 text-muted-foreground">
            Prestige Shine Auto Detailing provides mobile and concierge-style
            auto detailing and vehicle appearance services. Service descriptions,
            pricing and estimates provided through the website are intended as
            general guidance. Final pricing may vary based on the vehicle's
            size, condition, level of soiling, requested services, and the work
            required.
          </p>
          <p className="mt-2 text-muted-foreground">
            Estimates are not final invoices unless specifically confirmed by
            Prestige Shine Auto Detailing before the service is performed.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">2. Booking and Appointments</h2>
          <p className="mt-2 text-muted-foreground">
            Appointment requests submitted through the website are requests for
            service and are not guaranteed bookings until confirmed by Prestige
            Shine Auto Detailing.
          </p>
          <p className="mt-2 text-muted-foreground">
            Appointment dates and times may be adjusted when necessary due to
            vehicle condition, weather, scheduling requirements, or other
            circumstances affecting the service.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">3. Cancellation and Rescheduling</h2>
          <p className="mt-2 text-muted-foreground">
            At least 48 hours' notice is requested for cancellations or
            rescheduling.
          </p>
          <p className="mt-2 text-muted-foreground">
            Emergencies and unexpected circumstances happen, and cancellation
            situations will be handled reasonably based on the circumstances.
          </p>
          <p className="mt-2 text-muted-foreground">
            Repeated last-minute cancellations or no-shows may require a deposit
            before another appointment is scheduled.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">4. Booking Deposits</h2>
          <p className="mt-2 text-muted-foreground">
            A booking deposit may be required for ceramic coating, paint
            correction and other specialty or high-value services. The amount
            will be confirmed before booking. Deposits are applied toward the
            final invoice. Deposits may be forfeited in the event of a no-show
            or late cancellation.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">5. Payment Methods</h2>
          <p className="mt-2 text-muted-foreground">
            Prestige Shine Auto Detailing accepts the following payment methods:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Cash</li>
            <li>Interac e-Transfer</li>
            <li>
              Cheque for approved dealership or commercial customers
            </li>
          </ul>
          <p className="mt-3 text-muted-foreground">
            ACH and Apple Pay are not currently listed as available payment
            methods unless added by Prestige Shine Auto Detailing in the future.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">6. Vehicle Condition and Service Results</h2>
          <p className="mt-2 text-muted-foreground">
            Detailing results depend on the vehicle's existing condition,
            materials, previous repairs, age, wear, contamination, staining,
            paint condition, and other factors. Not every defect or condition
            can be completely corrected through detailing.
          </p>
          <p className="mt-2 text-muted-foreground">
            Prestige Shine Auto Detailing will use reasonable professional care
            when performing services but cannot guarantee the complete removal
            of every stain, scratch, defect, odour, mark, or other condition.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">7. Ceramic Coating and Specialty Services</h2>
          <p className="mt-2 text-muted-foreground">
            Specialty services such as ceramic coating, paint correction,
            wet sanding, and other high-value services may require additional
            preparation, inspection, maintenance, or aftercare requirements.
          </p>
          <p className="mt-2 text-muted-foreground">
            Customers are responsible for following any applicable aftercare
            instructions provided for their service.
          </p>
        </div>

        <div>
  <h2 className="text-lg font-bold">8. System X Pro+ Warranty</h2>

  <p className="mt-2 text-muted-foreground">
    System X Pro+ carries a manufacturer's 6-year limited warranty when
    installed by an approved System X installer and when all manufacturer
    registration, maintenance and annual inspection requirements are met.
    Warranty terms, exclusions and eligibility are determined by
    System X/Element 119.
  </p>

  <p className="mt-2 text-muted-foreground">
    Annual inspections are required to maintain warranty eligibility.
    Customers must also follow the applicable System X aftercare and
    maintenance requirements.
  </p>

  <p className="mt-2">
    <a
      href="https://systemx.com/pages/auto-terms"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-brand underline underline-offset-4"
    >
      View the official System X warranty terms
    </a>
  </p>
</div>
        <div>
          <h2 className="text-lg font-bold">9. Customer Responsibilities</h2>
          <p className="mt-2 text-muted-foreground">
            Customers are responsible for providing accurate information when
            requesting an estimate or appointment and for communicating any
            relevant vehicle conditions or concerns that may affect the requested
            service.
          </p>
          <p className="mt-2 text-muted-foreground">
            Personal belongings and valuables should be removed from the vehicle
            before service whenever possible. Prestige Shine Auto Detailing is
            not responsible for items left inside the vehicle unless otherwise
            agreed.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">10. Vehicle Photographs</h2>
          <p className="mt-2 text-muted-foreground">
            Photographs submitted through the website may be used to assess a
            vehicle, prepare an estimate or quote, communicate about requested
            services, or document work performed.
          </p>
          <p className="mt-2 text-muted-foreground">
            Submission of vehicle photographs does not automatically grant
            permission for Prestige Shine Auto Detailing to use those photographs
            for marketing purposes. Any marketing use of vehicle photographs is
            subject to separate permission.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">11. Marketing Communications</h2>
          <p className="mt-2 text-muted-foreground">
            Customers may choose to subscribe to promotional communications such
            as detailing tips, seasonal promotions, and special offers.
            Promotional communications are optional and are not required to use
            Prestige Shine Auto Detailing's services.
          </p>
          <p className="mt-2 text-muted-foreground">
            Marketing emails will include an option to unsubscribe.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">12. Website Information</h2>
          <p className="mt-2 text-muted-foreground">
            Prestige Shine Auto Detailing makes reasonable efforts to keep
            website information accurate and current. Service availability,
            pricing, descriptions, photographs, and other website content may
            change without notice.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">13. Limitation of Liability</h2>
          <p className="mt-2 text-muted-foreground">
            Prestige Shine Auto Detailing will provide services with reasonable
            professional care. To the extent permitted by applicable law,
            Prestige Shine Auto Detailing is not responsible for pre-existing
            damage, hidden defects, normal wear, deterioration, or conditions
            that cannot reasonably be identified or corrected during the
            requested service.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">14. Privacy</h2>
          <p className="mt-2 text-muted-foreground">
            Information submitted through the website is handled in accordance
            with the Prestige Shine Auto Detailing Privacy Policy.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">15. Changes to These Terms</h2>
          <p className="mt-2 text-muted-foreground">
            Prestige Shine Auto Detailing may update these Terms of Service when
            services, policies, or website practices change. The current version
            published on this page will apply to future use of the website and
            services, subject to applicable law.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">16. Contact</h2>
          <p className="mt-2 text-muted-foreground">
            If you have questions about these Terms of Service or a service
            appointment, please contact Prestige Shine Auto Detailing through
            the contact information provided on the website.
          </p>
        </div>

             </section>
    </main>
  );
}