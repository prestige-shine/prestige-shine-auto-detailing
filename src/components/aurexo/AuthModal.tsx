import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { useAuthModal } from "@/contexts/AuthModalContext";

export function AuthModal() {
  const { isOpen, close } = useAuthModal();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4" onClick={close}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-ink">{mode === "signin" ? "Welcome back" : "Create your account"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "signin" ? "Sign in to save listings and track inquiries." : "Save favorites, compare cars, and reach dealers faster."}
            </p>
          </div>
          <button onClick={close} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-border">
            <X className="h-4 w-4" />
          </button>
        </div>

        {done ? (
          <div className="mt-6 rounded-xl bg-brand/15 p-5 text-center">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand text-ink">✓</div>
            <p className="mt-3 text-sm font-semibold text-ink">You're all set.</p>
            <p className="mt-1 text-xs text-muted-foreground">This is a demo. No account was created.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
              setTimeout(() => { setDone(false); close(); }, 1400);
            }}
            className="mt-5 space-y-3"
          >
            {mode === "signup" && (
              <Field icon={<User className="h-4 w-4" />} placeholder="Full name" />
            )}
            <Field icon={<Mail className="h-4 w-4" />} type="email" placeholder="Email" required />
            <Field icon={<Lock className="h-4 w-4" />} type="password" placeholder="Password" required />
            <button type="submit" className="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white hover:bg-ink/90">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {mode === "signin" ? "New here? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="font-semibold text-ink underline underline-offset-2">
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Field({ icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-3">
      <span className="text-muted-foreground">{icon}</span>
      <input {...props} className="flex-1 bg-transparent text-sm outline-none" />
    </label>
  );
}
