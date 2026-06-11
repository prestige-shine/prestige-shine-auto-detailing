import { useState, type ReactNode } from "react";
import { X, ChevronDown, Phone } from "lucide-react";
import { Logo } from "./Logo";

type Props = { open: boolean; onClose: () => void };

type Node = { label: string; children?: Node[] };

const tree: Node[] = [
  { label: "Home" },
  {
    label: "Buy Car",
    children: [
      { label: "All Vehicles" },
      { label: "New Arrivals" },
      { label: "Featured" },
    ],
  },
  {
    label: "Listing Layout",
    children: [
      {
        label: "Listing Layout",
        children: [
          { label: "Listing Grid 2 Columns" },
          { label: "Listing Grid 3 Columns" },
          { label: "Listing Grid 4 Columns" },
          { label: "Listing Half Map Left" },
          { label: "Listing List Style Half Map" },
          { label: "Listing ListStyle Sidebar" },
        ],
      },
      {
        label: "Features",
        children: [
          { label: "Listing Sidebar Left" },
          { label: "Listing Sidebar Right" },
          { label: "Listing Top Map" },
          { label: "Listing Filter Canvas" },
        ],
      },
      {
        label: "Listing Style",
        children: [{ label: "Listing Grid" }, { label: "Listing List" }],
      },
      {
        label: "Listing Details",
        children: [
          { label: "Listing Details 1" },
          { label: "Listing Details 2" },
          { label: "Listing Details 3" },
          { label: "Listing Details 4" },
          { label: "Listing Details 5" },
          { label: "Listing Details 6" },
        ],
      },
    ],
  },
  {
    label: "News",
    children: [
      { label: "Blog Standard" },
      { label: "Blog List" },
      { label: "Blog Grid Style 1" },
      { label: "Blog Grid Style 2" },
      { label: "Blog Grid Style 3" },
      { label: "Single News 01" },
      { label: "Single News 02" },
    ],
  },
  {
    label: "Pages",
    children: [
      { label: "Sale Agents" },
      { label: "Car Dealerships" },
      { label: "About us" },
      { label: "Calculator" },
      { label: "Compare" },
      { label: "Clients Reviews" },
      { label: "Financing" },
      { label: "Services Center" },
      { label: "FAQs" },
      { label: "404 Error" },
      { label: "Sell Your Car" },
      { label: "Terms of use" },
      { label: "Coming Soon" },
    ],
  },
];

function TreeItem({ node, depth = 0 }: { node: Node; depth?: number }): ReactNode {
  const [open, setOpen] = useState(false);
  const hasChildren = !!node.children?.length;

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
            <TreeItem key={c.label} node={c} depth={depth + 1} />
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
            <TreeItem key={n.label} node={n} />
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
