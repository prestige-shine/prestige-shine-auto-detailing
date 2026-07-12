import { useMemo, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

const SERVICE_NAME = "Premium Detailing Session";
const SERVICE_DURATION = "90 min";
const TIME_SLOTS = ["8:00 AM", "9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM"];
const SERVICE_TYPES = [
  "Express Exterior Maintenance",
  "Full Interior Deep Clean & Extraction",
  "Premium 9H Ceramic Coating",
  "Paint Correction",
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

type Step = 1 | 2 | 3 | 4;

export function BookingWidget() {
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", service: SERVICE_TYPES[0], phone: "" });

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [viewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const calendarCells = useMemo(() => {
    const firstDow = viewMonth.getDay();
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewMonth]);

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : "";

  const reset = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: "", email: "", service: SERVICE_TYPES[0], phone: "" });
  };

  const brand = "#84CC16";

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <div className="text-center mb-8">
        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: brand }}>Book Now</p>
        <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Schedule Your Appointment</h2>
        <p className="mt-2 text-sm text-muted-foreground">Pick a date and time — we'll handle the rest.</p>
      </div>

      <div
        className="overflow-hidden rounded-[36px] shadow-2xl"
        style={{ backgroundColor: brand, color: "#fff" }}
      >
        {/* Dynamic Header */}
        {step !== 4 && (
          <div className="flex items-center justify-between px-6 py-5 min-h-[64px]">
            {step === 1 ? (
              <>
                <div className="w-16" />
                <p className="text-sm font-semibold tracking-wide text-center flex-1">
                  Hi there — let's get you booked
                </p>
                <div className="w-16" />
              </>
            ) : (
              <>
                <button
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className="inline-flex items-center gap-1 text-xs font-bold tracking-wide text-white/90 hover:text-white transition"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> BACK
                </button>
                <p className="text-sm font-semibold text-center flex-1">
                  {dateLabel}
                  {selectedTime && step === 3 ? ` · ${selectedTime}` : ""}
                </p>
                <div className="w-16" />
              </>
            )}
          </div>
        )}

        {/* Service Badge */}
        {step !== 4 && (
          <div className="mx-6 mb-6 flex items-center justify-between rounded-2xl border border-white/40 bg-white/5 px-5 py-3">
            <span className="text-sm font-semibold">{SERVICE_NAME}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-white/90">{SERVICE_DURATION}</span>
          </div>
        )}

        {/* Body */}
        <div className="px-6 pb-8">
          {step === 1 && (
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="mb-4 text-center text-base font-bold">
                {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </p>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-white/70">
                {DOW.map((d) => <div key={d} className="py-1">{d}</div>)}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {calendarCells.map((cell, i) => {
                  if (!cell) return <div key={i} className="aspect-square" />;
                  const isPast = cell < today;
                  return (
                    <button
                      key={i}
                      disabled={isPast}
                      onClick={() => { setSelectedDate(cell); setStep(2); }}
                      className={`aspect-square rounded-full text-sm font-semibold transition ${
                        isPast
                          ? "text-white/25 cursor-not-allowed"
                          : "text-white hover:bg-white hover:text-[#4d7c0f]"
                      }`}
                    >
                      {cell.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => { setSelectedTime(t); setStep(3); }}
                  className="rounded-full border border-white/50 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#4d7c0f]"
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <form
              onSubmit={(e) => { e.preventDefault(); setStep(4); }}
              className="space-y-4"
            >
              {[
                { key: "name", label: "Full Name", type: "text" },
                { key: "email", label: "Email", type: "email" },
                { key: "phone", label: "Phone", type: "tel" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-white/80">{f.label}</label>
                  <input
                    required
                    type={f.type}
                    value={(form as any)[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full rounded-xl border border-white/40 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none transition focus:border-white focus:bg-white/20"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-white/80">Type of Service</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full rounded-xl border border-white/40 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-white focus:bg-white/20"
                >
                  {SERVICE_TYPES.map((s) => <option key={s} value={s} className="text-ink">{s}</option>)}
                </select>
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-2xl bg-white px-6 py-4 text-sm font-extrabold uppercase tracking-wider transition hover:bg-white/90"
                style={{ color: "#3f6212" }}
              >
                Confirm Appointment
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-white/15 ring-1 ring-white/40">
                <Check className="h-10 w-10 text-white" strokeWidth={3} />
              </div>
              <h3 className="mt-6 text-2xl font-extrabold">Appointment Booked!</h3>
              <p className="mt-3 text-sm text-white/90">
                {dateLabel} · {selectedTime}
              </p>
              <p className="mt-1 text-sm font-semibold">{form.service}</p>
              <p className="mt-1 text-xs text-white/80">{SERVICE_NAME} · {SERVICE_DURATION}</p>
              <button
                onClick={reset}
                className="mt-8 inline-flex items-center gap-1 text-xs font-bold tracking-wide text-white/90 hover:text-white transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> BACK
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
