// Server-only enquiry notification layer.
// The `.server.ts` suffix keeps this out of every client bundle.
//
// Pipeline: enquiry is already stored in `public.leads` (source of truth).
// This module reads the stored record, builds the full email for the studio,
// and fires a short SMS alert. Failures here NEVER delete or invalidate the
// stored enquiry - they are recorded on the record instead.
import process from "node:process";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type NotifyResult = {
  emailed: boolean;
  smsSent: boolean;
  emailError?: string;
  smsError?: string;
};

/** All recipient/provider config lives server-side. Read per-request (Workers bind env at request time). */
function getNotifyConfig() {
  return {
    // Where the full enquiry email goes (test address now, Kevin's later).
    notifyEmail: process.env.NOTIFY_EMAIL ?? "",
    // Where the short SMS alert goes, E.164 (e.g. +15062514451).
    notifySmsTo: process.env.NOTIFY_SMS_TO ?? "",
    // Verified sender domain for outbound email. Empty until email setup is done.
    senderDomain: process.env.EMAIL_SENDER_DOMAIN ?? "",
    // Twilio via the Lovable connector gateway.
    lovableApiKey: process.env.LOVABLE_API_KEY ?? "",
    twilioApiKey: process.env.TWILIO_API_KEY ?? "",
    twilioFrom: process.env.TWILIO_FROM_NUMBER ?? "",
  };
}

const SMS_TEXT = "New website enquiry — check your email for the full details.";

type LeadRow = Record<string, any>;

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function line(label: string, value: unknown): string {
  const v = Array.isArray(value) ? value.filter(Boolean).join(", ") : value;
  if (v === null || v === undefined || v === "" ) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${esc(
    label,
  )}</td><td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600">${esc(v)}</td></tr>`;
}

/** Signed, time-limited links for the private lead-photos bucket. Never made public. */
async function signPhotos(paths: string[]): Promise<{ path: string; url: string | null }[]> {
  if (!paths?.length) return [];
  const out: { path: string; url: string | null }[] = [];
  for (const p of paths.slice(0, 20)) {
    try {
      const { data } = await supabaseAdmin.storage
        .from("lead-photos")
        .createSignedUrl(p, 60 * 60 * 24 * 7);
      out.push({ path: p, url: data?.signedUrl ?? null });
    } catch {
      out.push({ path: p, url: null });
    }
  }
  return out;
}

export function buildEnquiryEmail(lead: LeadRow, photos: { path: string; url: string | null }[]) {
  const submitted = lead["created_at"]
    ? new Date(lead["created_at"] as string).toLocaleString("en-CA", { timeZone: "America/Moncton" })
    : new Date().toLocaleString("en-CA");

  const photoHtml = photos.length
    ? `<p style="margin:18px 0 6px;font-size:13px;color:#6b7280">Uploaded vehicle photos (private links, valid 7 days)</p>` +
      photos
        .map((p, i) =>
          p.url
            ? `<p style="margin:2px 0"><a href="${esc(p.url)}" style="color:#b45309;font-size:14px">Photo ${i + 1}</a> <span style="color:#9ca3af;font-size:12px">${esc(p.path)}</span></p>`
            : `<p style="margin:2px 0;color:#9ca3af;font-size:12px">${esc(p.path)} (link unavailable)</p>`,
        )
        .join("")
    : `<p style="margin:18px 0 0;font-size:13px;color:#9ca3af">No photos uploaded.</p>`;

  const html = `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:640px;margin:0 auto;padding:24px">
    <h1 style="margin:0 0 4px;font-size:20px;color:#111827">New Website Enquiry</h1>
    <p style="margin:0 0 18px;font-size:13px;color:#6b7280">Prestige Shine Auto Detailing — ${esc(submitted)}</p>
    <table style="width:100%;border-collapse:collapse">
      ${line("Submission ID", lead["id"])}
      ${line("Name", lead["full_name"])}
      ${line("Email", lead["email"])}
      ${line("Phone", lead["phone"])}
      ${line("Vehicle", [lead["vehicle_year"], lead["vehicle_make"], lead["vehicle_model"]].filter(Boolean).join(" "))}
      ${line("Colour", lead["vehicle_color"])}
      ${line("Vehicle size", lead["vehicle_size"])}
      ${line("Services requested", lead["services"])}
      ${line("Other service", lead["other_service"])}
      ${line("Vehicle condition", lead["conditions"])}
      ${line("Condition notes", lead["condition_notes"])}
      ${line("Estimated starting price", lead["estimate_text"])}
      ${line("Preferred date", lead["preferred_date"])}
      ${line("Preferred time", lead["preferred_time"])}
      ${line("Timeline", lead["timeline"])}
      ${line("Flexible on schedule", lead["schedule_flexible"] === null || lead["schedule_flexible"] === undefined ? "" : lead["schedule_flexible"] ? "Yes" : "No")}
      ${line("Source", lead["source"])}
    </table>
    ${photoHtml}
    <p style="margin:22px 0 0;font-size:12px;color:#9ca3af">Reply to this email to respond directly to the customer.</p>
  </div></body></html>`;

  return { subject: "New Website Enquiry — Prestige Shine Auto Detailing", html };
}

/**
 * Email transport. Outbound email requires a verified sender domain; until one is
 * configured the enquiry is still stored and the reason is recorded on the record.
 * The customer's address is only ever used as Reply-To, never as the From address.
 */
async function sendEnquiryEmail(
  lead: LeadRow,
  photos: { path: string; url: string | null }[],
): Promise<{ sent: boolean; error?: string }> {
  const cfg = getNotifyConfig();
  if (!cfg.notifyEmail) return { sent: false, error: "notify_email_not_configured" };
  if (!cfg.senderDomain) return { sent: false, error: "email_sender_domain_not_configured" };

  const { subject, html } = buildEnquiryEmail(lead, photos);
  try {
    const res = await fetch("https://api.lovable.dev/v1/emails/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain: cfg.senderDomain,
        from: `Prestige Shine Website <enquiries@${cfg.senderDomain}>`,
        to: cfg.notifyEmail,
        reply_to: lead["email"] || undefined,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { sent: false, error: `email_api_${res.status}: ${body.slice(0, 300)}` };
    }
    return { sent: true };
  } catch (e: any) {
    return { sent: false, error: `email_exception: ${e?.message ?? "unknown"}` };
  }
}

/** Short SMS alert through the Twilio connector gateway. Credentials stay server-side. */
async function sendEnquirySms(): Promise<{ sent: boolean; error?: string }> {
  const cfg = getNotifyConfig();
  if (!cfg.notifySmsTo) return { sent: false, error: "notify_sms_to_not_configured" };
  if (!cfg.twilioApiKey || !cfg.lovableApiKey || !cfg.twilioFrom)
    return { sent: false, error: "sms_provider_not_configured" };

  try {
    const res = await fetch("https://connector-gateway.lovable.dev/twilio/Messages.json", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.lovableApiKey}`,
        "X-Connection-Api-Key": cfg.twilioApiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: cfg.notifySmsTo,
        From: cfg.twilioFrom,
        Body: SMS_TEXT,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { sent: false, error: `sms_api_${res.status}: ${body.slice(0, 300)}` };
    }
    return { sent: true };
  } catch (e: any) {
    return { sent: false, error: `sms_exception: ${e?.message ?? "unknown"}` };
  }
}

/**
 * Notify the studio about a stored enquiry. Idempotent: a record that already
 * has `notified_at` is skipped, so this endpoint cannot be used to spam.
 */
export async function notifyStoredEnquiry(leadId: string): Promise<NotifyResult> {
  const { data: lead, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();

  if (error) throw new Error("lookup_failed");
  if (!lead) throw new Error("enquiry_not_found");
  if ((lead as LeadRow)["notified_at"]) return { emailed: true, smsSent: true };

  const photos = await signPhotos(((lead as LeadRow)["photo_urls"] as string[]) ?? []);
  const [emailRes, smsRes] = await Promise.all([sendEnquiryEmail(lead as LeadRow, photos), sendEnquirySms()]);

  const errors = [emailRes.error, smsRes.error].filter(Boolean).join(" | ");
  if (errors) console.error(`[enquiry-notify] ${leadId}: ${errors}`);

  await supabaseAdmin
    .from("leads")
    .update({
      notified_at: emailRes.sent ? new Date().toISOString() : null,
      notify_error: errors || null,
    } as never)
    .eq("id", leadId);

  return {
    emailed: emailRes.sent,
    smsSent: smsRes.sent,
    ...(emailRes.error ? { emailError: emailRes.error } : {}),
    ...(smsRes.error ? { smsError: smsRes.error } : {}),
  };
}
