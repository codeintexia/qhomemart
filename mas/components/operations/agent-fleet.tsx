"use client";

import { Power, Radar, ShieldCheck } from "lucide-react";
import type { AgentDefinition } from "./operations-data";

function statusClasses(status: AgentDefinition["status"]) {
  if (status === "active") return "border-emerald-300/30 bg-emerald-400/10 text-emerald-200";
  if (status === "simulated") return "border-amber-300/30 bg-amber-400/10 text-amber-200";
  return "border-sky-300/30 bg-sky-400/10 text-sky-200";
}

export function AgentFleet({
  agents,
  selectedAgentId,
  enabledAgents,
  onSelectAgent,
  onToggleAgent,
}: {
  agents: AgentDefinition[];
  selectedAgentId: string;
  enabledAgents: Record<string, boolean>;
  onSelectAgent: (agentId: string) => void;
  onToggleAgent: (agentId: string) => void;
}) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Agent Fleet</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Six-agent orchestration topology</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          Toggles are simulated prototype controls. They change this dashboard state only and do not control production services.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {agents.map((agent) => {
          const enabled = enabledAgents[agent.id];
          const selected = selectedAgentId === agent.id;
          return (
            <article
              key={agent.id}
              className={`rounded-lg border p-5 transition ${
                selected ? "border-red-300/60 bg-red-500/[0.08]" : "border-white/10 bg-white/[0.055] hover:bg-white/[0.075]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusClasses(agent.status)}`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{agent.role}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleAgent(agent.id)}
                  className={`flex h-9 w-16 shrink-0 items-center rounded-full border p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${
                    enabled ? "justify-end border-emerald-300/30 bg-emerald-400/20" : "justify-start border-slate-600 bg-slate-900"
                  }`}
                  aria-pressed={enabled}
                  aria-label={`Simulated toggle for ${agent.name}`}
                  title="Simulated prototype control only"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-950 shadow">
                    <Power className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </button>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <Meta label="Criticality" value={agent.criticality} />
                <Meta label="Cost tier" value={agent.costTier} />
                <Meta label="Model used" value={agent.modelUsed} />
                <Meta label="Output type" value={agent.outputType} />
                <Meta label="Last run" value={agent.lastRunStatus} />
                <Meta label="Fallback" value={agent.fallbackBehavior} />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-200" aria-hidden="true" />
                  Fallback indicator: ready
                </div>
                <button
                  type="button"
                  onClick={() => onSelectAgent(agent.id)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                >
                  <Radar className="h-4 w-4" aria-hidden="true" />
                  View anatomy
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/35 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm leading-5 text-slate-200">{value}</p>
    </div>
  );
}
