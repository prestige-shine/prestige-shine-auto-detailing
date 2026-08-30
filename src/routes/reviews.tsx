import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";


const reviews = [
  { name: "Clifford Strickland", city: "Miramichi, NB", body: "Great service!! Car looked brand new inside and outside. Amazing work! Will definitely be going back!!" },
  { name: "Rachel & John Gore Tattoo Art", city: "Miramichi, NB", body: "Fantastic service and attention to detail." },
  { name: "Paula Carter", city: "Miramichi, NB", body: "Highly recommend! He did an amazing job detailing my car—it looks and smells like new again. Super friendly and great service!" },
  { name: "Dodie MacCallum", city: "Miramichi, NB", body: "I highly recommend this detailing company! My car looked just as new as when I got it! Thanks so much!! ⭐⭐⭐⭐⭐" },
  { name: "Kevin McGaghey", city: "Miramichi, NB", body: "Picked up my 2024 Honda HR-V today... detailed and ceramic coated... I think my car looks better than when I picked it up new from the dealer." },
  { name: "Kelsey Murphy", city: "Miramichi, NB", body: "I just got the quick winter wash & my car is cleaner than when I bought it. I am so pleased & will definitely be back! Also such a good price 😊" },
  { name: "Tyson MaColl", city: "Miramichi, NB", body: "Truck was rough looking before I brought it here. Was absolutely spotless when I got it back and he got all the swirls out of the paint. Price was more than fair as well." },
  { name: "Melanie Brown Gibbs", city: "Miramichi, NB", body: "I just picked up our SUV and am shocked at how clean Kevin got it! The vehicle looks brand new, unreal! His service is top notch as well! We will definitely be back and telling our friends!" },
  { name: "Jacob Tozer", city: "Miramichi, NB", body: "Kevin did an excellent job on our truck. We got the Full Detail package and the truck looks brand new. Very fairly priced for what you get, and he's flexible with scheduling. Will be back for sure. Thanks again!" },
  { name: "Dekdek Villagracia", city: "Miramichi, NB", body: "If your vehicle is looking for a 'SPA' this is the place to be. Very highly recommended! Thanks much for restoring our Chevy Traverse's beauty back. They offer varieties of packages suitable for your needs. You won't be disappointed." },
  { name: "James M Fisher", city: "Miramichi, NB", body: "Excellent work done, attention to detail, and a very clean & organized garage." },
  { name: "Cheryl MacDonald Martin", city: "Miramichi, NB", body: "Top notch cleaning job. Had my SUV there today and it now looks like a new car. Even the paint looks awesome with a new glow. Super friendly guy also. Highly recommend him." },
  { name: "Noel Milson", city: "Miramichi, NB", body: "Excellent service very well done." },
];

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews — Prestige Shine Auto Detailing Miramichi" },
      { name: "description", content: "100+ 5-star Google reviews from Miramichi vehicle owners on Prestige Shine's ceramic coatings, paint correction, and interior deep cleaning services." },
      { property: "og:title", content: "Client Reviews — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "What Miramichi drivers say about Prestige Shine's detailing services." },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Reviews" title="100+ 5-star Google reviews from Miramichi drivers." subtitle="Genuine feedback from vehicle owners across Miramichi, NB and surrounding areas who've experienced the Prestige Shine difference." />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {reviews.map((r) => (
            <article key={r.name} className="mb-4 break-inside-avoid rounded-2xl bg-white border border-border overflow-hidden">
              <div className="p-5">
                <div className="flex gap-0.5 text-brand">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />)}
                </div>
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
