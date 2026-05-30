import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { AgentDefinition, CognitionLayer } from "./operations-data";

function statusClass(status: CognitionLayer["status"]) {
  if (status === "Active") return "border-emerald-300/30 bg-emerald-400/10 text-emerald-200";
  if (status === "Simulated") return "border-amber-300/30 bg-amber-400/10 text-amber-200";
  return "border-slate-500/40 bg-slate-500/10 text-slate-300";
}

export function AgentAnatomyPanel({
  agent,
  layers,
}: {
  agent: AgentDefinition;
  layers: CognitionLayer[];
}) {
  const fields = [
    ["Role", agent.role],
    ["Input contract", agent.inputContract],
    ["Reasoning task", agent.reasoningTask],
    ["Output contract", agent.outputContract],
    ["Downstream consumer", agent.downstreamConsumer],
    ["Fallback behavior", agent.fallbackBehavior],
    ["Evidence generated", agent.evidenceGenerated],
  ];

  return (
    <aside className="rounded-lg border border-white/10 bg-[#0b111d]/85 p-5 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Agent Anatomy</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{agent.name}</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
          {agent.status}
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {fields.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{value}</p>
          </div>
        ))}
      </div>

      {agent.id === "customer-triage" && (
        <div className="mt-5 rounded-lg border border-red-300/15 bg-red-500/[0.06] p-4">
          <p className="text-sm font-semibold text-white">Layered cognition path</p>
          <div className="mt-4 space-y-3">
            {layers.map((layer, index) => (
              <div key={layer.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                    <CheckCircle2 className="h-4 w-4 text-red-200" aria-hidden="true" />
                  </div>
                  {index < layers.length - 1 && <div className="h-full min-h-7 w-px bg-white/10" />}
                </div>
                <div className="min-w-0 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-white">{layer.label}</p>
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusClass(layer.status)}`}>
                      {layer.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{layer.explanation}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-red-100">
            User Intent <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /> Evidence / Audit Trail
          </div>
        </div>
      )}
    </aside>
  );
}
