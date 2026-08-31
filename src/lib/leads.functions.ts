import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error("Unauthorized");
  if (!data) throw new Error("Forbidden: admin only");
}

export const adminListLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  });

export const adminSignPhotoUrls = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ paths: z.array(z.string()).max(50) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const results = await Promise.all(
      data.paths.map(async (p) => {
        const { data: signed } = await context.supabase.storage
          .from("lead-photos")
          .createSignedUrl(p, 60 * 60);
        return { path: p, url: signed?.signedUrl ?? null };
      }),
    );
    return results;
  });

export const adminUpdateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({
      id: z.string().uuid(),
      status: z.enum(["new", "qualified", "quoted", "booked", "archived"]),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("leads")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: !!data, userId: context.userId };
  });

// Called after a lead is saved to record the EmailJS notification outcome.
// Updates only notified_at / notify_error on the existing row — never creates
// or deletes leads, so retries never duplicate records.
export const reportLeadNotification = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({
      id: z.string().uuid(),
      ok: z.boolean(),
      error: z.string().max(500).optional(),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const update = data.ok
      ? { notified_at: new Date().toISOString(), notify_error: null }
      : { notify_error: data.error ?? "EmailJS notification failed" };
    await supabaseAdmin.from("leads").update(update).eq("id", data.id);
    return { ok: true };
  });

// Signs time-limited URLs for a lead's own photos (bucket is private; anon
// cannot sign). Only signs paths already stored on that lead's row.
export const signLeadPhotos = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), paths: z.array(z.string()).max(20) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lead } = await supabaseAdmin
      .from("leads")
      .select("photo_urls")
      .eq("id", data.id)
      .single();
    const owned: string[] = lead?.photo_urls ?? [];
    const allowed = data.paths.filter((p) => owned.includes(p));
    const urls = await Promise.all(
      allowed.map(async (p) => {
        const { data: s } = await supabaseAdmin.storage
          .from("lead-photos")
          .createSignedUrl(p, 60 * 60 * 24 * 7);
        return s?.signedUrl ?? null;
      }),
    );
    return urls.filter((u): u is string => !!u);
  });