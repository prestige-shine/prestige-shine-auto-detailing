import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Minus, Mic } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { askConcierge } from "@/lib/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

type SpeechRecognitionResultEvent = Event & {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const GREETING =
  "Hi! I'm the Prestige Shine concierge. Ask me about ceramic coatings, paint correction, interior detailing, or how booking works.";

const QUICK = [
  "What services do you offer?",
  "How does booking work?",
  "Tell me about ceramic coating",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [listening, setListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const ask = useServerFn(askConcierge);

  useEffect(() => {
    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-CA";
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, index) =>
        event.results[index]?.[0]?.transcript ?? "",
      ).join("");
      if (transcript.trim()) setInput(transcript.trim());
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    setSpeechAvailable(true);

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (listening) {
      recognition.stop();
      setListening(false);
      return;
    }

    try {
      recognition.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  const send = async (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: value }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await ask({
        data: { messages: next.filter((m, i) => !(i === 0 && m.role === "assistant")).slice(-20) },
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.ok ? res.reply : res.error },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't reach the studio assistant. Please call (506) 251-4451.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Minimize concierge chat" : "Open Prestige Shine concierge chat"}
        className="fixed bottom-5 right-5 z-[100] grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-lg shadow-brand/40 ring-2 ring-white/40 transition hover:scale-105"
      >
        {open ? <Minus className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      <div
        role="dialog"
        aria-label="Prestige Shine AI concierge"
        className={`fixed bottom-20 right-4 z-[100] flex w-[calc(100vw-2rem)] max-w-[22rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink text-white shadow-2xl transition-all duration-200 sm:right-5 ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2.5 border-b border-white/10 px-3 py-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-brand text-xs font-extrabold text-white">PS</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold">Prestige Shine Concierge</p>
            <p className="text-[10px] text-white/55">Miramichi, NB · usually replies instantly</p>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="grid h-7 w-7 place-items-center rounded-full border border-white/15 text-white/70 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div ref={scrollRef} className="h-[min(52vh,22rem)] space-y-2.5 overflow-y-auto px-3 py-3 text-[13px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 leading-relaxed ${
                  m.role === "user"
                    ? "bg-brand font-semibold text-ink"
                    : "border border-white/10 bg-white/5 text-white/90"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {QUICK.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => void send(q)}
                  className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/80 transition hover:border-brand hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {busy && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white/60">
                Typing…
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex items-center gap-2 border-t border-white/10 p-2.5"
        >
          <input
            aria-label="Message the concierge"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about detailing or booking…"
            className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/6 px-3 py-2 text-[13px] text-white outline-none placeholder:text-white/40 focus:border-brand"
          />
          {speechAvailable && (
            <button
              type="button"
              onClick={toggleListening}
              aria-label={listening ? "Stop listening" : "Use voice input"}
              aria-pressed={listening}
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${
                listening
                  ? "border-brand bg-brand text-ink"
                  : "border-white/15 text-white/70 hover:border-brand hover:text-white"
              }`}
            >
              <Mic className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send message"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-ink disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
