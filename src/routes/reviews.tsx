import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

const PHOTOS = [
  "photo-1552519507-da3b142c6e3d",
  "photo-1503376780353-7e6692767b70",
  "photo-1494976388531-d1058494cdd8",
  "photo-1493238792000-8113da705763",
  "photo-1520340356584-f9917d1eea6f",
  "photo-1583121274602-3e2820c69888",
  "photo-1600661653561-629509216228",
  "photo-1449965408869-eaa3f722e40d",
  "photo-1560958089-b8a1929cea89",
];


const reviews = [
  { name: "Marcus T.", city: "Shaker Heights, Miramichi", service: "9H Ceramic Coating", photo: PHOTOS[0], body: "Brought in my 2023 BMW M4 absolutely covered in swirl marks from a dealer prep job. The Prestige Shine team did a two-stage correction and Crystal Serum Ultra coating over two days. The paint looks deeper than the day it left the factory. Genuinely stunned." },
  { name: "Priya K.", city: "Dublin, Miramichi", service: "Full Interior Deep Clean", photo: PHOTOS[1], body: "I have two large dogs and the interior of my Range Rover was honestly embarrassing. Prestige Shine's Northside studio extracted the carpet, removed every trace of pet hair, and eliminated the odour completely. Looked and smelled showroom-new. Will be back every six months." },
  { name: "Jordan A.", city: "Hyde Park, Douglastown, Miramichi", service: "Paint Correction", photo: PHOTOS[2], body: "Three-year-old Porsche 911 with light swirling from automated washes. The single-stage correction took about five hours and the result is mirror-flat paint I hadn't seen since delivery day. The team photographed every panel before and after — incredible documentation." },
  { name: "Camille R.", city: "Fairlawn, Newcastle, Miramichi", service: "Express Exterior + Wheel Coating", photo: PHOTOS[3], body: "The ceramic wheel coating add-on was the best $149 I've spent on the car. Brake dust just rinses off now. The express exterior wash is fast, thorough, and the staff actually care about doing it properly. Booked my third appointment already." },
  { name: "Liam P.", city: "Westlake, Miramichi", service: "Full Detail Bundle", photo: PHOTOS[4], body: "Prestige Shine detailed my Tesla Model S Plaid before a charity auction. Interior deep clean, paint correction, and a ceramic coat all in three days. The auction organisers asked which dealership had it — that's the Prestige Shine standard." },
  { name: "Sophia W.", city: "Bexley, Northside, Miramichi", service: "Interior Deep Clean", photo: PHOTOS[5], body: "Bought a used Lexus RX with an unknown history. Prestige Shine's team did a full interior extraction and odour treatment. What came out of those seats was unbelievable. The before/after photos alone were worth the price of admission." },
  { name: "Daniel R.", city: "Tremont, Chatham, Miramichi", service: "Ceramic Coating", photo: PHOTOS[6], body: "First time getting a ceramic coating and I was nervous about the process. The Chatham studio walked me through every step, let me watch from the waiting area, and the result is flawless. 8 months later the coating is still beading water perfectly." },
  { name: "Aisha M.", city: "Upper Arlington, Miramichi", service: "Headlight Restoration", photo: PHOTOS[7], body: "My 2015 Jeep Grand Cherokee headlights were completely yellowed — visibility was genuinely dangerous at night. Prestige Shine restored and sealed them in under an hour. Looks like new glass and the difference in light output at night is incredible." },
  { name: "Tyler B.", city: "Bath Township, Newcastle, Miramichi", service: "Full Detail", photo: PHOTOS[8], body: "I asked for a pre-sale detail on my wife's Audi Q5. The Newcastle studio did paint correction, a full interior deep clean, and headlight restoration. The car sold for $2,500 above asking price within 48 hours of listing. Worth every penny." },
];

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews — Prestige Shine Auto Detailing Miramichi" },
      { name: "description", content: "Verified reviews from Miramichi vehicle owners on Prestige Shine's ceramic coatings, paint correction, and interior deep cleaning services." },
      { property: "og:title", content: "Client Reviews — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "What Miramichi drivers say about Prestige Shine's detailing services." },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Reviews" title="4.9 / 5 from 4,200+ Miramichi drivers." subtitle="Genuine feedback from vehicle owners across Chatham, Northside, Douglastown, and Newcastle who've experienced the Prestige Shine difference." />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {reviews.map((r) => (
            <article key={r.name} className="mb-4 break-inside-avoid rounded-2xl bg-white border border-border overflow-hidden">
              <img
                src={`https://images.unsplash.com/${r.photo}?auto=format&fit=crop&w=600&q=70`}
                alt={`${r.service} — Prestige Shine`}
                className="w-full h-36 object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <div className="flex gap-0.5 text-brand">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />)}
                </div>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-brand">{r.service}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">"{r.body}"</p>
                <div className="mt-4 border-t border-border pt-3">
                  <p className="text-sm font-semibold text-ink">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.city}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-white p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Worked with us?{" "}
            <Link to="/contact" className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-2 hover:text-brand">
              <MessageCircle className="h-3.5 w-3.5" /> Share your review
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
