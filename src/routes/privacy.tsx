import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Prestige Shine Auto Detailing" },
      {
        name: "description",
        content:
          "Privacy policy for Prestige Shine Auto Detailing auto detailing services in Miramichi.",
      },
      {
        property: "og:title",
        content: "Privacy Policy — Prestige Shine Auto Detailing",
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="We respect your privacy and are committed to handling your information responsibly. Last Updated (12 September 2026)."
      />

      <section className="mx-auto max-w-3xl px-4 py-10 space-y-6 text-sm leading-relaxed text-ink">
        <div>
          <h2 className="text-lg font-bold">1. Information We Collect</h2>
          <p className="mt-2 text-muted-foreground">
            When you contact Prestige Shine Auto Detailing, request an estimate
            or quote, book a service, submit a vehicle assessment, or use other
            features of our website, we may collect information you choose to
            provide, including your name, telephone number, email address,
            vehicle make, model, year, colour, service preferences, vehicle
            condition, preferred appointment details, and submitted
            photographs.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">2. Vehicle Photos</h2>
          <p className="mt-2 text-muted-foreground">
            Photographs submitted through the website may be stored and
            reviewed for legitimate business purposes, including assessing your
            vehicle, preparing an estimate or quote, documenting services, and
            responding to your enquiry.
          </p>
          <p className="mt-2 text-muted-foreground">
            Submitting photographs for an estimate, quote, or service does not
            automatically give Prestige Shine permission to publish those
            photographs for marketing purposes.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">3. How We Use Your Information</h2>
          <p className="mt-2 text-muted-foreground">
            Information collected through the website is used only for
            legitimate Prestige Shine business purposes, including:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Preparing estimates and quotes</li>
            <li>Scheduling and managing appointments</li>
            <li>Communicating with customers</li>
            <li>Performing and documenting services</li>
            <li>Maintaining service or warranty records where necessary</li>
            <li>Responding to customer enquiries</li>
            <li>Operating and maintaining the website and related services</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold">4. Service Providers and Systems</h2>
          <p className="mt-2 text-muted-foreground">
            Customer information is stored or processed through the website's
            and customer communication systems when necessary to provide
            requested services and operate the business. This may include
            services used for website functionality, data storage, customer
            communications, email notifications, and marketing communications.
          </p>
          <p className="mt-2 text-muted-foreground">
            Information is accessible only to Prestige Shine Auto Detailing and
            the service providers required to operate these systems and provide
            the requested services.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">5. Promotional Communications</h2>
          <p className="mt-2 text-muted-foreground">
            Prestige Shine may offer customers the option to receive detailing
            tips, seasonal promotions, and special offers by email. Marketing
            communications are only sent when a customer actively chooses to
            subscribe.
          </p>
          <p className="mt-2 text-muted-foreground">
            Marketing emails include an unsubscribe option, and you may
            unsubscribe from promotional communications at any time.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">6. Vehicle Photos for Marketing</h2>
          <p className="mt-2 text-muted-foreground">
            Prestige Shine may use before-and-after photographs of completed
            vehicle work for portfolio, website, and social-media marketing
            purposes when the customer has separately provided permission to
            do so.
          </p>
          <p className="mt-2 text-muted-foreground">
            Permission to use vehicle photographs for marketing is optional and
            is separate from permission to submit photographs for an estimate,
            quote, or service. Prestige Shine will not intentionally publish
            personal information, documents, or other identifying information
            visible in a vehicle photograph.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">7. Sharing Information</h2>
          <p className="mt-2 text-muted-foreground">
            Prestige Shine Auto Detailing does not sell customer personal
            information. Customer information is not shared for unrelated
            marketing purposes.
          </p>
          <p className="mt-2 text-muted-foreground">
            Information may be provided to service providers when necessary to
            operate the website, store information, process requests,
            communicate with customers, provide requested services, or maintain
            business records.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">8. Data Security and Retention</h2>
          <p className="mt-2 text-muted-foreground">
            Prestige Shine takes reasonable steps to protect customer
            information handled through its website and business systems.
            However, no website, online service, or electronic transmission can
            be guaranteed to be completely secure.
          </p>
          <p className="mt-2 text-muted-foreground">
            Information may be retained for as long as reasonably necessary for
            legitimate business purposes, including responding to enquiries,
            maintaining service and warranty records, and meeting applicable
            business or legal requirements.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">9. Your Choices</h2>
          <p className="mt-2 text-muted-foreground">
            You may choose not to provide certain information. However, some
            information may be necessary for Prestige Shine to respond to an
            enquiry, prepare an estimate or quote, arrange an appointment, or
            provide a requested service.
          </p>
          <p className="mt-2 text-muted-foreground">
            You may also choose whether to receive promotional communications
            and whether to give separate permission for your vehicle
            photographs to be used for marketing purposes.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">10. Contact Us</h2>
          <p className="mt-2 text-muted-foreground">
            If you have questions about this Privacy Policy or how your
            information is handled, please contact Prestige Shine Auto
            Detailing through the contact information provided on the website.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">11. Policy Updates</h2>
          <p className="mt-2 text-muted-foreground">
            Prestige Shine may update this Privacy Policy when its website,
            services, or information practices change. Any updated version will
            be published on this page. The "Last Updated" date should reflect
            the date the final version is published or approved.
          </p>
        </div>
      </section>
    </main>
  );
}