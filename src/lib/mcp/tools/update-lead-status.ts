import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { requireAdmin } from "../supabase";

const statuses = ["new", "qualified", "quoted", "booked", "archived"] as const;

export default defineTool({
  name: "update_lead_status",
  title: "Update lead status",
  description: "Change the workflow status of one Prestige Shine lead as the signed-in administrator.",
  inputSchema: {
    leadId: z.string().uuid().describe("The lead UUID."),
    status: z.enum(statuses).describe("The new workflow status."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ leadId, status }, ctx) => {
    try {
      const client = await requireAdmin(ctx);
      const { data, error } = await client
        .from("leads")
        .update({ status })
        .eq("id", leadId)
        .select("id,status")
        .single();
      if (error) throw error;
      return {
        content: [{ type: "text", text: `Lead ${data.id} is now ${data.status}.` }],
        structuredContent: { lead: data },
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: error instanceof Error ? error.message : "Unable to update the lead" }],
        isError: true,
      };
    }
  },
});