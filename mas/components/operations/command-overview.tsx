import { CheckCircle2, CircleGauge, Cpu, GitBranch, Layers3, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import type { WorkflowRunResult } from "@/types/mas-types";

const statusCards = [
  { label: "System health", value: "Operational", note: "Demo signal", icon: CheckCircle2 },
  { label: "Runtime mode", value: "Hybrid-ready", note: "Prototype estimate", icon: CircleGauge },
  { label: "LLM-assisted triage", value: "Supported", note: "Available when configured", icon: Sparkles },
  { label: "Provider", value: "Sumopod", note: "OpenAI-compatible path", icon: Cpu },
  { label: "Model", value: "Gemini 2.0 Flash", note: "Selected router option", icon: Layers3 },
  { label: "Deterministic fallback", value: "Enabled", note: "Business continuity", icon: ShieldCheck },
  { label: "Semantic normalization", value: "Active", note: "Canonical state mapping", icon: Workflow },
  { label: "Workflow trace", value: "Active", note: "Six logged steps", icon: GitBranch },
];

export function CommandOverview({ workflow }: { workflow: WorkflowRunResult }) {
  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827_0%,#0c1220_48%,#231014_100%)] shadow-2xl shadow-black/30">
        <div className="grid gap-8 p-6 lg:grid-cols-[1.35fr_0.65fr] lg:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
              Operational command layer
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white xl:text-5xl">
              MAS is a hybrid AI orchestration system, not a chatbot.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              The bathroom-safety workflow demonstrates LLM-assisted triage readiness, deterministic fallback, semantic normalization,
              six-agent coordination, and stakeholder-ready business output.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Current Workflow Output</p>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-sm text-slate-400">Active agents</p>
                <p className="text-3xl font-semibold text-white">6</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Business output</p>
                <p className="text-lg font-semibold text-emerald-200">{workflow.metrics.businessInsightGenerated ? "Generated" : "Pending"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Scenario</p>
                <p className="text-sm leading-6 text-slate-200">{workflow.scenario.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statusCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-xl shadow-black/15 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.075]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-5 w-5 text-red-200" aria-hidden="true" />
                </div>
                <span className="rounded-full bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold text-slate-300">{card.note}</span>
              </div>
              <p className="mt-4 text-sm text-slate-400">{card.label}</p>
              <p className="mt-1 text-xl font-semibold text-white">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
          <p className="text-sm text-slate-400">Cost & health</p>
          <p className="mt-2 text-2xl font-semibold text-white">Low operational risk</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">Simulated metric based on local workflow execution and fallback-ready architecture.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
          <p className="text-sm text-slate-400">Latency</p>
          <p className="mt-2 text-2xl font-semibold text-white">Demo estimate</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">No production timing is claimed. This dashboard makes no API calls.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
          <p className="text-sm text-slate-400">Runtime evidence</p>
          <p className="mt-2 text-2xl font-semibold text-white">{workflow.metrics.agentStepsLogged} audit steps</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{workflow.aiMeta.aiReason ?? "AI metadata captured for prototype auditability."}</p>
        </div>
      </div>
    </section>
  );
}
