import { createFileRoute, notFound } from "@tanstack/react-router";
import { VehicleDetail } from "@/components/aurexo/VehicleDetail";
import { vehicles } from "@/lib/aurexo-data";

export const Route = createFileRoute("/listings/$id")({
  head: ({ params }) => {
    const v = vehicles.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${v?.title ?? "Detailing Package"} — Top Coat Auto Detailers` },
        {
          name: "description",
          content: v
            ? `${v.title} · ${v.price}. ${v.fuel} tier for ${v.body} · ~${v.km} min labor. Book with Top Coat Auto Detailers in Ohio.`
            : "Detailing package at Top Coat Auto Detailers, Ohio.",
        },
        { property: "og:title", content: `${v?.title ?? "Detailing Package"} — Top Coat` },
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
  const { v } = Route.useLoaderData();
  return <VehicleDetail vehicle={v} />;
}
