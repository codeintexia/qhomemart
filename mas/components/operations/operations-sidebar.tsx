"use client";

import { Activity, Archive, Bot, BrainCircuit, ClipboardList, Cpu, FileSearch, Gauge, GitBranch, Settings, ShieldCheck } from "lucide-react";
import type { SectionId, SidebarItem } from "./operations-data";

const iconMap: Record<SectionId, React.ElementType> = {
  overview: Gauge,
  "agent-fleet": Bot,
  "workflow-monitor": GitBranch,
  "model-routing": Cpu,
  "fallback-governance": ShieldCheck,
  "business-decision": BrainCircuit,
  "logs-audit": FileSearch,
  settings: Settings,
  "human-review": ClipboardList,
  "knowledge-base": Archive,
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
          <p className="text-sm font-semibold tracking-wide text-white">MAS Command Center</p>
          <p className="text-xs text-slate-400">AI operations dashboard</p>
        </div>
      </div>

      <nav className="space-y-1" aria-label="Operations sections">
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
              {item.comingSoon && (
                <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  isActive ? "bg-slate-950 text-white" : "bg-white/10 text-slate-400"
                }`}>
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Prototype Scope</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          No live stock, pricing, auth, WhatsApp, payment, or production QHomemart systems are connected.
        </p>
      </div>
    </aside>
  );
}
