import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/aurexo/Header";
import { Footer } from "@/components/aurexo/Footer";
import { NavDrawer } from "@/components/aurexo/NavDrawer";
import { VehicleDetail } from "@/components/aurexo/VehicleDetail";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "2022 Ford GT White — Aurexo" },
      {
        name: "description",
        content:
          "Aurexo premium automotive marketplace. Explore the 2022 Ford GT White, financing, dealer contact, reviews and similar vehicles.",
      },
      { property: "og:title", content: "2022 Ford GT White — Aurexo" },
      {
        property: "og:description",
        content: "Premium automotive marketplace. Find, finance, and own your next car.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-surface min-h-screen">
      <Header onMenuClick={() => setMenuOpen(true)} />
      <NavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <VehicleDetail />
      <Footer />
    </div>
  );
}
