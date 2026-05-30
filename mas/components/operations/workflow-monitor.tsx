"use client";

import { ArrowRight, GitBranch } from "lucide-react";
import type { AgentDefinition } from "./operations-data";

export function WorkflowMonitor({
  agents,
  selectedAgentId,
  onSelectAgent,
}: {
  agents: AgentDefinition[];
  selectedAgentId: string;
  onSelectAgent: (agentId: string) => void;
}) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Workflow Monitor</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Bathroom safety orchestration trace</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          Animated flow is a dashboard visualization of the current prototype pipeline. The workflow itself remains deterministic unless optional LLM triage is configured.
        </p>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[980px] items-center">
            {agents.map((agent, index) => {
              const selected = selectedAgentId === agent.id;
              return (
                <div key={agent.id} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => onSelectAgent(agent.id)}
                    className={`group relative min-h-32 w-full rounded-lg border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${
                      selected ? "border-red-300 bg-red-500/10" : "border-white/10 bg-slate-950/35 hover:bg-white/10"
                    }`}
                  >
                    <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm font-semibold text-white">{agent.shortName}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{agent.outputType}</p>
                    <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
                  </button>
                  {index < agents.length - 1 && (
                    <div className="relative mx-2 h-px w-12 shrink-0 bg-white/15">
                      <span className="absolute -top-1 left-0 h-2 w-2 animate-[pulse-soft_1.8s_ease-in-out_infinite] rounded-full bg-red-200" />
                      <ArrowRight className="absolute -right-2 -top-2 h-4 w-4 text-slate-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
          <div className="flex items-center gap-3">
            <GitBranch className="h-5 w-5 text-red-200" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-white">Normalization evidence</h3>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <Evidence label="Raw LLM Output" value="Keamanan kamar mandi" />
            <ArrowRight className="hidden h-5 w-5 text-slate-500 md:block" aria-hidden="true" />
            <Evidence label="Canonical Workflow State" value="Kamar mandi licin" />
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Normalization keeps product matching, service orchestration, workflow logs, and analytics stable.
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
          <h3 className="text-lg font-semibold text-white">Selected node</h3>
          <p className="mt-3 text-2xl font-semibold text-red-100">
            {agents.find((agent) => agent.id === selectedAgentId)?.name}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Click a topology node to inspect the agent anatomy, contracts, fallback behavior, and evidence.
          </p>
        </div>
      </div>
    </section>
  );
}

function Evidence({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/45 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
