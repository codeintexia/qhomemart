"use client";

import { Cpu, Gauge, Route } from "lucide-react";
import type { ModelOption } from "./operations-data";

export function ModelRouting({
  models,
  selectedModelId,
  onSelectModel,
}: {
  models: ModelOption[];
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
}) {
  const selected = models.find((model) => model.id === selectedModelId) ?? models[0];

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Model Routing</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Simulated model router</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          Model picker changes local dashboard state only. Routing policy is simulated for the prototype and makes no external calls.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Available models</p>
          <div className="mt-4 space-y-2">
            {models.map((model) => {
              const isSelected = selected.id === model.id;
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => onSelectModel(model.id)}
                  className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${
                    isSelected ? "border-red-300/60 bg-red-500/10" : "border-white/10 bg-slate-950/35 hover:bg-white/10"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold text-white">{model.name}</span>
                    <span className="mt-1 block text-xs text-slate-400">{model.taskFit}</span>
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-300">{model.costTier}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#0b111d]/85 p-6 shadow-xl shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Selected model</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">{selected.name}</h3>
            </div>
            <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
              Simulated routing policy for prototype
            </span>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-300">
            Reason selected: low cost, fast response characteristics, and suitable fit for Indonesian structured JSON triage.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Metric icon={Gauge} label="Cost tier" value={selected.costTier} />
            <Metric icon={Cpu} label="Speed tier" value={selected.speedTier} />
            <Metric icon={Route} label="Fallback model" value={selected.fallbackModel} />
            <Metric icon={Cpu} label="Task fit" value={selected.taskFit} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        <Icon className="h-4 w-4 text-red-200" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-200">{value}</p>
    </div>
  );
}
