import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Loader2, Lock, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type OAuthResult = { data?: { redirect_url?: string; redirect_to?: string }; error?: { message: string } | null };
type OAuthDetails = {
  client?: { name?: string };
  redirect_url?: string;
  redirect_to?: string;
};

function oauthApi() {
  return (supabase.auth as typeof supabase.auth & {
    oauth: {
      getAuthorizationDetails: (id: string) => Promise<{ data: OAuthDetails | null; error: Error | null }>;
      approveAuthorization: (id: string) => Promise<OAuthResult>;
      denyAuthorization: (id: string) => Promise<OAuthResult>;
    };
  }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    authorization_id: typeof search.authorization_id === "string" ? search.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization request");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({
        to: "/auth",
        search: { redirect: `${location.pathname}${location.searchStr}` },
      });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id");
    if (!authorizationId) throw new Error("Missing authorization request");
    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  head: () => ({
    meta: [
      { title: "Connect an Agent — Prestige Shine" },
      { name: "description", content: "Authorize an agent integration for Prestige Shine Auto Detailing." },
      { property: "og:title", content: "Connect an Agent — Prestige Shine" },
      { property: "og:description", content: "Authorize a secure Prestige Shine agent integration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConsentPage,
  errorComponent: ({ error }) => (
    <main className="grid min-h-[75vh] place-items-center bg-surface px-4">
      <div className="max-w-md rounded-2xl border border-border bg-card p-7 text-center">
        <h1 className="text-xl font-extrabold text-ink">This connection request could not be loaded</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error instanceof Error ? error.message : String(error)}</p>
      </div>
    </main>
  ),
});

function ConsentPage() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState<"approve" | "deny" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "an external agent";

  async function decide(approve: boolean) {
    setBusy(approve ? "approve" : "deny");
    setError(null);
    const result = approve
      ? await oauthApi().approveAuthorization(authorization_id)
      : await oauthApi().denyAuthorization(authorization_id);
    if (result.error) {
      setBusy(null);
      setError(result.error.message);
      return;
    }
    const target = result.data?.redirect_url ?? result.data?.redirect_to;
    if (!target) {
      setBusy(null);
      setError("The authorization service did not return a destination.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="grid min-h-[80vh] place-items-center bg-surface px-4 py-16">
      <section className="w-full max-w-lg rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-9">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-brand-foreground">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-ink">Connect {clientName}?</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This lets the agent act through your Prestige Shine administrator account. Existing database permissions still apply.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-ink">
          <li className="flex gap-3"><Check className="mt-0.5 h-4 w-4 text-brand" /> Review customer lead enquiries</li>
          <li className="flex gap-3"><Check className="mt-0.5 h-4 w-4 text-brand" /> Update lead workflow statuses</li>
        </ul>
        {error ? <p role="alert" className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => decide(true)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-brand-foreground disabled:opacity-60"
          >
            {busy === "approve" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Approve
          </button>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => decide(false)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-bold text-ink disabled:opacity-60"
          >
            {busy === "deny" ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />} Deny
          </button>
        </div>
      </section>
    </main>
  );
}