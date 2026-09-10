import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Prestige Shine Auto Detailing" },
      { name: "description", content: "Privacy policy for Prestige Shine Auto Detailing auto detailing services in Miramichi." },
      { property: "og:title", content: "Privacy Policy — Prestige Shine Auto Detailing" },
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
        subtitle="We respect your privacy and are committed to handling your information responsibly."
      />

      <section className="mx-auto max-w-3xl px-4 py-10 space-y-6 text-sm leading-relaxed text-ink">
        <div>
          <h2 className="text-lg font-bold">1. Information We Collect</h2>
          <p className="mt-2 text-muted-foreground">
            When you contact Prestige Shine Auto Detailing, request a quote, book a service, submit a vehicle assessment, or use other features of our website, we may collect information such as your name, contact information, vehicle details, service preferences, and other information you choose to provide.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">2. Vehicle Photos</h2>
          <p className="mt-2 text-muted-foreground">
            If you upload photographs of your vehicle through our website, those photographs may be stored and reviewed so we can assess your vehicle and respond to your request. Please only upload photographs that you are comfortable sharing for this purpose.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">3. How We Use Your Information</h2>
          <p className="mt-2 text-muted-foreground">
            We use information submitted through the website to respond to enquiries, prepare quotes, communicate about requested services, arrange appointments, provide customer service, and operate and improve our website and services.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">4. Third-Party Services</h2>
          <p className="mt-2 text-muted-foreground">
            Our website may use third-party services to support website functionality, form submissions, communications, maps, and other features. Information submitted through the website may be processed or stored by these services when necessary to provide those functions.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">5. Newsletter Communications</h2>
          <p className="mt-2 text-muted-foreground">
            If you choose to subscribe to our newsletter or other marketing communications, we may use the contact information you provide to send those communications. You can unsubscribe from marketing emails at any time using the unsubscribe option provided in the message.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">6. Sharing Information</h2>
          <p className="mt-2 text-muted-foreground">
            We do not sell your personal information. We may provide information to service providers when necessary to operate the website, process requests, communicate with you, or provide our services.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">7. Data Security</h2>
          <p className="mt-2 text-muted-foreground">
            We take reasonable steps to protect information submitted through our website. However, no website or electronic transmission can be guaranteed to be completely secure.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">8. Your Choices</h2>
          <p className="mt-2 text-muted-foreground">
            You may choose not to provide certain information. However, some information may be necessary for us to respond to an enquiry, prepare a quote, arrange an appointment, or provide a requested service.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">9. Contact Us</h2>
          <p className="mt-2 text-muted-foreground">
            If you have questions about this Privacy Policy or how your information is handled, please contact Prestige Shine Auto Detailing through the contact information provided on our website.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">10. Policy Updates</h2>
          <p className="mt-2 text-muted-foreground">
            We may update this Privacy Policy when our website, services, or information practices change. Any updated version will be published on this page.
          </p>
        </div>
      </section>
    </main>
  );
}
