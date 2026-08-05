import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { requireAdmin } from "../supabase";

const statuses = ["new", "qualified", "quoted", "booked", "archived"] as const;

export default defineTool({
  name: "list_leads",
  title: "List lead enquiries",
  description: "List recent Prestige Shine customer enquiries for the signed-in administrator.",
  inputSchema: {
    status: z.enum(statuses).optional().describe("Optional lead status filter."),
    limit: z.number().int().min(1).max(100).optional().describe("Maximum rows to return; defaults to 25."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    try {
      const client = await requireAdmin(ctx);
      let query = client
        .from("leads")
        .select("id,created_at,status,full_name,phone,email,vehicle_make,vehicle_model,vehicle_year,services,conditions,preferred_date,preferred_time,timeline")
        .order("created_at", { ascending: false })
        .limit(limit ?? 25);
      if (status) query = query.eq("status", status);
      const { data, error } = await query;
      if (error) throw error;
      const items = data ?? [];
      return {
        content: [{ type: "text", text: JSON.stringify({ count: items.length, items }) }],
        structuredContent: { count: items.length, items },
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: error instanceof Error ? error.message : "Unable to list enquiries" }],
        isError: true,
      };
    }
  },
});