"use client";

import { Activity, BarChart3, Bot, BriefcaseBusiness, ClipboardList, FileSearch, Gauge, PackageCheck, Settings, ShoppingBag, Users, Wrench } from "lucide-react";
import type { SectionId, SidebarItem } from "./operations-data";

const iconMap: Record<SectionId, React.ElementType> = {
  home: Gauge,
  customers: Users,
  journeys: ClipboardList,
  "products-bundles": PackageCheck,
  services: Wrench,
  insights: BarChart3,
  operations: BriefcaseBusiness,
  "ai-layer": Bot,
  audit: FileSearch,
  settings: Settings,
};

export function OperationsSidebar({
  items,
  activeSection,
  onSectionChange,
}: {
  items: SidebarItem[];
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}) {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/10 bg-[#060a12]/95 p-5 text-white lg:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-400/30 bg-red-500/15">
          <Activity className="h-5 w-5 text-red-200" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">QHomemart Retail OS</p>
          <p className="text-xs text-slate-400">Dashboard operasional dengan sistem AI</p>
        </div>
      </div>

      <nav className="space-y-1" aria-label="Menu dashboard">
        {items.map((item) => {
          const Icon = iconMap[item.id];
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${
                isActive
                  ? "bg-white text-slate-950 shadow-lg shadow-red-950/20"
                  : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-red-600" : "text-slate-500 group-hover:text-slate-300"}`} aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-red-200" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Cakupan Saat Ini</p>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Stok live, harga, auth, WhatsApp, payment, dan sistem produksi belum terhubung.
        </p>
      </div>
    </aside>
  );
}
