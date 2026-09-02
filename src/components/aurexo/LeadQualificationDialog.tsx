import { useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Phone,
  Mail,
  Car,
  Palette,
  Calendar as CalendarIcon,
  Clock,
  Upload,
  Trash2,
  Sparkles,
  Info,
  Loader2,
  Edit3,
} from "lucide-react";
import {
  submitLead,
  uploadLeadPhoto,
  SERVICE_OPTIONS,
  CONDITION_OPTIONS,
  TIMELINE_OPTIONS,
  TIME_SLOTS,
  type LeadSubmission,
} from "@/lib/leads";
import { sendLeadNotification } from "@/lib/emailjs";
import { reportLeadNotification, signLeadPhotos } from "@/lib/leads.functions";
import { calculateEstimate, formatPrice, VEHICLE_SIZES, PRICING_CONFIG, type VehicleSizeKey } from "@/lib/pricing";

type Props = {
  open: boolean;
  onClose: () => void;
  presetServiceKey?: string;
};

type FormState = {
  full_name: string;
  phone: string;
  email: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: string;
  vehicle_color: string;
  vehicle_size: VehicleSizeKey | "";
  services: string[];
  other_service: string;
  conditions: string[];
  condition_notes: string;
  photos: { path: string; previewUrl: string; name: string }[];
  preferred_date: string;
  preferred_time: string;
  timeline: string;
  schedule_flexible: "yes" | "no" | "";
};

const EMPTY: FormState = {
  full_name: "",
  phone: "",
  email: "",
  vehicle_make: "",
  vehicle_model: "",
  vehicle_year: "",
  vehicle_color: "",
  vehicle_size: "",
  services: [],
  other_service: "",
  conditions: [],
  condition_notes: "",
  photos: [],
  preferred_date: "",
  preferred_time: "",
  timeline: "",
  schedule_flexible: "",
};

const STEP_TITLES = [
  "Your details",
  "Vehicle info",
  "Services",
  "Vehicle condition",
  "Photos",
  "Scheduling",
  "Pricing info",
  "Review & submit",
  "Your estimate",
];

const BRAND = "#84CC16";
const BRAND_DARK = "#3f6212";

export function LeadQualificationDialog({ open, onClose, presetServiceKey }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { id: string }>(null);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset & apply presets on open
  useEffect(() => {
    if (open) {
      setStep(1);
      setSubmitted(null);
      setError(null);
      setForm({
        ...EMPTY,
        services: presetServiceKey ? [presetServiceKey] : [],
      });
    }
  }, [open, presetServiceKey]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const totalSteps = 9;
  const progressPct = (step / totalSteps) * 100;

  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return form.full_name.trim() && form.phone.trim() && /.+@.+\..+/.test(form.email);
      case 2:
        return form.vehicle_make.trim() && form.vehicle_model.trim() && form.vehicle_year.trim() && form.vehicle_size;
      case 3:
        return form.services.length > 0 && (!form.services.includes("other") || form.other_service.trim());
      case 4:
        return true;
      case 5:
        return uploadingCount === 0;
      case 6:
        return form.preferred_date && form.preferred_time && form.timeline && form.schedule_flexible;
      case 7:
        return true;
      case 8:
        return true;
      case 9:
        return true;
      default:
        return false;
    }
  }, [step, form, uploadingCount]);

  const toggleService = (key: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(key)
        ? f.services.filter((s) => s !== key)
        : [...f.services, key],
    }));
  };

  const toggleCondition = (label: string) => {
    setForm((f) => ({
      ...f,
      conditions: f.conditions.includes(label)
        ? f.conditions.filter((c) => c !== label)
        : [...f.conditions, label],
    }));
  };

  const handleFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (list.length === 0) return;
    setError(null);
    setUploadingCount((n) => n + list.length);
    for (const file of list) {
      try {
        const path = await uploadLeadPhoto(file);
        const previewUrl = URL.createObjectURL(file);
        setForm((f) => ({
          ...f,
          photos: [...f.photos, { path, previewUrl, name: file.name }],
        }));
      } catch (e: any) {
        setError(`Photo upload failed: ${e?.message ?? "unknown error"}`);
      } finally {
        setUploadingCount((n) => n - 1);
      }
    }
  };

  const removePhoto = (path: string) => {
    setForm((f) => ({ ...f, photos: f.photos.filter((p) => p.path !== path) }));
  };

  // Normalize empty/skipped values so EmailJS always receives a readable string.
  function sanitizeEmailValue(value: unknown): string {
    if (value === null || value === undefined) return "None";
    if (typeof value === "string" && value.trim() === "") return "None";
    if (Array.isArray(value) && value.length === 0) return "None";
    if (Array.isArray(value)) return value.join(", ");
    const asString = String(value).trim();
    return asString || "None";
  }

  const doSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const services = form.services.map(
        (k) => SERVICE_OPTIONS.find((s) => s.key === k)?.label ?? k,
      );
      const sizeLabel = form.vehicle_size
        ? (VEHICLE_SIZES.find((v) => v.key === form.vehicle_size)?.label ?? "")
        : "";
      const payload: LeadSubmission = {
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        vehicle_make: form.vehicle_make.trim() || null,
        vehicle_model: form.vehicle_model.trim() || null,
        vehicle_year: form.vehicle_year.trim() || null,
        vehicle_color: form.vehicle_color.trim() || null,
        services,
        other_service: form.services.includes("other") ? form.other_service.trim() : null,
        conditions: [...form.conditions],
        condition_notes:
          [
            form.vehicle_size
              ? `Vehicle size: ${VEHICLE_SIZES.find((v) => v.key === form.vehicle_size)?.label}`
              : "",
            form.condition_notes.trim(),
          ]
            .filter(Boolean)
            .join(" — ") || null,
        photo_urls: form.photos.map((p) => p.path),
        preferred_date: form.preferred_date || null,
        preferred_time: form.preferred_time || null,
        timeline: form.timeline || null,
        schedule_flexible: form.schedule_flexible === "" ? null : form.schedule_flexible === "yes",
        source: "lead-qualifier",
      };
      const result = await submitLead(payload);
      setSubmitted({ id: result.id });

      // Supabase save succeeded — now notify via EmailJS (never blocks success).
      void (async () => {
        // Time-limited signed URLs for the private lead-photos bucket (server-side).
        let signed: string[] = [];
        if (payload.photo_urls.length > 0) {
          signed = await signLeadPhotos({
            data: { id: result.id, paths: payload.photo_urls },
          }).catch(() => [] as string[]);
        }
        const res = await sendLeadNotification({
          customer_name: sanitizeEmailValue(payload.full_name),
          customer_phone: sanitizeEmailValue(payload.phone),
          customer_email: sanitizeEmailValue(payload.email),
          vehicle_make: sanitizeEmailValue(payload.vehicle_make),
          vehicle_model: sanitizeEmailValue(payload.vehicle_model),
          vehicle_year: sanitizeEmailValue(payload.vehicle_year),
          vehicle_colour: sanitizeEmailValue(payload.vehicle_color),
          requested_services: sanitizeEmailValue(payload.services),
          other_service: sanitizeEmailValue(payload.other_service),
          vehicle_condition: sanitizeEmailValue(payload.conditions),
          vehicle_size: sanitizeEmailValue(sizeLabel),
          preferred_date: sanitizeEmailValue(payload.preferred_date),
          preferred_time: sanitizeEmailValue(payload.preferred_time),
          timeline: sanitizeEmailValue(payload.timeline),
          schedule_flexible: sanitizeEmailValue(
            payload.schedule_flexible === null || payload.schedule_flexible === undefined
              ? "None"
              : payload.schedule_flexible
                ? "Yes"
                : "No",
          ),
          photo_url: sanitizeEmailValue(signed),
          lead_id: sanitizeEmailValue(result.id),
          source_name: "lead-qualifier",
        });
        reportLeadNotification({
          data: { id: result.id, ok: res.sent, error: res.error },
        }).catch(() => {});
      })();
    } catch (e: any) {
      setError(e?.message ?? "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a detailing service"
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-[92vh] sm:max-w-3xl sm:rounded-[32px]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div
              className="grid h-8 w-8 place-items-center rounded-full"
              style={{ backgroundColor: BRAND }}
            >
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND_DARK }}>
                Prestige Shine
              </p>
              <p className="text-[11px] text-muted-foreground">Vehicle assessment</p>
            </div>
          </div>
          <button
            onClick={() => !submitting && onClose()}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress */}
        {!submitted && (
          <div className="px-4 pt-4 sm:px-8">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold" style={{ color: BRAND_DARK }}>
                Step {step} of {totalSteps}
              </span>
              <span className="text-muted-foreground">{STEP_TITLES[step - 1]}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%`, backgroundColor: BRAND }}
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
          {submitted ? (
            <SuccessView onClose={onClose} />
          ) : (
            <div key={step} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {step === 1 && <StepCustomer form={form} setForm={setForm} />}
              {step === 2 && <StepVehicle form={form} setForm={setForm} />}
              {step === 3 && (
                <StepServices form={form} setForm={setForm} toggleService={toggleService} />
              )}
              {step === 4 && (
                <StepCondition
                  form={form}
                  setForm={setForm}
                  toggleCondition={toggleCondition}
                />
              )}
              {step === 5 && (
                <StepPhotos
                  form={form}
                  removePhoto={removePhoto}
                  handleFiles={handleFiles}
                  uploadingCount={uploadingCount}
                  fileInputRef={fileInputRef}
                />
              )}
              {step === 6 && <StepScheduling form={form} setForm={setForm} />}
              {step === 7 && <StepPricing />}
              {step === 8 && <StepReview form={form} goTo={setStep} />}
              {step === 9 && (
                <StepEstimate
                  form={form}
                  submitting={submitting}
                  onSubmit={doSubmit}
                  onEdit={() => setStep(1)}
                />
              )}
            </div>
          )}

          {error && !submitted && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
        </div>

        {/* Footer nav */}
        {!submitted && step !== totalSteps && (
          <div className="flex items-center justify-between gap-3 border-t border-black/5 bg-white px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1 || submitting}
              className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
                type="button"
                disabled={!canProceed}
                onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition disabled:opacity-40"
                style={{ backgroundColor: BRAND }}
              >
                {uploadingCount > 0 && step === 5 ? "Uploading…" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Step components ---------------- */

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND_DARK }}>
        {eyebrow}
      </p>
      <h3 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">{title}</h3>
      {sub && <p className="mt-2 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/70">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition focus:border-[color:var(--brand-dark)] focus:ring-2 focus:ring-[color:var(--brand)]/20";

function StepCustomer({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div style={{ ["--brand" as any]: BRAND, ["--brand-dark" as any]: BRAND_DARK }}>
      <SectionHead
        eyebrow="Customer Information"
        title="Let's start with you"
        sub="We'll use this to send your personalized estimate and confirm your appointment."
      />
      <div className="grid gap-4">
        <Field icon={<User className="h-3.5 w-3.5" />} label="Full Name">
          <input
            className={inputClass}
            placeholder="Jane Ahmed"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
        </Field>
        <Field icon={<Phone className="h-3.5 w-3.5" />} label="Phone Number">
          <input
            type="tel"
            className={inputClass}
            placeholder="+92 300 0000000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>
        <Field icon={<Mail className="h-3.5 w-3.5" />} label="Email Address">
          <input
            type="email"
            className={inputClass}
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}

function StepVehicle({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div style={{ ["--brand" as any]: BRAND, ["--brand-dark" as any]: BRAND_DARK }}>
      <SectionHead
        eyebrow="Vehicle Information"
        title="Tell us about your vehicle"
        sub="This helps us match the right products and time estimate."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field icon={<Car className="h-3.5 w-3.5" />} label="Make">
          <input
            className={inputClass}
            placeholder="Toyota"
            value={form.vehicle_make}
            onChange={(e) => setForm({ ...form, vehicle_make: e.target.value })}
          />
        </Field>
        <Field icon={<Car className="h-3.5 w-3.5" />} label="Model">
          <input
            className={inputClass}
            placeholder="Corolla"
            value={form.vehicle_model}
            onChange={(e) => setForm({ ...form, vehicle_model: e.target.value })}
          />
        </Field>
        <Field icon={<CalendarIcon className="h-3.5 w-3.5" />} label="Year">
          <input
            className={inputClass}
            placeholder="2022"
            value={form.vehicle_year}
            onChange={(e) => setForm({ ...form, vehicle_year: e.target.value })}
          />
        </Field>
        <Field icon={<Palette className="h-3.5 w-3.5" />} label="Color">
          <input
            className={inputClass}
            placeholder="Pearl White"
            value={form.vehicle_color}
            onChange={(e) => setForm({ ...form, vehicle_color: e.target.value })}
          />
        </Field>
      </div>
      <div className="mt-6">
        <Field icon={<Car className="h-3.5 w-3.5" />} label="Vehicle Size">
          <select
            className={inputClass}
            value={form.vehicle_size}
            onChange={(e) => setForm({ ...form, vehicle_size: e.target.value as VehicleSizeKey })}
          >
            <option value="">Select your vehicle size…</option>
            {VEHICLE_SIZES.map((v) => (
              <option key={v.key} value={v.key}>
                {v.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="mt-4 rounded-2xl border border-black/10 bg-black/[0.02] p-4">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND_DARK }}>
            Vehicle Size Guide
          </p>
          <ul className="mt-2 space-y-1.5">
            {VEHICLE_SIZES.map((v) => (
              <li key={v.key} className="text-xs text-ink/70">
                <span className="font-bold text-ink">{v.label}:</span> {v.examples}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-muted-foreground">{PRICING_CONFIG.notes.fullDetail}</p>
        </div>
      </div>
    </div>
  );
}

function StepServices({
  form,
  setForm,
  toggleService,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
  toggleService: (k: string) => void;
}) {
  return (
    <div>
      <SectionHead
        eyebrow="Service Selection"
        title="What are you interested in?"
        sub="Pick one or more. You can add specifics in the next steps."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {SERVICE_OPTIONS.map((s) => {
          const selected = form.services.includes(s.key);
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => toggleService(s.key)}
              className="group relative flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition"
              style={{
                borderColor: selected ? BRAND : "rgba(0,0,0,0.08)",
                background: selected ? "rgba(132,204,22,0.06)" : "white",
              }}
            >
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                style={{
                  backgroundColor: selected ? BRAND : "rgba(0,0,0,0.04)",
                  color: selected ? "white" : BRAND_DARK,
                }}
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">{s.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
              </div>
              {selected && (
                <div
                  className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full"
                  style={{ backgroundColor: BRAND }}
                >
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {form.services.includes("other") && (
        <div className="mt-4">
          <Field label="Tell us what you need">
            <input
              className={inputClass}
              placeholder="e.g. Odor removal, window tinting..."
              value={form.other_service}
              onChange={(e) => setForm({ ...form, other_service: e.target.value })}
            />
          </Field>
        </div>
      )}
    </div>
  );
}

function StepCondition({
  form,
  setForm,
  toggleCondition,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
  toggleCondition: (c: string) => void;
}) {
  return (
    <div>
      <SectionHead
        eyebrow="Vehicle Condition"
        title="Tell us about your vehicle"
        sub="Select anything that applies — this helps us prepare and price accurately."
      />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {CONDITION_OPTIONS.map((c) => {
          const selected = form.conditions.includes(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => toggleCondition(c)}
              className="flex items-center justify-between rounded-2xl border-2 px-3.5 py-3 text-left text-xs font-semibold transition sm:text-sm"
              style={{
                borderColor: selected ? BRAND : "rgba(0,0,0,0.08)",
                background: selected ? "rgba(132,204,22,0.08)" : "white",
                color: selected ? BRAND_DARK : "#0b0f17",
              }}
            >
              <span>{c}</span>
              <span
                className="ml-2 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2"
                style={{
                  borderColor: selected ? BRAND : "rgba(0,0,0,0.15)",
                  backgroundColor: selected ? BRAND : "transparent",
                }}
              >
                {selected && <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-6">
        <Field label="Anything else you'd like us to know about your vehicle?">
          <textarea
            rows={4}
            className={inputClass}
            placeholder="Optional — problem areas, allergies, previous coatings, timeline sensitivity..."
            value={form.condition_notes}
            onChange={(e) => setForm({ ...form, condition_notes: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}

const RECOMMENDED_PHOTOS = [
  "Front of Vehicle",
  "Rear of Vehicle",
  "Driver Seat",
  "Passenger Seat",
  "Rear Seats",
  "Carpets",
  "Dashboard",
  "Any Problem Areas",
];

function StepPhotos({
  form,
  removePhoto,
  handleFiles,
  uploadingCount,
  fileInputRef,
}: {
  form: FormState;
  removePhoto: (p: string) => void;
  handleFiles: (f: FileList | File[]) => void;
  uploadingCount: number;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [dragOver, setDragOver] = useState(false);
  return (
    <div>
      <SectionHead
        eyebrow="Photo Upload"
        title="Upload photos of your vehicle"
        sub="Uploading photos helps us provide a faster and more accurate estimate."
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        className="rounded-3xl border-2 border-dashed p-8 text-center transition"
        style={{
          borderColor: dragOver ? BRAND : "rgba(0,0,0,0.15)",
          background: dragOver ? "rgba(132,204,22,0.06)" : "rgba(0,0,0,0.02)",
        }}
      >
        <div
          className="mx-auto grid h-14 w-14 place-items-center rounded-2xl"
          style={{ backgroundColor: BRAND }}
        >
          <Upload className="h-6 w-6 text-white" />
        </div>
        <p className="mt-4 text-base font-bold text-ink">Drag & drop photos here</p>
        <p className="mt-1 text-xs text-muted-foreground">or</p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: BRAND_DARK }}
        >
          Choose files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <p className="mt-3 text-[11px] text-muted-foreground">JPG or PNG · Up to 20MB each</p>
      </div>

      <div className="mt-4 rounded-2xl bg-black/[0.02] p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-ink/70">Recommended photos</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {RECOMMENDED_PHOTOS.map((p) => (
            <span
              key={p}
              className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-ink/70"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {(form.photos.length > 0 || uploadingCount > 0) && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink/70">
            Uploaded ({form.photos.length})
            {uploadingCount > 0 && <span className="ml-2 text-muted-foreground">· {uploadingCount} uploading…</span>}
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {form.photos.map((p) => (
              <div key={p.path} className="group relative aspect-square overflow-hidden rounded-xl border border-black/10">
                <img src={p.previewUrl} alt={p.name} className="h-full w-full object-cover" />
                <button
                  onClick={() => removePhoto(p.path)}
                  aria-label="Remove"
                  className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {uploadingCount > 0 &&
              Array.from({ length: uploadingCount }).map((_, i) => (
                <div
                  key={`up-${i}`}
                  className="grid aspect-square place-items-center rounded-xl border border-dashed border-black/15 bg-black/[0.02]"
                >
                  <Loader2 className="h-5 w-5 animate-spin text-ink/40" />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StepScheduling({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div style={{ ["--brand" as any]: BRAND, ["--brand-dark" as any]: BRAND_DARK }}>
      <SectionHead eyebrow="Scheduling" title="When would you like it done?" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field icon={<CalendarIcon className="h-3.5 w-3.5" />} label="Preferred Date">
          <input
            type="date"
            min={today}
            className={inputClass}
            value={form.preferred_date}
            onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
          />
        </Field>
        <Field icon={<Clock className="h-3.5 w-3.5" />} label="Preferred Time">
          <select
            className={inputClass}
            value={form.preferred_time}
            onChange={(e) => setForm({ ...form, preferred_time: e.target.value })}
          >
            <option value="">Select a time…</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink/70">
          How soon are you looking to have your vehicle detailed?
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {TIMELINE_OPTIONS.map((t) => {
            const selected = form.timeline === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setForm({ ...form, timeline: t })}
                className="rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition"
                style={{
                  borderColor: selected ? BRAND : "rgba(0,0,0,0.08)",
                  background: selected ? "rgba(132,204,22,0.08)" : "white",
                  color: selected ? BRAND_DARK : "#0b0f17",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink/70">
          Is your schedule flexible?
        </p>
        <div className="flex gap-2">
          {(["yes", "no"] as const).map((v) => {
            const selected = form.schedule_flexible === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => setForm({ ...form, schedule_flexible: v })}
                className="flex-1 rounded-2xl border-2 px-4 py-3 text-sm font-bold uppercase tracking-wider transition"
                style={{
                  borderColor: selected ? BRAND : "rgba(0,0,0,0.08)",
                  background: selected ? BRAND : "white",
                  color: selected ? "white" : BRAND_DARK,
                }}
              >
                {v}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepPricing() {
  return (
    <div>
      <SectionHead eyebrow="Important" title="A quick note on pricing" />
      <div
        className="rounded-3xl border-2 p-6"
        style={{
          borderColor: BRAND,
          background:
            "linear-gradient(135deg, rgba(132,204,22,0.08), rgba(132,204,22,0.02))",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
            style={{ backgroundColor: BRAND }}
          >
            <Info className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-ink">Prices shown are starting estimates only.</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              {PRICING_CONFIG.notes.estimate} Excessive pet hair, staining, heavy soiling, or unusually neglected
              vehicles may cost more. Paint enhancement and correction pricing also depends on paint condition, so a
              photo assessment or in-person inspection may be required.
            </p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        By continuing you agree to be contacted by our team about your enquiry.
      </p>
    </div>
  );
}

function StepReview({ form, goTo }: { form: FormState; goTo: (n: number) => void }) {
  const rows: { title: string; step: number; content: React.ReactNode }[] = [
    {
      title: "Customer",
      step: 1,
      content: (
        <>
          <p>{form.full_name}</p>
          <p className="text-xs text-muted-foreground">{form.phone} · {form.email}</p>
        </>
      ),
    },
    {
      title: "Vehicle",
      step: 2,
      content: (
        <>
          <p>
            {[form.vehicle_year, form.vehicle_color, form.vehicle_make, form.vehicle_model].filter(Boolean).join(" · ") || "—"}
          </p>
          <p className="text-xs text-muted-foreground">
            Size: {VEHICLE_SIZES.find((v) => v.key === form.vehicle_size)?.label ?? "—"}
          </p>
        </>
      ),
    },
    {
      title: "Services",
      step: 3,
      content: (
        <p>
          {form.services
            .map((k) => SERVICE_OPTIONS.find((s) => s.key === k)?.label ?? k)
            .join(", ") || "—"}
          {form.services.includes("other") && form.other_service && (
            <span className="block text-xs text-muted-foreground">Other: {form.other_service}</span>
          )}
        </p>
      ),
    },
    {
      title: "Condition",
      step: 4,
      content: (
        <>
          <p>{form.conditions.join(", ") || "None reported"}</p>
          {form.condition_notes && <p className="mt-1 text-xs text-muted-foreground">{form.condition_notes}</p>}
        </>
      ),
    },
    {
      title: "Photos",
      step: 5,
      content: <p>{form.photos.length} uploaded</p>,
    },
    {
      title: "Scheduling",
      step: 6,
      content: (
        <>
          <p>{form.preferred_date} · {form.preferred_time}</p>
          <p className="text-xs text-muted-foreground">
            Timeline: {form.timeline || "—"} · Flexible: {form.schedule_flexible || "—"}
          </p>
        </>
      ),
    },
  ];
  return (
    <div>
      <SectionHead
        eyebrow="Review"
        title="Everything look right?"
        sub="Tap any section to edit before you submit."
      />
      <div className="divide-y divide-black/5 overflow-hidden rounded-3xl border border-black/10">
        {rows.map((r) => (
          <button
            key={r.title}
            type="button"
            onClick={() => goTo(r.step)}
            className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition hover:bg-black/[0.02] sm:px-5"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-ink/60">{r.title}</p>
              <div className="mt-1 text-sm text-ink">{r.content}</div>
            </div>
            <Edit3 className="h-4 w-4 shrink-0 text-ink/40" />
          </button>
        ))}
      </div>
    </div>
  );
}

function StepEstimate({
  form,
  submitting,
  onSubmit,
  onEdit,
}: {
  form: FormState;
  submitting: boolean;
  onSubmit: () => void;
  onEdit: () => void;
}) {
  const est = calculateEstimate({
    vehicleSize: form.vehicle_size || null,
    services: form.services,
    conditions: form.conditions,
  });

  return (
    <div>
      <SectionHead
        eyebrow="Estimate"
        title="Your Estimated Starting Price"
        sub={`${est.serviceLabel} · ${est.vehicleSizeLabel}`}
      />

      <div
        className="rounded-3xl border-2 p-6 text-center"
        style={{
          borderColor: BRAND,
          background: "linear-gradient(135deg, rgba(132,204,22,0.10), rgba(132,204,22,0.02))",
        }}
      >
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND_DARK }}>
          {est.isRange ? "Estimated Price Range" : "Estimated Starting Price"}
        </p>
        <p className="mt-2 text-4xl font-extrabold text-ink sm:text-5xl">
          {est.isRange ? `${formatPrice(est.low)} – ${formatPrice(est.high)}` : formatPrice(est.low)}
        </p>
        <div className="mx-auto mt-5 max-w-sm space-y-1 text-left">
          {est.breakdown.map((b) => (
            <div key={b.label} className="flex items-center justify-between text-xs text-ink/70">
              <span>{b.label}</span>
              <span className="font-bold text-ink">{formatPrice(b.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        This estimate is based on the information you've provided. Your final quote will be confirmed after
        reviewing your uploaded vehicle photos and your vehicle's overall condition.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {PRICING_CONFIG.notes.estimate}
      </p>

      <div className="mt-5 grid gap-2">
        {[
          "No obligation",
          "Personally reviewed by Prestige Shine Auto Detailing",
          "Final quote confirmed before any work begins",
        ].map((t) => (
          <div key={t} className="flex items-center gap-2 text-sm text-ink">
            <span
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
              style={{ backgroundColor: BRAND }}
            >
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </span>
            {t}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-black/10 bg-black/[0.02] p-6 text-center">
        <h4 className="text-lg font-extrabold text-ink">Happy with your estimated starting price?</h4>
        <p className="mt-2 text-sm text-muted-foreground">
          Submit your request and we'll personally review everything before confirming your final quote.
        </p>
        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            disabled={submitting}
            onClick={onSubmit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold text-white shadow-lg transition disabled:opacity-60 sm:w-auto"
            style={{ backgroundColor: BRAND }}
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {submitting ? "Submitting…" : "Continue & Request My Estimate"}
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={onEdit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-bold text-ink transition hover:bg-black/[0.03] disabled:opacity-60 sm:w-auto"
          >
            <Edit3 className="h-4 w-4" /> Edit My Information
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div
        className="grid h-24 w-24 place-items-center rounded-full"
        style={{ backgroundColor: "rgba(132,204,22,0.15)" }}
      >
        <div
          className="grid h-16 w-16 place-items-center rounded-full"
          style={{ backgroundColor: BRAND }}
        >
          <Check className="h-9 w-9 text-white" strokeWidth={3} />
        </div>
      </div>
      <h3 className="mt-6 text-3xl font-extrabold text-ink">Thank you!</h3>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Your assessment has been sent to our detailing team. We'll review your photos and details, and get back to
        you with a personalized estimate within a few hours.
      </p>
      <div className="mt-8 rounded-2xl bg-black/[0.03] px-6 py-4 text-xs text-ink/70">
        A confirmation will also be sent to your email and phone.
      </div>
      <button
        onClick={onClose}
        className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition"
        style={{ backgroundColor: BRAND }}
      >
        Done
      </button>
    </div>
  );
}