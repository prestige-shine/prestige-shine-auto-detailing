import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listLeadsTool from "./tools/list-leads";
import updateLeadStatusTool from "./tools/update-lead-status";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "prestige-shine-auto-detailing",
  title: "Prestige Shine Auto Detailing",
  version: "0.1.0",
  instructions: "Admin tools for reviewing Prestige Shine customer enquiries and managing their workflow status.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listLeadsTool, updateLeadStatusTool],
});