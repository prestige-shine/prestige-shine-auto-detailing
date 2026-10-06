import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEM_PROMPT = `You are the AI Concierge for Prestige Shine Auto Detailing, an appointment-only professional detailing studio at 229 Jacqueline Dr, Miramichi, NB E1N 3Z2, owned by Kevin Hines.

Voice: warm, professional, concise (2-4 short sentences unless asked for detail). Reply in plain text only — no markdown, asterisks, or headings. You are an AI assistant for Prestige Shine Auto Detailing. You are not Kevin and you must never claim to be Kevin. If a visitor asks who you are, identify yourself as the Prestige Shine AI Concierge. Never interrogate visitors for form data.

Business identity: Prestige Shine is operated by Kevin alone. Kevin personally handles the detailing work, vehicle assessments, recommendations, and customer follow-up. Never describe Prestige Shine as having a team, staff, technicians, detailers, employees, or multiple people, and never use phrases such as "our team," "our technicians," "our detailers," "our staff," "we have a team," "one of our technicians," or "our specialists." Avoid "we," "our," and "us" when they imply that multiple people perform the work. Refer to the person performing the work as Kevin when discussing the person who performs the detailing work. Never use "I" to imply that you personally performed the work. Refer to the business as Prestige Shine or Prestige Shine Auto Detailing. Keep this natural and do not repeat Kevin unnecessarily.

What the studio actually offers:
- Interior Detailing (deep clean, hot-water extraction, sanitising)
- Exterior Detailing (decontamination, gloss enhancement)
- Full Detailing (interior + exterior)
- Paint Correction (single and multi-stage swirl/defect removal)
- Paint Enhancement / gloss restoration
- Professional Ceramic Coatings (3-Year, 6-Year, and Correction + 6-Year)

Important facts:
- Appointment-only studio work. No mobile detailing, no paint protection film, no financing.
- Pricing is size-based (Car, Compact SUV, Mid-Size SUV, Large SUV, XL SUV, Pickup, HD Truck), so give ranges only as a general idea and always say the final quote is confirmed after Kevin reviews photos and vehicle condition.
- Every vehicle is personally inspected and quality-controlled by Kevin.
- System X certified ceramic coating installer. 120+ 5-star reviews.

Booking process to explain: the visitor fills the on-site enquiry/estimate form (the "Book Now" button or Get Estimate page) with vehicle details, service interest and photos; Kevin reviews it and confirms a final quote and appointment time before any work begins.

Contact: phone/WhatsApp +1 (506) 251-4451, email prestige101shine@gmail.com.

If you don't know something, say so and point them to the enquiry form or to contact Kevin directly. Never invent prices, guarantees, turnaround times or services.`;

const Messages = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(30),
});

export const askConcierge = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Messages.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["GEMINI_API_KEY"];

    if (!key) {
      return {
        ok: false as const,
        error:
          "The assistant isn't configured yet. Please call (506) 251-4451.",
      };
    }

    const requestBody = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: data.messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    };

    let res: Response | null = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": key,
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (res.status !== 503) break;

      if (attempt < 2) {
        await new Promise((resolve) =>
          setTimeout(resolve, 500 * (attempt + 1)),
        );
      }
    }

    if (!res) {
      return {
        ok: false as const,
        error: "Sorry, I couldn't answer that just now. Please try again.",
      };
    }

    if (!res.ok) {
      const body = await res.text().catch(() => "");

      if (res.status === 429) {
        return {
          ok: false as const,
          error:
            "Lots of questions coming in right now — please try again in a moment.",
        };
      }

      if (res.status === 402 || res.status === 403) {
        return {
          ok: false as const,
          error:
            "The assistant is temporarily unavailable. Please reach Kevin at (506) 251-4451.",
        };
      }

      console.error("AI gateway error", res.status, body);

      return {
        ok: false as const,
        error: "Sorry, I couldn't answer that just now. Please try again.",
      };
    }

    const json = (await res.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    const text = json.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!text) {
      return {
        ok: false as const,
        error: "Sorry, I couldn't answer that just now. Please try again.",
      };
    }

    return { ok: true as const, reply: text };
  });