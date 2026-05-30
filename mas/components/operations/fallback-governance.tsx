import { ArrowDown, ShieldAlert } from "lucide-react";
import type { FallbackPolicy } from "./operations-data";

export function FallbackGovernance({ policies }: { policies: FallbackPolicy[] }) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Fallback Governance</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Business continuity and audit controls</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          These are prototype governance policies, designed to show how MAS avoids brittle chatbot behavior without claiming production readiness.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {policies.map((policy) => (
          <article key={policy.path} className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/15">
                <ShieldAlert className="h-5 w-5 text-red-200" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{policy.path}</h3>
                <div className="mt-4 grid gap-3">
                  <Detail label="Risk prevented" value={policy.riskPrevented} />
                  <Detail label="Business continuity benefit" value={policy.continuityBenefit} />
                  <Detail label="Auditability benefit" value={policy.auditabilityBenefit} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-lg border border-white/10 bg-[#0b111d]/85 p-5">
        <h3 className="text-lg font-semibold text-white">Semantic normalization evidence</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <Evidence label="Raw LLM Output" value="Keamanan kamar mandi" />
          <ArrowDown className="mx-auto h-5 w-5 text-slate-500 md:rotate-[-90deg]" aria-hidden="true" />
          <Evidence label="Canonical Workflow State" value="Kamar mandi licin" />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-400">
          Normalization keeps product matching, service orchestration, workflow logs, and analytics stable.
        </p>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/35 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-200">{value}</p>
    </div>
  );
}

function Evidence({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
