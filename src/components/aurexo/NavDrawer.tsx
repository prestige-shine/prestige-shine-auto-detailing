import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { X, ChevronDown, Phone } from "lucide-react";
import { Logo } from "./Logo";

type Props = { open: boolean; onClose: () => void };

type Node = { label: string; to?: string; children?: Node[] };

const tree: Node[] = [
  { label: "Home", to: "/" },
  {
    label: "Buy Car",
    children: [
      { label: "All Vehicles", to: "/buy" },
      { label: "New Arrivals", to: "/buy" },
      { label: "Featured", to: "/buy" },
    ],
  },
  {
    label: "Listing Layout",
    children: [
      {
        label: "Listing Layout",
        children: [
          { label: "Listing Grid 2 Columns", to: "/buy" },
          { label: "Listing Grid 3 Columns", to: "/buy" },
          { label: "Listing Grid 4 Columns", to: "/buy" },
          { label: "Listing Half Map Left", to: "/buy" },
          { label: "Listing List Style Half Map", to: "/buy" },
          { label: "Listing ListStyle Sidebar", to: "/buy" },
        ],
      },
      {
        label: "Features",
        children: [
          { label: "Listing Sidebar Left", to: "/buy" },
          { label: "Listing Sidebar Right", to: "/buy" },
          { label: "Listing Top Map", to: "/buy" },
          { label: "Listing Filter Canvas", to: "/buy" },
        ],
      },
      {
        label: "Listing Style",
        children: [
          { label: "Listing Grid", to: "/buy" },
          { label: "Listing List", to: "/buy" },
        ],
      },
      {
        label: "Listing Details",
        children: Array.from({ length: 6 }, (_, i) => ({
          label: `Listing Details ${i + 1}`,
          to: "/listings/$id",
        })),
      },
    ],
  },
  {
    label: "News",
    children: [
      { label: "Blog Standard", to: "/news" },
      { label: "Blog List", to: "/news" },
      { label: "Blog Grid Style 1", to: "/news" },
      { label: "Blog Grid Style 2", to: "/news" },
      { label: "Blog Grid Style 3", to: "/news" },
      { label: "Single News 01", to: "/news" },
      { label: "Single News 02", to: "/news" },
    ],
  },
  {
    label: "Pages",
    children: [
      { label: "Sale Agents", to: "/agents" },
      { label: "Car Dealerships", to: "/dealerships" },
      { label: "About us", to: "/about" },
      { label: "Calculator", to: "/calculator" },
      { label: "Compare", to: "/compare" },
      { label: "Clients Reviews", to: "/reviews" },
      { label: "Financing", to: "/financing" },
      { label: "Services Center", to: "/services" },
      { label: "FAQs", to: "/faqs" },
      { label: "404 Error", to: "/404" },
      { label: "Sell Your Car", to: "/sell" },
      { label: "Terms of use", to: "/terms" },
      { label: "Coming Soon", to: "/coming-soon" },
    ],
  },
];

function TreeItem({
  node,
  depth = 0,
  onNavigate,
}: {
  node: Node;
  depth?: number;
  onNavigate: () => void;
}): ReactNode {
  const [open, setOpen] = useState(false);
  const hasChildren = !!node.children?.length;

  if (!hasChildren && node.to) {
    return (
      <Link
        to={node.to}
        onClick={onNavigate}
        className="flex w-full items-center py-3 text-white/85 hover:text-white text-sm"
        style={{ paddingLeft: depth * 14 }}
      >
        {node.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-left text-white/90 hover:text-white"
        style={{ paddingLeft: depth * 14 }}
      >
        <span className={depth === 0 ? "text-base font-semibold" : "text-sm"}>
          {node.label}
        </span>
        {hasChildren && (
          <ChevronDown
            className={`h-4 w-4 text-brand transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>
      {hasChildren && open && (
        <div className="border-l border-white/10 ml-2">
          {node.children!.map((c) => (
            <TreeItem key={c.label} node={c} depth={depth + 1} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

export function NavDrawer({ open, onClose }: Props) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-ink text-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Logo variant="light" />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-white/10">
          {tree.map((n) => (
            <TreeItem key={n.label} node={n} onNavigate={onClose} />
          ))}
        </div>

        <a
          href="tel:18662886868"
          className="flex items-center justify-center gap-2 border-t border-white/10 bg-brand py-4 font-semibold text-ink"
        >
          <Phone className="h-4 w-4" />
          1-866-288-6868
        </a>
      </aside>
    </>
  );
}
