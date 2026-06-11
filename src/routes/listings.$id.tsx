import { createFileRoute, notFound } from "@tanstack/react-router";
import { VehicleDetail } from "@/components/aurexo/VehicleDetail";
import { vehicles } from "@/lib/aurexo-data";

export const Route = createFileRoute("/listings/$id")({
  head: ({ params }) => {
    const v = vehicles.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${v?.title ?? "Listing"} — Aurexo` },
        {
          name: "description",
          content: v
            ? `${v.title} for ${v.price}. ${v.km} km, ${v.fuel}, ${v.transmission}. Available now on Aurexo.`
            : "Vehicle listing on Aurexo.",
        },
        { property: "og:title", content: `${v?.title ?? "Listing"} — Aurexo` },
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
