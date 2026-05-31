"use client";

import Link from "next/link";
import { Activity, BarChart3, Bot, Boxes, ChevronLeft, ChevronRight, ClipboardCheck, ClipboardList, FileSearch, Gauge, Home, PackageCheck, Settings, ShoppingBag, Users, Wrench, BriefcaseBusiness, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { SectionId, SidebarItem } from "./operations-data";

const iconMap: Record<SectionId, React.ElementType> = {
  home: Gauge,
  customers: Users,
  inquiries: ClipboardList,
  "products-stock": Boxes,
  bundles: PackageCheck,
  services: Wrench,
  "staff-follow-up": ClipboardCheck,
  insights: BarChart3,
  operations: BriefcaseBusiness,
  "ai-automation": Bot,
  audit: FileSearch,
  settings: Settings,
};

export function OperationsSidebar({
  items,
  activeSection,
  onSectionChange,
  isMobileOpen,
  onMobileClose,
}: {
  items: SidebarItem[];
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isMobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onMobileClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen, onMobileClose]);

  const handleSectionChange = (section: SectionId, closeAfterSelect = false) => {
    onSectionChange(section);
    if (closeAfterSelect) onMobileClose();
  };

  return (
    <>
    <aside className={`sticky top-0 hidden h-screen shrink-0 border-r border-white/10 bg-[#060a12]/95 p-4 text-white transition-[width] duration-200 md:block ${isCollapsed ? "w-20" : "w-72"}`}>
      <div className={`mb-5 flex items-center gap-3 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-400/30 bg-red-500/15">
            <Activity className="h-5 w-5 text-red-200" aria-hidden="true" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-wide text-white">QHomemart Retail OS</p>
              <p className="text-xs text-slate-400">Dashboard operasional dengan sistem AI</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsed((current) => !current)}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 md:flex"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : <ChevronLeft className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>

      <Link
        href="/"
        className={`mb-4 flex items-center rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${isCollapsed ? "justify-center" : "gap-3"}`}
        title="Ke Home"
      >
        <Home className="h-4 w-4 shrink-0 text-red-200" aria-hidden="true" />
        {!isCollapsed && <span>Ke Home</span>}
      </Link>

      <nav className="space-y-1" aria-label="Menu dashboard">
        {items.map((item) => {
          const Icon = iconMap[item.id];
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSectionChange(item.id)}
              className={`group flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${isCollapsed ? "justify-center" : "justify-between"} ${
                isActive
                  ? "bg-white text-slate-950 shadow-lg shadow-red-950/20"
                  : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
              }`}
              aria-current={isActive ? "page" : undefined}
              title={item.label}
            >
              <span className={`flex min-w-0 items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-red-600" : "text-slate-500 group-hover:text-slate-300"}`} aria-hidden="true" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </span>
            </button>
          );
        })}
      </nav>

      {!isCollapsed && <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-red-200" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Cakupan Saat Ini</p>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Stok live, harga, auth, WhatsApp, payment, dan sistem produksi belum terhubung.
        </p>
      </div>}
    </aside>
    <div className={`fixed inset-0 z-40 md:hidden ${isMobileOpen ? "block" : "hidden"}`}>
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close navigation menu"
        onClick={onMobileClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Operations navigation"
        className={`relative flex h-full w-[min(20rem,86vw)] flex-col overflow-y-auto border-r border-white/10 bg-[#060a12] p-4 text-white shadow-2xl transition-transform duration-200 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-400/30 bg-red-500/15">
              <Activity className="h-5 w-5 text-red-200" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-wide text-white">QHomemart Retail OS</p>
              <p className="text-xs text-slate-400">Dashboard operasional</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onMobileClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            aria-label="Close navigation menu"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <Link
          href="/"
          className="mb-4 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          title="Ke Home"
          onClick={onMobileClose}
        >
          <Home className="h-4 w-4 shrink-0 text-red-200" aria-hidden="true" />
          <span>Ke Home</span>
        </Link>

        <nav className="space-y-1" aria-label="Menu dashboard mobile">
          {items.map((item) => {
            const Icon = iconMap[item.id];
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSectionChange(item.id, true)}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${
                  isActive
                    ? "bg-white text-slate-950 shadow-lg shadow-red-950/20"
                    : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-red-600" : "text-slate-500 group-hover:text-slate-300"}`} aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-red-200" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Cakupan Saat Ini</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Stok live, harga, auth, WhatsApp, payment, dan sistem produksi belum terhubung.
          </p>
        </div>
      </aside>
    </div>
    </>
  );
}
