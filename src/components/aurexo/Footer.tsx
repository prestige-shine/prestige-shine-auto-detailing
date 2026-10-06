import { useState } from "react";
import {
  Plus,
  Minus,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Facebook,
  MessageCircle,
  Calculator,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import {
  STUDIO_PHONE,
  STUDIO_TEL,
  STUDIO_EMAIL,
  FACEBOOK_URL,
  WHATSAPP_NUMBER,
} from "@/lib/whatsapp";
import { useLeadDialog } from "@/contexts/LeadDialogContext";
import { subscribeToMailchimp } from "@/lib/leads.functions";

const groups: Record<string, { label: string; to: string }[]> = {
  "Quick Links": [
    { label: "Home", to: "/" },
    { label: "About the Studio", to: "/about" },
    { label: "Detailing Services", to: "/services" },
    { label: "Detailing Journal", to: "/news" },
    { label: "Contact", to: "/contact" },
  ],
  "Services & Tools": [
    { label: "Instant Detailing Quote", to: "/get-estimate" },
    { label: "Book Vehicle Assessment", to: "/sell" },
    { label: "Recent Work", to: "/buy" },
    { label: "Studio Location", to: "/dealerships" },
  ],
};

function AccordionRow({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-white"
      >
        <span>{title}</span>
        {open ? (
          <Minus className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </button>

      {open && (
        <ul className="space-y-2 pb-4">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block min-h-11 py-2 text-sm text-white/70 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Footer() {
  const { open } = useLeadDialog();

  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubscribe = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!subscriberEmail.trim() || !marketingConsent) {
      return;
    }

    setSubscribeStatus("submitting");

    try {
      await subscribeToMailchimp({
        data: {
          email: subscriberEmail.trim(),
        },
      });

      setSubscriberEmail("");
      setMarketingConsent(false);
      setSubscribeStatus("success");
    } catch (error) {
      console.error("Mailchimp subscription failed:", error);
      setSubscribeStatus("error");
    }
  };

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Logo variant="light" />

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
          Prestige Shine Auto Detailing Miramichi is an appointment-only
          professional detailing studio with limited availability each month.
          Booking in advance is recommended. Services include full detailing,
          paint enhancement, paint correction and professional ceramic coatings.
        </p>

        <button
          type="button"
          onClick={() => open()}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:opacity-90"
        >
          <Calculator className="h-4 w-4" />
          Get My Personalized Quote
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Studio Hours
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              By Appointment Only
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Service Area
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Miramichi, NB
              <br />
              and surrounding areas
            </p>
          </div>
        </div>

        {/* Mailing list */}
        <form
          onSubmit={handleSubscribe}
          className="mt-8"
        >
          <div className="flex items-center rounded-full border border-white/15 bg-white/[0.07] pl-5 pr-1.5 py-1.5">
            <input
              type="email"
              value={subscriberEmail}
              onChange={(e) => {
                setSubscriberEmail(e.target.value);

                if (subscribeStatus !== "idle") {
                  setSubscribeStatus("idle");
                }
              }}
              placeholder="Enter your email address"
              aria-label="Email address"
              required
              disabled={subscribeStatus === "submitting"}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 outline-none disabled:opacity-50"
            />

            <button
              type="submit"
              aria-label="Subscribe"
              disabled={
                subscribeStatus === "submitting" || !marketingConsent
              }
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <label className="mt-3 flex items-start gap-2 px-1 text-xs leading-relaxed text-white/55">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => {
                setMarketingConsent(e.target.checked);

                if (subscribeStatus !== "idle") {
                  setSubscribeStatus("idle");
                }
              }}
              disabled={subscribeStatus === "submitting"}
              className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-brand"
            />

            <span>
              I agree to receive promotional emails from Prestige Shine,
              including detailing tips and seasonal offers. I can unsubscribe
              at any time.
            </span>
          </label>

          {subscribeStatus === "submitting" && (
            <p className="mt-2 px-1 text-xs text-white/60">
              Subscribing...
            </p>
          )}

          {subscribeStatus === "success" && (
            <p className="mt-2 px-1 text-xs text-brand">
              Check your email to confirm your subscription.
            </p>
          )}

          {subscribeStatus === "error" && (
            <p className="mt-2 px-1 text-xs text-red-300">
              Something went wrong. Please try again.
            </p>
          )}
        </form>

        <div className="mt-8">
          {Object.entries(groups).map(([k, v]) => (
            <AccordionRow key={k} title={k} items={v} />
          ))}
        </div>

        <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
          <div className="flex items-center gap-3 text-sm text-white/85">
            <Phone className="h-4 w-4 shrink-0 text-brand" />
            <a
              href={`tel:${STUDIO_TEL}`}
              className="hover:text-white"
            >
              {STUDIO_PHONE}
            </a>
          </div>

          <div className="flex items-center gap-3 text-sm text-white/85">
            <Mail className="h-4 w-4 shrink-0 text-brand" />
            <a
              href={`mailto:${STUDIO_EMAIL}`}
              className="hover:text-white"
            >
              {STUDIO_EMAIL}
            </a>
          </div>

          <div className="flex items-start gap-3 text-sm text-white/85">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span>
              229 Jacqueline Dr, Miramichi, NB E1N 3Z2, Canada
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-8">
          <Social
            href={FACEBOOK_URL}
            label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </Social>

          <Social
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            label="WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </Social>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Prestige Shine Auto Detailing · Miramichi, NB. All rights
            reserved.
          </p>

          <div className="flex items-center gap-4 sm:mr-auto sm:ml-60">
            <Link
              to="/privacy"
              className="hover:text-white/70"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-white/70"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:bg-brand hover:text-white"
    >
      {children}
    </a>
  );
}