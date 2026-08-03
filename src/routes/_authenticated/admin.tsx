import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  LogOut,
  Mail,
  Phone,
  Car,
  Calendar,
  Clock,
  MessageSquare,
  Camera,
  ShieldAlert,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  adminListLeads,
  adminSignPhotoUrls,
  adminUpdateLeadStatus,
  checkIsAdmin,
} from "@/lib/leads.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{ title: "Leads — Prestige Shine Admin" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLeads,
});

type Lead = any;

const STATUSES = ["new", "qualified", "quoted", "booked", "archived"] as const;
const STATUS_COLORS: Record<string, string> = {
  new: "#84CC16",
  qualified: "#0ea5e9",
  quoted: "#f59e0b",
  booked: "#22c55e",
  archived: "#64748b",
};

function AdminLeads() {
  const navigate = useNavigate();
  const check = useServerFn(checkIsAdmin);
  const list = useServerFn(adminListLeads);
  const sign = useServerFn(adminSignPhotoUrls);
  const updateStatus = useServerFn(adminUpdateLeadStatus);
  const qc = useQueryClient();

  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => check() });
  const leadsQ = useQuery({
    queryKey: ["admin-leads"],
    queryFn: () => list(),
    enabled: adminQ.data?.isAdmin === true,
  });

  const [selected, setSelected] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const rows: Lead[] = leadsQ.data ?? [];
    if (filter === "all") return rows;
    return rows.filter((r) => r.status === filter);
  }, [leadsQ.data, filter]);

  const statusMut = useMutation({
    mutationFn: (v: { id: string; status: (typeof STATUSES)[number] }) =>
      updateStatus({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-leads"] }),
  });

  if (adminQ.isLoading) {
    return (
      <main className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-ink/40" />
      </main>
    );
  }

  if (!adminQ.data?.isAdmin) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="grid h-14 w-14 mx-auto place-items-center rounded-full bg-amber-100 text-amber-700">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold text-ink">You're signed in — but not an admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ask an existing admin (or the site owner) to grant your account the <code className="rounded bg-black/5 px-1">admin</code> role
          in the database (<code className="rounded bg-black/5 px-1">public.user_roles</code>) using your user id:
        </p>
        <p className="mt-3 rounded-xl bg-black/[0.03] px-4 py-3 text-xs font-mono text-ink/80">
          {adminQ.data?.userId}
        </p>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-semibold"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Lead enquiries</h1>
          <p className="text-sm text-muted-foreground">
            {leadsQ.data?.length ?? 0} total · Review, qualify, and follow up.
          </p>
        </div>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition"
            style={{
              borderColor: filter === s ? "#0b0f17" : "rgba(0,0,0,0.1)",
              background: filter === s ? "#0b0f17" : "white",
              color: filter === s ? "white" : "#0b0f17",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {leadsQ.isLoading ? (
        <div className="grid place-items-center py-20"><Loader2 className="h-6 w-6 animate-spin text-ink/40" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No enquiries in this view yet.
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelected(l)}
              className="grid gap-2 rounded-2xl border border-border bg-white p-4 text-left transition hover:border-ink sm:grid-cols-[1.5fr_1fr_1fr_120px] sm:items-center"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink">{l.full_name}</p>
                <p className="truncate text-xs text-muted-foreground">{l.phone} · {l.email}</p>
              </div>
              <p className="truncate text-xs text-ink/80">
                {[l.vehicle_year, l.vehicle_make, l.vehicle_model].filter(Boolean).join(" ")}
              </p>
              <p className="truncate text-xs text-ink/80">{(l.services ?? []).slice(0, 2).join(", ")}</p>
              <div className="flex items-center gap-2 justify-self-end">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white"
                  style={{ backgroundColor: STATUS_COLORS[l.status] ?? "#64748b" }}
                >
                  {l.status}
                </span>
                {(l.photo_urls?.length ?? 0) > 0 && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                    <Camera className="h-3 w-3" /> {l.photo_urls.length}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <LeadDetail
          lead={selected}
          onClose={() => setSelected(null)}
          sign={sign}
          onStatus={(status) => statusMut.mutate({ id: selected.id, status })}
        />
      )}
    </main>
  );
}

function LeadDetail({
  lead,
  onClose,
  sign,
  onStatus,
}: {
  lead: Lead;
  onClose: () => void;
  sign: (a: any) => Promise<any>;
  onStatus: (s: (typeof STATUSES)[number]) => void;
}) {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!lead.photo_urls?.length) return;
    sign({ data: { paths: lead.photo_urls } }).then((rows: any[]) => {
      setPhotoUrls(rows.map((r) => r.url).filter(Boolean));
    });
  }, [lead.id]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-stretch justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-[90vh] sm:max-w-3xl sm:rounded-[32px]">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Enquiry</p>
            <h2 className="text-xl font-extrabold text-ink">{lead.full_name}</h2>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-border">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => onStatus(s)}
                className="rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider transition"
                style={{
                  borderColor: lead.status === s ? STATUS_COLORS[s] : "rgba(0,0,0,0.1)",
                  background: lead.status === s ? STATUS_COLORS[s] : "white",
                  color: lead.status === s ? "white" : "#0b0f17",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <Section title="Customer Information">
            <Row icon={<Mail className="h-4 w-4" />}>{lead.email}</Row>
            <Row icon={<Phone className="h-4 w-4" />}>
              <a className="underline" href={`tel:${lead.phone}`}>{lead.phone}</a>
              {" · "}
              <a className="underline" href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp</a>
            </Row>
          </Section>

          <Section title="Vehicle Information">
            <Row icon={<Car className="h-4 w-4" />}>
              {[lead.vehicle_year, lead.vehicle_color, lead.vehicle_make, lead.vehicle_model].filter(Boolean).join(" · ") || "—"}
            </Row>
          </Section>

          <Section title="Selected Services">
            <p>{(lead.services ?? []).join(", ") || "—"}</p>
            {lead.other_service && <p className="mt-1 text-xs text-muted-foreground">Other: {lead.other_service}</p>}
          </Section>

          <Section title="Vehicle Condition">
            <p>{(lead.conditions ?? []).join(", ") || "None reported"}</p>
            {lead.condition_notes && (
              <div className="mt-2 flex items-start gap-2 rounded-xl bg-black/[0.03] p-3 text-xs">
                <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/50" />
                <span>{lead.condition_notes}</span>
              </div>
            )}
          </Section>

          <Section title={`Uploaded Photos (${lead.photo_urls?.length ?? 0})`}>
            {lead.photo_urls?.length ? (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {photoUrls.map((u, i) => (
                  <a key={i} href={u} target="_blank" rel="noreferrer" className="aspect-square overflow-hidden rounded-xl border border-border">
                    <img src={u} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                  </a>
                ))}
                {photoUrls.length === 0 && <p className="text-xs text-muted-foreground col-span-full">Loading photos…</p>}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">None uploaded.</p>
            )}
          </Section>

          <Section title="Preferred Appointment">
            <Row icon={<Calendar className="h-4 w-4" />}>{lead.preferred_date || "—"}</Row>
            <Row icon={<Clock className="h-4 w-4" />}>{lead.preferred_time || "—"}</Row>
          </Section>

          <Section title="Timeline">
            <p>{lead.timeline || "—"}</p>
            <p className="text-xs text-muted-foreground">Flexible: {lead.schedule_flexible === true ? "Yes" : lead.schedule_flexible === false ? "No" : "—"}</p>
          </Section>

          <p className="text-[11px] text-muted-foreground">Submitted {new Date(lead.created_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-extrabold uppercase tracking-widest text-ink/50">{title}</p>
      <div className="rounded-2xl border border-border bg-white p-4 text-sm text-ink space-y-1">{children}</div>
    </div>
  );
}

function Row({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {icon && <span className="text-ink/50">{icon}</span>}
      <span>{children}</span>
    </div>
  );
}