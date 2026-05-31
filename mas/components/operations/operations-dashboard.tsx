"use client";

import { useState } from "react";
import { Clock3, Menu } from "lucide-react";
import type { WorkflowRunResult } from "@/types/mas-types";
import { AutomationGovernance } from "./automation-governance";
import { CommandOverview } from "./command-overview";
import { LogsAudit } from "./logs-audit";
import { OperationsSidebar } from "./operations-sidebar";
import {
  BundlesSection,
  CustomersSection,
  InquirySection,
  InsightsSection,
  ProductsStockSection,
  RetailOperationsSection,
  ServicesSection,
  SettingsSection,
  StaffFollowUpSection,
} from "./retail-sections";
import {
  sidebarItems,
  type SectionId,
} from "./operations-data";

export function OperationsDashboard({ workflow }: { workflow: WorkflowRunResult }) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,25,32,0.18),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(25,59,140,0.16),transparent_30%)]" />
      <div className="relative flex min-h-screen">
        <OperationsSidebar items={sidebarItems} activeSection={activeSection} onSectionChange={setActiveSection} />

        <main className="min-w-0 flex-1">
          <div className="sticky top-0 z-20 border-b border-white/10 bg-[#070b13]/85 px-4 py-3 backdrop-blur lg:hidden">
            <div className="flex items-center gap-3">
              <Menu className="h-5 w-5 text-red-200" aria-hidden="true" />
              <select
                value={activeSection}
                onChange={(event) => setActiveSection(event.target.value as SectionId)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                aria-label="Menu dashboard"
              >
                {sidebarItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mx-auto max-w-[1540px] px-4 py-6 md:px-6 lg:px-8">
            <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">QHomemart Retail OS</p>
                <p className="mt-1 text-sm text-slate-400">Dashboard operasional ritel dengan sistem AI.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                  Kesehatan sistem: Operational
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-slate-300">
                  <Clock3 className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
                  Operational signal
                </span>
              </div>
            </header>

            <div className={activeSection === "home" ? "block" : "hidden"}>
              <CommandOverview />
            </div>

            <div className={activeSection === "customers" ? "block" : "hidden"}>
              <CustomersSection />
            </div>

            <div className={activeSection === "inquiries" ? "block" : "hidden"}>
              <InquirySection />
            </div>

            <div className={activeSection === "products-stock" ? "block" : "hidden"}>
              <ProductsStockSection />
            </div>

            <div className={activeSection === "bundles" ? "block" : "hidden"}>
              <BundlesSection />
            </div>

            <div className={activeSection === "services" ? "block" : "hidden"}>
              <ServicesSection />
            </div>

            <div className={activeSection === "staff-follow-up" ? "block" : "hidden"}>
              <StaffFollowUpSection />
            </div>

            <div className={activeSection === "insights" ? "block" : "hidden"}>
              <InsightsSection />
            </div>

            <div className={activeSection === "operations" ? "block" : "hidden"}>
              <RetailOperationsSection />
            </div>

            <div className={activeSection === "ai-automation" ? "space-y-6" : "hidden"}>
              <AutomationGovernance />
            </div>

            <div className={activeSection === "audit" ? "space-y-6" : "hidden"}>
              <LogsAudit workflow={workflow} />
            </div>

            <div className={activeSection === "settings" ? "block" : "hidden"}>
              <SettingsSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
