import { useEffect, useRef, useState } from "react";
import { Check, MessageCircle, X, Send, Minus, Mic } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import logoAsset from "@/assets/prestige-shine-logo.png";
import { askConcierge } from "@/lib/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

type SpeechRecognitionResultEvent = Event & {
  resultIndex?: number;
  results: ArrayLike<ArrayLike<{ transcript: string; isFinal?: boolean }>>;
};

type SpeechRecognitionErrorEvent = { error?: string };

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
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

const stripMarkdown = (text: string) =>
  text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+[.)]\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [listening, setListening] = useState(false);
  const [dictationActive, setDictationActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const recognitionRunningRef = useRef(false);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalizedTranscriptRef = useRef("");
  const sessionFinalizedTranscriptRef = useRef("");
  const interimTranscriptRef = useRef("");
  const sessionResultsRef = useRef<Map<number, { transcript: string; isFinal: boolean }>>(
    new Map(),
  );
  const inputBeforeDictationRef = useRef("");
  const dictationActiveRef = useRef(false);
  const ask = useServerFn(askConcierge);

  const speakAssistantResponse = (text: string) => {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;

    const plainText = stripMarkdown(text);
    if (!plainText) return;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(plainText));
  };

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    const startRecognition = () => {
      const recognition = recognitionRef.current;
      if (!recognition || recognitionRunningRef.current || !dictationActiveRef.current) return;

      recognitionRunningRef.current = true;
      try {
        recognition.start();
        setListening(true);
      } catch {
        recognitionRunningRef.current = false;
        setListening(false);
      }
    };

    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-CA";
    recognition.onresult = (event) => {
      const resultIndex = event.resultIndex ?? 0;
      for (let index = resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index]?.[0];
        if (!result?.transcript) continue;
        sessionResultsRef.current.set(index, {
          transcript: result.transcript,
          isFinal: result.isFinal ?? false,
        });
      }

      let sessionFinalized = "";
      let interim = "";
      for (const result of sessionResultsRef.current.values()) {
        if (result.isFinal) sessionFinalized += result.transcript;
        else interim += result.transcript;
      }
      sessionFinalizedTranscriptRef.current = sessionFinalized;
      interimTranscriptRef.current = interim;
      const transcript =
        `${inputBeforeDictationRef.current} ${finalizedTranscriptRef.current} ${sessionFinalized} ${interim}`.trim();
      setInput(transcript);
    };
    recognition.onend = () => {
      recognitionRunningRef.current = false;
      setListening(false);
      finalizedTranscriptRef.current =
        `${finalizedTranscriptRef.current} ${sessionFinalizedTranscriptRef.current}`.trim();
      sessionFinalizedTranscriptRef.current = "";
      interimTranscriptRef.current = "";
      sessionResultsRef.current.clear();
      setInput(`${inputBeforeDictationRef.current} ${finalizedTranscriptRef.current}`.trim());
    };
    recognition.onerror = () => {
      recognitionRunningRef.current = false;
      setListening(false);
    };

    recognitionRef.current = recognition;
    setSpeechAvailable(true);

    return () => {
      dictationActiveRef.current = false;
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
      if (recognitionRunningRef.current) recognition.stop();
      recognitionRunningRef.current = false;
      recognitionRef.current = null;
    };
  }, []);

  const startDictation = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    const wasDictationActive = dictationActiveRef.current;
    dictationActiveRef.current = true;
    setDictationActive(true);
    if (!wasDictationActive) {
      inputBeforeDictationRef.current = input;
      finalizedTranscriptRef.current = "";
      sessionFinalizedTranscriptRef.current = "";
      interimTranscriptRef.current = "";
      sessionResultsRef.current.clear();
    }
    if (recognitionRunningRef.current) return;
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);

    try {
      recognitionRunningRef.current = true;
      recognition.start();
      setListening(true);
    } catch {
      recognitionRunningRef.current = false;
      setListening(false);
    }
  };

  const finishDictation = () => {
    dictationActiveRef.current = false;
    setDictationActive(false);
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    if (recognitionRunningRef.current) recognitionRef.current?.stop();
    setListening(false);
  };

  const cancelDictation = () => {
    dictationActiveRef.current = false;
    setDictationActive(false);
    setListening(false);
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    if (recognitionRunningRef.current) recognitionRef.current?.stop();
    recognitionRunningRef.current = false;
    setInput(inputBeforeDictationRef.current);
    finalizedTranscriptRef.current = "";
    sessionFinalizedTranscriptRef.current = "";
    interimTranscriptRef.current = "";
    sessionResultsRef.current.clear();
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
      if (res.ok) speakAssistantResponse(res.reply);
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
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2.5 border-b border-white/10 px-3 py-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-ink">
            <img
              src={logoAsset}
              alt="Prestige Shine Auto Detailing"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold">Prestige Shine Concierge</p>
            <p className="text-[10px] text-white/55">Miramichi, NB · usually replies instantly.</p>
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

        <div
          ref={scrollRef}
          className="h-[min(52vh,22rem)] space-y-2.5 overflow-y-auto px-3 py-3 text-[13px]"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 leading-relaxed ${
                  m.role === "user"
                    ? "bg-brand font-semibold text-white"
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
          className="border-t border-white/10 p-2.5"
        >
          {dictationActive && (
            <div className="mb-2 rounded-xl border border-brand/40 bg-brand/10 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-6 items-center gap-0.5" aria-hidden="true">
                  {["h-2", "h-4", "h-6", "h-3", "h-5", "h-2"].map((height, index) => (
                    <span
                      key={index}
                      className={`w-1 rounded-full bg-brand transition-all ${height} ${
                        listening ? "animate-pulse" : "opacity-50"
                      }`}
                      style={{ animationDelay: `${index * 90}ms` }}
                    />
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-white">
                    {listening ? "Listening..." : "Ready to dictate"}
                  </p>
                  <p className="text-[10px] text-white/55">Review your words before sending.</p>
                </div>
                <button
                  type="button"
                  onClick={cancelDictation}
                  className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/75 transition hover:border-white/40 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={finishDictation}
                  className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-brand/90 disabled:cursor-default disabled:opacity-50"
                >
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Done
                  </span>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              aria-label="Message the concierge"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about detailing or booking…"
              className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/6 px-3 py-2 text-[13px] text-white outline-none placeholder:text-white/40 focus:border-brand"
            />
            {speechAvailable && !dictationActive && (
              <button
                type="button"
                onClick={startDictation}
                aria-label="Use voice input"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-brand hover:text-white"
              >
                <Mic className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
