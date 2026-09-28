import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Paintbrush, MapPin } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { Reveal } from "@/components/aurexo/Reveal";
import systemXCertificate from "@/assets/certifications/certificate.jpeg";
import { team } from "@/lib/team";
import chevelleDetail from "@/assets/chevelle-ss-detail.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title:
          "About Prestige Shine Auto Detailing — Miramichi's Premier Auto Detailing",
      },
      {
        name: "description",
        content:
          "Prestige Shine Auto Detailing Miramichi is an appointment-only professional detailing studio specializing in full detailing, paint enhancement, paint correction and professional ceramic coatings.",
      },
      {
        property: "og:title",
        content: "About Prestige Shine Auto Detailing",
      },
      {
        property: "og:description",
        content:
          "Miramichi's appointment-only auto detailing shop — ceramic coatings, paint correction, and interior deep cleans.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="About Prestige Shine"
        title="Miramichi's most trusted detailing shop, built from passion."
        subtitle="Prestige Shine Auto Detailing in Miramichi, NB, Canada is an appointment-only professional detailing studio specializing in full detailing, paint enhancement, paint correction, and professional ceramic coatings."
      />

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-12 sm:grid-cols-3">
        {[
          {
            i: ShieldCheck,
            n: "System X Certified Installer",
            l: "Professional Ceramic Coating Specialist",
          },
          {
            i: Paintbrush,
            n: "Paint Correction Specialist",
            l: "Restoring Gloss, Depth & Clarity",
          },
          {
            i: MapPin,
            n: "Serving Miramichi, NB",
            l: "Premium Auto Detailing for Local Vehicle Owners",
          },
        ].map(({ i: Icon, n, l }) => (
          <Reveal key={l}>
            <div className="rounded-2xl border border-border bg-white p-5 text-center">
              <Icon className="mx-auto h-6 w-6 text-brand" />
              <p className="mt-3 text-base font-extrabold text-ink">{n}</p>
              <p className="text-xs text-muted-foreground">{l}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Founding story */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-white lg:grid-cols-2">
            <img
              src={chevelleDetail}
              alt="Chevrolet Chevelle SS detailed by Prestige Shine Auto Detailing in Miramichi, NB"
              className="h-64 w-full object-cover lg:h-full"
              loading="lazy"
            />
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <p className="text-xs font-bold uppercase tracking-wide text-brand">
                Our Story
              </p>
              <h2 className="mt-2 text-2xl font-bold text-ink">
                Built by Kevin Hines, in Miramichi.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Prestige Shine Auto Detailing is owned and operated by Kevin
                Hines out of a clean, organised shop at 229 Jacqueline Dr in
                Miramichi, NB. Kevin is a System X certified ceramic coating
                installer and a paint correction specialist — every vehicle is
                personally inspected and quality-controlled by Kevin, whether
                it's a daily driver, a work truck, or a classic like this
                Chevelle SS.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* System X Certification */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-white lg:grid-cols-2">
            {/* Text */}
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <p className="text-xs font-bold uppercase tracking-wide text-brand">
                System X Certification
              </p>

              <h2 className="mt-2 text-2xl font-bold text-ink">
                Certified Ceramic Coating Installer
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Kevin is a System X certified ceramic coating installer, trained
                to install professional System X coating systems according to
                the manufacturer's requirements.
              </p>
            </div>

            <div className="min-h-[420px] bg-surface lg:min-h-0">
              <img
                src={systemXCertificate}
                alt="System X certified ceramic coating installer certificate"
                className="h-full w-full object-contain p-4 sm:p-6"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Mission & values */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <Reveal>
          <div className="rounded-3xl border border-border bg-white p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-ink">Mission</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Every vehicle that comes into the dedicated detailing and coating
              shop in Miramichi leaves better than when it arrived — not just
              cleaner, but properly cared for, restored, and protected
              according to the service selected. Kevin combines
              professional-grade products with meticulous hand-work and
              transparent communication so you always know what was done and
              why.
            </p>

            <h3 className="mt-8 text-lg font-bold text-ink">
              What We Stand For
            </h3>
            <ul className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              {[
                "Every vehicle receives a service tailored to its condition, needs, and selected package.",
                "Paint decontamination and preparation before applying protection, with correction performed when appropriate for the vehicle and selected service.",
                "Clear service details with before-and-after photos where applicable.",
                "Ceramic coating care and applicable manufacturer warranty information will be provided based on the specific System X coating package installed.",
                "Services are selected based on the vehicle's condition, the requested finish, and the appropriate products and techniques.",
                "Prestige Shine works by appointment, with each vehicle given the time and attention required for the selected service.",
              ].map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 rounded-xl bg-surface p-3"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />{" "}
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-8 border-t border-border pt-10 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold text-ink">
                  The Prestige Shine Process
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Every appointment begins with a thorough paint inspection
                  under specialized lighting. Kevin assesses the paint
                  condition, identifies contaminants, swirl marks, and
                  oxidation, then recommends the appropriate service based on
                  his findings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink">
                  Shop Quality Standards
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Kevin is a System X certified installer and operates Prestige
                  Shine from his dedicated detailing and coating shop in
                  Miramichi, where vehicles are prepared and coated in a
                  professional environment with careful attention to
                  cleanliness, surface preparation, and application.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink">Recognition</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Prestige Shine has earned 100+ 5-star Google reviews from
                  Miramichi vehicle owners, with repeat clients for ceramic
                  coatings, paint correction, interior restoration, and full
                  detail packages — the recognition that matters most is a
                  customer sending their friends.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink">
                  Aftercare & Support
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Every ceramic-coated vehicle receives care guidance tailored
                  to the coating and the vehicle's needs. Kevin can also
                  provide recommendations for maintaining the finish between
                  professional detailing appointments.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Detailer */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-wide text-brand">
            Your detailer
          </p>
          <h2 className="mt-1 text-2xl font-bold text-ink">
            The person behind the polish.
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <article
                key={m.name}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <img
                  src={m.photo}
                  alt={m.name}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-bold text-ink">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="mt-2 inline-block text-xs text-brand hover:underline"
                  >
                    {m.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}