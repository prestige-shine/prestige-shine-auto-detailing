import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Fired by the qualification dialog right after the enquiry has been stored.
 * The stored enquiry is the source of truth - a notification failure here is
 * reported back but never invalidates the submission.
 */
export const notifyEnquirySubmitted = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { notifyStoredEnquiry } = await import("./notify.server");
    try {
      return await notifyStoredEnquiry(data.id);
    } catch (e: any) {
      console.error("[enquiry-notify] failed", e?.message);
      return { emailed: false, smsSent: false, emailError: "notify_failed" };
    }
  });
