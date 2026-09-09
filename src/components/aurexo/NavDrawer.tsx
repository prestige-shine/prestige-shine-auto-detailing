import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { X, ChevronDown, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { STUDIO_PHONE, STUDIO_TEL } from "@/lib/whatsapp";

type Props = { open: boolean; onClose: () => void };

type Node = { label: string; to?: string; search?: Record<string, unknown>; children?: Node[] };

const tree: Node[] = [
  { label: "Home", to: "/" },
  {
    label: "Recent Work",
    children: [
      { label: "All Work", to: "/buy" },
      { label: "Recently Added", to: "/new-arrivals" },
      { label: "Featured Projects", to: "/featured" },
    ],
  },
  {
    label: "Detailing Journal",
    children: [{ label: "All Articles", to: "/news" }],
  },
  {
    label: "Pages",
    children: [
      { label: "About the Studio", to: "/about" },
      { label: "Meet Your Detailer", to: "/agents" },
      { label: "Studio Location", to: "/dealerships" },
      { label: "Owner Reviews", to: "/reviews" },
      { label: "Detailing Services", to: "/services" },
      { label: "FAQs", to: "/faqs" },
      { label: "Instant Quote", to: "/get-estimate" },
      { label: "Book Free Assessment", to: "/sell" },
      { label: "Contact", to: "/contact" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
];

function TreeItem({ node, depth = 0, onNavigate }: { node: Node; depth?: number; onNavigate: () => void }): ReactNode {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = !!node.children?.length;

  if (!hasChildren && node.to) {
    return (
      <Link
        to={node.to}
        onClick={onNavigate}
        className="flex w-full items-center py-3 text-sm text-white/85 hover:text-white"
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
        <span className={depth === 0 ? "text-base font-semibold" : "text-sm"}>{node.label}</span>
        {hasChildren && (
          <ChevronDown className={`h-4 w-4 text-brand transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>
      {hasChildren && open && (
        <div className="ml-2 border-l border-white/10">
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
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-ink text-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Logo variant="light" />
          <button onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full border border-white/15">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 divide-y divide-white/10 overflow-y-auto px-5 py-4">
          {tree.map((n) => (
            <TreeItem key={n.label} node={n} onNavigate={onClose} />
          ))}
        </div>

        <a
          href={`tel:${STUDIO_TEL}`}
          className="flex items-center justify-center gap-2 border-t border-white/10 bg-brand py-4 font-semibold text-ink"
        >
          <Phone className="h-4 w-4" />
          {STUDIO_PHONE}
        </a>
      </aside>
    </>
  );
}
