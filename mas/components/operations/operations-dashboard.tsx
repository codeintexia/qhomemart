"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { getLatestDemoInquiryEvent, type DemoInquiryEvent } from "@/lib/demo-event-bridge";
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
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [latestDemoEvent, setLatestDemoEvent] = useState<DemoInquiryEvent | null>(null);
  const activeItem = sidebarItems.find((item) => item.id === activeSection);

  useEffect(() => {
    const readLatestEvent = () => {
      setLatestDemoEvent(getLatestDemoInquiryEvent());
    };

    readLatestEvent();
    window.addEventListener("storage", readLatestEvent);
    window.addEventListener("focus", readLatestEvent);

    return () => {
      window.removeEventListener("storage", readLatestEvent);
      window.removeEventListener("focus", readLatestEvent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,25,32,0.18),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(25,59,140,0.16),transparent_30%)]" />
      <div className="relative flex min-h-screen">
        <OperationsSidebar
          items={sidebarItems}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isMobileOpen={isMobileNavOpen}
          onMobileClose={() => setIsMobileNavOpen(false)}
        />

        <main className="min-w-0 flex-1">
          <div className="sticky top-0 z-20 border-b border-white/10 bg-[#070b13]/85 px-4 py-3 backdrop-blur md:hidden">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-red-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">QHomemart Retail OS</p>
                <p className="truncate text-xs text-slate-400">{activeItem?.label ?? "Dashboard"}</p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[1540px] px-4 py-6 md:px-6 lg:px-8">
            <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">QHomemart Retail OS</p>
                <p className="mt-1 text-sm text-slate-400">Dashboard operasional ritel dengan sistem AI.</p>
              </div>
              <div className="flex max-w-full flex-wrap items-center gap-2">
                <Link
                  href="/"
                  aria-label="Go to public home"
                  className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-white/12 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                >
                  Public Home
                </Link>
                <Link
                  href="/operations"
                  aria-label="Go to operations dashboard"
                  aria-current="page"
                  className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200"
                >
                  Operations Dashboard
                </Link>
              </div>
            </header>

            <section className="mb-6 rounded-lg border border-white/10 bg-white/[0.055] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Local demo bridge</p>
                  <h2 className="mt-1 text-base font-semibold text-white">Event terbaru dari Public Home</h2>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {latestDemoEvent ? "Data demo dari Public Home tersedia." : "Belum ada event dari Public Home."}
                  </p>
                </div>
                <span className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  latestDemoEvent
                    ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
                    : "border-white/10 bg-slate-950/45 text-slate-400"
                }`}>
                  {latestDemoEvent ? "Event tersedia" : "Menunggu event"}
                </span>
              </div>

              {latestDemoEvent && (
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
                  {[
                    ["Event ID", latestDemoEvent.eventId],
                    ["Waktu", new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(latestDemoEvent.timestamp))],
                    ["Kebutuhan pelanggan", latestDemoEvent.customerNeed],
                    ["Rekomendasi akhir", latestDemoEvent.finalRecommendation],
                    ["Human Review", latestDemoEvent.humanReviewRequired ? "Diperlukan" : "Tidak wajib"],
                    ["Audit status", latestDemoEvent.auditStatus],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg border border-white/10 bg-slate-950/35 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
                      <p className="mt-1 text-sm leading-5 text-slate-200">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

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
