import { createFileRoute, notFound } from "@tanstack/react-router";
import { VehicleDetail } from "@/components/aurexo/VehicleDetail";
import { vehicles, type Vehicle } from "@/lib/aurexo-data";

export const Route = createFileRoute("/listings/$id")({
  head: ({ params }) => {
    const v = vehicles.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${v?.title ?? "Detailing Package"} — Prestige Shine Auto Detailing` },
        {
          name: "description",
          content: v
            ? `${v.title} — completed ${v.fuel} work on a ${v.body} by Prestige Shine Auto Detailing in Miramichi, NB.`
            : "Detailing package at Prestige Shine Auto Detailing, Miramichi.",
        },
        { property: "og:title", content: `${v?.title ?? "Detailing Package"} — Prestige Shine` },
        { property: "og:image", content: v?.img ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const v = vehicles.find((x) => x.id === params.id);
    if (!v) throw notFound();
    return { v };
  },
  component: ListingPage,
});

function ListingPage() {
  const { v } = Route.useLoaderData() as { v: Vehicle };
  return <VehicleDetail vehicle={v} />;
}
