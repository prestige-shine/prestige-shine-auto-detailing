// EmailJS notifications for the lead qualification flow.
//
// Sends only AFTER the lead is saved to Supabase.
// Email failures never block or fake successful lead submission.

import emailjs from "@emailjs/browser";

export type LeadEmailParams = {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: string;
  vehicle_colour: string;
  requested_services: string;
  other_service: string;
  vehicle_condition: string;
  vehicle_size: string;
  preferred_date: string;
  preferred_time: string;
  timeline: string;
  schedule_flexible: string;
  photo_urls: string[];
  lead_id: string;
  source_name: "lead-qualifier";
};

export type CustomerConfirmationParams = {
  customer_name: string;
  customer_email: string;
};

function config() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
  const customerTemplateId =
    import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID as string | undefined;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

  if (!serviceId || !templateId || !publicKey) return null;

  return {
    serviceId,
    templateId,
    customerTemplateId,
    publicKey,
  };
}

export function isEmailJsConfigured(): boolean {
  return config() !== null;
}

// Sends the existing notification email to Kevin.
// Returns { sent: true } on success; { sent: false, error } otherwise.
// Never throws.
export async function sendLeadNotification(
  params: LeadEmailParams,
): Promise<{ sent: boolean; error?: string }> {
  const cfg = config();

  if (!cfg) {
    return {
      sent: false,
      error: "EmailJS is not configured (missing env keys)",
    };
  }

  try {
    await emailjs.send(
      cfg.serviceId,
      cfg.templateId,
      { ...params },
      { publicKey: cfg.publicKey },
    );

    return { sent: true };
  } catch (e: any) {
    return {
      sent: false,
      error: e?.text ?? e?.message ?? "EmailJS send failed",
    };
  }
}

// Sends the confirmation email to the customer after a successful lead submission.
// Returns { sent: true } on success; { sent: false, error } otherwise.
// Never throws.
export async function sendCustomerConfirmation(
  params: CustomerConfirmationParams,
): Promise<{ sent: boolean; error?: string }> {
  const cfg = config();

  if (!cfg || !cfg.customerTemplateId) {
    return {
      sent: false,
      error: "EmailJS customer confirmation template is not configured",
    };
  }

  try {
    await emailjs.send(
      cfg.serviceId,
      cfg.customerTemplateId,
      { ...params },
      { publicKey: cfg.publicKey },
    );

    return { sent: true };
  } catch (e: any) {
    return {
      sent: false,
      error: e?.text ?? e?.message ?? "Customer confirmation email failed",
    };
  }
}