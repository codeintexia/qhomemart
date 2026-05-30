"use client";

import { useMemo, useState } from "react";
import { Clock3, Menu } from "lucide-react";
import type { WorkflowRunResult } from "@/types/mas-types";
import { AgentAnatomyPanel } from "./agent-anatomy-panel";
import { AgentFleet } from "./agent-fleet";
import { BusinessDecision } from "./business-decision";
import { CommandOverview } from "./command-overview";
import { FallbackGovernance } from "./fallback-governance";
import { LogsAudit } from "./logs-audit";
import { ModelRouting } from "./model-routing";
import { OperationsSidebar } from "./operations-sidebar";
import { WorkflowMonitor } from "./workflow-monitor";
import {
  agentFleet,
  fallbackPolicies,
  modelOptions,
  sidebarItems,
  triageCognitionLayers,
  type SectionId,
} from "./operations-data";

export function OperationsDashboard({ workflow }: { workflow: WorkflowRunResult }) {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [selectedAgentId, setSelectedAgentId] = useState(agentFleet[0].id);
  const [selectedModelId, setSelectedModelId] = useState("gemini-2-flash");
  const [enabledAgents, setEnabledAgents] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(agentFleet.map((agent) => [agent.id, true]))
  );

  const selectedAgent = useMemo(
    () => agentFleet.find((agent) => agent.id === selectedAgentId) ?? agentFleet[0],
    [selectedAgentId]
  );

  const handleToggleAgent = (agentId: string) => {
    setEnabledAgents((current) => ({ ...current, [agentId]: !current[agentId] }));
  };

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
                aria-label="Operations sections"
              >
                {sidebarItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}{item.comingSoon ? " - Coming soon" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mx-auto max-w-[1540px] px-4 py-6 md:px-6 lg:px-8">
            <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">MAS QHomemart</p>
                <p className="mt-1 text-sm text-slate-400">Premium stakeholder dashboard for judges and operations review.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                  System health: Operational
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-slate-300">
                  <Clock3 className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
                  Demo metrics only
                </span>
              </div>
            </header>

            <div className={activeSection === "overview" ? "block" : "hidden"}>
              <CommandOverview workflow={workflow} />
            </div>

            <div className={activeSection === "agent-fleet" ? "grid gap-5 2xl:grid-cols-[1fr_420px]" : "hidden"}>
              <AgentFleet
                agents={agentFleet}
                selectedAgentId={selectedAgentId}
                enabledAgents={enabledAgents}
                onSelectAgent={setSelectedAgentId}
                onToggleAgent={handleToggleAgent}
              />
              <AgentAnatomyPanel agent={selectedAgent} layers={triageCognitionLayers} />
            </div>

            <div className={activeSection === "workflow-monitor" ? "grid gap-5 2xl:grid-cols-[1fr_420px]" : "hidden"}>
              <WorkflowMonitor agents={agentFleet} selectedAgentId={selectedAgentId} onSelectAgent={setSelectedAgentId} />
              <AgentAnatomyPanel agent={selectedAgent} layers={triageCognitionLayers} />
            </div>

            <div className={activeSection === "model-routing" ? "block" : "hidden"}>
              <ModelRouting models={modelOptions} selectedModelId={selectedModelId} onSelectModel={setSelectedModelId} />
            </div>

            <div className={activeSection === "fallback-governance" ? "block" : "hidden"}>
              <FallbackGovernance policies={fallbackPolicies} />
            </div>

            <div className={activeSection === "business-decision" ? "block" : "hidden"}>
              <BusinessDecision workflow={workflow} />
            </div>

            <div className={activeSection === "logs-audit" ? "block" : "hidden"}>
              <LogsAudit workflow={workflow} />
            </div>

            {activeSection === "settings" && <ComingSoon title="Settings" description="Governance settings, permissions, and model policy controls are planned for a later integration phase." />}
            {activeSection === "human-review" && <ComingSoon title="Human Review" description="Staff escalation queues and review decisions are planned. No real review workflow is active in this prototype." />}
            {activeSection === "knowledge-base" && <ComingSoon title="Knowledge Base" description="Product, service, campaign, and policy knowledge management is planned. No real dataset is connected here." />}
          </div>
        </main>
      </div>
    </div>
  );
}

function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.055] p-8">
      <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
        Coming soon
      </span>
      <h2 className="mt-5 text-3xl font-semibold text-white">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Access model", "Workflow policy", "Audit controls"].map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-slate-950/35 p-4">
            <p className="text-sm font-semibold text-white">{item}</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Future SaaS module placeholder. Not functional.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
